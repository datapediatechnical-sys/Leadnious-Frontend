"use client";

import { Bell, ChevronDown, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface UserSettings {
    language_preference: string;
    timezone: string;
    email_preferences: Record<string, any>;
}

export default function SettingsPage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // User profile state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // Settings state
    const [language, setLanguage] = useState("English");
    const [settings, setSettings] = useState<UserSettings | null>(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            // Fetch user profile
            const userRes = await api.get<any>("/api/users/me");
            if (userRes.data) {
                const fullName = userRes.data.full_name || "";
                const names = fullName.split(" ");
                setFirstName(names[0] || "");
                setLastName(names.slice(1).join(" ") || "");
                setEmail(userRes.data.email || "");
            }

            // Fetch user settings
            const settingsRes = await api.get<UserSettings>("/api/users/me/settings");
            if (settingsRes.data) {
                setSettings(settingsRes.data);
                setLanguage(settingsRes.data.language_preference === "en" ? "English" : settingsRes.data.language_preference);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error("Failed to load settings");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const res = await api.patch("/api/users/me", { full_name: fullName });

            if (res.error) {
                toast.error("Failed to update profile");
            } else {
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveLanguage = async () => {
        setIsSaving(true);
        try {
            const langCode = language === "English" ? "en" : language.toLowerCase();
            const res = await api.patch("/api/users/me/settings", {
                language_preference: langCode
            });

            if (res.error) {
                toast.error("Failed to update language");
            } else {
                toast.success("Language updated successfully!");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center bg-background">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col bg-background text-foreground transition-colors duration-300">
            {/* Top Header */}
            <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8 transition-colors duration-300">
                <div className="flex gap-4">
                    {/* Placeholder for left side actions if any, image showed empty left side in header mostly */}
                </div>

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
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Avatar" className="h-full w-full rounded-full" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{user?.full_name || user?.email}</span>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-background px-8 py-8 transition-colors duration-300">
                <h2 className="mb-8 text-2xl font-bold text-foreground">My account</h2>

                {/* About You Section */}
                <div className="mb-6 rounded-2xl border border-border bg-card p-8 transition-colors duration-300">
                    <h3 className="mb-6 text-base font-semibold text-foreground">About you</h3>
                    <div className="flex gap-8">
                        <div className="relative h-20 w-20 flex-shrink-0">
                            <div className="h-full w-full overflow-hidden rounded-full border-2 border-dashed border-border bg-muted/50 p-1">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="Avatar" className="h-full w-full rounded-full object-cover" />
                            </div>
                        </div>

                        <div className="grid flex-1 grid-cols-2 gap-6">
                            <InputField label="First name" value={firstName} onChange={setFirstName} />
                            <InputField label="Last name" value={lastName} onChange={setLastName} />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Email Preferences */}
                <div className="mb-6 rounded-2xl border border-border bg-card p-8 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-start gap-4">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-foreground">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground">Email preferences</h3>
                                <p className="text-sm text-muted-foreground mt-1">Choose the emails you want to receive from us</p>
                            </div>
                        </div>
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
                            Manage my email preferences
                        </button>
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Contact email</label>
                            <input
                                type="text"
                                value={email}
                                readOnly
                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-muted-foreground outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <button className="rounded-xl bg-secondary px-6 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed">
                            Update
                        </button>
                    </div>
                </div>

                {/* Application Language */}
                <div className="rounded-2xl border border-border bg-card p-8 transition-colors duration-300">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-foreground">
                            <span className="text-lg font-bold">文</span>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Application language</h3>
                            <p className="text-sm text-muted-foreground mt-1">Choose your preferred language to use LeadGenius</p>
                        </div>
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🇬🇧</div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-input bg-background pl-12 pr-4 py-3 text-sm text-foreground outline-none focus:border-blue-500/50 transition-colors"
                                >
                                    <option>English</option>
                                    <option>French</option>
                                    <option>Spanish</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                            </div>
                        </div>
                        <button
                            onClick={handleSaveLanguage}
                            disabled={isSaving}
                            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? "Saving..." : "Update"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
    return (
        <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 transition-colors"
                />
            </div>
        </div>
    )
}
