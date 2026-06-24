import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Navbar() {
    return (
        <nav
            data-testid="site-navbar"
            className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0B120E]/70 border-b border-[#C8A97E]/10"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <Link to="/" className="group flex items-baseline gap-3" data-testid="brand-link">
                    <span className="font-serif-display text-2xl text-[#FDFBF7] tracking-tight">
                        The Urban Bungalow
                    </span>
                    <span className="hidden md:inline text-[10px] tracking-luxe uppercase text-[#C8A97E]">
                        Patna · est. 2026
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-10 text-xs tracking-luxe uppercase text-[#A3A59E]">
                    <a href="#spaces" className="hover:text-[#C8A97E] transition-colors" data-testid="nav-spaces">Spaces</a>
                    <a href="#reserve" className="hover:text-[#C8A97E] transition-colors" data-testid="nav-reserve">Reserve</a>
                    <a href="#visit" className="hover:text-[#C8A97E] transition-colors" data-testid="nav-visit">Visit</a>
                </div>
                <Link
                    to="/staff"
                    data-testid="staff-login-link"
                    className="flex items-center gap-2 text-[11px] tracking-luxe uppercase text-[#C8A97E] hover:text-[#FDFBF7] transition-colors"
                >
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Staff
                </Link>
            </div>
        </nav>
    );
}
