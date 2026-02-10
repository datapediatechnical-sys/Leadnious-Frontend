"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Save, Rocket, UserPlus, Search, Lightbulb, ChevronLeft, List, RefreshCw, Linkedin } from "lucide-react";

export default function CampaignCreationPage() {
    const [view, setView] = useState<'source-select' | 'list-search'>('source-select');

    return (
        <div className="flex h-screen w-full flex-col bg-background text-muted-foreground transition-colors duration-300">
            {/* Top Bar */}
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-muted-foreground text-xs tracking-widest uppercase">
                        CAMPAIGN CREATION : <span className="text-blue-500">Invitation</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                    <Link href="/dashboard/campaigns/templates" className="flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition">
                        <X className="h-5 w-5" />
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Custom Sidebar */}
                <aside className="w-[300px] flex-shrink-0 border-r border-border bg-card p-5 transition-colors duration-300">
                    {/* Campaign Info */}
                    <div className="mb-8 rounded-xl border border-border bg-background p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500 text-white">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">Invitation #2</h3>
                                <span className="inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground border border-border">
                                    Draft
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                        <button className="flex w-full items-center gap-3 rounded-xl border border-blue-500/50 bg-blue-500/10 p-4 text-left transition">
                            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                <UserPlus className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-foreground text-sm">Add prospects</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-background p-10 relative transition-colors duration-300">
                    {/* View: Source Selection */}
                    {view === 'source-select' && (
                        <div className="mx-auto max-w-5xl pt-20">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <h1 className="text-2xl font-bold text-foreground">How do you want to add your prospects?</h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-4xl">
                                {/* From my lists */}
                                <button
                                    onClick={() => setView('list-search')}
                                    className="group flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1"
                                >
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <List className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">From my lists</span>
                                </button>

                                {/* From auto-import */}
                                <button className="group flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1">
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-purple-500/10 text-purple-500 ring-1 ring-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <RefreshCw className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">From auto-import</span>
                                </button>

                                {/* From LinkedIn */}
                                <button className="group flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1">
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-600/10 text-blue-600 ring-1 ring-blue-600/20 group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                                        <Linkedin className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">From LinkedIn</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* View: List Search */}
                    {view === 'list-search' && (
                        <div className="mx-auto max-w-3xl pt-20">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <h1 className="text-2xl font-bold text-foreground">Select a list of prospects to add</h1>
                            </div>

                            {/* Search Input */}
                            <div className="relative mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full h-14 rounded-xl border border-input bg-card px-6 text-foreground placeholder-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-accent p-2 text-muted-foreground">
                                        <Search className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setView('source-select')}
                                className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>
                        </div>
                    )}

                    {/* Tips Widget */}
                    <div className="absolute bottom-10 right-10 w-80 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-sm">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="rounded bg-amber-500 text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                TIPS
                            </span>
                            <button className="text-muted-foreground hover:text-foreground transition">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <h4 className="mb-1 text-sm font-bold text-foreground">Which prospects can enter my campaign?</h4>
                        <p className="text-xs text-muted-foreground">
                            You are using the sequence Invitation. Ensure your prospects have LinkedIn URLs.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
