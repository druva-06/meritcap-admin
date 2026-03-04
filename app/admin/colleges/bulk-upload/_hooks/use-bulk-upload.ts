"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getAccessToken } from "@/lib/api-client";
import type { UploadJob, UploadResponse, JobStatus } from "../_lib/types";
import { API_BASE, POLL_INTERVAL, MAX_FILE_SIZE, ACCEPTED_TYPES } from "../_lib/constants";
import { formatBytes } from "../_lib/helpers";

// ─── Return type ─────────────────────────────────────────────────────────────

export interface UseBulkUploadReturn {
    jobs: UploadJob[];
    isLoading: boolean;
    isUploading: boolean;
    isDragging: boolean;
    uploadError: string | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    activeJobs: UploadJob[];
    completedJobs: UploadJob[];
    failedJobs: UploadJob[];
    handleFiles: (files: FileList | File[]) => Promise<void>;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeJob: (jobId: number) => void;
    clearUploadError: () => void;
    openFilePicker: () => void;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBulkUpload(): UseBulkUploadReturn {
    const [jobs, setJobs] = useState<UploadJob[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null!);
    const pollIntervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
    const [, setElapsedTick] = useState(0);

    // ── Auth helper ──

    const getAuthHeaders = useCallback((): Record<string, string> => {
        const token = getAccessToken();
        if (token) return { Authorization: `Bearer ${token}` };
        return {};
    }, []);

    // ── API helpers ──

    const uploadFile = useCallback(
        async (file: File): Promise<UploadResponse> => {
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
        },
        [getAuthHeaders]
    );

    const fetchStatus = useCallback(
        async (jobId: number): Promise<JobStatus> => {
            const res = await fetch(
                `${API_BASE}/api/bulk/upload/${jobId}/status`,
                { headers: getAuthHeaders() }
            );
            const json = await res.json();
            if (!res.ok || !json.success) {
                throw new Error(json.message || "Failed to fetch status");
            }
            return json.response as JobStatus;
        },
        [getAuthHeaders]
    );

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
                                      progress:
                                          status.percentComplete ?? j.progress,
                                      totalRecords:
                                          status.totalRecords ?? j.totalRecords,
                                      processedRecords:
                                          status.processedRecords ??
                                          j.processedRecords,
                                      errorMessage:
                                          status.errorMessage ?? j.errorMessage,
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

            poll();
            const interval = setInterval(poll, POLL_INTERVAL);
            pollIntervalsRef.current.set(jobId, interval);
        },
        [fetchStatus]
    );

    // ── Fetch existing jobs on mount ──

    const fetchExistingJobs = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/bulk/upload/jobs`, {
                headers: getAuthHeaders(),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                const serverJobs: JobStatus[] = json.response;
                // Server returns LocalDateTime (UTC) without 'Z' suffix.
                // Append 'Z' so JS Date parses it as UTC, not local time.
                const parseUtc = (dt: string | null) =>
                    dt ? new Date(dt.endsWith("Z") ? dt : dt + "Z") : new Date();

                const mapped: UploadJob[] = serverJobs.map((sj) => ({
                    id: sj.jobId,
                    fileName: sj.fileName || "Unknown",
                    fileSize: 0,
                    status: sj.status,
                    progress: sj.percentComplete ?? 0,
                    totalRecords: sj.totalRecords,
                    processedRecords: sj.processedRecords,
                    errorMessage: sj.errorMessage,
                    startedAt: parseUtc(sj.createdAt),
                    completedAt:
                        sj.status === "COMPLETED" || sj.status === "FAILED"
                            ? parseUtc(sj.updatedAt)
                            : null,
                }));
                setJobs(mapped);
                mapped.forEach((job) => {
                    if (
                        job.status === "PENDING" ||
                        job.status === "IN_PROGRESS"
                    ) {
                        startPolling(job.id);
                    }
                });
            }
        } catch {
            // Silently fail — user can still upload new files
        } finally {
            setIsLoading(false);
        }
    }, [getAuthHeaders, startPolling]);

    useEffect(() => {
        fetchExistingJobs();
    }, [fetchExistingJobs]);

    // Tick timer for elapsed-time display on active jobs
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
            pollIntervalsRef.current.forEach((id) => clearInterval(id));
        };
    }, []);

    // ── File validation ──

    const validateFile = useCallback((file: File): string | null => {
        if (
            !ACCEPTED_TYPES.includes(file.type) &&
            !file.name.match(/\.xlsx?$/i)
        ) {
            return "Only .xlsx or .xls Excel files are accepted";
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File is too large (${formatBytes(file.size)}). Maximum size is ${formatBytes(MAX_FILE_SIZE)}`;
        }
        return null;
    }, []);

    // ── Handle file upload ──

    const handleFiles = useCallback(
        async (files: FileList | File[]) => {
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
        },
        [validateFile, uploadFile, startPolling]
    );

    // ── Drag & Drop handlers ──

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
        [handleFiles]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) handleFiles(e.target.files);
        },
        [handleFiles]
    );

    // ── Job management ──

    const removeJob = useCallback((jobId: number) => {
        const interval = pollIntervalsRef.current.get(jobId);
        if (interval) {
            clearInterval(interval);
            pollIntervalsRef.current.delete(jobId);
        }
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
    }, []);

    const clearUploadError = useCallback(() => setUploadError(null), []);

    const openFilePicker = useCallback(() => {
        if (!isUploading) fileInputRef.current?.click();
    }, [isUploading]);

    // ── Computed ──

    const activeJobs = jobs.filter(
        (j) => j.status === "PENDING" || j.status === "IN_PROGRESS"
    );
    const completedJobs = jobs.filter((j) => j.status === "COMPLETED");
    const failedJobs = jobs.filter((j) => j.status === "FAILED");

    return {
        jobs,
        isLoading,
        isUploading,
        isDragging,
        uploadError,
        fileInputRef,
        activeJobs,
        completedJobs,
        failedJobs,
        handleFiles,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleInputChange,
        removeJob,
        clearUploadError,
        openFilePicker,
    };
}
