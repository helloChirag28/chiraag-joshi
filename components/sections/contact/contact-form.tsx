"use client";

import emailjs from "@emailjs/browser";
import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/primitives/arrow";
import { cn } from "@/lib/utils";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(data: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (data.message.trim().length < 10) errors.message = "Please write at least a sentence (10+ characters).";
  return errors;
}

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: real people never fill this hidden field.
    if (String(fd.get("company") ?? "")) {
      setStatus("sent");
      form.reset();
      return;
    }
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    if (!configured) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          to_email: site.email,
          from_name: data.name,
          from_email: data.email,
          reply_to: data.email,
          message: data.message,
        },
        { publicKey: PUBLIC_KEY! },
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = (name: keyof Errors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    disabled: status === "sending",
    className: cn(
      "w-full rounded-lg border bg-surface-1 px-4 font-geist text-body text-fg placeholder:text-fg-faint transition-colors duration-fast focus-visible:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/40 disabled:opacity-60",
      errors[name] ? "border-danger" : "border-line hover:border-line-strong",
    ),
  });

  const label = (name: keyof Errors, text: string) => (
    <label htmlFor={`${id}-${name}`} className="mb-2 block font-mono text-mono-label uppercase text-fg-muted">
      {text}
    </label>
  );
  const error = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-small text-danger">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input {...field("name")} type="text" autoComplete="name" className={cn(field("name").className, "h-12")} />
          {error("name")}
        </div>
        <div>
          {label("email", "Email")}
          <input {...field("email")} type="email" autoComplete="email" className={cn(field("email").className, "h-12")} />
          {error("email")}
        </div>
      </div>
      <div>
        {label("message", "Message")}
        <textarea {...field("message")} rows={6} className={cn(field("message").className, "resize-y py-3")} />
        {error("message")}
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="signal" size="cta" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <Arrow />
        </Button>
        <p role="status" aria-live="polite" className="text-small">
          {status === "sent" ? (
            <span className="text-success">Thanks, your message is on its way. I&apos;ll reply by email.</span>
          ) : status === "error" ? (
            <span className="text-danger">
              Sorry, the message couldn&apos;t be sent. Please email{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              .
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
