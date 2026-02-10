"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

interface OrganizationsResponse {
    organizations: Array<{ id: string; name: string }>;
    count: number;
    current_org_id: string | null;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [checkingOrg, setCheckingOrg] = useState(true);
    const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        // Check if user has an organization
        if (isAuthenticated && user) {
            checkOrganization();
        }
    }, [isAuthenticated, isLoading, user, router]);

    const checkOrganization = async () => {
        setCheckingOrg(true);
        const { data, error } = await api.get<OrganizationsResponse>("/api/organizations");

        if (error) {
            // If error, assume they might have org (to prevent blocking)
            setHasOrganization(true);
            setCheckingOrg(false);
            return;
        }

        if (data && data.count > 0) {
            setHasOrganization(true);
        } else {
            // No organizations - redirect to setup
            setHasOrganization(false);
            router.push("/setup");
        }
        setCheckingOrg(false);
    };

    if (isLoading || checkingOrg) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    if (hasOrganization === false) {
        return null; // Will redirect to setup
    }

    return <>{children}</>;
}
