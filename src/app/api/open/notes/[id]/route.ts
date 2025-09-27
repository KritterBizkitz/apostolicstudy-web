import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Guest (localStorage) mode: cloud Notes API disabled.
// Notes are stored only in the browser and never sent to the server.
function guestMode() {
  return NextResponse.json(
    {
      error: 'Notes API disabled',
      message:
        'The cloud Notes API is disabled in Guest mode. Notes are saved locally (localStorage).',
      mode: 'guest-local',
    },
    { status: 410 }
  );
}

// DELETE /api/open/notes/[id]
export async function DELETE() {
  return guestMode();
}
