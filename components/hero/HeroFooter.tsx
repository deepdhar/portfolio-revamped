"use client";

import { useState } from "react";
import Link from "next/link";

export function HeroFooter() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText("dhar2017.slg@gmail.com").catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-16 flex items-end justify-between sm:mt-24">
      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Contact
        </div>
        <button
          onClick={handleCopy}
          data-cursor="link"
          className="font-body text-sm text-foreground transition-colors duration-300 hover:text-muted"
        >
          {copied ? "Email copied!" : "dhar2017.slg@gmail.com"}
        </button>
      </div>

      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Available
        </div>
        <span className="font-body text-sm text-foreground">Immediate</span>
      </div>

      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Side Hustles
        </div>
        <Link
          href="/side-hustles"
          data-cursor="link"
          className="font-body text-sm text-foreground transition-colors duration-300 hover:text-muted"
        >
          View Projects →
        </Link>
      </div>
    </div>
  );
}
