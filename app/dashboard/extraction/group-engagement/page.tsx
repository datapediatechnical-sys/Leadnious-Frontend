"use client";

import { useState } from "react";


export default function GroupsScraperPage() {
  const [excludeBots, setExcludeBots] = useState(true);
  const [autoEnrich, setAutoEnrich] = useState(false);

  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground transition-colors duration-300">
      {/* Top search bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-[560px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SearchIcon />
            </span>
            <input
              placeholder="Search groups, leads, or segments..."
              className="h-11 w-full rounded-xl border border-input bg-muted/30 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Notifications"
              title="Notifications"
            >
              <BellIcon />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Help"
              title="Help"
            >
              <HelpIcon />
            </button>

            <div className="h-9 w-px bg-border" />

            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-md">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground/70">
          Home /{" "}
          <span className="text-muted-foreground">Lead Extraction /{" "}</span>
          <span className="text-foreground">Groups Engagement</span>
        </div>

        {/* Title row */}
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Groups Engagement
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Status: Draft
              </span>
              <span>Last edited 2 hours ago</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
            >
              Discard
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <SaveIcon />
              Save Segment
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
          <div className="grid gap-4 lg:grid-cols-3 lg:items-center">
            <Step
              done
              number="1"
              title="Connect Source"
              align="left"
            />
            <Step
              active
              number="2"
              title="Parsing Logic"
              align="center"
            />
            <Step
              number="3"
              title="Qualification"
              align="right"
            />
          </div>
        </div>

        {/* Main content grid */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[360px_1fr]">
          {/* LEFT: Parsing rules */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="text-blue-500">
                <SlidersIcon />
              </span>
              Parsing Rules
            </div>

            {/* Community source */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-muted-foreground">
                Community Source
              </div>

              <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-background border border-border shadow-sm">
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      Slack
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">
                      SaaS Founders Club
                    </div>
                    <div className="text-xs text-muted-foreground">
                      #general • 14.5k messages
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Signal keywords */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-muted-foreground">
                Signal Keywords
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <Tag text="budget" />
                <Tag text="demo" />
                <Tag text="hiring" />
              </div>

              <button
                type="button"
                className="mt-3 text-xs text-muted-foreground hover:text-foreground transition"
              >
                Add keyword...
              </button>

              <div className="mt-2 text-[11px] text-muted-foreground/70">
                Triggers intent scoring when found in messages.
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-5 space-y-3">
              <ToggleRow
                label="Exclude Bots/Admins"
                on={excludeBots}
                setOn={setExcludeBots}
              />
              <ToggleRow
                label="Auto-Enrich Email"
                on={autoEnrich}
                setOn={setAutoEnrich}
              />
            </div>

            {/* Run button */}
            <button
              type="button"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 shadow-sm transition-colors"
            >
              <PlayIcon />
              Run Extraction
            </button>

            {/* Mini stats */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MiniStat title="MEMBERS" value="1,248" />
              <MiniStat title="SIGNALS" value="86" accent />
            </div>
          </div>

          {/* RIGHT: Extraction preview */}
          <div className="rounded-2xl border border-border bg-card shadow-sm transition-colors">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="text-sm font-semibold text-foreground">
                Extraction Preview
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 rounded-lg border border-border bg-muted/30 px-3 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
                >
                  Raw Log
                </button>
                <button
                  type="button"
                  className="h-8 rounded-lg border border-border bg-muted/50 px-3 text-xs font-semibold text-foreground/80"
                >
                  Parsed Data
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Table header */}
              <div className="grid grid-cols-[1.2fr_2.2fr_0.8fr_0.9fr_0.6fr] gap-3 border-b border-border pb-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                <div>PROFILE</div>
                <div>MESSAGE CONTEXT</div>
                <div>INTENT SCORE</div>
                <div>STATUS</div>
                <div className="text-right">ACTION</div>
              </div>

              {/* Rows */}
              <PreviewRow
                name="Sarah Miller"
                handle="@sarah_m_design"
                msg="Does anyone have recommendations for a..."
                time="Today at 10:42 AM"
                score={92}
                status="Email Found"
                statusDot="green"
              />
              <PreviewRow
                name="David Kim"
                handle="@dkim_dev"
                msg="Just launched our beta! Would love some..."
                time="Yesterday at 4:15 PM"
                score={65}
                status="Enriching..."
                statusDot="yellow"
              />
              <PreviewRow
                name="Elena Rossi"
                handle="@erossi_pm"
                msg="We are actively hiring for a Senior Backend..."
                time="Yesterday at 2:00 PM"
                score={88}
                status="Email Found"
                statusDot="green"
                highlightWord="hiring"
              />

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div>Showing 3 of 86 signals</div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted/30 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted/30 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer like screenshot */}
        <div className="h-6" />
      </div>
    </div>
  );
}

/* --------- Small UI Components ---------- */

function Step({
  number,
  title,
  done,
  active,
  align,
}: {
  number: string;
  title: string;
  done?: boolean;
  active?: boolean;
  align: "left" | "center" | "right";
}) {
  const alignCls =
    align === "left"
      ? "justify-start text-left"
      : align === "right"
        ? "justify-end text-right"
        : "justify-center text-center";

  return (
    <div className={["flex items-center gap-4", alignCls].join(" ")}>
      <div className="flex items-center gap-3">
        <div
          className={[
            "grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition-colors",
            done
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
              : active
                ? "border-blue-500/40 bg-blue-500/20 text-blue-500"
                : "border-border bg-muted/30 text-muted-foreground/50",
          ].join(" ")}
        >
          {done ? "✓" : number}
        </div>

        <div className={["text-sm font-semibold transition-colors", active || done ? "text-foreground" : "text-muted-foreground"].join(" ")}>{title}</div>
      </div>

      <div className="hidden lg:block h-px flex-1 bg-border" />
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
      {text}
      <span className="text-muted-foreground/50 hover:text-muted-foreground cursor-pointer">×</span>
    </span>
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
          "relative h-6 w-11 rounded-full border transition",
          on ? "border-blue-500/30 bg-blue-600" : "border-input bg-muted",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background transition shadow-sm",
            on ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function MiniStat({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4 transition-colors">
      <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </div>
      <div className={["mt-2 text-2xl font-semibold", accent ? "text-blue-500" : "text-foreground"].join(" ")}>
        {value}
      </div>
    </div>
  );
}

function PreviewRow({
  name,
  handle,
  msg,
  time,
  score,
  status,
  statusDot,
  highlightWord,
}: {
  name: string;
  handle: string;
  msg: string;
  time: string;
  score: number;
  status: string;
  statusDot: "green" | "yellow";
  highlightWord?: string;
}) {
  const scoreBadge =
    score >= 85
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      : "bg-amber-500/10 text-amber-500 border-amber-500/20";

  const dot =
    statusDot === "green"
      ? "bg-emerald-500"
      : "bg-amber-400";

  const msgRendered = highlightWord
    ? msg.replace(highlightWord, `**${highlightWord}**`)
    : msg;

  return (
    <div className="grid grid-cols-[1.2fr_2.2fr_0.8fr_0.9fr_0.6fr] gap-3 border-b border-border py-4 text-sm transition-colors hover:bg-muted/30">
      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-muted/50 border border-border shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground">
            {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </span>
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold text-foreground">{name}</div>
          <div className="truncate text-xs text-muted-foreground">{handle}</div>
        </div>
      </div>

      {/* Message context */}
      <div className="min-w-0">
        <div className="truncate text-muted-foreground">
          {highlightWord ? (
            <>
              {msg.split(highlightWord)[0]}
              <span className="rounded bg-blue-500/10 px-1 text-blue-500 font-medium">
                {highlightWord}
              </span>
              {msg.split(highlightWord)[1]}
            </>
          ) : (
            msgRendered
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground/60">{time}</div>
      </div>

      {/* Intent score */}
      <div className="flex items-start">
        <span
          className={[
            "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold",
            scoreBadge,
          ].join(" ")}
        >
          {score}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm text-foreground/80">
        <span className={["h-2 w-2 rounded-full", dot].join(" ")} />
        {status}
      </div>

      {/* Action */}
      <div className="text-right text-muted-foreground cursor-pointer hover:text-foreground">⋮</div>
    </div>
  );
}

/* -------- Icons (small, inline) -------- */

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

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M14 20a2 2 0 0 1-4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 18h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.7-1.2 1.1-1.2 2.2v.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h12l2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M7 4v6h10V4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 6v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M15 12v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M10 18v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 5l12 7-12 7V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
