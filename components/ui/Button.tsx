import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "emergency";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-accent-orange text-bg-deep hover:bg-accent-orange/90 border border-accent-orange",
  secondary:
    "bg-transparent text-snow border border-mist/30 hover:border-mist/60",
  emergency:
    "emergency-pulse bg-transparent text-accent-amber border border-accent-emergency/50 hover:bg-accent-emergency/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: Props) {
  const cls = `inline-flex items-center justify-center rounded px-5 py-2.5 text-sm font-semibold tracking-wide transition ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
