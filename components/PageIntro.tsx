type Props = {
  label: string;
  title: string;
  description: string;
};

export function PageIntro({ label, title, description }: Props) {
  return (
    <div className="border-b border-steel/20 bg-bg-panel py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">{label}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-tight text-snow md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-mist">{description}</p>
      </div>
    </div>
  );
}
