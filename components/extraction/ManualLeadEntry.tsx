"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, Linkedin, Mail, Building2, Briefcase } from "lucide-react";

export default function ManualLeadEntry({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        title: "",
        linkedin_url: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name) {
            toast.error("Name is required");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/api/leads/", formData);
            if (res.error) {
                toast.error(res.error.detail || "Failed to create lead");
            } else {
                toast.success("Lead created successfully!");
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    title: "",
                    linkedin_url: "",
                    phone: ""
                });
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                    <UserPlus className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Manual Lead Entry</h2>
                    <p className="text-sm text-muted-foreground">Add a single prospect to your CRM database.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="John Doe" 
                                className="pl-9"
                                required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <UserPlus className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                        <div className="relative">
                            <Input 
                                id="linkedin_url" 
                                value={formData.linkedin_url} 
                                onChange={handleChange} 
                                placeholder="https://linkedin.com/in/username" 
                                className="pl-9"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <Linkedin className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Input 
                                id="email" 
                                type="email"
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="john@example.com" 
                                className="pl-9"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <Mail className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                            <Input 
                                id="company" 
                                value={formData.company} 
                                onChange={handleChange} 
                                placeholder="Acme Inc" 
                                className="pl-9"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <Building2 className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <div className="relative">
                            <Input 
                                id="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                placeholder="CEO" 
                                className="pl-9"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <Briefcase className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Input 
                                id="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                placeholder="+1 234 567 8900" 
                                className="pl-9"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                                <Loader2 className="h-4 w-4 hidden" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-500 text-white min-w-[140px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Create Lead"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
