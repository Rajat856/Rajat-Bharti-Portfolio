"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const budgets = [
  "Under ₹50k",
  "₹50k – ₹1.5L",
  "₹1.5L – ₹4L",
  "₹4L+",
  "Not sure yet",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setMessage(json.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setMessage("Network error — please email me directly at rajatbharti856@gmail.com.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-4xl border border-emerald-500/25 bg-emerald-500/[0.06] p-10 text-center"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl tracking-tight">Message sent</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thanks for reaching out — I read everything personally and usually reply within a day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm text-accent transition-colors hover:text-ink"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-4xl border border-line bg-surface/50 p-7 sm:p-9"
    >
      {/* Honeypot — visually hidden, never focusable */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field label="Company" name="company" autoComplete="organization" optional />
        <SelectField label="Budget" name="budget" options={budgets} optional />
      </div>

      <div className="mt-5">
        <SelectField
          label="What do you need?"
          name="service"
          options={services.map((s) => s.title)}
          optional
        />
      </div>

      <div className="mt-5">
        <Field
          label="Project details"
          name="message"
          textarea
          required
          error={errors.message}
          placeholder="What are you building, what's the constraint, and when do you need it live?"
        />
      </div>

      <AnimatePresence>
        {status === "error" && message ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400"
            role="alert"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xs text-xs leading-relaxed text-faint">
          Your details are only used to reply to this enquiry. Nothing is shared or added to a
          mailing list.
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-brand-600))] px-7 text-sm font-medium text-white shadow-[0_8px_30px_-10px_var(--glow-a)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_46px_-12px_var(--glow-a)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ Fields */

const fieldBase =
  "w-full rounded-2xl border bg-canvas/60 px-4 py-3 text-sm text-ink placeholder:text-faint " +
  "transition-colors duration-300 focus:outline-none focus:ring-0";

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  error,
  textarea,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  textarea?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={textarea ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm text-muted">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            *
          </span>
        ) : null}
        {optional ? <span className="text-[11px] text-faint">optional</span> : null}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          required={required}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            fieldBase,
            "resize-y",
            error ? "border-red-500/50" : "border-line focus:border-accent/60",
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            fieldBase,
            error ? "border-red-500/50" : "border-line focus:border-accent/60",
          )}
        />
      )}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  optional,
}: {
  label: string;
  name: string;
  options: string[];
  optional?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm text-muted">
        {label}
        {optional ? <span className="text-[11px] text-faint">optional</span> : null}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className={cn(fieldBase, "border-line focus:border-accent/60 appearance-none")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239a9aa6' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
