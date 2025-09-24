import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('t') ?? 'ApostolicStudy';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5, #10b981)',
          color: 'white',
          fontSize: 60,
          fontWeight: 700,
          fontFamily: 'Inter, Arial, sans-serif',
          padding: 40,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
