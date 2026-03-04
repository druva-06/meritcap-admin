"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    AlertTriangle,
    RefreshCw,
    Trash2,
    ArrowUpFromLine,
    Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getAccessToken } from "@/lib/api-client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UploadResponse {
    jobId: number;
    fileName: string;
    status: string;
}

interface JobStatus {
    jobId: number;
    fileName: string | null;
    totalRecords: number | null;
    processedRecords: number | null;
    percentComplete: number | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
    errorMessage: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

interface UploadJob {
    id: number;
    fileName: string;
    fileSize: number;
    status: JobStatus["status"];
    progress: number;
    totalRecords: number | null;
    processedRecords: number | null;
    errorMessage: string | null;
    startedAt: Date;
    completedAt: Date | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const POLL_INTERVAL = 3000; // 3 seconds
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ACCEPTED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDuration(start: Date, end: Date | null): string {
    const ms = (end || new Date()).getTime() - start.getTime();
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}

function statusColor(status: UploadJob["status"]): string {
    switch (status) {
        case "COMPLETED":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "FAILED":
            return "bg-red-100 text-red-700 border-red-200";
        case "IN_PROGRESS":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "PENDING":
            return "bg-amber-100 text-amber-700 border-amber-200";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

function statusIcon(status: UploadJob["status"]) {
    switch (status) {
        case "COMPLETED":
            return <CheckCircle2 className="h-4 w-4" />;
        case "FAILED":
            return <XCircle className="h-4 w-4" />;
        case "IN_PROGRESS":
            return <Loader2 className="h-4 w-4 animate-spin" />;
        case "PENDING":
            return <Clock className="h-4 w-4" />;
    }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BulkUploadPage() {
    const [jobs, setJobs] = useState<UploadJob[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pollIntervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
    const [elapsedTick, setElapsedTick] = useState(0);

    // ── Auth helper ──

    const getAuthHeaders = (): Record<string, string> => {
        const token = getAccessToken();
        if (token) return { Authorization: `Bearer ${token}` };
        return {};
    };

    // ── Fetch existing jobs from API on mount & resume polling ──

    const fetchExistingJobs = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/bulk/upload/jobs`, {
                headers: getAuthHeaders(),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                const serverJobs: JobStatus[] = json.response;
                const mapped: UploadJob[] = serverJobs.map((sj) => ({
                    id: sj.jobId,
                    fileName: sj.fileName || "Unknown",
                    fileSize: 0,
                    status: sj.status,
                    progress: sj.percentComplete ?? 0,
                    totalRecords: sj.totalRecords,
                    processedRecords: sj.processedRecords,
                    errorMessage: sj.errorMessage,
                    startedAt: sj.createdAt ? new Date(sj.createdAt) : new Date(),
                    completedAt:
                        sj.status === "COMPLETED" || sj.status === "FAILED"
                            ? sj.updatedAt
                                ? new Date(sj.updatedAt)
                                : new Date()
                            : null,
                }));
                setJobs(mapped);
                // Resume polling for active jobs
                mapped.forEach((job) => {
                    if (job.status === "PENDING" || job.status === "IN_PROGRESS") {
                        startPolling(job.id);
                    }
                });
            }
        } catch {
            // Silently fail — user can still upload new files
        } finally {
            setIsLoading(false);
        }
    }, [startPolling]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchExistingJobs();
    }, [fetchExistingJobs]);
    useEffect(() => {
        const hasActive = jobs.some(
            (j) => j.status === "PENDING" || j.status === "IN_PROGRESS"
        );
        if (!hasActive) return;
        const id = setInterval(() => setElapsedTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, [jobs]);

    // Cleanup poll intervals on unmount
    useEffect(() => {
        return () => {
            pollIntervalsRef.current.forEach((id) => clearInterval(id));
        };
    }, []);

    // ── API helpers ──

    const uploadFile = async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${API_BASE}/api/bulk/upload`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData,
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
            throw new Error(json.message || "Upload failed");
        }
        return json.response as UploadResponse;
    };

    const fetchStatus = async (jobId: number): Promise<JobStatus> => {
        const res = await fetch(`${API_BASE}/api/bulk/upload/${jobId}/status`, {
            headers: getAuthHeaders(),
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
            throw new Error(json.message || "Failed to fetch status");
        }
        return json.response as JobStatus;
    };

    // ── Polling ──

    const startPolling = useCallback(
        (jobId: number) => {
            if (pollIntervalsRef.current.has(jobId)) return;

            const poll = async () => {
                try {
                    const status = await fetchStatus(jobId);
                    setJobs((prev) =>
                        prev.map((j) =>
                            j.id === jobId
                                ? {
                                    ...j,
                                    status: status.status,
                                    progress: status.percentComplete ?? j.progress,
                                    totalRecords: status.totalRecords ?? j.totalRecords,
                                    processedRecords:
                                        status.processedRecords ?? j.processedRecords,
                                    errorMessage: status.errorMessage ?? j.errorMessage,
                                    completedAt:
                                        status.status === "COMPLETED" ||
                                            status.status === "FAILED"
                                            ? new Date()
                                            : j.completedAt,
                                }
                                : j
                        )
                    );

                    if (
                        status.status === "COMPLETED" ||
                        status.status === "FAILED"
                    ) {
                        const interval = pollIntervalsRef.current.get(jobId);
                        if (interval) {
                            clearInterval(interval);
                            pollIntervalsRef.current.delete(jobId);
                        }
                    }
                } catch {
                    // Silently retry on network blips
                }
            };

            // Run immediately, then schedule
            poll();
            const interval = setInterval(poll, POLL_INTERVAL);
            pollIntervalsRef.current.set(jobId, interval);
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // ── File Handling ──

    const validateFile = (file: File): string | null => {
        if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.xlsx?$/i)) {
            return "Only .xlsx or .xls Excel files are accepted";
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File is too large (${formatBytes(file.size)}). Maximum size is ${formatBytes(MAX_FILE_SIZE)}`;
        }
        return null;
    };

    const handleFiles = async (files: FileList | File[]) => {
        setUploadError(null);
        const file = files[0];
        if (!file) return;

        const error = validateFile(file);
        if (error) {
            setUploadError(error);
            return;
        }

        setIsUploading(true);
        try {
            const resp = await uploadFile(file);
            const newJob: UploadJob = {
                id: resp.jobId,
                fileName: resp.fileName,
                fileSize: file.size,
                status: "PENDING",
                progress: 0,
                totalRecords: null,
                processedRecords: null,
                errorMessage: null,
                startedAt: new Date(),
                completedAt: null,
            };
            setJobs((prev) => [newJob, ...prev]);
            startPolling(resp.jobId);
        } catch (err: any) {
            setUploadError(err.message || "Upload failed");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // ── Drag & Drop ──

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) handleFiles(e.target.files);
    };

    const removeJob = (jobId: number) => {
        const interval = pollIntervalsRef.current.get(jobId);
        if (interval) {
            clearInterval(interval);
            pollIntervalsRef.current.delete(jobId);
        }
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
    };

    // ── Stats ──

    const activeJobs = jobs.filter(
        (j) => j.status === "PENDING" || j.status === "IN_PROGRESS"
    );
    const completedJobs = jobs.filter((j) => j.status === "COMPLETED");
    const failedJobs = jobs.filter((j) => j.status === "FAILED");

    // ── Render ──

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Bulk Upload
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Upload Excel files to bulk import colleges, courses, and
                        college-course mappings
                    </p>
                </div>
                {jobs.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                        {activeJobs.length > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                {activeJobs.length} active
                            </Badge>
                        )}
                        {completedJobs.length > 0 && (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {completedJobs.length} done
                            </Badge>
                        )}
                        {failedJobs.length > 0 && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
                                <XCircle className="h-3 w-3" />
                                {failedJobs.length} failed
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* Upload Zone */}
            <Card className="border-2 border-dashed transition-colors duration-200">
                <CardContent className="p-0">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`
              flex flex-col items-center justify-center py-16 px-6 cursor-pointer
              rounded-lg transition-all duration-200
              ${isDragging ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"}
              ${isUploading ? "pointer-events-none opacity-60" : ""}
            `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleInputChange}
                            className="hidden"
                        />
                        <div
                            className={`
              p-4 rounded-full mb-4 transition-colors
              ${isDragging ? "bg-blue-100" : "bg-gray-100"}
            `}
                        >
                            {isUploading ? (
                                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                            ) : (
                                <ArrowUpFromLine
                                    className={`h-10 w-10 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
                                />
                            )}
                        </div>
                        <p className="text-base font-medium text-gray-700">
                            {isUploading
                                ? "Uploading..."
                                : isDragging
                                    ? "Drop your file here"
                                    : "Drag & drop your Excel file here"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            or click to browse • .xlsx / .xls • max 50 MB
                        </p>
                        {!isUploading && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose File
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Upload Error */}
            {uploadError && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-medium text-sm">Upload Error</p>
                        <p className="text-sm mt-0.5">{uploadError}</p>
                    </div>
                    <button
                        onClick={() => setUploadError(null)}
                        className="text-red-400 hover:text-red-600"
                    >
                        <XCircle className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Instructions Card */}
            {jobs.length === 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            How It Works
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-gray-800">
                                        Upload Excel
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Upload a .xlsx file with sheets for Colleges, Courses, and
                                        CollegeCourse mappings
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-gray-800">
                                        Processing
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        The server parses the file, creates/updates colleges, courses,
                                        and links them together
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-gray-800">
                                        Review Results
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Track progress in real-time. Re-uploading the same file safely
                                        updates existing records (upsert)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Job List */}
            {jobs.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Upload Jobs
                    </h2>
                    {jobs.map((job) => (
                        <Card
                            key={job.id}
                            className={`transition-all duration-300 ${job.status === "IN_PROGRESS"
                                    ? "ring-2 ring-blue-200 shadow-md"
                                    : ""
                                }`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    {/* Left: File info */}
                                    <div className="flex items-start gap-3 min-w-0 flex-1">
                                        <div
                                            className={`p-2 rounded-lg flex-shrink-0 ${job.status === "COMPLETED"
                                                    ? "bg-emerald-100"
                                                    : job.status === "FAILED"
                                                        ? "bg-red-100"
                                                        : "bg-blue-100"
                                                }`}
                                        >
                                            <FileSpreadsheet
                                                className={`h-5 w-5 ${job.status === "COMPLETED"
                                                        ? "text-emerald-600"
                                                        : job.status === "FAILED"
                                                            ? "text-red-600"
                                                            : "text-blue-600"
                                                    }`}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {job.fileName}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${statusColor(job.status)} gap-1`}
                                                >
                                                    {statusIcon(job.status)}
                                                    {job.status.replace("_", " ")}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span>{formatBytes(job.fileSize)}</span>
                                                <span>•</span>
                                                <span>Job #{job.id}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDuration(job.startedAt, job.completedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex items-center gap-1">
                                        {(job.status === "COMPLETED" ||
                                            job.status === "FAILED") && (
                                                <button
                                                    onClick={() => removeJob(job.id)}
                                                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Remove from list"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                    </div>
                                </div>

                                {/* Progress bar */}
                                {(job.status === "PENDING" ||
                                    job.status === "IN_PROGRESS") && (
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs font-medium text-gray-600">
                                                    {job.status === "PENDING"
                                                        ? "Waiting to start..."
                                                        : `Processing records...`}
                                                </span>
                                                <span className="text-xs font-semibold text-blue-600">
                                                    {job.progress}%
                                                </span>
                                            </div>
                                            <Progress
                                                value={job.progress}
                                                className="h-2 bg-blue-100"
                                            />
                                            {job.processedRecords !== null &&
                                                job.totalRecords !== null && (
                                                    <p className="text-xs text-gray-500 mt-1.5">
                                                        {job.processedRecords.toLocaleString()} /{" "}
                                                        {job.totalRecords.toLocaleString()} records processed
                                                    </p>
                                                )}
                                        </div>
                                    )}

                                {/* Completed stats */}
                                {job.status === "COMPLETED" && (
                                    <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            <span className="text-sm font-medium text-emerald-700">
                                                Upload completed successfully
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-emerald-600">
                                            {job.totalRecords !== null && (
                                                <span>
                                                    {job.totalRecords.toLocaleString()} total records
                                                </span>
                                            )}
                                            {job.processedRecords !== null && (
                                                <span>
                                                    {job.processedRecords.toLocaleString()} processed
                                                </span>
                                            )}
                                            <span>
                                                Completed in{" "}
                                                {formatDuration(job.startedAt, job.completedAt)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Failed message */}
                                {job.status === "FAILED" && (
                                    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100">
                                        <div className="flex items-start gap-2">
                                            <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-sm font-medium text-red-700">
                                                    Upload failed
                                                </span>
                                                {job.errorMessage && (
                                                    <p className="text-xs text-red-600 mt-1">
                                                        {job.errorMessage}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {job.processedRecords !== null &&
                                            job.totalRecords !== null && (
                                                <p className="text-xs text-red-500 mt-2">
                                                    Processed {job.processedRecords.toLocaleString()} of{" "}
                                                    {job.totalRecords.toLocaleString()} records before
                                                    failure
                                                </p>
                                            )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 text-red-600 border-red-200 hover:bg-red-100"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <RefreshCw className="h-3 w-3 mr-1" />
                                            Retry Upload
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
