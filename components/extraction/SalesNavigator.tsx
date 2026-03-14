"use client";

import React from "react";
import { Compass, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SalesNavigator() {
    return (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center mb-6">
                <Compass className="h-10 w-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">Sales Navigator Integration</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Connect your Sales Navigator account to extract deep intelligence from your saved searches and lists.
            </p>

            <div className="grid gap-6 md:grid-cols-3 max-w-2xl mx-auto mb-10">
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                    <ShieldCheck className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-semibold">1-Click Sync</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                    <ShieldCheck className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-semibold">Deep Enrichment</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                    <ShieldCheck className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-semibold">CRM Auto-fill</div>
                </div>
            </div>

            <Button 
                onClick={() => window.open('https://www.linkedin.com/sales', '_blank')}
                className="bg-[#0077b5] hover:bg-[#006396] text-white px-8 h-12 rounded-xl shadow-lg shadow-[#0077b5]/20"
            >
                Open Sales Navigator
                <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="mt-6 text-xs text-muted-foreground">
                Requires Lead Genius Chrome Extension to be active.
            </p>
        </div>
    );
}
