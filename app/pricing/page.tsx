"use client";

import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { Check, HelpCircle, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
            <LandingNavbar />

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-blue-600/90 dark:bg-blue-900/40">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] -z-10" />

                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] -z-10" />

                <div className="mx-auto max-w-4xl px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-6 backdrop-blur-sm">
                        <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                        <span className="text-xs font-semibold tracking-wide uppercase">Simple, transparent pricing</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                        Everything You Need to <br />
                        <span className="text-blue-100">Crush Sales</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-blue-100/80 mb-8 leading-relaxed">
                        Whether you are a Fortune 500 company or a solo founder, LeadGenius has the right plan to help you grow.
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm font-medium text-blue-100/70">
                        <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-blue-300" /> One Minute Setup</span>
                        <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-blue-300" /> 7-Day Free Trial</span>
                        <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-blue-300" /> No Credit Card Required</span>
                    </div>
                </div>
            </section>

            {/* --- Pricing Content --- */}
            <section className="py-16 -mt-32 relative z-20">
                <div className="mx-auto max-w-7xl px-6">

                    {/* Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-4 bg-muted/50 p-1.5 rounded-full border border-border backdrop-blur-sm">
                            <span className={cn("text-sm font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer", !isAnnual ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")} onClick={() => setIsAnnual(false)}>
                                Monthly
                            </span>
                            <span className={cn("text-sm font-medium px-4 py-1.5 rounded-full transition-all cursor-pointer", isAnnual ? "bg-background shadow-sm text-foreground" : "text-muted-foreground")} onClick={() => setIsAnnual(true)}>
                                Annually <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded ml-1">Save 20%</span>
                            </span>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Basic Plan */}
                        <PricingCard
                            title="Basic"
                            desc="Great for exploring sales outreach with 1 seat."
                            price={isAnnual ? 39 : 49}
                            isAnnual={isAnnual}
                            features={[
                                "1 LinkedIn account",
                                "Limited data quotes",
                                "Advanced analytics & reports",
                                "Compatible with all LinkedIn account types",
                                "Sequence templates",
                                "Cloud-based",
                                "24/7 live support"
                            ]}
                        />

                        {/* Pro Plan */}
                        <PricingCard
                            title="Pro"
                            desc="Perfect for launching high-speed outreach campaigns at full scale."
                            price={isAnnual ? 59 : 79}
                            isAnnual={isAnnual}
                            features={[
                                "Unlimited data quotes",
                                "A/B testing",
                                "Webhook integrations",
                                "Email finding (500 credits)",
                                "Personalized images"
                            ]}
                            highlighted
                        />

                        {/* Advanced Plan */}
                        <PricingCard
                            title="Advanced"
                            desc="Best for powerful prospecting with built-in safeguards."
                            price={isAnnual ? 79 : 99}
                            isAnnual={isAnnual}
                            popular
                            features={[
                                "Team management",
                                "Advanced limits protection",
                                "Lead warmer",
                                "Dedicated IP",
                                "Everything in Pro"
                            ]}
                            buttonColor="bg-blue-600 hover:bg-blue-700 text-white"
                        />

                        {/* Enterprise Plan */}
                        <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-lg transition-all hover:border-blue-500/20 hover:shadow-xl relative overflow-hidden">
                            <div className="mb-5">
                                <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 dark:bg-orange-900/20">
                                    <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Enterprise</h3>
                                <p className="text-sm text-muted-foreground mt-2 h-[40px]">Ideal for large teams needing to centralize outreach operations.</p>
                            </div>

                            <div className="mb-6">
                                <div className="text-sm font-medium text-foreground mb-1">Customise the right plan for you</div>
                            </div>

                            <Button className="w-full mb-8 bg-transparent border-2 border-foreground hover:bg-foreground/5 text-foreground font-semibold" variant="outline">
                                Contact Sales
                            </Button>

                            <div className="space-y-3 mb-8 flex-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Everything in Advanced, plus:</p>
                                {[
                                    "Premium onboarding",
                                    "Dedicated account support",
                                    "Custom success manager",
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-foreground/80">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- See all features dropdown (mock) --- */}
            <div className="text-center pb-20">
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 mx-auto transition-colors">
                    See all plan features <HelpCircle className="w-3 h-3" />
                </button>
            </div>

            {/* --- Testimonials / Buzz Section --- */}
            <section className="py-20 bg-muted/30 border-y border-border">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-4">And we're creating <br /><span className="text-blue-600 dark:text-blue-400">some buzz</span></h2>
                            <p className="text-muted-foreground mb-8 text-lg">LeadGenius helps thousands of companies in 100+ countries automate prospecting and drive sales.</p>

                            <div className="grid gap-6">
                                <TestimonialCard
                                    text="Phenomenal tool! Saves time and does lead generation on LinkedIn instead of you. The cost is minimal in comparison to the value it provides."
                                    author="Christian Neumeister"
                                    role="Head of Sales at N.G."
                                />
                                <TestimonialCard
                                    text="Very impressive. I am a big fan of automation and LeadGenius is exactly what I was looking for. Every experience with other LinkedIn automation software was clumsy, but this one is magnificent."
                                    author="Joshua K"
                                    role="CEO at Founders Moments"
                                />
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                            {/* Abstract visual representation of 'buzz' - bees/hive concept from image */}
                            <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-amber-100 to-orange-50 rounded-full dark:from-amber-900/10 dark:to-orange-900/10 flex items-center justify-center animate-pulse">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-xl max-w-xs transform rotate-3">
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                                        </div>
                                        <p className="text-sm font-medium mb-3">"Corporate software for LinkedIn Sales is a huge amount of work and we're super happy with it. It's a massive time saver!"</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">KK</div>
                                            <div>
                                                <div className="text-xs font-bold">Kevin Kestner</div>
                                                <div className="text-[10px] text-muted-foreground">Founder of H.O.G</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Box --- */}
            <section className="py-24 px-6">
                <div className="mx-auto max-w-5xl bg-blue-600 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Zap className="w-64 h-64" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Skyrocket <br /> Your Sales with LeadGenius?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg relative z-10">Kickstart your LinkedIn and email outreach campaign today and watch first results in less than 24 hours — all while enjoying your free trial.</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-lg mx-auto bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20 relative z-10">
                        <input
                            type="email"
                            placeholder="Enter your work email"
                            className="bg-transparent border-none outline-none text-white placeholder:text-blue-200 px-4 py-2 flex-1 w-full text-center sm:text-left"
                        />
                        <button className="bg-foreground text-background font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform w-full sm:w-auto">
                            Start now
                        </button>
                    </div>
                </div>
            </section>

            <Footer variant="dark" />
        </div>
    );
}

