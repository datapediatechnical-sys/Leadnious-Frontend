"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import Link from "next/link";
import {
    Search,
    Zap,
    ArrowRight,
    ChevronDown,
    Filter,
    BarChart3,
    TrendingUp,
    Users,
    Target,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

export default function CaseStudiesPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = {
        industry: ["All", "SaaS", "FinTech", "Healthcare", "E-commerce"],
        size: ["All", "Startups", "Mid-Market", "Enterprise"],
        useCase: ["All", "Outbound", "Inbound", "RevOps"]
    };

    const caseStudies = [
        {
            id: 1,
            company: "Snowflake",
            title: "How Snowflake Automated Data Enrichment",
            metrics: [
                { label: "ACCURACY", value: "98%", color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "LEADS/MO", value: "50k", color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "LIFT", value: "15%", color: "text-green-500", bg: "bg-green-500/10" }
            ],
            link: "#"
        },
        {
            id: 2,
            company: "Gong",
            title: "How Gong Increased Sales Velocity",
            metrics: [
                { label: "VELOCITY", value: "2.5x", color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "MATCH RATE", value: "86%", color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "PIPELINE", value: "12M", color: "text-purple-500", bg: "bg-purple-500/10" }
            ],
            link: "#"
        },
        {
            id: 3,
            company: "Adobe",
            title: "How Adobe Optimized Lead Scoring",
            metrics: [
                { label: "PRECISION", value: "80%", color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "CONVERSION", value: "24%", color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "EFF. LIFT", value: "5x", color: "text-cyan-500", bg: "bg-cyan-500/10" }
            ],
            link: "#"
        },
        {
            id: 4,
            company: "ZoomInfo",
            title: "How ZoomInfo Expanded Market Reach",
            metrics: [
                { label: "NEW MKTS", value: "12", color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "CONTACTS", value: "300k", color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "GROWTH", value: "45%", color: "text-green-500", bg: "bg-green-500/10" }
            ],
            link: "#"
        },
        {
            id: 5,
            company: "Dropbox",
            title: "How Dropbox Automated Prospecting",
            metrics: [
                { label: "AUTOMATION", value: "80%", color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "EFFICIENCY", value: "2.4x", color: "text-orange-500", bg: "bg-orange-500/10" },
                { label: "PROSPECTS", value: "10k", color: "text-cyan-500", bg: "bg-cyan-500/10" }
            ],
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
            <LandingNavbar />

            <div className="pt-28 pb-20 px-6">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">

                    {/* Sidebar / Header Area */}
                    <div className="lg:w-1/4 space-y-8">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground mb-4">Home &gt; Resources &gt; Case Studies</div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
                                Featured Stories Dashboard
                            </h1>
                            <p className="text-muted-foreground leading-relaxed">
                                Insights and success stories for sales leadership.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">Filters</h3>
                            {Object.entries(filters).map(([key, options]) => (
                                <div key={key} className="relative group">
                                    <select
                                        className="w-full appearance-none bg-card border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:border-blue-500/50 transition-colors cursor-pointer"
                                        defaultValue="All"
                                    >
                                        <option value="" disabled hidden className="capitalize">{key === 'useCase' ? 'Use Case' : key}</option>
                                        {options.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none group-hover:text-blue-500 transition-colors" />
                                </div>
                            ))}
                        </div>

                        <div className="text-xs font-medium text-muted-foreground pt-4">
                            Showing 12 case studies
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4">

                        {/* Featured Case Study */}
                        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-10 border border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-100 transition-opacity">
                                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Editor's Pick</span>
                            </div>

                            <div className="relative z-10 max-w-2xl">
                                <div className="inline-block px-3 py-1 rounded border border-slate-700 bg-slate-800 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-6">
                                    Segment
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    How Segment Scaled Outbound by 4x and Boosted ROI
                                </h2>
                                <p className="text-slate-400 mb-10 leading-relaxed">
                                    Segment, a leading customer data platform, leveraged LeadGenius to revolutionize their outbound sales strategy, achieving remarkable growth and efficiency. This case study highlights their journey to significant pipeline expansion.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                                    <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/20">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">400%</div>
                                        <div className="text-[10px] uppercase font-bold text-blue-200/50">Increase in Outbound</div>
                                    </div>
                                    <div className="bg-orange-900/20 rounded-xl p-4 border border-orange-500/20">
                                        <div className="text-3xl font-bold text-orange-400 mb-1">12h</div>
                                        <div className="text-[10px] uppercase font-bold text-orange-200/50">Saved Per Week</div>
                                    </div>
                                    <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/20">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">3.2x</div>
                                        <div className="text-[10px] uppercase font-bold text-purple-200/50">ROI Achieved</div>
                                    </div>
                                </div>

                                <Link href="#" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-300">
                                    Read Full Case Study <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {caseStudies.map((study) => (
                                <div key={study.id} className="group bg-card rounded-2xl p-8 border border-border hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/5 flex flex-col h-full">
                                    <div className="mb-6">
                                        <div className="inline-block px-3 py-1 rounded border border-border bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                                            {study.company}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug min-h-[3.5rem]">
                                            {study.title}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-8 mt-auto">
                                        {study.metrics.map((metric, i) => (
                                            <div key={i} className={`rounded-lg p-3 ${metric.bg} border border-transparent`}>
                                                <div className={`text-lg font-bold ${metric.color} mb-1`}>{metric.value}</div>
                                                <div className="text-[8px] uppercase font-bold text-muted-foreground/80 truncate" title={metric.label}>{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={study.link} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto">
                                        Read Case Study <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mb-20">
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors disabled:opacity-50">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25">1</button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors text-xs font-medium">2</button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors text-xs font-medium">3</button>
                            <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-slate-950 rounded-3xl p-10 md:p-16 text-center border border-slate-900 shadow-2xl relative overflow-hidden mx-auto max-w-6xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to write your success story?</h2>
                        <p className="text-slate-400 mb-10 text-lg">
                            Join thousands of teams using LeadGenius to automate their data enrichment and scale outbound pipeline.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 w-full sm:w-auto">
                                Schedule a Demo
                            </button>
                            <button className="px-8 py-3.5 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700 w-full sm:w-auto">
                                View Pricing
                            </button>
                        </div>
                        <div className="mt-8 text-[10px] text-slate-600 flex items-center justify-center gap-6">
                            <span>© 2026 LeadGenius</span>
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                            <span>Cookies</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- Footer (Reused) --- */}
            <footer className="border-t border-border bg-muted/20 py-10 mt-20">
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
