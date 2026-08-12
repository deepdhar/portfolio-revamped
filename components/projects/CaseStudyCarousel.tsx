"use client";

export function CaseStudyCarousel({ slug }: { slug: string }) {
  const panels = [1, 2, 3];

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden bg-border sm:grid-cols-3">
      {panels.map((panel) => (
        <div
          key={panel}
          className="flex h-[420px] flex-col items-center justify-center gap-2 bg-surface"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Preview {panel}
          </span>
          <span className="max-w-[220px] text-center font-mono text-[9px] uppercase tracking-wider text-muted/60">
            Add photo — public/media/work/{slug}/preview-{panel}.jpg
          </span>
        </div>
      ))}
    </div>
  );
}
