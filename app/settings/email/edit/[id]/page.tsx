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
            [name]: type === 'number' ? (value === '' ? '' : parseInt(value)) : value
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
        if (e) e.preventDefault();
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
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4">
            <div className="w-full max-w-[600px] bg-white rounded-[24px] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative my-4 flex flex-col max-h-[calc(100vh-2rem)] overflow-hidden">
                
                {/* Header: Title & Back */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-20 rounded-t-[24px]">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-[#1e293b] font-bold hover:opacity-70 transition-opacity"
                    >
                        <ChevronLeft size={20} className="stroke-[2.5px]" />
                        <span className="text-base">Back</span>
                    </button>
                    <h1 className="text-xl font-black text-[#0f172a] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Edit Account</h1>
                    <button 
                        onClick={() => router.push("/settings/email")}
                        className="h-8 w-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Main Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                    <div className="flex flex-col items-center mb-6 text-center">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 mb-3">
                            <Mail size={24} />
                        </div>
                        <span className="text-sm font-bold text-slate-500 break-all">{formData.email}</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Sender Name</label>
                                <input
                                    required
                                    type="text"
                                    name="sender_name"
                                    value={formData.sender_name}
                                    onChange={handleChange}
                                    placeholder="Donald Duck Official"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Update Password (Optional)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <ServerIcon size={14} className="opacity-40" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="smtp_password"
                                        value={formData.smtp_password}
                                        onChange={handleChange}
                                        placeholder="Leave blank to keep current"
                                        className="w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-1 text-blue-600 font-bold text-xs tracking-tight group px-1"
                            >
                                <span>Advanced server settings</span>
                                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                                    <div className="flex gap-1.5 p-1 bg-white rounded-lg border border-slate-100 w-fit">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("smtp")}
                                            className={`px-4 py-1 rounded-md text-[10px] font-black tracking-wider uppercase transition-all ${activeTab === "smtp" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            SMTP
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("imap")}
                                            className={`px-4 py-1 rounded-md text-[10px] font-black tracking-wider uppercase transition-all ${activeTab === "imap" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                        >
                                            IMAP
                                        </button>
                                    </div>

                                    {activeTab === "smtp" ? (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-9 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">SMTP Host*</label>
                                                    <input
                                                        type="text"
                                                        name="smtp_host"
                                                        value={formData.smtp_host}
                                                        onChange={handleChange}
                                                        placeholder="smtp.mail.com"
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                                <div className="col-span-3 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port*</label>
                                                    <input
                                                        type="number"
                                                        name="smtp_port"
                                                        value={formData.smtp_port}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleTestSmtp}
                                                disabled={testingSmtp}
                                                className="w-full h-9 border border-blue-600 rounded-lg text-blue-600 font-bold hover:bg-blue-50 transition-all text-[11px] flex items-center justify-center gap-2"
                                            >
                                                {testingSmtp ? <Loader2 size={14} className="animate-spin" /> : <> <CheckCircle2 size={12}/> <span>Verify SMTP</span></>}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-9 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">IMAP Host*</label>
                                                    <input
                                                        type="text"
                                                        name="imap_host"
                                                        value={formData.imap_host}
                                                        onChange={handleChange}
                                                        placeholder="imap.mail.com"
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                                <div className="col-span-3 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port*</label>
                                                    <input
                                                        type="number"
                                                        name="imap_port"
                                                        value={formData.imap_port}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleTestImap}
                                                disabled={testingImap}
                                                className="w-full h-9 border border-blue-600 rounded-lg text-blue-600 font-bold hover:bg-blue-50 transition-all text-[11px] flex items-center justify-center gap-2"
                                            >
                                                {testingImap ? <Loader2 size={14} className="animate-spin" /> : <> <CheckCircle2 size={12}/> <span>Verify IMAP</span></>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer - Sticky */}
                <div className="px-8 py-4 border-t border-slate-50 bg-slate-50/50 rounded-b-[24px] flex justify-end items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors px-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            const form = document.querySelector('form');
                            if (form) form.requestSubmit();
                        }}
                        disabled={isSaving}
                        className="px-8 py-2.5 bg-blue-600 rounded-xl text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                <span>Saving...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Save size={16} />
                                <span>Save Changes</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
