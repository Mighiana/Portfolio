export function ProofChain({ steps, note, label = "Technical evidence chain" }: { steps: string[]; note?: string; label?: string | null }) {
  return (
    <div>
      {label ? <p className="meta mb-3 text-ash">{label}</p> : null}
      <ol aria-label={label ?? "How it works"} className="flex flex-col gap-2 border-l border-graphite pl-4 sm:flex-row sm:flex-wrap sm:items-center sm:border-l-0 sm:pl-0">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-ash">→</span> : null}
            <span className="meta border border-graphite px-3 py-2 text-white">{step}</span>
          </li>
        ))}
      </ol>
      {note ? <p className="mt-3 text-sm leading-relaxed text-fog">{note}</p> : null}
    </div>
  );
}
