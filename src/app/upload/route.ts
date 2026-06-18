import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

// URL роута = /upload (совпадает с handleUploadUrl в settings/storage.ts)
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // TODO: проверь авторизацию админа перед выдачей токена
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true, // уникальные имена -> нет "blob already exists"
        };
      },
      onUploadCompleted: async ({ blob }) => { console.log('blob uploaded:', blob.url); },
    });
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
