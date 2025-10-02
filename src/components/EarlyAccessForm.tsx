"use client";

import { FormEvent, useState } from "react";

const initialState = {
  fullName: "",
  title: "",
  email: "",
  church: "",
};

type FormState = typeof initialState;

type SubmissionState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

export default function EarlyAccessForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmission({ status: "loading" });

    const payload = {
      fullName: form.fullName.trim(),
      title: form.title.trim(),
      email: form.email.trim(),
      church: form.church.trim(),
    };

    const missing = Object.entries(payload)
      .filter(([, value]) => value.length === 0)
      .map(([key]) => key);

    if (missing.length > 0) {
      setSubmission({ status: "error", message: "Please fill in all fields before submitting." });
      return;
    }

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: "Unable to submit right now." }));
        throw new Error(error ?? "Unable to submit right now.");
      }

      setSubmission({ status: "success", message: "Thanks! We will reach out as early access expands." });
      setForm(initialState);
    } catch (error) {
      const message = error instanceof Error ? error.message : "There was a problem submitting the form.";
      setSubmission({ status: "error", message });
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_35px_120px_-70px_rgba(15,23,42,0.9)] backdrop-blur">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Title / role</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              placeholder="Pastor, Teacher, Minister, etc."
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Church</span>
            <input
              type="text"
              name="church"
              value={form.church}
              onChange={(event) => setForm((prev) => ({ ...prev, church: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submission.status === "loading"}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_20px_60px_-20px_rgba(16,185,129,0.65)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submission.status === "loading" ? "Submitting…" : "Request early access"}
          </button>
          {submission.status !== "idle" && submission.message && (
            <p
              className={`text-sm ${
                submission.status === "success" ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {submission.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
