import type { ReactNode } from "react";
import { Typography } from "@/components/NouiTypography";
import { useSidebarStatus } from "@/hooks/useSidebarStatus";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

export function SidebarFooter() {
  const status = useSidebarStatus();
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-2",
        "px-5 py-2.5",
        "border-t border-current/10",
      )}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <Typography
          mondwest
          className="font-mono-ui text-[0.7rem] tabular-nums tracking-[0.1em] text-muted-foreground/70 lowercase"
        >
          {status?.version != null ? `v${status.version}` : "-"}
        </Typography>

        <span
          className={cn(
            "font-mondwest text-[0.65rem] tracking-[0.15em] text-midground",
            "transition-opacity hover:opacity-90",
            "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/40",
          )}
          style={{ mixBlendMode: "plus-lighter" }}
        >
          {t.app.footer.org}
        </span>
      </div>

      <div
        className="flex w-full items-center justify-between gap-2"
        aria-label="Regional branding"
      >
        <BrandBadge label="United States">
          <UnitedStatesMark />
        </BrandBadge>
        <BrandBadge label="Texas">
          <TexasMark />
        </BrandBadge>
      </div>
    </div>
  );
}

function BrandBadge({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span
      aria-label={label}
      className={cn(
        "flex h-6 min-w-0 flex-1 items-center justify-center overflow-hidden",
        "border border-current/20 bg-midground/[0.03]",
        "text-midground shadow-[inset_0_0_0_1px_rgba(255,230,203,0.04)]",
      )}
      title={label}
    >
      {children}
    </span>
  );
}

function UnitedStatesMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      focusable="false"
      viewBox="0 0 96 40"
    >
      <rect width="96" height="40" fill="#f8f2e8" />
      {Array.from({ length: 7 }).map((_, index) => (
        <rect
          fill="#b81d2c"
          height="3.08"
          key={index}
          width="96"
          y={index * 6.16}
        />
      ))}
      <rect width="38" height="21.6" fill="#173c72" />
      <g fill="#f8f2e8">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <circle
              cx={4.5 + col * 6}
              cy={3.2 + row * 4}
              key={`${row}-${col}`}
              r="0.8"
            />
          )),
        )}
      </g>
      <text
        fill="#041c1c"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="1.4"
        x="58"
        y="24"
      >
        USA
      </text>
    </svg>
  );
}

function TexasMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      focusable="false"
      viewBox="0 0 96 40"
    >
      <rect width="96" height="20" fill="#f8f2e8" />
      <rect y="20" width="96" height="20" fill="#b81d2c" />
      <rect width="36" height="40" fill="#173c72" />
      <polygon
        fill="#f8f2e8"
        points="18 8 20.8 15.2 28.5 15.6 22.5 20.3 24.7 27.7 18 23.4 11.3 27.7 13.5 20.3 7.5 15.6 15.2 15.2"
      />
      <text
        fill="#041c1c"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="1.2"
        x="54"
        y="16"
      >
        TEXAS
      </text>
      <text
        fill="#f8f2e8"
        fontFamily="Arial, sans-serif"
        fontSize="7"
        fontWeight="800"
        letterSpacing="1"
        x="55"
        y="31"
      >
        LONE STAR
      </text>
    </svg>
  );
}
