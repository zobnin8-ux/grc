type Props = {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  label,
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {label && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            {label}
          </p>
        )}
        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-snow md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-mist">{description}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
