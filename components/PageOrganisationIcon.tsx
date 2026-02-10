import Link from "next/link";

export default function PageOrganisationIcon() {
    return (
        <div className="fixed top-6 right-6 z-50">
            <Link
                href="/organisation"
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-purple-500/40 to-pink-400/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-md transition hover:scale-110 hover:shadow-[0_4px_25px_rgba(168,85,247,0.4)]"
            >
                <BuildingIcon className="text-white/90" />
            </Link>
        </div>
    );
}

function BuildingIcon({ className }: { className?: string }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M3 21h18M5 21V7l8-4 8 4v14"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 14v-2M8 17v-2M10 14v-2M10 17v-2M14 14v-2M14 17v-2M16 14v-2M16 17v-2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
