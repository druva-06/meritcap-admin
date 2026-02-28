/**
 * Simple encryption/decryption utilities for sensitive data storage
 * Uses Base64 encoding with a simple XOR cipher for basic obfuscation
 */

const ENCRYPTION_KEY = "MERITCAP_SECURE_KEY_2025"; // In production, use environment variable

/**
 * Encrypts a string using XOR cipher and Base64 encoding
 */
export function encrypt(text: string): string {
  try {
    const textBytes = new TextEncoder().encode(text);
    const keyBytes = new TextEncoder().encode(ENCRYPTION_KEY);
    
    const encrypted = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
      encrypted[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    
    // Convert to base64
    const base64 = btoa(String.fromCharCode(...encrypted));
    return base64;
  } catch (error) {
    console.error("Encryption error:", error);
    return text; // Fallback to plain text if encryption fails
  }
}

/**
 * Decrypts an encrypted string
 */
export function decrypt(encryptedText: string): string {
  try {
    // Decode from base64
    const encrypted = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    const keyBytes = new TextEncoder().encode(ENCRYPTION_KEY);
    
    const decrypted = new Uint8Array(encrypted.length);
    for (let i = 0; i < encrypted.length; i++) {
      decrypted[i] = encrypted[i] ^ keyBytes[i % keyBytes.length];
    }
    
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return encryptedText; // Fallback to returning the encrypted text
  }
}

/**
 * Storage wrapper that handles encryption/decryption automatically
 */
export const secureStorage = {
  setItem: (key: string, value: string, storage: Storage = localStorage) => {
    const encrypted = encrypt(value);
    storage.setItem(key, encrypted);
  },
  
  getItem: (key: string, storage: Storage = localStorage): string | null => {
    const encrypted = storage.getItem(key);
    if (!encrypted) return null;
    return decrypt(encrypted);
  },
  
  removeItem: (key: string, storage: Storage = localStorage) => {
    storage.removeItem(key);
  },
  
  clear: (storage: Storage = localStorage) => {
    storage.clear();
  }
};
