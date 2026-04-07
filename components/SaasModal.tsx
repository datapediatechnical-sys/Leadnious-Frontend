"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SaasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaasModal({ isOpen, onClose }: SaasModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleJoinNow = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you might save the email here.
    // For now, redirect to the community page as requested.
    router.push("/community");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
        {/* Top Header with Icon */}
        <div className="pt-12 pb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-10">
            <Compass className="h-10 w-10 text-blue-600" />
          </div>

          <DialogHeader className="text-center px-8">
            <DialogTitle className="text-[32px] font-extrabold leading-[1.1] text-slate-900 mb-4 px-4">
              Your SaaS Journey Starts Here
            </DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed text-slate-500 px-2">
              Get early users and exclusive discounts. Join 2,000+ founders architecting the future of software.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Area */}
        <form onSubmit={handleJoinNow} className="px-10 pb-12 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="founder@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-2xl bg-indigo-50/50 border-none px-6 text-slate-600 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
              required
            />
            
            <Button 
              type="submit"
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all border-none"
            >
              Join Now
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[14px] text-slate-500 font-medium">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}
