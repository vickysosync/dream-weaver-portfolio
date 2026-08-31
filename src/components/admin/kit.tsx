import type { ReactNode } from "react";
import { Close } from "../icons";
import { cn } from "../ui";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>{children}</div>
  );
}

export function StatCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-3xl text-gold">{value}</p>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-background/85 backdrop-blur"
      />
      <div
        className={cn(
          "relative w-full rounded-2xl border border-border bg-surface p-6 shadow-2xl",
          wide ? "max-w-3xl" : "max-w-xl",
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          >
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "New"
      ? "border-violet/50 text-violet"
      : status === "Contacted"
        ? "border-gold/50 text-gold"
        : "border-success/50 text-success";
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-widest",
        tone,
      )}
    >
      {status}
    </span>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="glass-card overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[46rem] text-left text-sm">{children}</table>
    </div>
  );
}

export const thClass =
  "border-b border-border px-5 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground";
export const tdClass = "border-b border-border/60 px-5 py-4 align-middle";
