"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3>Message sent.</h3>
        <p className="mt-2">We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={() => setSubmitted(true)}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-text-muted mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="block text-sm text-text-muted mb-1"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm text-text-muted mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-bg-primary border border-border rounded px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-accent text-white px-6 py-3 rounded font-medium hover:bg-accent/90 transition-colors w-full"
      >
        Send Message
      </button>
    </form>
  );
}
