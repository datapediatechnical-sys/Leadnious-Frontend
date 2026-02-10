"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Building2, Plus, ChevronRight, Users, Loader2 } from "lucide-react";

interface Organization {
    id: string;
    name: string;
    domain?: string;
    industry?: string;
    role: string;
    is_active: boolean;
}

interface OrganizationsResponse {
    organizations: Organization[];
    count: number;
    current_org_id: string | null;
}

export default function OrganizationsPage() {
    const router = useRouter();
    const { user, isLoading: authLoading, refreshUser } = useAuth();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSwitching, setIsSwitching] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
            return;
        }

        if (user) {
            fetchOrganizations();
        }
    }, [user, authLoading, router]);

    const fetchOrganizations = async () => {
        setIsLoading(true);
        const { data, error } = await api.get<OrganizationsResponse>("/api/organizations");

        if (error) {
            toast.error(error.detail || "Failed to load organizations");
        } else if (data) {
            setOrganizations(data.organizations);
            setCurrentOrgId(data.current_org_id);
        }
        setIsLoading(false);
    };

    const handleSwitchOrg = async (orgId: string) => {
        if (orgId === currentOrgId) {
            router.push("/dashboard");
            return;
        }

        setIsSwitching(orgId);
        const { data, error } = await api.post<{ access_token: string; message: string }>(
            `/api/organizations/switch/${orgId}`
        );

        if (error) {
            toast.error(error.detail || "Failed to switch organization");
            setIsSwitching(null);
            return;
        }

        if (data) {
            // Update tokens
            localStorage.setItem("access_token", data.access_token);
            toast.success(data.message || "Switched organization");
            await refreshUser();
            router.push("/dashboard");
        }
        setIsSwitching(null);
    };

    if (authLoading || isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-sm text-muted-foreground">Loading organizations...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute top-36 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-2xl px-4 py-14">
                {/* Header */}
                <header className="text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/50">
                            <div className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600">
                                <span className="text-sm font-bold text-white">LG</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                        Select Organization
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Choose an organization to continue or create a new one.
                    </p>
                </header>

                {/* Organizations list */}
                <section className="mt-8 space-y-3">
                    {organizations.map((org) => (
                        <button
                            key={org.id}
                            onClick={() => handleSwitchOrg(org.id)}
                            disabled={isSwitching !== null}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${org.id === currentOrgId
                                    ? "border-blue-500/60 bg-blue-500/5 ring-2 ring-blue-500/20"
                                    : "border-border bg-card hover:border-blue-500/30 hover:bg-accent"
                                } ${isSwitching !== null ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${org.id === currentOrgId ? "bg-blue-600" : "bg-secondary"
                                }`}>
                                {isSwitching === org.id ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <Building2 className={`h-5 w-5 ${org.id === currentOrgId ? "text-white" : "text-muted-foreground"
                                        }`} />
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-foreground">{org.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="capitalize">{org.role}</span>
                                    {org.industry && (
                                        <>
                                            <span>•</span>
                                            <span>{org.industry}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            {org.id === currentOrgId && (
                                <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                                    Current
                                </span>
                            )}
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                    ))}

                    {organizations.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-border rounded-xl">
                            <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">No organizations found</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">
                                Create your first organization to get started
                            </p>
                        </div>
                    )}
                </section>

                {/* Create new org button */}
                <section className="mt-6">
                    <button
                        onClick={() => router.push("/onboarding/create-org")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-dashed border-border bg-card/50 hover:border-blue-500/30 hover:bg-accent transition-all"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                            <Plus className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-foreground">Create New Organization</div>
                            <div className="text-xs text-muted-foreground">
                                Set up a new workspace for your team
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                </section>

                {/* Help footer */}
                <footer className="mt-8 text-center text-xs text-muted-foreground/80">
                    <p>
                        Invited to an organization?{" "}
                        <a className="text-blue-500 hover:text-blue-400" href="#">
                            Check your email
                        </a>
                    </p>
                </footer>
            </div>
        </main>
    );
}
