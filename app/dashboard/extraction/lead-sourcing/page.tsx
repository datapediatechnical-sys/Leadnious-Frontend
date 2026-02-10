"use client";



export default function LeadSourcingPage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background text-foreground px-6 py-6 transition-colors duration-300">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 shadow-sm transition-colors">
          <span className="text-muted-foreground">
            <SearchIcon />
          </span>
          <input
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            placeholder="Search leads, lists, or campaigns..."
          />
          <span className="text-muted-foreground text-xs">⌘K</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
            aria-label="Notifications"
            title="Notifications"
          >
            <BellIcon />
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
            aria-label="Help"
            title="Help"
          >
            <QuestionIcon />
          </button>

          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500 shadow-sm transition-colors">
            <span className="text-lg leading-none">+</span>
            New Project
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600/10 text-sm font-semibold text-blue-600 border border-blue-200 dark:border-blue-500/30">
            JD
          </div>
        </div>
      </div>
      <div className="px-3 py-3">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground/70">
          Home /{" "}
          <span className="text-xs text-muted-foreground">Lead Extraction /{" "}</span>
          <span className="text-xs text-foreground">Lead Sourcing</span>
        </div> </div>

      {/* Header */}
      <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Lead Sourcing
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Find, enrich, and score high-intent leads using multi-channel
            intelligence.
          </p>

          {/* Tabs */}
          <div className="mt-5 flex items-center gap-6 text-sm">
            <Tab active icon={<SearchSmallIcon />}>
              Standard Search
            </Tab>
            <Tab icon={<CompassIcon />}>Sales Navigator</Tab>
            <Tab icon={<FileSmallIcon />}>CSV Import</Tab>
          </div>

          <div className="mt-2 h-px bg-border" />
        </div>

        <div className="flex items-center gap-8">
          <Metric label="CREDITS LEFT" value="2,450" />
          <Metric
            label="LEADS FOUND"
            value="14.2k"
            valueClass="text-blue-500"
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* LEFT: Search Criteria */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="text-blue-500">
                <FilterIcon />
              </span>
              Search Criteria
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground hover:underline transition">
                Load Saved Search
              </button>
              <button className="hover:text-foreground hover:underline transition">
                Clear All
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {/* Keywords */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                Keywords / Boolean
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                <input
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                  placeholder={`e.g. ("SaaS" OR "Software") AND "Marketing" NOT "Intern"`}
                />
                <span className="text-muted-foreground">
                  <CodeIcon />
                </span>
              </div>
            </div>

            {/* Job Title + Location */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                  Job Title
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                  <span className="text-muted-foreground">
                    <BriefcaseIcon />
                  </span>
                  <input
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                    placeholder="e.g. Marketing Director"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                  Location
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                  <span className="text-muted-foreground">
                    <PinIcon />
                  </span>
                  <input
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                    placeholder="e.g. San Francisco, Remote"
                  />
                </div>
              </div>
            </div>

            {/* Industry + Company size */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                  Industry
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                  <span className="text-muted-foreground">
                    <GridSmallIcon />
                  </span>
                  <input
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                    placeholder="e.g. Computer Software"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                  Company Size
                </label>
                <div className="flex items-center justify-between rounded-xl border border-input bg-card/50 px-4 py-3 cursor-pointer">
                  <span className="text-sm text-muted-foreground/70">
                    Select size range
                  </span>
                  <span className="text-muted-foreground">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-2 flex flex-wrap items-center gap-6 border-t border-border pt-4">
              <Toggle label="Has Verified Email" defaultOn />
              <Toggle label="Changed Job Recently" />
            </div>

            {/* Bottom action row */}
            <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-amber-500">⚡</span>
                Estimated Reach:{" "}
                <span className="font-semibold text-foreground">
                  ~12,000+
                </span>{" "}
                candidates
              </div>

              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500 shadow-sm transition-colors">
                <SearchSmallIcon />
                Find Leads
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="space-y-4">
          {/* Quick CSV Import */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
            <div className="flex items-center justify-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-muted/50">
                <UploadIcon />
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-sm font-semibold text-foreground">
                Quick CSV Import
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Drag files here or click to browse
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground/60">
                SUPPORTS .CSV, .XLSX
              </div>
            </div>
          </div>

          {/* Saved lists */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                SAVED FROM SALES NAV
              </div>
              <button className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition">
                Sync Now
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <SavedCard
                title="Q3 SaaS Founders"
                meta="Created 2 days ago • 145 leads"
                tag="New"
              />
              <SavedCard
                title="NYC Marketing VP"
                meta="Synced 4 hours ago • 52 leads"
              />
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
            <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              RECENT ACTIVITY
            </div>

            <div className="mt-4 space-y-3">
              <ActivityRow
                title={`Search: "Head of Sales" in UK`}
                meta="2 mins ago • 340 results"
              />
              <ActivityRow
                title="Import: october_leads.csv"
                meta="1 hour ago • 1,200 rows"
                icon={<FileSmallIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small UI ---------- */

function Tab({
  active,
  icon,
  children,
}: {
  active?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={[
        "relative inline-flex items-center gap-2 pb-3 transition",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      <span className={active ? "text-foreground" : "text-muted-foreground/70"}>{icon}</span>
      <span className="font-medium">{children}</span>

      {active ? (
        <span className="absolute bottom-0 left-0 h-[2px] w-full rounded bg-blue-600" />
      ) : null}
    </button>
  );
}


function Metric({
  label,
  value,
  valueClass = "text-foreground",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="text-right">
      <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </div>
      <div className={["mt-1 text-lg font-semibold", valueClass].join(" ")}>
        {value}
      </div>
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={[
          "relative h-6 w-11 rounded-full border transition",
          defaultOn
            ? "border-blue-500/30 bg-blue-600"
            : "border-input bg-muted",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background transition shadow-sm",
            defaultOn ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function SavedCard({
  title,
  meta,
  tag,
}: {
  title: string;
  meta: string;
  tag?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              <BookmarkIcon />
            </span>
            <div className="truncate text-sm font-semibold text-foreground">
              {title}
            </div>
            {tag ? (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                {tag}
              </span>
            ) : null}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{meta}</div>
        </div>
      </div>

      <button className="mt-3 h-9 w-full rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground transition">
        Load Filter
      </button>
    </div>
  );
}


function ActivityRow({
  title,
  meta,
  icon,
}: {
  title: string;
  meta: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/20 p-4 transition-colors">
      <div className="mt-0.5 text-muted-foreground">{icon ?? <SearchSmallIcon />}</div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">
          {title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{meta}</div>
      </div>
    </div>
  );
}

/* ---------- icons ---------- */
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
function SearchSmallIcon() {
  return <SearchIcon />;
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
function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18 3 12l6-6M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 7h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
function GridSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7v7H4V4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M13 4h7v7h-7V4Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 13h7v7H4v-7Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M13 13h7v7h-7v-7Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16V4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7 9l5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3h12v18l-6-4-6 4V3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m14.5 9.5-2 5-5 2 2-5 5-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function FileSmallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.7" />
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
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19a2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
function QuestionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9.7 9a2.3 2.3 0 1 1 3.7 1.8c-.9.6-1.4 1.1-1.4 2.2v.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 17h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
