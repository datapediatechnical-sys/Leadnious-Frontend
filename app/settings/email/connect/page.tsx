"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, X, Mail, Eye, EyeOff, ChevronDown, ChevronUp, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

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
            [name]: type === 'number' ? parseInt(value) : value
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
                // If fields are empty in advanced, we should probably handle that
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[600px] bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header Actions */}
                <div className="flex items-center justify-between p-6">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-slate-900 font-medium hover:opacity-70 transition-opacity"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <button 
                        onClick={() => router.push("/settings/email")}
                        className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-10 pb-10">
                    {/* Centered Title & Icon */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Set up mail account</h1>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#6366f1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <Mail size={24} />
                            </div>
                            <span className="text-lg font-semibold text-slate-800 tracking-tight">Other</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Fields */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Email*</label>
                                <div className="relative">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="donald.duck@mail.com"
                                        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Sender Name*</label>
                                <input
                                    required
                                    type="text"
                                    name="sender_name"
                                    value={formData.sender_name}
                                    onChange={handleChange}
                                    placeholder="Donald Duck Official"
                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Password*</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Mail size={16} /> {/* Placeholder for lock icon or key */}
                                    </div>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="smtp_password"
                                        value={formData.smtp_password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Toggle */}
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-2 text-indigo-600 font-bold hover:underline transition-all"
                            >
                                <span>Advanced settings</span>
                                {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            {showAdvanced && (
                                <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                    {/* SMTP Connection */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold text-slate-900">SMTP connection</h3>
                                        <div className="flex gap-4">
                                            <div className="flex-[2] space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">SMTP Host*</label>
                                                <input
                                                    type="text"
                                                    name="smtp_host"
                                                    value={formData.smtp_host}
                                                    onChange={handleChange}
                                                    placeholder="Search on google"
                                                    className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">SMTP Port*</label>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="number"
                                                        name="smtp_port"
                                                        value={formData.smtp_port}
                                                        onChange={handleChange}
                                                        placeholder="xxx"
                                                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleTestSmtp}
                                                        disabled={testingSmtp}
                                                        className="px-6 py-3 border-2 border-indigo-600 rounded-xl text-indigo-600 font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
                                                    >
                                                        {testingSmtp ? <Loader2 size={18} className="animate-spin" /> : "Test"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* IMAP Connection */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold text-slate-900">IMAP connection</h3>
                                        <div className="flex gap-4">
                                            <div className="flex-[2] space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">IMAP Host*</label>
                                                <input
                                                    type="text"
                                                    name="imap_host"
                                                    value={formData.imap_host}
                                                    onChange={handleChange}
                                                    placeholder="Search on google"
                                                    className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">IMAP Port*</label>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="number"
                                                        name="imap_port"
                                                        value={formData.imap_port}
                                                        onChange={handleChange}
                                                        placeholder="xxx"
                                                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleTestImap}
                                                        disabled={testingImap}
                                                        className="px-6 py-3 border-2 border-indigo-600 rounded-xl text-indigo-600 font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
                                                    >
                                                        {testingImap ? <Loader2 size={18} className="animate-spin" /> : "Test"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-10 py-4 bg-indigo-600 rounded-2xl text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading && <Loader2 size={20} className="animate-spin" />}
                                {isLoading ? "Validating..." : "Validate"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
