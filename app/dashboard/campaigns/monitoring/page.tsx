"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
    Clock, 
    Play, 
    CheckCircle2, 
    AlertCircle, 
    Calendar, 
    Activity, 
    ChevronRight, 
    Search,
    RefreshCw,
    Filter,
    ArrowUpRight,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";
import { format } from "date-fns";

interface Campaign {
    id: string;
    name: string;
    status: string;
    type: string;
    leads_count: number;
    contacted_count: number;
    replied_count: number;
    scheduled_at: string | null;
    updated_at: string;
    created_at: string;
}

interface MonitoringData {
    pending: { count: number; items: Campaign[] };
    running: { count: number; items: Campaign[] };
    completed: { count: number; items: Campaign[] };
}

export default function MonitoringDashboard() {
    const [data, setData] = useState<MonitoringData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"all" | "pending" | "running" | "completed">("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const fetchMonitoringData = useCallback(async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const res = await api.get<MonitoringData>("/api/campaigns/monitoring-dashboard/");
            if (res.data) {
                setData(res.data);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error("Failed to fetch monitoring data", error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMonitoringData();
        
        // Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchMonitoringData(true);
        }, 30000);
        
        return () => clearInterval(interval);
    }, [fetchMonitoringData]);

    const filterItems = (items: Campaign[]) => {
        return items.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    if (isLoading && !data) {
        return (
            <div className="flex h-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                    <p className="text-sm font-medium text-muted-foreground">Loading pipeline status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden bg-background p-8 font-sans transition-colors duration-300">
            {/* Header Section */}
            <div className="mb-10 flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Campaign Pipeline</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Activity size={14} className="text-emerald-500" />
                        <span>Live monitoring of your outreach operations</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Last sync: {format(lastUpdated, "HH:mm:ss")}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input 
                            type="text" 
                            placeholder="Filter campaigns..." 
                            className="h-11 w-72 rounded-xl border border-border bg-card/50 pl-10 pr-4 text-sm outline-none ring-blue-500/20 transition focus:ring-4 focus:border-blue-500/40"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => fetchMonitoringData()}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground hover:bg-accent hover:text-foreground transition transform active:scale-95"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mb-10 grid grid-cols-3 gap-6">
                <StatusSummaryCard 
                    label="Pending" 
                    count={data?.pending.count || 0} 
                    icon={<Calendar className="text-amber-500" />} 
                    isActive={activeTab === 'pending'}
                    onClick={() => setActiveTab('pending')}
                    color="amber"
                />
                <StatusSummaryCard 
                    label="Running" 
                    count={data?.running.count || 0} 
                    icon={<Play className="text-emerald-500" />} 
                    isActive={activeTab === 'running'}
                    onClick={() => setActiveTab('running')}
                    color="emerald"
                />
                <StatusSummaryCard 
                    label="Completed" 
                    count={data?.completed.count || 0} 
                    icon={<CheckCircle2 className="text-blue-500" />} 
                    isActive={activeTab === 'completed'}
                    onClick={() => setActiveTab('completed')}
                    color="blue"
                />
            </div>

            {/* List Section */}
            <div className="flex-1 overflow-hidden flex flex-col glass-container">
                <div className="flex items-center gap-6 border-b border-border bg-card/30 px-6 py-4">
                    <TabButton active={activeTab === 'all'} label="All Campaigns" onClick={() => setActiveTab('all')} count={null} />
                    <TabButton active={activeTab === 'pending'} label="Scheduled" onClick={() => setActiveTab('pending')} count={data?.pending.count || 0} />
                    <TabButton active={activeTab === 'running'} label="Active" onClick={() => setActiveTab('running')} count={data?.running.count || 0} />
                    <TabButton active={activeTab === 'completed'} label="Archived" onClick={() => setActiveTab('completed')} count={data?.completed.count || 0} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    {(activeTab === 'all' || activeTab === 'pending') && data?.pending.items.length! > 0 && (
                        <CategorySection 
                            title="Scheduled for Later" 
                            items={filterItems(data!.pending.items)} 
                            status="pending"
                        />
                    )}

                    {(activeTab === 'all' || activeTab === 'running') && data?.running.items.length! > 0 && (
                        <CategorySection 
                            title="Currently Active" 
                            items={filterItems(data!.running.items)} 
                            status="running"
                        />
                    )}

                    {(activeTab === 'all' || activeTab === 'completed') && data?.completed.items.length! > 0 && (
                        <CategorySection 
                            title="Completed Tasks" 
                            items={filterItems(data!.completed.items)} 
                            status="completed"
                        />
                    )}

                    {(!data || (data.pending.count === 0 && data.running.count === 0 && data.completed.count === 0)) && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 rounded-full bg-muted/50 p-6">
                                <AlertCircle size={40} className="text-muted-foreground/30" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">No data found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Adjust your filters or sync your campaigns.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .glass-container {
                    background: rgba(var(--background-rgb, 255, 255, 255), 0.5);
                    backdrop-filter: blur(16px);
                    border: 1px border rgba(var(--border-rgb, 0, 0, 0), 0.1);
                    border-radius: 24px;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
                }
                .dark .glass-container {
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
}

function StatusSummaryCard({ label, count, icon, isActive, onClick, color }: any) {
    const colorMap: Record<string, string> = {
        amber: "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:border-amber-500/40",
        emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:border-emerald-500/40",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:border-blue-500/40"
    };

    return (
        <div 
            onClick={onClick}
            className={`cursor-pointer group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${isActive ? colorMap[color] + ' ring-2 ring-offset-2 ring-offset-background' : 'bg-card/50 border-border hover:border-muted-foreground/30'}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</p>
                    <h3 className="mt-1 text-4xl font-black text-foreground">{count}</h3>
                </div>
                <div className="rounded-xl bg-card p-3 shadow-sm border border-border group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                View Status <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Visual Sparkle */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-5 bg-${color}-500 blur-3xl transition-opacity group-hover:opacity-20`}></div>
        </div>
    );
}

function TabButton({ active, label, onClick, count }: any) {
    return (
        <button 
            onClick={onClick}
            className={`relative flex items-center gap-2 py-2 text-sm font-bold transition-all ${active ? 'text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}
        >
            {label}
            {count !== null && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? 'bg-blue-500/10 text-blue-500' : 'bg-muted text-muted-foreground'}`}>
                    {count}
                </span>
            )}
            {active && (
                <div className="absolute -bottom-[17px] left-0 h-1 w-full rounded-full bg-blue-500 shadow-[0_-4px_10px_rgba(59,130,246,0.5)]"></div>
            )}
        </button>
    );
}

