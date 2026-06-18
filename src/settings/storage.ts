import { vercelBlobStorageAdapter } from 'rdy-admin';
import { upload } from '@vercel/blob/client';

// Загрузка напрямую в Vercel Blob; на бэк уходит полный URL (blob.url).
export const storage = vercelBlobStorageAdapter({ upload, handleUploadUrl: '/upload' });
