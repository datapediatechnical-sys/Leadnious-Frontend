"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, X, Mail, Eye, EyeOff, ChevronDown, ChevronUp, Loader2, CheckCircle2, Server as ServerIcon, Save } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function EditEmailPage() {
    const router = useRouter();
    const params = useParams();
    const accountId = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(true); // Default to true for editing
    const [testingSmtp, setTestingSmtp] = useState(false);
    const [testingImap, setTestingImap] = useState(false);
    const [activeTab, setActiveTab] = useState<"smtp" | "imap">("smtp");

    const [formData, setFormData] = useState({
        email: "",
        sender_name: "",
        smtp_password: "",
        smtp_host: "",
        smtp_port: 587,
        imap_host: "",
        imap_port: 993,
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await api.get(`/api/email/accounts/${accountId}`);
                if (!res.error) {
                    const data = res.data as any;
                    setFormData({
                        email: data.email || "",
                        sender_name: data.sender_name || "",
                        smtp_password: "", // Keep password empty for security, only update if changed
                        smtp_host: data.smtp_host || "",
                        smtp_port: data.smtp_port || 587,
                        imap_host: data.imap_host || "",
                        imap_port: data.imap_port || 993,
                    });
                } else {
                    toast.error("Failed to load account details");
                    router.push("/settings/email");
                }
            } catch (error) {
                toast.error("Error loading account");
            } finally {
                setIsLoading(false);
            }
        };

        if (accountId) {
            fetchAccount();
        }
    }, [accountId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) : value
        }));
    };

    const handleTestSmtp = async () => {
        if (!formData.smtp_host || !formData.email) {
            toast.error("Please fill SMTP host and email first");
            return;
        }
        setTestingSmtp(true);
        try {
            const res = await api.post("/api/email/test-smtp", {
                host: formData.smtp_host,
                port: formData.smtp_port,
                user: formData.email,
                password: formData.smtp_password || undefined // May be handled by backend session if empty
            });
            if (!res.error) {
                toast.success("SMTP Connection successful!");
            } else {
                toast.error(res.error.detail || "SMTP Connection failed");
            }
        } catch (error) {
            toast.error("SMTP Test failed");
        } finally {
            setTestingSmtp(false);
        }
    };

    const handleTestImap = async () => {
        const imapHost = formData.imap_host || formData.smtp_host.replace('smtp', 'imap');
        const imapPort = formData.imap_port;

        if (!imapHost || !formData.email) {
            toast.error("Please fill IMAP host and email first");
            return;
        }
        setTestingImap(true);
        try {
            const res = await api.post("/api/email/test-imap", {
                host: imapHost,
                port: imapPort,
                user: formData.email,
                password: formData.smtp_password || undefined
            });
            if (!res.error) {
                toast.success("IMAP Connection successful!");
            } else {
                toast.error(res.error.detail || "IMAP Connection failed");
            }
        } catch (error) {
            toast.error("IMAP Test failed");
        } finally {
            setTestingImap(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const updateData: any = {
                sender_name: formData.sender_name,
                smtp_host: formData.smtp_host,
                smtp_port: formData.smtp_port,
                imap_host: formData.imap_host,
                imap_port: formData.imap_port,
            };

            // Only send password if it was changed
            if (formData.smtp_password) {
                updateData.smtp_password = formData.smtp_password;
                updateData.imap_password = formData.smtp_password;
            }

            const res = await api.patch(`/api/email/accounts/${accountId}`, updateData);

            if (!res.error) {
                toast.success("Email account updated successfully!");
                router.push("/settings/email");
            } else {
                toast.error(res.error.detail || "Failed to update account");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[650px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header Actions */}
                <div className="relative flex items-center justify-between px-8 py-6">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-slate-900 font-semibold hover:opacity-70 transition-opacity"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    
                    <button 
                        onClick={() => router.push("/settings/email")}
                        className="absolute right-8 top-1/2 -translate-y-1/2 p-2.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-12 pb-12">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <h1 className="text-[32px] font-bold text-[#0f172a] mb-6">Edit mail account</h1>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                <Mail size={28} />
                            </div>
                            <span className="text-xl font-bold text-slate-800">{formData.email}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[15px] font-bold text-slate-600 ml-1">Sender Name*</label>
                                <input
                                    required
                                    type="text"
                                    name="sender_name"
                                    value={formData.sender_name}
                                    onChange={handleChange}
                                    placeholder="Donald Duck Official"
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[22px] text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[15px] font-bold text-slate-600 ml-1">Update Password (Optional)</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                                        <ServerIcon size={18} className="opacity-50" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="smtp_password"
                                        value={formData.smtp_password}
                                        onChange={handleChange}
                                        placeholder="Leave blank to keep current"
                                        className="w-full pl-14 pr-14 py-4 bg-white border-2 border-slate-100 rounded-[22px] text-slate-900 font-semibold focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-1.5 text-blue-600 font-bold text-[15px] hover:bg-blue-50/50 px-3 py-1.5 rounded-lg transition-all"
                            >
                                <span>Advanced settings</span>
                                {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-4 p-5 rounded-[28px] bg-slate-50 border border-slate-100 animate-in slide-in-from-top-2 duration-400">
                                    <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-slate-100 mb-5 w-fit">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("smtp")}
                                            className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "smtp" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            SMTP
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("imap")}
                                            className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "imap" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            IMAP
                                        </button>
                                    </div>

                                    {activeTab === "smtp" ? (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-left-1 duration-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">SMTP Configuration</h3>
                                            </div>
                                            <div className="grid grid-cols-12 gap-3">
                                                <div className="col-span-8 space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Host*</label>
                                                    <input
                                                        type="text"
                                                        name="smtp_host"
                                                        value={formData.smtp_host}
                                                        onChange={handleChange}
                                                        placeholder="e.g. smtp.gmail.com"
                                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                                <div className="col-span-4 space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port*</label>
                                                    <input
                                                        type="number"
                                                        name="smtp_port"
                                                        value={formData.smtp_port}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleTestSmtp}
                                                disabled={testingSmtp}
                                                className="w-full py-3 border-2 border-blue-600 rounded-xl text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center justify-center gap-2"
                                            >
                                                {testingSmtp ? <Loader2 size={16} className="animate-spin" /> : <div className="flex items-center gap-2"><CheckCircle2 size={14}/><span>Test SMTP</span></div>}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-right-1 duration-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">IMAP Configuration</h3>
                                            </div>
                                            <div className="grid grid-cols-12 gap-3">
                                                <div className="col-span-8 space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Host*</label>
                                                    <input
                                                        type="text"
                                                        name="imap_host"
                                                        value={formData.imap_host}
                                                        onChange={handleChange}
                                                        placeholder="e.g. imap.gmail.com"
                                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                                <div className="col-span-4 space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port*</label>
                                                    <input
                                                        type="number"
                                                        name="imap_port"
                                                        value={formData.imap_port}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleTestImap}
                                                disabled={testingImap}
                                                className="w-full py-3 border-2 border-blue-600 rounded-xl text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center justify-center gap-2"
                                            >
                                                {testingImap ? <Loader2 size={16} className="animate-spin" /> : <div className="flex items-center gap-2"><CheckCircle2 size={14}/><span>Test IMAP</span></div>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-12 py-4 bg-[#2563eb] rounded-[24px] text-white font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all disabled:opacity-50 flex items-center justify-center min-w-[200px]"
                            >
                                {isSaving ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 size={22} className="animate-spin" />
                                        <span>Saving Changes...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Save size={20} />
                                        <span>Save Changes</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
