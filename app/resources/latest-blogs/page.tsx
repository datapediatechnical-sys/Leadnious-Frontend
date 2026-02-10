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
    Filter,
    ArrowRight,
    Mail,
    User,
    Calendar,
    Share2,
    MoreHorizontal
} from "lucide-react";

export default function LatestBlogsPage() {
    const [activeCategory, setActiveCategory] = useState("All Videos");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        "All Videos",
        "Sales Strategy",
        "Automation",
        "Cold Outreach",
        "Lead Generation",
        "CRM Tips",
        "Growth Hacks"
    ];

    const blogs = [
        {
            id: 1,
            title: "Scale Your Outreach Without Losing Personalization",
            author: "John Doe",
            time: "5 min",
            category: "Sales Strategy",
            thumbnailColor: "bg-emerald-900/20",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Automation Workflows for Sales Development",
            author: "Jane Smith",
            time: "8 min",
            category: "Automation",
            thumbnailColor: "bg-blue-900/20",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Top 10 B2B Growth Hacks for 2024",
            author: "Mike Ross",
            time: "4 min",
            category: "Growth Hacks",
            thumbnailColor: "bg-purple-900/20",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "CRM Optimization for Sales Pipelines",
            author: "Sarah Connor",
            time: "6 min",
            category: "CRM Tips",
            thumbnailColor: "bg-indigo-900/20",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Must-Have Prospecting Tools for 2024",
            author: "Harvey Specter",
            time: "7 min",
            category: "Lead Generation",
            thumbnailColor: "bg-amber-900/20",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Mastering the Sales Pipeline Tips",
            author: "Rachel Zane",
            time: "5 min",
            category: "Sales Strategy",
            thumbnailColor: "bg-cyan-900/20",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Understanding B2B Buyer Psychology",
            author: "Mike Ross",
            time: "12 min",
            category: "Growth Hacks",
            thumbnailColor: "bg-teal-900/20",
            image: "https://images.unsplash.com/photo-1553877616-1528073ee813?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Content Strategy for Lead Generation",
            author: "Jane Smith",
            time: "9 min",
            category: "Lead Generation",
            thumbnailColor: "bg-rose-900/20",
            image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 9,
            title: "Boosting Your Sales Conversion Rates",
            author: "John Doe",
            time: "11 min",
            category: "Sales Strategy",
            thumbnailColor: "bg-orange-900/20",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop"
        },
        {
            id: 10,
            title: "Effective Remote Sales Strategies",
            author: "Sarah Connor",
            time: "7 min",
            category: "Sales Strategy",
            thumbnailColor: "bg-slate-900/20",
            image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2940&auto=format&fit=crop"
        }
    ];

    const filteredBlogs = blogs.filter(blog =>
        (activeCategory === "All Videos" || blog.category === activeCategory) &&
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
            <LandingNavbar />

            <div className="pt-24 pb-20 px-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            LeadGenius
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Watch expert insights and strategies to scale your B2B sales pipeline through automation, data-driven prospecting, and modern outreach.
                        </p>
                    </div>

                    {/* Featured Section - Dark Card Style */}
                    <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-12">
                        <div className="flex flex-col lg:flex-row">
                            {/* Video/Image Area */}
                            <div className="lg:w-7/12 relative aspect-video lg:aspect-auto min-h-[400px] group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/30 transition-colors" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110 shadow-xl shadow-blue-500/20">
                                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                                    </div>

                                    {/* Tech Circle Decoration */}
                                    <div className="absolute h-[300px] w-[300px] rounded-full border border-blue-500/20 animate-spin-slow pointer-events-none" />
                                    <div className="absolute h-[240px] w-[240px] rounded-full border border-cyan-500/20 animate-spin-reverse-slow pointer-events-none" />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-center bg-slate-950">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider w-fit mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Featured Video
                                </span>

                                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    The Future of AI in Sales Prospecting
                                </h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    Discover how artificial intelligence is revolutionizing the way B2B teams find and qualify leads. Learn the 5 key shifts happening right now that successful teams are leveraging.
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                                        <div className="h-full w-full rounded-full overflow-hidden bg-slate-950">
                                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop" alt="Author" className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Al Expert</div>
                                        <div className="text-slate-500 text-xs">Host of SalesTalk • 20 min watch</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
                        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${activeCategory === cat
                                        ? "bg-blue-600 border-blue-600 text-white"
                                        : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-blue-500/50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search insights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-foreground"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {filteredBlogs.map((blog) => (
                            <div key={blog.id} className="group flex flex-col gap-3 cursor-pointer">
                                {/* Thumbnail */}
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/50">
                                    <div className={`absolute inset-0 ${blog.thumbnailColor} mix-blend-overlay`} />
                                    <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-bold text-foreground leading-snug group-hover:text-blue-500 transition-colors mb-1.5">
                                        {blog.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{blog.author}</span>
                                        <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
                                        <span>{blog.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter Box */}
                    <div className="rounded-3xl bg-slate-950 p-8 md:p-12 border border-slate-800 relative overflow-hidden text-center md:text-left">
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600/20 text-blue-500 mb-6">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-3">Get the latest B2B growth strategies in your inbox.</h2>
                                <p className="text-slate-400">Join over 15,000+ sales leaders who stay ahead with our weekly automation insights.</p>
                            </div>

                            <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your business email"
                                        className="bg-slate-900/50 border border-slate-700 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-80"
                                    />
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-500">No spam. Only high-value content. Unsubscribe anytime.</p>
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
