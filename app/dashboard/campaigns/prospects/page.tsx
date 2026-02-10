"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Zap,
    Edit2,
    Users,
    BarChart2,
    List,
    Tag,
    Clock,
    Send,
    CheckCircle,
    XCircle,
    Search,
    Filter,
    Download,
    RotateCw,
    MoreHorizontal,
    Mail,
    MessageSquare,
    ThumbsUp,
    UserPlus,
    ChevronDown,
    Calendar,
    MousePointer2,
} from "lucide-react";

export default function ProspectsPage() {
    const [activeTab, setActiveTab] = useState("analytics"); // Default to analytics for review

    return (
        <div className="flex h-full flex-col overflow-hidden bg-background text-foreground transition-colors duration-300">
            {/* Top Navigation Bar / Header */}
            <header className="border-b border-border bg-card px-6 py-4 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/campaigns"
                            className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="rounded bg-blue-500/10 p-1.5 text-blue-400">
                                    <Zap className="h-4 w-4 fill-current" />
                                </div>
                                <h1 className="text-lg font-bold text-foreground">
                                    Invitation + 2 Messages #5
                                </h1>
                                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-500">
                                    Running
                                </span>
                            </div>
                            <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Campaign used: Invitation + 2 Messages</span>
                                <span className="text-emerald-500">
                                    • Response Rate: 34.2%
                                </span>
                                <div className="flex items-center gap-1.5 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-500">
                                    Active
                                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Progress Level */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Level 3
                            </span>
                            <div className="h-1.5 w-24 rounded-full bg-secondary">
                                <div className="h-full w-2/3 rounded-full bg-emerald-500"></div>
                            </div>
                        </div>

                        {/* Total Prospects */}
                        <div className="text-right">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Prospects
                            </div>
                            <div className="text-lg font-bold text-foreground">1,204</div>
                        </div>

                        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,99,255,0.3)] hover:bg-blue-500">
                            <Edit2 className="h-4 w-4" />
                            Edit
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 flex gap-6 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab("prospects")}
                        className={`flex items-center gap-2 border-b-2 pb-2 transition ${activeTab === "prospects"
                            ? "border-blue-500 text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Users className="h-4 w-4" />
                        Prospects
                    </button>
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`flex items-center gap-2 border-b-2 pb-2 transition ${activeTab === "analytics"
                            ? "border-blue-500 text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <BarChart2 className="h-4 w-4" />
                        Analytics
                    </button>
                </div>
            </header>

            {/* Main Layout Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar (Secondary) */}
                <aside className="flex w-64 flex-col overflow-y-auto border-r border-border bg-background transition-colors">
                    {/* Navigation */}
                    <div className="space-y-1 p-4">
                        <SidebarItem
                            icon={<List className="h-4 w-4" />}
                            label="Details"
                            active={activeTab !== "analytics"} // Just as a visual indicator
                        />
                        <SidebarItem
                            icon={<BarChart2 className="h-4 w-4" />}
                            label="Overview"
                        />
                        <SidebarItem icon={<List className="h-4 w-4" />} label="List" />
                        <SidebarItem icon={<Tag className="h-4 w-4" />} label="Tags" />
                    </div>

                    <div className="px-4 py-2">
                        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                            <div className="mb-2 flex items-start gap-2">
                                <div className="mt-0.5 rounded-full bg-blue-500 p-1 text-white">
                                    <span className="block h-1.5 w-1.5 rounded-full bg-white"></span>
                                </div>
                                <div className="text-xs font-medium leading-relaxed text-blue-500">
                                    Discover the meaning of each step in your campaign flow.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Widgets */}
                    <div className="space-y-4 p-4">
                        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Active Prospects
                        </div>

                        <WidgetCard
                            icon={<Clock className="h-4 w-4 text-rose-500" />}
                            iconBg="bg-rose-500/10"
                            value="94"
                            label="Waiting for a condition"
                        />

                        <WidgetCard
                            icon={<Send className="h-4 w-4 text-blue-500" />}
                            iconBg="bg-blue-500/10"
                            value="12"
                            label="In Queue - Ready to send"
                        />

                        <div className="mb-2 pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Exited Prospects
                        </div>

                        <WidgetCard
                            icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}
                            iconBg="bg-emerald-500/10"
                            value="993"
                            label="Completed the campaign"
                        />
                    </div>

                    <div className="mt-auto border-t border-border p-4">
                        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Campaign Stats
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3" /> Emails Sent
                                </div>
                                <span className="font-medium text-foreground">2,847</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-3 w-3" /> Messages Sent
                                </div>
                                <span className="font-medium text-foreground">1,423</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="h-3 w-3" /> Open Rate
                                </div>
                                <span className="font-medium text-emerald-500">68.4%</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content (Right) */}
                <main className="flex-1 overflow-y-auto bg-background p-8 transition-colors">
                    {activeTab === "prospects" ? <ProspectsView /> : <AnalyticsView />}
                </main>
            </div>

            {/* Help Bubble */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400">
                    <MessageSquare className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

/* --- Views --- */

function ProspectsView() {
    return (
        <>
            {/* Stats Row */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                <TopStatCard
                    label="Active"
                    value="94"
                    icon={<BarChart2 className="h-5 w-5 text-blue-500" />}
                    iconBg="bg-blue-500/10"
                />
                <TopStatCard
                    label="Completed"
                    value="993"
                    icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
                    iconBg="bg-emerald-500/10"
                />
                <TopStatCard
                    label="Avg. Time"
                    value="4.2d"
                    icon={<Clock className="h-5 w-5 text-purple-500" />}
                    iconBg="bg-purple-500/10"
                />
            </div>

            {/* Toolbar */}
            {/* Toolbar */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search a prospect..."
                            className="h-10 w-64 rounded-lg border border-input bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground transition">
                        <RotateCw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Prospects Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/30 px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors">
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/30"></div>
                    </div>
                    <div className="col-span-3">Name</div>
                    <div className="col-span-2">Current Step</div>
                    <div className="col-span-2">State</div>
                    <div className="col-span-2">List</div>
                    <div className="col-span-1">Tags</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-border bg-card">
                    <ProspectRow
                        initials="CW"
                        name="Cameron Williamson"
                        step="Invitation sent"
                        state="Ongoing"
                        stateColor="blue"
                        list="Go to Market Q3"
                        tag="Tech Lead"
                        color="bg-blue-600"
                    />
                    <ProspectRow
                        initials="EH"
                        name="Esther Howard"
                        step="Message sent #1"
                        state="Ongoing"
                        stateColor="blue"
                        list="Go to Market Q3"
                        tag="No tag"
                        tagDim={true}
                        color="bg-purple-600"
                    />
                    <ProspectRow
                        initials="JW"
                        name="Jenny Wilson"
                        step="Replied"
                        state="Finished"
                        stateColor="green"
                        list="SaaS Leads"
                        tag="Hot Lead"
                        tagColor="amber"
                        color="bg-indigo-600"
                    />
                    <ProspectRow
                        initials="GH"
                        name="Guy Hawkins"
                        step="Message sent #2"
                        state="Ongoing"
                        stateColor="blue"
                        list="Enterprise List"
                        tag="VP"
                        color="bg-teal-600"
                    />
                    <ProspectRow
                        initials="RF"
                        name="Robert Fox"
                        step="Email Opened"
                        state="Ongoing"
                        stateColor="blue"
                        list="New York Expo"
                        tag="No tag"
                        tagDim={true}
                        color="bg-rose-600"
                    />
                    <ProspectRow
                        initials="JJ"
                        name="Jacob Jones"
                        step="Connection Request"
                        state="Paused"
                        stateColor="red"
                        list="Go to Market Q3"
                        tag="Review"
                        color="bg-amber-600"
                    />
                    <ProspectRow
                        initials="KW"
                        name="Kristin Watson"
                        step="Follow-up"
                        state="Ongoing"
                        stateColor="blue"
                        list="LinkdIn Import"
                        tag="No tag"
                        tagDim={true}
                        color="bg-emerald-600"
                    />
                    <ProspectRow
                        initials="AM"
                        name="Annette Black"
                        step="Email Bounced"
                        state="Failed"
                        stateColor="failed"
                        list="Go to Market Q3"
                        tag="Bad Data"
                        tagColor="red"
                        color="bg-pink-600"
                    />
                </div>

                <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/10">
                    <div className="text-xs text-muted-foreground">
                        Showing <span className="font-bold text-foreground">1-8</span> of{" "}
                        <span className="font-bold text-foreground">1,204</span> results
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition">
                            Previous
                        </button>
                        <button className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white shadow-sm">
                            1
                        </button>
                        <button className="flex h-6 w-6 items-center justify-center rounded text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                            2
                        </button>
                        <button className="flex h-6 w-6 items-center justify-center rounded text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                            3
                        </button>
                        <span className="flex items-center justify-center text-xs text-muted-foreground">
                            ...
                        </span>
                        <button className="flex h-6 w-6 items-center justify-center rounded text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                            151
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function AnalyticsView() {
    return (
        <div className="space-y-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-3 gap-6">
                <StatCardDark
                    value="94"
                    label="Active"
                    icon={<Users className="text-blue-500" />}
                />
                <StatCardDark
                    value="993"
                    label="Completed"
                    icon={<CheckCircle className="text-emerald-500" />}
                />
                <StatCardDark
                    value="4.2d"
                    label="Avg. Time"
                    icon={<Clock className="text-purple-500" />}
                />
            </div>

            {/* Analytics Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Analytics</h2>
                <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition">
                    Last 30 days
                    <ChevronDown className="h-3 w-3" />
                </button>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <div className="flex items-center justify-center rounded bg-[#0077b5] p-1">
                    <span className="text-white fill-current">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </span>
                </div>
                LinkedIn
            </div>

            {/* Main Grid: Left Charts vs Right Funnel */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Column (Charts) - Span 7 */}
                <div className="col-span-7 space-y-6">
                    {/* 4 Block Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <AnalyticMetricCard
                            label="Invitations"
                            value="118"
                            icon={<UserPlus className="h-5 w-5 text-muted-foreground" />}
                        />
                        <AnalyticMetricCard
                            label="Messages"
                            value="235"
                            icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                            active
                        />
                        <AnalyticMetricCard
                            label="Accepted Invitations"
                            value="56"
                            icon={<MousePointer2 className="h-5 w-5 text-blue-500" />}
                            percent={47}
                            percentColor="text-blue-500"
                        />
                        <AnalyticMetricCard
                            label="Answered Messages"
                            value="42"
                            icon={<MessageSquare className="h-5 w-5 text-emerald-500" />}
                            percent={17.8}
                            percentColor="text-emerald-500"
                        />
                    </div>

                    {/* Messages Chart Area */}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold text-foreground">Messages</h3>
                            <div className="rounded bg-accent p-1">
                                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Simple Graphic Chart Representation */}
                        <div className="relative h-40 w-full">
                            {/* Y-Axis Labels */}
                            <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-[10px] text-muted-foreground/60">
                                <span>200</span>
                                <span>100</span>
                                <span>50</span>
                                <span>0</span>
                            </div>

                            {/* Chart Curve */}
                            <div className="absolute bottom-0 left-6 right-0 top-0">
                                {/* Grid Lines */}
                                <div className="absolute top-0 h-px w-full bg-border/40" />
                                <div className="absolute top-1/3 h-px w-full bg-border/40" />
                                <div className="absolute top-2/3 h-px w-full bg-border/40" />
                                <div className="absolute bottom-0 h-px w-full bg-border/40" />

                                {/* SVG Curve */}
                                <svg
                                    className="h-full w-full"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 100 50"
                                >
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,40 C10,38 20,42 30,30 C40,15 50,5 60,20 C70,35 80,30 90,25 L100,28 L100,50 L0,50 Z"
                                        fill="url(#blueGradient)"
                                    />
                                    <path
                                        d="M0,40 C10,38 20,42 30,30 C40,15 50,5 60,20 C70,35 80,30 90,25 L100,28"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* Tooltip Point */}
                                <div className="absolute left-[54%] top-[28%]">
                                    <div className="relative">
                                        <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] font-bold text-slate-900 shadow-xl">
                                            Oct 24<br /><span className="text-blue-600">32 Messages</span>
                                            <div className="absolute -bottom-1 left-1/2 ml-[-4px] h-2 w-2 rotate-45 bg-white"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Funnel) - Span 5 */}
                <div className="col-span-5">
                    <div className="rounded-2xl border border-border bg-card p-6 h-full transition-colors">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                                <span className="font-bold text-foreground text-sm">Conversion Funnel Visualization</span>
                            </div>
                            <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 uppercase tracking-wide transition">Flow View <MoreHorizontal className="h-3 w-3" /></button>
                        </div>

                        <div className="space-y-4">
                            <FunnelStep
                                label="Invitations Sent"
                                count="118"
                                icon={<UserPlus className="h-3.5 w-3.5 text-blue-500" />}
                                iconBg="bg-blue-500/10 border-blue-500/20"
                            />
                            <FunnelConnector />
                            <FunnelStep
                                label="Accepted Invitations"
                                count="56"
                                conversion="47.5%"
                                icon={<CheckCircle className="h-3.5 w-3.5 text-blue-500" />}
                                iconBg="bg-blue-500/10 border-blue-500/20"
                                isConverted
                            />
                            <FunnelConnector />
                            <FunnelStep
                                label="Messages Sent"
                                count="235"
                                icon={<MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />}
                                iconBg="bg-muted/30 border-border"
                            />
                            <FunnelConnector />
                            <FunnelStep
                                label="Answered Messages"
                                count="42"
                                conversion="17.8%"
                                icon={<MessageSquare className="h-3.5 w-3.5 text-emerald-500" />}
                                iconBg="bg-emerald-500/10 border-emerald-500/20"
                                isConverted
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* --- Sub Components --- */

function SidebarItem({
    icon,
    label,
    active,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${active
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function WidgetCard({ icon, iconBg, value, label }: any) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors">
            <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}
            >
                {icon}
            </div>
            <div>
                <div className="text-xl font-bold leading-none text-foreground">{value}</div>
                <div className="mt-1 text-[10px] font-medium text-muted-foreground">
                    {label}
                </div>
            </div>
            <div className="ml-auto">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    );
}

// Darker BG Stat Card for Top Row
function StatCardDark({ value, label, icon }: any) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-colors">
            <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div> {label}
                </div>
                <div className="text-3xl font-bold text-foreground mt-2">{value}</div>
            </div>
            <div className="rounded-full bg-accent p-2 border border-border">
                {icon}
            </div>
        </div>
    )
}

