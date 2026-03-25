"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, X, Mail, Eye, EyeOff, ChevronDown, ChevronUp, Loader2, CheckCircle2, Lock, MoreHorizontal } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectEmailPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [testingSmtp, setTestingSmtp] = useState(false);
    const [testingImap, setTestingImap] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        sender_name: "",
        smtp_password: "",
        smtp_host: "",
        smtp_port: 587,
        imap_host: "",
        imap_port: 993,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' 
                ? (value === '' ? '' : parseInt(value)) 
                : value
        }));
    };

    const handleTestSmtp = async () => {
        if (!formData.smtp_host || !formData.email || !formData.smtp_password) {
            toast.error("Please fill SMTP host, email, and password first");
            return;
        }
        setTestingSmtp(true);
        try {
            const res = await api.post("/api/email/test-smtp", {
                host: formData.smtp_host,
                port: formData.smtp_port,
                user: formData.email,
                password: formData.smtp_password
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

        if (!imapHost || !formData.email || !formData.smtp_password) {
            toast.error("Please fill IMAP host, email, and password first");
            return;
        }
        setTestingImap(true);
        try {
            const res = await api.post("/api/email/test-imap", {
                host: imapHost,
                port: imapPort,
                user: formData.email,
                password: formData.smtp_password
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
        setIsLoading(true);

        try {
            const data = {
                ...formData,
                smtp_user: formData.email,
                imap_user: formData.email,
                imap_password: formData.smtp_password,
                is_org_shared: false
            };

            const res = await api.post("/api/email/accounts", data);

            if (!res.error) {
                toast.success("Email account connected successfully!");
                router.push("/settings/email");
            } else {
                toast.error(res.error.detail || "Failed to connect email account");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4">
            <div className="w-full max-w-[600px] bg-white rounded-[24px] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative my-4 flex flex-col max-h-[calc(100vh-2rem)]">
                
                {/* Header: Title & Back */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-20 rounded-t-[24px]">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-[#1e293b] font-bold hover:opacity-70 transition-opacity"
                    >
                        <ChevronLeft size={20} className="stroke-[2.5px]" />
                        <span className="text-base">Back</span>
                    </button>
                    <h1 className="text-xl font-black text-[#0f172a] absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Set up account</h1>
                    <button 
                        onClick={() => router.push("/settings/email")}
                        className="h-8 w-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Main Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                    <div className="flex items-center gap-2 mb-6 justify-center bg-indigo-50/50 w-fit mx-auto px-4 py-1.5 rounded-full border border-indigo-100">
                        <Mail size={16} className="text-indigo-600" />
                        <span className="text-sm font-bold text-indigo-700">Connecting Other Service</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Primary Fields */}
                        <div className="grid gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Email Address</label>
                                <div className="relative group">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="donald.duck@mail.com"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="h-5 w-8 bg-slate-200 rounded-md flex items-center justify-center text-slate-400">
                                            <MoreHorizontal size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Sender Name</label>
                                <div className="relative">
                                    <input
                                        required
                                        type="text"
                                        name="sender_name"
                                        value={formData.sender_name}
                                        onChange={handleChange}
                                        placeholder="Donald Duck Official"
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">App Password</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Lock size={14} className="opacity-40" />
                                    </div>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="smtp_password"
                                        value={formData.smtp_password}
                                        onChange={handleChange}
                                        placeholder="••••••••••••"
                                        className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="p-1 text-slate-300 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Settings */}
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-2 text-blue-600 font-bold text-xs tracking-tight group px-1"
                            >
                                <span>Modify Port/Host Settings</span>
                                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            <AnimatePresence>
                                {showAdvanced && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 space-y-5">
                                            {/* SMTP Connection */}
                                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                                                <h3 className="text-xs font-black text-[#1e293b] uppercase tracking-widest text-slate-400">SMTP Server (Sending)</h3>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Host</label>
                                                        <input
                                                            type="text"
                                                            name="smtp_host"
                                                            value={formData.smtp_host}
                                                            onChange={handleChange}
                                                            placeholder="smtp.mail.com"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                                                        />
                                                    </div>
                                                    <div className="w-[80px] space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port</label>
                                                        <input
                                                            type="number"
                                                            name="smtp_port"
                                                            value={formData.smtp_port}
                                                            onChange={handleChange}
                                                            placeholder="587"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                                                        />
                                                    </div>
                                                    <div className="pt-5">
                                                        <button 
                                                            type="button" 
                                                            onClick={handleTestSmtp}
                                                            disabled={testingSmtp}
                                                            className="h-[34px] px-3 border border-blue-600 rounded-lg text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[60px]"
                                                        >
                                                            {testingSmtp ? <Loader2 size={12} className="animate-spin" /> : "Verify"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* IMAP Connection */}
                                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                                                <h3 className="text-xs font-black text-[#1e293b] uppercase tracking-widest text-slate-400">IMAP Server (Incoming)</h3>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Host</label>
                                                        <input
                                                            type="text"
                                                            name="imap_host"
                                                            value={formData.imap_host}
                                                            onChange={handleChange}
                                                            placeholder="imap.mail.com"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                                                        />
                                                    </div>
                                                    <div className="w-[80px] space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">Port</label>
                                                        <input
                                                            type="number"
                                                            name="imap_port"
                                                            value={formData.imap_port}
                                                            onChange={handleChange}
                                                            placeholder="993"
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#1e293b] placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                                                        />
                                                    </div>
                                                    <div className="pt-5">
                                                        <button 
                                                            type="button" 
                                                            onClick={handleTestImap}
                                                            disabled={testingImap}
                                                            className="h-[34px] px-3 border border-blue-600 rounded-lg text-blue-600 font-bold text-[11px] hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[60px]"
                                                        >
                                                            {testingImap ? <Loader2 size={12} className="animate-spin" /> : "Verify"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                        onClick={(e) => {
                            // Find the form and submit it manually since the button is outside
                            const form = document.querySelector('form');
                            if (form) form.requestSubmit();
                        }}
                        disabled={isLoading}
                        className="px-8 py-2.5 bg-blue-600 rounded-xl text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                <span>Connecting...</span>
                            </div>
                        ) : "Connect Account"}
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
