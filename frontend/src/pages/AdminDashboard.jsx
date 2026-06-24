import { useEffect, useMemo, useState, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import {
    LogOut,
    Search,
    Phone,
    Calendar,
    Clock,
    Users,
    LayoutDashboard,
    ChevronDown,
} from "lucide-react";
import { api, formatApiErrorDetail } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const STATUSES = ["pending", "confirmed", "seated", "cancelled", "no-show"];

const STATUS_STYLE = {
    pending: "bg-[#C8A97E]/15 text-[#C8A97E] border-[#C8A97E]/40",
    confirmed: "bg-[#2E7D53]/20 text-[#7ED4A6] border-[#2E7D53]/60",
    seated: "bg-[#4A7A8C]/20 text-[#9CC9D8] border-[#4A7A8C]/60",
    cancelled: "bg-[#9E3232]/15 text-[#E07171] border-[#9E3232]/50",
    "no-show": "bg-[#A3A59E]/15 text-[#A3A59E] border-[#A3A59E]/40",
};

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [openMenu, setOpenMenu] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [r1, r2] = await Promise.all([
                api.get("/admin/reservations"),
                api.get("/admin/stats"),
            ]);
            setReservations(r1.data);
            setStats(r2.data);
        } catch (err) {
            toast.error("Could not load", { description: formatApiErrorDetail(err.response?.data?.detail) });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && user !== false) load();
    }, [user, load]);

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/admin/reservations/${id}`, { status });
            toast.success(`Marked ${status}`);
            setOpenMenu(null);
            load();
        } catch (err) {
            toast.error("Update failed", { description: formatApiErrorDetail(err.response?.data?.detail) });
        }
    };

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return reservations.filter((r) => {
            if (filterStatus !== "all" && r.status !== filterStatus) return false;
            if (!q) return true;
            return (
                r.name.toLowerCase().includes(q) ||
                r.phone.toLowerCase().includes(q) ||
                (r.special_requests || "").toLowerCase().includes(q)
            );
        });
    }, [reservations, search, filterStatus]);

    // Auth gates
    if (user === null) {
        return (
            <div className="min-h-screen bg-[#0B120E] flex items-center justify-center text-[#A3A59E] text-sm tracking-luxe uppercase">
                Loading…
            </div>
        );
    }
    if (user === false) return <Navigate to="/staff" replace />;

    return (
        <div className="min-h-screen bg-[#0B120E] text-[#FDFBF7]" data-testid="admin-dashboard">
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0B120E]/85 border-b border-[#C8A97E]/15">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-baseline gap-3" data-testid="brand-link-admin">
                        <span className="font-serif-display text-xl">The Urban Bungalow</span>
                        <span className="text-[10px] tracking-luxe uppercase text-[#C8A97E] flex items-center gap-1.5">
                            <LayoutDashboard className="w-3 h-3" strokeWidth={1.5} /> Owner Console
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block text-xs text-[#A3A59E]">
                            Signed in as <span className="text-[#C8A97E]">{user.email}</span>
                        </span>
                        <button
                            onClick={logout}
                            data-testid="logout-btn"
                            className="flex items-center gap-2 text-[11px] tracking-luxe uppercase text-[#A3A59E] hover:text-[#C8A97E] transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} /> Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-3">Reservations</p>
                        <h1 className="font-serif-display text-4xl md:text-5xl font-light tracking-tight">
                            Today's <em className="italic text-[#C8A97E] font-serif-display">guest list.</em>
                        </h1>
                    </div>
                    <button
                        onClick={load}
                        data-testid="refresh-btn"
                        className="self-start border border-[#C8A97E]/40 hover:border-[#C8A97E] hover:bg-[#C8A97E]/10 text-[#C8A97E] px-6 py-3 text-[11px] tracking-luxe uppercase transition-colors"
                    >
                        Refresh
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                    {[
                        { k: "total", l: "Total" },
                        { k: "today", l: "Today" },
                        { k: "pending", l: "Pending" },
                        { k: "confirmed", l: "Confirmed" },
                        { k: "seated", l: "Seated" },
                    ].map((s) => (
                        <div key={s.k} className="bg-[#151F19] border border-[#C8A97E]/15 p-6" data-testid={`stat-${s.k}`}>
                            <p className="text-[10px] tracking-luxe uppercase text-[#A3A59E] mb-2">{s.l}</p>
                            <p className="font-serif-display text-4xl text-[#C8A97E]">{stats[s.k] ?? 0}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A59E]" strokeWidth={1.5} />
                        <input
                            data-testid="search-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, phone, notes…"
                            className="w-full bg-transparent border-b border-[#C8A97E]/30 pl-7 pr-0 py-3 text-[#FDFBF7] focus:outline-none focus:border-[#C8A97E] placeholder:text-[#A3A59E]/50"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["all", ...STATUSES].map((s) => (
                            <button
                                key={s}
                                data-testid={`filter-${s}`}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 text-[11px] tracking-luxe uppercase border transition-all ${
                                    filterStatus === s
                                        ? "bg-[#C8A97E] text-[#0B120E] border-[#C8A97E]"
                                        : "border-[#C8A97E]/25 text-[#A3A59E] hover:text-[#C8A97E] hover:border-[#C8A97E]"
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#151F19] border border-[#C8A97E]/15">
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-[10px] tracking-luxe uppercase text-[#C8A97E] border-b border-[#C8A97E]/15">
                        <div className="col-span-3">Guest</div>
                        <div className="col-span-2">Phone</div>
                        <div className="col-span-1 text-center">Pax</div>
                        <div className="col-span-2">When</div>
                        <div className="col-span-1">Space</div>
                        <div className="col-span-1">Notes</div>
                        <div className="col-span-2">Status</div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-sm text-[#A3A59E]" data-testid="loading-row">Loading reservations…</div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center" data-testid="empty-row">
                            <p className="font-serif-display text-2xl text-[#C8A97E] mb-2">No reservations match.</p>
                            <p className="text-sm text-[#A3A59E]">Adjust filters, or wait for the next guest.</p>
                        </div>
                    ) : (
                        filtered.map((r) => (
                            <div
                                key={r.id}
                                data-testid={`reservation-row-${r.id}`}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-[#C8A97E]/10 last:border-0 hover:bg-[#0B120E]/30 transition-colors"
                            >
                                <div className="md:col-span-3">
                                    <p className="font-serif-display text-lg text-[#FDFBF7]">{r.name}</p>
                                    <p className="text-[10px] tracking-luxe uppercase text-[#A3A59E] mt-1">
                                        Booked {new Date(r.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="md:col-span-2 flex items-center gap-2 text-sm text-[#A3A59E]">
                                    <Phone className="w-3.5 h-3.5 text-[#C8A97E]" strokeWidth={1.5} />
                                    <a href={`tel:${r.phone}`} className="hover:text-[#C8A97E]">{r.phone}</a>
                                </div>
                                <div className="md:col-span-1 flex items-center gap-2 text-sm md:justify-center">
                                    <Users className="w-3.5 h-3.5 text-[#C8A97E] md:hidden" strokeWidth={1.5} />
                                    <span className="font-serif-display text-xl text-[#C8A97E]">{r.guests}</span>
                                </div>
                                <div className="md:col-span-2 text-sm text-[#A3A59E]">
                                    <p className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#C8A97E]" strokeWidth={1.5} />{r.date}</p>
                                    <p className="flex items-center gap-2 mt-1"><Clock className="w-3 h-3 text-[#C8A97E]" strokeWidth={1.5} />{r.time}</p>
                                </div>
                                <div className="md:col-span-1 text-xs tracking-luxe uppercase text-[#C8A97E]">{r.space}</div>
                                <div className="md:col-span-1 text-xs text-[#A3A59E] italic font-serif-display truncate" title={r.special_requests}>
                                    {r.special_requests || "—"}
                                </div>
                                <div className="md:col-span-2 relative">
                                    <button
                                        data-testid={`status-btn-${r.id}`}
                                        onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] tracking-luxe uppercase ${STATUS_STYLE[r.status]}`}
                                    >
                                        {r.status}
                                        <ChevronDown className="w-3 h-3" strokeWidth={1.75} />
                                    </button>
                                    {openMenu === r.id && (
                                        <div className="absolute right-0 md:left-0 mt-2 w-44 bg-[#0B120E] border border-[#C8A97E]/30 shadow-2xl z-20" data-testid={`status-menu-${r.id}`}>
                                            {STATUSES.map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateStatus(r.id, s)}
                                                    data-testid={`set-status-${r.id}-${s}`}
                                                    className={`block w-full text-left px-4 py-2.5 text-[11px] tracking-luxe uppercase hover:bg-[#C8A97E]/10 transition-colors ${
                                                        r.status === s ? "text-[#C8A97E]" : "text-[#A3A59E]"
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <p className="mt-8 text-center text-[10px] tracking-luxe uppercase text-[#A3A59E]">
                    {filtered.length} of {reservations.length} reservations
                </p>
            </main>
        </div>
    );
}