function PricingCard({ title, desc, price, isAnnual, features, popular, highlighted, buttonColor }: any) {
    return (
        <div className={cn("flex flex-col rounded-3xl border bg-card p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden h-full",
            highlighted ? "border-[#5a42ff] ring-1 ring-[#5a42ff]/20 shadow-purple-500/10" : "border-border",
        )}>

            {popular && (
                <div className="absolute top-0 right-0 bg-[#ebe9ff] text-[#5a42ff] text-[10px] font-bold px-3 py-1 rounded-bl-xl dark:bg-[#5a42ff]/20 dark:text-[#7c66ff]">
                    MOST POPULAR
                </div>
            )}

            <div className="mb-6">
                {/* Icon */}
                <div className="mb-4">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center",
                        title === "Advanced" ? "bg-[#5a42ff] text-white" : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    )}>
                        <Zap className="h-5 w-5" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground mt-2 h-[40px] leading-snug">{desc}</p>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">${price}</span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">/ {isAnnual ? 'month' : 'month'}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 font-medium">{isAnnual ? 'billed annually' : 'billed monthly'}</div>
            </div>

            <Button className={cn("w-full mb-8 font-bold text-sm py-5 rounded-xl transition-all",
                title === "Advanced" ? "bg-[#5a42ff] hover:bg-[#4c35e6] text-white shadow-lg shadow-purple-500/20" :
                    "bg-white border text-foreground hover:bg-slate-50 dark:bg-transparent dark:border-border dark:hover:bg-slate-800"
            )}>
                Start for free
            </Button>

            <div className="space-y-3 flex-1">
                {features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <Check className="h-3.5 w-3.5 text-[#5a42ff] shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                    </div>
                ))}

                <div className={cn("border-t border-dashed border-border mt-4 pt-4")}>
                    <button className="flex items-center gap-1.5 text-xs text-[#5a42ff] font-bold hover:underline">
                        view all features <HelpCircle className="w-3 h-3" />
                    </button>
                </div>
            </div>

        </div>
    )
}

function TestimonialCard({ text, author, role }: { text: string, author: string, role: string }) {
    return (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
            <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">"{text}"</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                <div>
                    <div className="text-xs font-bold text-foreground">{author}</div>
                    <div className="text-[10px] text-muted-foreground">{role}</div>
                </div>
            </div>
        </div>
    )
}