function CategorySection({ title, items, status }: any) {
    if (items.length === 0) return null;

    return (
        <div className="mb-10 last:mb-0">
            <h4 className="mb-4 px-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">{title}</h4>
            <div className="space-y-3">
                {items.map((item: any) => (
                    <CampaignMonitorRow key={item.id} campaign={item} derivedStatus={status} />
                ))}
            </div>
        </div>
    );
}

function CampaignMonitorRow({ campaign, derivedStatus }: { campaign: Campaign, derivedStatus: string }) {
    const statusColors: any = {
        pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        running: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        completed: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    };

    const progress = campaign.leads_count > 0 ? (campaign.contacted_count / campaign.leads_count) * 100 : 0;

    return (
        <Link href={`/dashboard/campaigns/${campaign.id}`} className="block group">
            <div className="flex items-center gap-6 rounded-xl border border-border bg-card/10 p-4 transition-all hover:bg-card/40 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                {/* Visual Icon */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${statusColors[derivedStatus]}`}>
                    {derivedStatus === 'pending' && <Calendar size={20} />}
                    {derivedStatus === 'running' && <Activity size={20} className="animate-pulse" />}
                    {derivedStatus === 'completed' && <CheckCircle2 size={20} />}
                </div>

                {/* Info Container */}
                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h5 className="font-bold text-foreground group-hover:text-blue-500 transition-colors truncate">{campaign.name}</h5>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {campaign.type}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Activity: {format(new Date(campaign.updated_at), "MMM d, HH:mm")}
                        </span>
                        {campaign.scheduled_at && derivedStatus === 'pending' && (
                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                                <Calendar size={12} />
                                Starts {format(new Date(campaign.scheduled_at), "MMM d, HH:mm")}
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="hidden md:flex flex-col items-end gap-1.5 w-48 shrink-0">
                    <div className="flex w-full items-center justify-between text-[11px] font-bold">
                        <span className="text-foreground">{campaign.contacted_count.toLocaleString()} <span className="text-muted-foreground font-normal">sent</span></span>
                        <span className="text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary/50 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ${derivedStatus === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Link */}
                <div className="flex shrink-0 items-center justify-center w-10">
                    <ArrowUpRight size={18} className="text-muted-foreground/0 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}
