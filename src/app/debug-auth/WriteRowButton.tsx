"use client";

import { useState, useTransition } from "react";
import { writeDebug } from "./writeDebug";

export default function WriteRowButton() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string>("");

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
      <h2 className="text-sm font-semibold">Server write test</h2>
      <button
        disabled={pending}
        onClick={() =>
          start(async () => {
            const res = await writeDebug();
            setMsg(JSON.stringify(res));
          })
        }
        className="mt-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-50"
      >
        Write a row to Supabase
      </button>
      {msg ? <pre className="mt-2 text-xs whitespace-pre-wrap">{msg}</pre> : null}
    </div>
  );
}
