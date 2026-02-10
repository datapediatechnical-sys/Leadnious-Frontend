"use client";

import { Bell, ChevronDown, AtSign, PenTool, MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";

export default function EmailSettingsPage() {
    const emails = [
        { provider: "Custom", email: "shubhangi@gohypemedia.com" },
        { provider: "Custom", email: "prajay@growhype.ai" },
        { provider: "Custom", email: "gourav@growhype.ai" },
        { provider: "Custom", email: "gourav@idgl.in" },
    ];

    return (
        <div className="flex h-full flex-col bg-background text-foreground transition-colors duration-300">
            {/* Top Header */}
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8 transition-colors duration-300">
                <div className="flex gap-4"></div>

                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
                        Start a campaign
                    </button>

                    <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5">
                        <span className="text-amber-400 text-sm font-medium">500 credits</span>
                    </div>

                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Bell size={20} />
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 ring-2 ring-background">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shubhangi" alt="Avatar" className="h-full w-full rounded-full" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">Shubhangi Gupta</span>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-background px-8 py-8 transition-colors duration-300">
                <h2 className="mb-8 text-2xl font-bold text-foreground">Manage my email accounts</h2>

                {/* Accounts Card */}
                <div className="mb-6 rounded-2xl border border-border bg-card p-8 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary border border-border text-foreground">
                            <AtSign size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">Accounts</h3>
                            <p className="text-sm text-muted-foreground">Add, edit, or delete your email accounts.</p>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="mb-2 grid grid-cols-12 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-3">Provider</div>
                        <div className="col-span-5">Email Address</div>
                        <div className="col-span-3">Sender Name</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Email List */}
                    <div className="space-y-2">
                        {emails.map((item, i) => (
                            <div key={i} className="grid grid-cols-12 items-center rounded-xl border border-border bg-background px-4 py-3 transition hover:border-input">
                                <div className="col-span-3 flex items-center gap-2">
                                    <div className="grid h-6 w-6 place-items-center rounded bg-indigo-500/20 text-indigo-400">
                                        <div className="h-2 w-2 rounded-sm bg-current"></div>
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{item.provider}</span>
                                </div>
                                <div className="col-span-5 text-sm text-muted-foreground/80">
                                    {item.email}
                                </div>
                                <div className="col-span-3 text-sm text-muted-foreground">
                                    -
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button className="text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
                        <Plus size={16} />
                        Add an email address
                    </button>
                </div>

                {/* Signatures Card */}
                <div className="rounded-2xl border border-border bg-card p-8 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary border border-border text-foreground">
                            <PenTool size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">Signatures</h3>
                            <p className="text-sm text-muted-foreground">Add your signature at the end of every email you send</p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Sidebar controls */}
                        <div className="lg:col-span-1">
                            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Default signature</label>
                            <div className="relative mb-6">
                                <select className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-blue-500/50 transition-colors">
                                    <option>No signature</option>
                                    <option>My Business Sig</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                            </div>

                            <div className="mb-2 block text-xs font-semibold text-muted-foreground">Your signatures</div>
                            <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
                                <Plus size={16} />
                                Add a signature
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center lg:col-span-2 transition-colors">
                            <h4 className="text-lg font-semibold text-foreground">Find your signatures here</h4>
                            <p className="mt-2 text-sm text-muted-foreground">Select a signature to edit or preview it</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
