"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

interface IncompleteProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function IncompleteProfileModal({
    isOpen,
    onClose,
    onSubmit,
}: IncompleteProfileModalProps) {
    const missingItems = [
        "Where are your ideal customers located? (USA/ india)",
        "Which social Media platform your users are mainly active ? (Linkedin/ insta/ twitter/ Facebook)",
        "Which department usually buys your solution?",
        "List 3-5 job titles you target most often.",
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-start gap-4">
                            <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
                                <AlertCircle className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Complete Your Profile
                                </h2>
                                <p className="mt-1 text-sm text-white/60">
                                    Your account setup is 80% complete. Please add the following
                                    details to unlock full features.
                                </p>
                            </div>
                        </div>

                        {/* List */}
                        <div className="mt-6 space-y-3">
                            {missingItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-white/80"
                                >
                                    <div className="grid h-5 w-5 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                            >
                                Skip for now
                            </button>
                            <button
                                onClick={onSubmit}
                                className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
                            >
                                Complete Setup
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
