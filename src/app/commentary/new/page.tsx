import { redirect } from "next/navigation";

import { currentUser } from "@/auth";
import { BOOKS, bookLabelFromSlug } from "@/lib/books";
import CommentaryAdminForm from "@/components/CommentaryAdminForm";

type BookOption = {
  id: string;
  label: string;
  chapters: number;
};

const ADMIN_ID = (process.env.COMMENTARY_ADMIN_ID ?? process.env.NEXT_PUBLIC_COMMENTARY_ADMIN_ID ?? "").trim();

export default async function CommentaryNewPage() {
  if (!ADMIN_ID) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-white">Add Commentary</h1>
        <p className="mt-3 text-sm text-red-300">
          Set COMMENTARY_ADMIN_ID in your .env.local file and restart the dev server.
        </p>
      </main>
    );
  }

  const user = await currentUser();

  if (!user || user.id !== ADMIN_ID) {
    redirect("/account");
  }

  const books: BookOption[] = BOOKS.map((book) => ({
    id: book.id,
    label: bookLabelFromSlug(book.id),
    chapters: book.chapters,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-white">Add Commentary</h1>
      <p className="mt-2 text-sm text-white/70">
        Quickly post commentary for a verse. Entries are saved or updated for the selected reference.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <CommentaryAdminForm books={books} />
      </div>
    </main>
  );
}
