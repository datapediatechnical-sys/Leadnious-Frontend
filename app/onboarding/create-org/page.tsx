"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";

type Stage = "early" | "scaling" | "established";

interface CreateOrgResponse {
    id: string;
    name: string;
    message?: string;
}

export default function CreateOrganizationPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [industry, setIndustry] = useState("");
    const [businessModel, setBusinessModel] = useState("");
    const [stage, setStage] = useState<Stage>("early");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Organization name is required");
            return;
        }

        setIsSubmitting(true);

        const { data, error } = await api.post<CreateOrgResponse>("/api/organizations", {
            name: name.trim(),
            domain: domain.trim() || undefined,
            industry: industry || undefined,
            business_model: businessModel || undefined,
        });

        if (error) {
            toast.error(error.detail || "Failed to create organization");
            setIsSubmitting(false);
            return;
        }

        if (data) {
            toast.success("Organization created successfully!");
            // Switch to the new organization
            const switchResult = await api.post<{ access_token: string }>(
                `/api/organizations/switch/${data.id}`
            );

            if (switchResult.data) {
                localStorage.setItem("access_token", switchResult.data.access_token);
                await refreshUser();
            }

            router.push("/dashboard");
        }

        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute top-36 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
                <div className="absolute bottom-[-180px] left-[-140px] h-[560px] w-[560px] rounded-full bg-blue-600/10 blur-[140px]" />
            </div>

            <div className="mx-auto max-w-4xl px-4 py-14">
                {/* Back button */}
                <button
                    onClick={() => router.push("/onboarding/organizations")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Organizations
                </button>

                {/* Header */}
                <header className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600">
                            <Building2 className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                        Create your organization
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Set up your workspace so we can tailor your lead scoring models.
                    </p>
                </header>

                {/* Step box */}
                <section className="mt-10 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-colors duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="grid h-7 w-7 place-items-center rounded-full bg-blue-600/20 text-xs font-semibold text-blue-500 ring-1 ring-blue-500/20">
                                1
                            </div>
                            <div className="text-sm font-semibold text-foreground">Business Details</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Step 1 of 1</div>
                    </div>

                    <div className="mt-4 h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 w-full rounded-full bg-blue-600" />
                    </div>
                </section>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <section className="mt-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-colors duration-300">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                                    Organization Name *
                                </label>
                                <input
                                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                                    placeholder="e.g. Acme Corp"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                                    Company Website
                                </label>
                                <input
                                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                                    placeholder="example.com"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                                    Primary Industry
                                </label>
                                <select
                                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select industry...</option>
                                    <option value="SaaS">SaaS</option>
                                    <option value="Agency">Agency</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="Services">Services</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                                    Business Model
                                </label>
                                <select
                                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                                    value={businessModel}
                                    onChange={(e) => setBusinessModel(e.target.value)}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select type...</option>
                                    <option value="B2B">B2B</option>
                                    <option value="B2C">B2C</option>
                                    <option value="B2B2C">B2B2C</option>
                                    <option value="Marketplace">Marketplace</option>
                                </select>
                            </div>
                        </div>

                        {/* Stage */}
                        <div className="mt-6">
                            <label className="mb-3 block text-xs font-medium text-muted-foreground">
                                Business Stage
                            </label>

                            <div className="grid gap-4 md:grid-cols-3">
                                <StageCard
                                    title="Early Stage"
                                    desc="Finding product-market fit. Less than 10 employees."
                                    active={stage === "early"}
                                    onClick={() => setStage("early")}
                                    disabled={isSubmitting}
                                />
                                <StageCard
                                    title="Scaling"
                                    desc="Growing revenue and team. 10-100 employees."
                                    active={stage === "scaling"}
                                    onClick={() => setStage("scaling")}
                                    disabled={isSubmitting}
                                />
                                <StageCard
                                    title="Established"
                                    desc="Stable market presence. 100+ employees."
                                    active={stage === "established"}
                                    onClick={() => setStage("established")}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Footer buttons */}
                        <div className="mt-6 border-t border-border pt-5">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => router.push("/onboarding/organizations")}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Organization →"
                                    )}
                                </button>
                            </div>
                        </div>
                    </section>
                </form>

                {/* Help footer */}
                <footer className="mt-6 text-center text-xs text-muted-foreground/80">
                    Need help setting up?{" "}
                    <a className="text-blue-500 hover:text-blue-400" href="#">
                        Read our documentation
                    </a>{" "}
                    or{" "}
                    <a className="text-blue-500 hover:text-blue-400" href="#">
                        contact support
                    </a>
                    .
                </footer>
            </div>
        </main>
    );
}

function StageCard({
    title,
    desc,
    active,
    onClick,
    disabled,
}: {
    title: string;
    desc: string;
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={[
                "relative w-full rounded-2xl border p-4 text-left transition-all duration-200",
                "bg-card/50 hover:bg-card hover:shadow-md",
                active ? "border-blue-500/60 ring-4 ring-blue-500/10 bg-card" : "border-border",
                disabled ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
        >
            <span
                className={[
                    "absolute right-4 top-4 h-4 w-4 rounded-full border transition-colors",
                    active ? "border-blue-400 bg-blue-500/30" : "border-border",
                ].join(" ")}
            />
            <div className="text-sm font-semibold text-foreground">{title}</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </button>
    );
}
