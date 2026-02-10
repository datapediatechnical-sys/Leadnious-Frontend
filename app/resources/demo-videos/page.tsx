"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import Link from "next/link";
import {
    Play,
    Search,
    Zap,
    Clock,
    Eye,
    Settings,
    Mail,
    Database,
    BarChart3,
    CheckCircle2
} from "lucide-react";

export default function DemoVideosPage() {
    const [activeCategory, setActiveCategory] = useState("All Videos");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All Videos", "Getting Started", "Features", "Advanced Workflows"];

    const videos = [
        {
            id: 1,
            title: "AI Lead Scoring Explained",
            desc: "Learn how our proprietary AI identifies your most likely customers.",
            views: "1.2k",
            duration: "04:12",
            category: "Features",
            thumbnailColor: "bg-amber-500/10",
            icon: <BarChart3 className="w-6 h-6 text-amber-500" />
        },
        {
            id: 2,
            title: "CRM Integration Walkthrough",
            desc: "Sync your data seamlessly with Salesforce, HubSpot, and Pipedrive.",
            views: "850",
            duration: "05:20",
            category: "Getting Started",
            thumbnailColor: "bg-blue-500/10",
            icon: <Database className="w-6 h-6 text-blue-500" />
        },
        {
            id: 3,
            title: "Setting Up Email Sequences",
            desc: "Create high-converting automated email series in minutes.",
            views: "2.4k",
            duration: "03:45",
            category: "Features",
            thumbnailColor: "bg-purple-500/10",
            icon: <Mail className="w-6 h-6 text-purple-500" />
        },
        {
            id: 4,
            title: "Custom Workflow Automations",
            desc: "Go beyond the basics with conditional logic and multi-channel steps.",
            views: "1.1k",
            duration: "06:15",
            category: "Advanced Workflows",
            thumbnailColor: "bg-emerald-500/10",
            icon: <Settings className="w-6 h-6 text-emerald-500" />
        },
        {
            id: 5,
            title: "Real-time Data Enrichment",
            desc: "How we keep your leads' contact info accurate and up-to-date.",
            views: "3.2k",
            duration: "02:30",
            category: "Features",
            thumbnailColor: "bg-cyan-500/10",
            icon: <Zap className="w-6 h-6 text-cyan-500" />
        },
        {
            id: 6,
            title: "Scale-Up Case Study",
            desc: "How Acme Corp increased their pipeline by 300% using LeadGenius.",
            views: "1.8k",
            duration: "08:45",
            category: "Getting Started",
            thumbnailColor: "bg-pink-500/10",
            icon: <BarChart3 className="w-6 h-6 text-pink-500" />
        }
    ];

    const filteredVideos = videos.filter(video =>
        (activeCategory === "All Videos" || video.category === activeCategory) &&
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
            <LandingNavbar />

            <div className="pt-24 pb-20 px-6">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Product Demo Videos
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Master our platform in minutes. Learn how LeadGenius helps automate your sales pipelines with our guided walkthroughs and advanced tutorials.
                        </p>
                    </div>

                    {/* Featured Video */}
                    <div className="relative w-full aspect-video max-h-[500px] bg-card rounded-2xl border border-border overflow-hidden shadow-2xl mb-16 group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        {/* Mock Video UI */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110">
                                <Play className="h-8 w-8 text-white fill-current ml-1" />
                            </div>
                        </div>

                        {/* Video Content */}
                        <div className="absolute inset-x-0 bottom-0 p-8 z-20 text-white">
                            <h2 className="text-2xl font-bold mb-2">LeadGenius Overview: Automate Your Outreach in 5 Minutes</h2>
                            <p className="text-white/80 max-w-xl mb-4">The complete guide to setting up your first automated lead generation campaign from scratch.</p>

                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-400" /> 12.5k views</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> 04:55</span>
                                <div className="h-1 w-1 rounded-full bg-white/40" />
                                <span>Updated 2 days ago</span>
                            </div>
                        </div>

                        {/* Mock Background (Placeholder for Thumbnail) */}
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <div className="w-[80%] h-[80%] bg-slate-800/50 rounded-lg flex flex-col p-4 opacity-50">
                                <div className="h-8 w-1/3 bg-slate-700/50 rounded mb-4" />
                                <div className="flex-1 flex gap-4">
                                    <div className="w-1/4 bg-slate-700/30 rounded" />
                                    <div className="flex-1 bg-slate-700/30 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-border/40 pb-4">
                        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                                placeholder="Search demos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <div key={video.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer">
                                {/* Thumbnail Mock */}
                                <div className={`aspect-video w-full ${video.thumbnailColor} relative flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="h-12 w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <Play className="h-5 w-5 text-blue-600 ml-1 fill-current" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                                        {video.duration}
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:scale-110 transition-transform duration-500">
                                        {video.icon}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-blue-500 transition-colors line-clamp-1">{video.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{video.desc}</p>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views}</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full bg-muted border border-border font-medium text-[10px] uppercase tracking-wide">
                                            {video.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredVideos.length === 0 && (
                        <div className="text-center py-20">
                            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">No videos found</h3>
                            <p className="text-muted-foreground">Try adjusting your search terms</p>
                        </div>
                    )}

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
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground">Contact</Link>
                    </div>

                    <div className="text-[10px] text-muted-foreground">
                        © 2026 LeadGenius Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