function TopStatCard({ label, value, icon, iconBg }: any) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors">
            <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {label}
                </div>
                <div className="text-2xl font-bold text-foreground">{value}</div>
            </div>
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
            >
                {icon}
            </div>
        </div>
    );
}

function AnalyticMetricCard({ label, value, icon, active, percent, percentColor }: any) {
    return (
        <div className={`relative p-5 rounded-2xl border ${active ? 'border-blue-500/50 bg-blue-500/5 shadow-sm' : 'border-border bg-card'} overflow-hidden transition-colors`}>
            <div className="flex items-start justify-between mb-4">
                <div>{icon}</div>
                <div className="text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                </div>
            </div>

            <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
            <div className="text-xs font-medium text-muted-foreground">{label}</div>

            {/* Circular Progress (Fake) */}
            {percent && (
                <div className="absolute right-4 bottom-4 h-10 w-10 flex items-center justify-center">
                    <svg className="h-full w-full -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                        <circle
                            cx="20" cy="20" r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray="100"
                            strokeDashoffset={100 - percent} // Rough approx
                            className={percentColor}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className={`absolute text-[8px] font-bold ${percentColor}`}>{percent}%</span>
                </div>
            )}
        </div>
    )
}

function FunnelStep({ label, count, icon, iconBg, conversion, isConverted }: any) {
    return (
        <div className="relative flex items-center justify-between rounded-xl bg-background border border-border p-3 z-10 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${iconBg}`}>
                    {icon}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
            </div>
            <div className="flex items-center gap-3">
                {conversion && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isConverted ? 'bg-blue-500/10 text-blue-500' : 'bg-muted/50 text-muted-foreground'}`}>
                        {conversion}
                    </span>
                )}
                <span className="text-sm font-bold text-foreground">{count}</span>
            </div>
        </div>
    )
}

function FunnelConnector() {
    return (
        <div className="flex justify-center -my-2 py-1">
            <ChevronDown className="h-3 w-3 text-muted-foreground/50" />
        </div>
    )
}

function ProspectRow({
    initials,
    name,
    step,
    state,
    stateColor,
    list,
    tag,
    tagDim,
    tagColor,
    color,
}: any) {
    let badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/20";
    let icon = (
        <div className="ml-1 h-0 w-0 border-[3px] border-y-transparent border-l-blue-400 border-r-transparent"></div>
    ); // Play icon ish

    if (state === "Finished") {
        badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        icon = <CheckCircle className="ml-1 h-3 w-3" />;
    } else if (state === "Paused") {
        badgeStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
        icon = (
            <div className="ml-1 flex gap-0.5">
                <div className="h-2 w-0.5 bg-current"></div>
                <div className="h-2 w-0.5 bg-current"></div>
            </div>
        );
    } else if (state === "Failed") {
        badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20";
        icon = <XCircle className="ml-1 h-3 w-3" />;
    }

    let tagStyle = "text-slate-500 italic";
    if (tagColor === "amber")
        tagStyle =
            "bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold not-italic";
    else if (tagColor === "red")
        tagStyle =
            "bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold not-italic";
    else if (!tagDim)
        tagStyle =
            "bg-slate-700/50 text-slate-300 border border-white/10 px-2 py-0.5 rounded text-[10px] font-bold not-italic";

    return (
        <div className="group grid cursor-pointer grid-cols-12 gap-4 px-6 py-4 items-center transition hover:bg-white/[0.02]">
            <div className="col-span-1 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border border-slate-700 group-hover:border-slate-500"></div>
            </div>
            <div className="col-span-3 flex items-center gap-3">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${color}`}
                >
                    {initials}
                </div>
                <div className="text-sm font-medium text-slate-200">{name}</div>
            </div>
            <div className="col-span-2 text-xs text-slate-400">{step}</div>
            <div className="col-span-2">
                <div
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeStyle}`}
                >
                    {icon}
                    {state}
                </div>
            </div>
            <div className="col-span-2 text-xs text-slate-400">{list}</div>
            <div className="col-span-1">
                <span className={tagStyle}>{tag}</span>
            </div>
            <div className="col-span-1 text-right opacity-0 transition group-hover:opacity-100">
                <button className="text-slate-500 hover:text-white">
                    <MoreHorizontal />
                </button>
            </div>
        </div>
    );
}
