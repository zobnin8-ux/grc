import { site } from "@/lib/site";
import { Button } from "./ui/Button";

export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-steel/30 bg-bg-deep/95 p-3 backdrop-blur md:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center rounded border border-mist/30 py-2.5 text-sm font-semibold text-snow"
      >
        Call
      </a>
      <Button href="/contact" className="flex-1">
        Request
      </Button>
    </div>
  );
}
