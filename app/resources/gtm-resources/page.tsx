"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import Link from "next/link";
import {
    Search,
    Zap,
    Mail,
    FileText,
    Book,
    Presentation,
    Download,
    CheckCircle2,
    ChevronDown,
    FileCode,
    LayoutTemplate
} from "lucide-react";

export default function GTMResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("All Resources");

    const categories = [
        "All Resources",
        "Templates",
        "Guides",
        "E-books",
        "Playbooks"
    ];

    const resources = [
        {
            id: 1,
            title: "Outbound Sequence Template",
            type: "TEMPLATE",
            size: "DOCX • 2.5 MB",
            desc: "Master the art of cold outreach with these proven email & call scripts used by top-performing SDRs.",
            features: [
                "4 High-converting email flows",
                "A/B testing framework guide",
                "Call objection handling tips"
            ],
            icon: <FileText className="h-6 w-6 text-blue-600 dark:text-blue-500" />,
            iconBg: "bg-blue-100 dark:bg-blue-500/10",
            buttonColor: "bg-blue-600 hover:bg-blue-500"
        },
        {
            id: 2,
            title: "ICP Definition Playbook",
            type: "GUIDE",
            size: "PDF • 1.2 MB",
            desc: "Stop wasting time on bad leads. Learn how to identify and profile your highest-value customers.",
            features: [
                "5-step mapping template",
                "Interactive TAM calculator",
                "Lead scoring scoring rubric"
            ],
            icon: <LayoutTemplate className="h-6 w-6 text-purple-600 dark:text-purple-500" />,
            iconBg: "bg-purple-100 dark:bg-purple-500/10",
            buttonColor: "bg-blue-600 hover:bg-blue-500"
        },
        {
            id: 3,
            title: "Modern Sales Deck Strategy",
            type: "E-BOOK",
            size: "PDF • 15.5 MB",
            desc: "Build a pitch deck that doesn't put people to sleep. Data-backed slides that close deals.",
            features: [
                "10 Customizable slide layouts",
                "Visual storytelling blueprint",
                "Pre-meeting checklist"
            ],
            icon: <Presentation className="h-6 w-6 text-cyan-600 dark:text-cyan-500" />,
            iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
            buttonColor: "bg-blue-600 hover:bg-blue-500"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
            <LandingNavbar />

            <div className="pt-28 pb-20 px-6">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
                                Go-to-Market Resources
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                The ultimate collection of playbooks, templates, and guides to scale your outbound engine and optimize your sales cycle.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span>84 Resources available</span>
                        </div>
                    </div>

                    {/* Filter & Search */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${activeCategory === cat
                                            ? "bg-blue-600 text-white shadow-blue-500/25"
                                            : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-full bg-card border border-border rounded-full pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-foreground placeholder:text-muted-foreground shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {resources.map((resource) => (
                            <div key={resource.id} className="group bg-card rounded-3xl p-8 border border-border hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col dark:hover:shadow-blue-900/10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`h-12 w-12 rounded-2xl ${resource.iconBg} flex items-center justify-center border border-border/10`}>
                                        {resource.icon}
                                    </div>
                                    <div className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase bg-muted px-3 py-1 rounded-full border border-border">
                                        {resource.type}
                                    </div>
                                </div>

                                <div className="text-xs font-semibold text-muted-foreground mb-3">{resource.size}</div>

                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {resource.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                    {resource.desc}
                                </p>

                                <div className="mt-auto">
                                    <div className="space-y-3 mb-8">
                                        <div className="text-xs font-bold text-foreground/80 uppercase tracking-wide mb-4">What's Included</div>
                                        {resource.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                                <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-blue-600/30">
                                        <Download className="h-4 w-4" />
                                        Download Free
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center mb-24">
                        <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-6 py-3 rounded-full hover:bg-card border border-transparent hover:border-border hover:shadow-sm">
                            Load More Resources
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Newsletter Section */}
                    <div className="bg-slate-900 rounded-3xl p-8 md:p-14 border border-slate-800 relative overflow-hidden dark:bg-slate-950 dark:border-slate-800">
                        {/* Always dark themed for impact, but could be adjusted if strict proper light mode is needed. Keeping as 'feature' block style often works well. */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl mix-blend-screen -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h2 className="text-3xl font-bold text-white mb-4">Stay ahead of the curve</h2>
                                <p className="text-slate-400 text-lg">
                                    Join 50,000+ GTM leaders and get our latest resources delivered to your inbox every Tuesday.
                                </p>
                            </div>

                            <div className="w-full lg:w-auto flex flex-col md:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your work email"
                                    className="bg-white/10 border border-white/10 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 shadow-inner placeholder:text-white/40"
                                />
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors whitespace-nowrap shadow-lg shadow-blue-900/20">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 flex items-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                <span>No Spam</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                <span>Weekly Updates</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                                <span>Unsubscribe Anytime</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Footer (Reused) --- */}
            <footer className="border-t border-border bg-muted/20 py-10 mt-10">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
                            <Zap className="h-3 w-3 text-white" fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-foreground">LeadGenius</span>
                    </div>

                    <div className="flex gap-6 text-xs text-muted-foreground">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>

                    <div className="text-[10px] text-muted-foreground">
                        © 2026 LeadGenius Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
