"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
    Search, 
    Filter, 
    Code, 
    Briefcase, 
    MapPin, 
    LayoutGrid, 
    ChevronDown, 
    Zap,
    Loader2
} from "lucide-react";

export default function StandardSearch() {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = () => {
        setIsLoading(true);
        // Simulate search for now as backend endpoint might not be ready for boolean search
        setTimeout(() => {
            setIsLoading(false);
            toast.info("Search initiated. Results will be synced via the extension.");
        }, 1500);
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="text-blue-500">
                        <Filter className="h-4 w-4" />
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
                        <Input
                            className="w-full bg-transparent border-none text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0 px-0"
                            placeholder={`e.g. ("SaaS" OR "Software") AND "Marketing" NOT "Intern"`}
                        />
                        <span className="text-muted-foreground">
                            <Code className="h-4 w-4" />
                        </span>
                    </div>
                </div>

                {/* Job Title + Location */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-muted-foreground">
                            Job Title
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <Input
                                className="w-full bg-transparent border-none text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0 px-0"
                                placeholder="e.g. Marketing Director"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-muted-foreground">
                            Location
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <Input
                                className="w-full bg-transparent border-none text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0 px-0"
                                placeholder="e.g. San Francisco, Remote"
                            />
                        </div>
                    </div>
                </div>

                {/* Industry + Company size */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-muted-foreground">
                            Industry
                        </label>
                        <div className="flex items-center gap-3 rounded-xl border border-input bg-card/50 px-4 py-3 transition focus-within:ring-1 focus-within:ring-blue-500/50">
                            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                            <Input
                                className="w-full bg-transparent border-none text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0 px-0"
                                placeholder="e.g. Computer Software"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-muted-foreground">
                            Company Size
                        </label>
                        <div className="flex items-center justify-between rounded-xl border border-input bg-card/50 px-4 py-3 cursor-pointer">
                            <span className="text-sm text-muted-foreground/70">
                                Select size range
                            </span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <div className="mt-2 flex flex-wrap items-center gap-6 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                        <button className="relative h-6 w-11 rounded-full bg-blue-600 border border-blue-500/30 transition">
                            <span className="absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2 rounded-full bg-background shadow-sm" />
                        </button>
                        <span className="text-xs text-muted-foreground">Has Verified Email</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative h-6 w-11 rounded-full bg-muted border border-input transition">
                            <span className="absolute top-1/2 left-1 h-4 w-4 -translate-y-1/2 rounded-full bg-background shadow-sm" />
                        </button>
                        <span className="text-xs text-muted-foreground">Changed Job Recently</span>
                    </div>
                </div>

                {/* Bottom action row */}
                <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Zap className="h-3 w-3 text-amber-500" />
                        Estimated Reach:{" "}
                        <span className="font-semibold text-foreground">
                            ~12,000+
                        </span>{" "}
                        candidates
                    </div>

                    <Button 
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4 mr-2" />
                        )}
                        Find Leads
                    </Button>
                </div>
            </div>
        </div>
    );
}
