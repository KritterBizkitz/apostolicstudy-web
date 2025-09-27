import { NextResponse } from 'next/server';

// This route is intentionally disabled in Guest (localStorage) mode.
// Notes are stored only in the browser and never sent to the server.
export const dynamic = 'force-dynamic';

function guestMode() {
  return NextResponse.json(
    {
      error: 'Notes API disabled',
      message:
        'The cloud Notes API is disabled in Guest mode. Notes are stored in the browser (localStorage) and never sent to the server.',
      mode: 'guest-local',
    },
    { status: 410 }
  );
}

export async function GET() {
  return guestMode();
}

export async function POST() {
  return guestMode();
}