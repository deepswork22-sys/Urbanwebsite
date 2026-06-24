import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function StaffLogin() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (user && user !== false && user !== null) {
        return <Navigate to="/admin" replace />;
    }

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email.trim(), password);
            navigate("/admin");
        } catch (err) {
            setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B120E] grain flex items-center justify-center px-6 py-24 relative overflow-hidden" data-testid="staff-login-page">
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C8A97E]/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#2E7D53]/10 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <Link to="/" className="block text-center mb-10" data-testid="back-home-link">
                    <p className="text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} /> Owner access only
                    </p>
                    <h1 className="font-serif-display text-4xl md:text-5xl text-[#FDFBF7]">The Urban Bungalow</h1>
                </Link>

                <div className="bg-[#151F19] border border-[#C8A97E]/15 p-10 shadow-2xl">
                    <h2 className="font-serif-display text-2xl text-[#C8A97E] mb-2">Staff Login</h2>
                    <p className="text-sm text-[#A3A59E] mb-8">Sign in to manage today's reservations.</p>

                    <form onSubmit={submit} className="space-y-6" data-testid="login-form">
                        <div>
                            <label className="text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center gap-2">
                                <Mail className="w-3 h-3" strokeWidth={1.5} /> Email
                            </label>
                            <input
                                type="email"
                                required
                                data-testid="login-email"
                                className="w-full bg-transparent border-b border-[#C8A97E]/30 px-0 py-3 text-[#FDFBF7] focus:outline-none focus:border-[#C8A97E] placeholder:text-[#A3A59E]/40"
                                placeholder="owner@urbanbungalow.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center gap-2">
                                <Lock className="w-3 h-3" strokeWidth={1.5} /> Password
                            </label>
                            <input
                                type="password"
                                required
                                data-testid="login-password"
                                className="w-full bg-transparent border-b border-[#C8A97E]/30 px-0 py-3 text-[#FDFBF7] focus:outline-none focus:border-[#C8A97E] placeholder:text-[#A3A59E]/40"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-[#E07171] border-l-2 border-[#9E3232] pl-3" data-testid="login-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            data-testid="login-submit"
                            className="w-full bg-[#C8A97E] hover:bg-[#A68658] disabled:opacity-60 text-[#0B120E] px-8 py-4 text-xs tracking-luxe uppercase font-medium transition-colors flex items-center justify-center gap-3 group"
                        >
                            {loading ? "Signing in…" : "Enter dashboard"}
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
                        </button>
                    </form>

                    <p className="mt-10 pt-6 border-t border-[#C8A97E]/15 text-[10px] tracking-luxe uppercase text-[#A3A59E] text-center">
                        Authorised personnel · all access logged
                    </p>
                </div>
            </div>
        </div>
    );
}
