"use client";

import { useState } from "react";


export default function SocialEngagementExtractionPage() {
  const [platform, setPlatform] = useState<"linkedin" | "twitter">("linkedin");
  const [audience, setAudience] = useState<"likers" | "commenters">("likers");

  const [findWorkEmails, setFindWorkEmails] = useState(true);
  const [verifyEmails, setVerifyEmails] = useState(true);
  const [findMobile, setFindMobile] = useState(false);

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground px-8 py-7 transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="text-xs text-muted-foreground">
        Home <span className="px-1">/</span> Lead Extraction{" "}
        <span className="px-1">/</span>{" "}
        <span className="text-blue-500">Social Engagement</span>
      </div>

      {/* Header */}
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Social Engagement Extraction
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Identify and extract high-intent leads from social media interactions. Target users
            engaging with specific content.
          </p>
        </div>

        {/* Platform tabs */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 transition-colors">
          <button
            type="button"
            onClick={() => setPlatform("linkedin")}
            className={[
              "h-9 rounded-lg px-4 text-sm font-semibold transition",
              platform === "linkedin"
                ? "bg-blue-600 text-white shadow-[0_12px_25px_rgba(37,99,255,0.25)]"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            LinkedIn
          </button>
          <button
            type="button"
            onClick={() => setPlatform("twitter")}
            className={[
              "h-9 rounded-lg px-4 text-sm font-semibold transition",
              platform === "twitter"
                ? "bg-blue-600 text-white shadow-[0_12px_25px_rgba(37,99,255,0.25)]"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            Twitter / X
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_380px]">
        {/* LEFT PANEL */}
        <div className="rounded-2xl border border-border bg-card/50 p-4 transition-colors">
          {/* Search bar */}
          <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-3 py-2 transition-colors">
            <span className="text-muted-foreground">
              <SearchIcon />
            </span>

            <input
              className="h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
              placeholder="Search for an influencer, company, or paste a post URL..."
            />

            <span className="text-muted-foreground">
              <FilterIcon />
            </span>
          </div>

          {/* Chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Industry: SaaS</Chip>
            <Chip>Location: North America</Chip>
            <Chip>Role: Founder/CEO</Chip>
            <Chip>Min. Followers: 10k+</Chip>
          </div>

          {/* Cards row (matches screenshot layout) */}
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {/* Selected influencer */}
            <InfluencerCardSelected />

            {/* Viral Post */}
            <InfluencerCardViral />

            {/* Empty column 느낌 (like list area / more cards) */}
            <div className="hidden lg:block rounded-2xl border border-border bg-card/50" />
          </div>

          {/* Bottom list preview (TechCrunch like screenshot) */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-4 transition-colors">
            <div className="h-10 w-10 rounded-full bg-secondary ring-1 ring-border" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground">
                TechCrunch{" "}
                <span className="ml-1 inline-block h-3 w-3 rounded-full bg-blue-600/25 ring-1 ring-blue-500/30" />
              </div>
              <div className="truncate text-xs text-muted-foreground">
                Technology News &amp; Analysis
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="rounded-2xl border border-border bg-card/50 transition-colors">
          {/* Header */}
          <div className="border-b border-border p-4 transition-colors">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">
                <GearSparkIcon />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Extraction Logic
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Configure criteria for lead extraction.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            {/* TARGET AUDIENCE */}
            <div className="text-[11px] font-semibold tracking-wider text-muted-foreground">
              TARGET AUDIENCE
            </div>

            <div className="mt-3 space-y-2">
              <AudienceRow
                label="Post Likers"
                active={audience === "likers"}
                onClick={() => setAudience("likers")}
                icon={<ThumbSmallIcon />}
              />
              <AudienceRow
                label="Post Commenters"
                active={audience === "commenters"}
                onClick={() => setAudience("commenters")}
                icon={<ChatSmallIcon />}
              />
            </div>

            {/* QUALIFYING CRITERIA */}
            <div className="mt-6 text-[11px] font-semibold tracking-wider text-muted-foreground">
              QUALIFYING CRITERIA
            </div>

            <div className="mt-3 space-y-3">
              <InputBlock
                label="Job Title Keywords"
                placeholder="Founder, CEO, VP, Director"
                helper="Separate with commas"
              />
              <InputBlock
                label="Excluded Industries"
                placeholder="Recruiting, Students..."
              />
            </div>

            {/* ENRICHMENT */}
            <div className="mt-6 text-[11px] font-semibold tracking-wider text-muted-foreground">
              ENRICHMENT
            </div>

            <div className="mt-3 space-y-3">
              <ToggleRow
                label="Find Work Emails"
                on={findWorkEmails}
                setOn={setFindWorkEmails}
              />
              <ToggleRow
                label="Verify Emails"
                on={verifyEmails}
                setOn={setVerifyEmails}
              />
              <ToggleRow
                label="Find Mobile Numbers"
                on={findMobile}
                setOn={setFindMobile}
              />
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-border pt-4 transition-colors">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  Est. Leads:{" "}
                  <span className="font-semibold text-foreground">~850</span>
                </div>
                <div>
                  Est. Cost:{" "}
                  <span className="font-semibold text-foreground">
                    85 credits
                  </span>
                </div>
              </div>

              <button className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 shadow-[0_18px_35px_rgba(37,99,255,0.25)]">
                <RocketIcon />
                Start Extraction
              </button>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground/60">
                By extracting, you agree to our{" "}
                <span className="text-blue-500 hover:underline">
                  Data Usage Policy
                </span>{" "}
                &amp; GDPR compliance terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Small UI ---------------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors">
      {children}
    </span>
  );
}

/* LEFT Cards exactly like screenshot */
function InfluencerCardSelected() {
  return (
    <div className="rounded-2xl border border-blue-500/50 bg-card p-4 ring-4 ring-blue-500/10 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-secondary ring-1 ring-border" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm font-semibold text-foreground">
                David Sacks
              </div>
              <span className="h-4 w-4 rounded-full bg-blue-600/25 ring-1 ring-blue-500/30" />
            </div>
            <div className="text-xs text-muted-foreground">
              General Partner at <span className="text-foreground/80">Craft Ventures</span>
            </div>
          </div>
        </div>

        <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-white">
          ✓
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <MiniStat label="FOLLOWERS" value="412K" />
        <MiniStat label="AVG. LIKES" value="1.2K" />
        <MiniStat label="AVG. COMMENTS" value="245" />
      </div>

      <div className="mt-5 text-[11px] font-semibold tracking-wider text-blue-400">
        TARGET POST SELECTED
      </div>

      <div className="mt-2 rounded-xl border border-input bg-background/50 p-3 transition-colors">
        <div className="text-xs text-foreground/80">
          Founders often mistake motion for progress. Just...
        </div>

        <div className="mt-3 h-24 rounded-lg bg-secondary/50" />

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>👍 3.4k</span>
            <span>💬 482</span>
          </div>
          <span>Posted 2 days ago</span>
        </div>
      </div>

      <div className="mt-4 text-center text-sm font-semibold text-blue-500">
        Change Post
      </div>
    </div>
  );
}

function InfluencerCardViral() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-secondary ring-1 ring-border" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm font-semibold text-foreground">
                Elena Verna
              </div>
              <span className="h-4 w-4 rounded-full bg-blue-600/25 ring-1 ring-blue-500/30" />
            </div>
            <div className="text-xs text-muted-foreground">
              Growth Advisor &amp; <span className="text-foreground/80">Solopreneur</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <MiniStat label="FOLLOWERS" value="128K" />
        <MiniStat label="AVG. LIKES" value="850" />
        <MiniStat label="AVG. COMMENTS" value="120" />
      </div>

      <div className="mt-5 text-[11px] font-semibold tracking-wider text-muted-foreground">
        LATEST VIRAL POST
      </div>

      <div className="mt-2 rounded-xl border border-input bg-background/50 p-3 transition-colors">
        <div className="text-xs text-foreground/80">
          PLG is dead. Long live PLG. The era of &apos;build it and the...
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>👍 1.8k</span>
            <span>💬 312</span>
          </div>
          <span>Posted 5 hours ago</span>
        </div>
      </div>

      <div className="mt-6 text-center text-sm font-semibold text-muted-foreground">
        Select for Extraction
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-2 transition-colors">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

/* Right panel rows */
function AudienceRow({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
        active
          ? "border-blue-500/50 bg-blue-600/15"
          : "border-border bg-card/50 hover:bg-accent",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600/15 text-blue-500 ring-1 ring-blue-500/15">
          {icon}
        </div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
      </div>

      <div
        className={[
          "grid h-5 w-5 place-items-center rounded-md border",
          active
            ? "border-blue-400 bg-blue-600 text-white"
            : "border-border text-transparent",
        ].join(" ")}
      >
        ✓
      </div>
    </button>
  );
}

function InputBlock({
  label,
  placeholder,
  helper,
}: {
  label: string;
  placeholder: string;
  helper?: string;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-muted-foreground">{label}</div>
      <input
        className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
        placeholder={placeholder}
      />
      {helper ? (
        <div className="mt-2 text-[11px] text-muted-foreground/60">{helper}</div>
      ) : null}
    </div>
  );
}

function ToggleRow({
  label,
  on,
  setOn,
}: {
  label: string;
  on: boolean;
  setOn: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">{label}</div>

      <button
        type="button"
        onClick={() => setOn(!on)}
        className={[
          "relative h-6 w-11 rounded-full border transition-colors",
          on
            ? "border-blue-500/30 bg-blue-600"
            : "border-input bg-secondary",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white transition-all",
            on ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

/* --- small icons --- */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearSparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 15a7.9 7.9 0 0 0 .1-1l2-1.2-2-3.4-2.3.7a8 8 0 0 0-1.7-1L15 6h-6l-.5 2.1a8 8 0 0 0-1.7 1L4.5 8.4l-2 3.4 2 1.2a7.9 7.9 0 0 0 .1 1 7.9 7.9 0 0 0-.1 1l-2 1.2 2 3.4 2.3-.7a8 8 0 0 0 1.7 1L9 22h6l.5-2.1a8 8 0 0 0 1.7-1l2.3.7 2-3.4-2-1.2a7.9 7.9 0 0 0-.1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThumbSmallIcon() {
  return <span className="text-sm">👍</span>;
}

function ChatSmallIcon() {
  return <span className="text-sm">💬</span>;
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 17c3-6 8-10 14-12-2 6-6 11-12 14l-2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 15l-2 5 5-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
