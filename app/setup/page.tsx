"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Check, Building2, Users, MessageSquare, Sparkles } from "lucide-react";

type Stage = "early" | "scaling" | "established";

interface CreateOrgResponse {
  id: string;
  name: string;
  message?: string;
}

const STEPS = [
  { id: 1, title: "Business Basics", icon: Building2 },
  { id: 2, title: "Target Audience & ICP", icon: Users },
  { id: 3, title: "Outreach Preferences", icon: MessageSquare },
  { id: 4, title: "Review & Complete", icon: Sparkles },
];

export default function SetupPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, refreshUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Business Basics
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [stage, setStage] = useState<Stage>("early");

  // Step 2: Target Audience & ICP
  const [targetTitles, setTargetTitles] = useState("");
  const [targetIndustries, setTargetIndustries] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [targetLocations, setTargetLocations] = useState("");

  // Step 3: Outreach Preferences
  const [preferredChannel, setPreferredChannel] = useState("linkedin");
  const [outreachTone, setOutreachTone] = useState("professional");
  const [dailyLimit, setDailyLimit] = useState("50");

  // Check authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleNext = () => {
    if (currentStep === 1 && !businessName.trim()) {
      toast.error("Please enter your business name");
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!businessName.trim()) {
      toast.error("Business name is required");
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    // Create organization via backend API
    const { data, error } = await api.post<CreateOrgResponse>("/api/organizations", {
      name: businessName.trim(),
      domain: website.trim() || undefined,
      industry: industry || undefined,
      business_model: businessModel || undefined,
    });

    if (error) {
      toast.error(error.detail || "Failed to create organization. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (data) {
      // Switch to the new organization to get updated token
      const switchResult = await api.post<{ access_token: string }>(
        `/api/organizations/switch/${data.id}`
      );

      if (switchResult.data) {
        localStorage.setItem("access_token", switchResult.data.access_token);
        await refreshUser();
      }

      toast.success("✨ Organization created successfully! Welcome to Lead Genius.");
      router.push("/dashboard");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const progressPercent = (currentStep / 4) * 100;

  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-36 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-[-140px] h-[560px] w-[560px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            Let&apos;s set up your workspace
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {currentStep === 1 && "Tell us about your company so we can tailor your lead scoring models."}
            {currentStep === 2 && "Define your ideal customer profile to improve lead matching."}
            {currentStep === 3 && "Configure how you'd like to reach out to leads."}
            {currentStep === 4 && "Review your settings and complete the setup."}
          </p>
        </header>

        {/* Step Progress */}
        <section className="mt-10 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-blue-600/20 text-xs font-semibold text-blue-500 ring-1 ring-blue-500/20">
                {currentStep}
              </div>
              <div className="text-sm font-semibold text-foreground">{STEPS[currentStep - 1].title}</div>
            </div>
            <div className="text-xs text-muted-foreground">Step {currentStep} of 4</div>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {currentStep < 4 && (
            <div className="mt-3 text-xs text-muted-foreground">
              Next: {STEPS[currentStep].title}
            </div>
          )}

          {/* Step indicators */}
          <div className="mt-4 flex justify-between">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center gap-1">
                  <div
                    className={`grid h-8 w-8 place-items-center rounded-full transition-all ${isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-600 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <span className={`text-[10px] ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step Content */}
        <section className="mt-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-colors duration-300">

          {/* Step 1: Business Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Business Name *
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    placeholder="e.g. Acme Corp"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Company Website
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    placeholder="example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
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
                  >
                    <option value="">Select type...</option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="B2B2C">B2B2C</option>
                    <option value="Marketplace">Marketplace</option>
                  </select>
                </div>
              </div>

              {/* Stage Selection */}
              <div>
                <label className="mb-3 block text-xs font-medium text-muted-foreground">
                  Business Stage
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { id: "early", title: "Early Stage", desc: "Finding product-market fit. Less than 10 employees." },
                    { id: "scaling", title: "Scaling", desc: "Growing revenue and team. 10-100 employees." },
                    { id: "established", title: "Established", desc: "Stable market presence. 100+ employees." },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setStage(option.id as Stage)}
                      className={`relative w-full rounded-2xl border p-4 text-left transition-all duration-200 bg-card/50 hover:bg-card hover:shadow-md ${stage === option.id ? "border-blue-500/60 ring-4 ring-blue-500/10 bg-card" : "border-border"
                        }`}
                    >
                      <span className={`absolute right-4 top-4 h-4 w-4 rounded-full border transition-colors ${stage === option.id ? "border-blue-400 bg-blue-500/30" : "border-border"
                        }`} />
                      <div className="text-sm font-semibold text-foreground">{option.title}</div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Target Audience & ICP */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Target Job Titles
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    placeholder="e.g. CEO, CTO, VP of Engineering"
                    value={targetTitles}
                    onChange={(e) => setTargetTitles(e.target.value)}
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">Separate multiple titles with commas</p>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Target Industries
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    placeholder="e.g. Technology, SaaS, Finance"
                    value={targetIndustries}
                    onChange={(e) => setTargetIndustries(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Company Size
                  </label>
                  <select
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Target Locations
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    placeholder="e.g. United States, United Kingdom"
                    value={targetLocations}
                    onChange={(e) => setTargetLocations(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 These settings help our AI score leads more accurately. You can update them anytime.
              </p>
            </div>
          )}

          {/* Step 3: Outreach Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Preferred Outreach Channel
                  </label>
                  <select
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    value={preferredChannel}
                    onChange={(e) => setPreferredChannel(e.target.value)}
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="email">Email</option>
                    <option value="both">Both LinkedIn & Email</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Message Tone
                  </label>
                  <select
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    value={outreachTone}
                    onChange={(e) => setOutreachTone(e.target.value)}
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Daily Outreach Limit
                  </label>
                  <select
                    className="h-11 w-full rounded-xl border border-input bg-background/50 px-4 text-sm text-foreground outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-colors"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                  >
                    <option value="25">25 per day (Conservative)</option>
                    <option value="50">50 per day (Moderate)</option>
                    <option value="100">100 per day (Aggressive)</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                ⚠️ LinkedIn has daily limits. We recommend starting with moderate settings.
              </p>
            </div>
          )}

          {/* Step 4: Review & Complete */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review Your Setup</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">Business</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {businessName || "Not set"}</p>
                    <p><span className="text-muted-foreground">Website:</span> {website || "Not set"}</p>
                    <p><span className="text-muted-foreground">Industry:</span> {industry || "Not set"}</p>
                    <p><span className="text-muted-foreground">Model:</span> {businessModel || "Not set"}</p>
                    <p><span className="text-muted-foreground">Stage:</span> {stage}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">Target Audience</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Titles:</span> {targetTitles || "Not set"}</p>
                    <p><span className="text-muted-foreground">Industries:</span> {targetIndustries || "Not set"}</p>
                    <p><span className="text-muted-foreground">Size:</span> {companySize || "Not set"}</p>
                    <p><span className="text-muted-foreground">Locations:</span> {targetLocations || "Not set"}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4 md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">Outreach Settings</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <p><span className="text-muted-foreground">Channel:</span> {preferredChannel}</p>
                    <p><span className="text-muted-foreground">Tone:</span> {outreachTone}</p>
                    <p><span className="text-muted-foreground">Daily Limit:</span> {dailyLimit}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <p className="text-sm text-green-600 dark:text-green-400">
                  ✓ All settings will be saved to your account. You can change them anytime from Settings.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 border-t border-border pt-5">
            <div className="flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-semibold text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Complete Setup
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>

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
