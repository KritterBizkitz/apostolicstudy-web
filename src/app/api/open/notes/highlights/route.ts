import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Guest (localStorage) mode: cloud Highlights API disabled.
// Highlights should be stored only in the browser and never sent to the server.
function guestMode() {
  return NextResponse.json(
    {
      error: 'Highlights API disabled',
      message:
        'The cloud Highlights API is disabled in Guest mode. Highlights are saved locally (localStorage).',
      mode: 'guest-local',
    },
    { status: 410 }
  );
}

// GET /api/open/notes/highlights?bookId=ROM&chapter=3
export async function GET() {
  return guestMode();
}

// POST /api/open/notes/highlights { bookId, chapter, verse, color }
export async function POST() {
  return guestMode();
}

// DELETE /api/open/notes/highlights { bookId, chapter, verse }
export async function DELETE() {
  return guestMode();
}
