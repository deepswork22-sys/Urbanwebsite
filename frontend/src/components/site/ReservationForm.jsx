import { useState } from "react";
import { Calendar, Clock, Users, Send } from "lucide-react";
import { toast } from "sonner";
import { api, formatApiErrorDetail } from "../../lib/api";

const SPACES = ["Café", "Pilates", "Banquet", "PlayZone"];

export default function ReservationForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        guests: 2,
        date: "",
        time: "",
        space: "Café",
        special_requests: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post("/reservations", { ...form, guests: Number(form.guests) });
            toast.success("Reservation requested", {
                description: "We'll call you shortly to confirm your seat.",
            });
            setForm({ name: "", phone: "", guests: 2, date: "", time: "", space: "Café", special_requests: "" });
        } catch (err) {
            toast.error("Could not submit", {
                description: formatApiErrorDetail(err.response?.data?.detail) || err.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const fieldCls =
        "w-full bg-transparent border-b border-[#C8A97E]/30 rounded-none px-0 py-3 text-[#FDFBF7] focus:outline-none focus:border-[#C8A97E] placeholder:text-[#A3A59E]/50 transition-colors text-base";

    return (
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-x-10 gap-y-8" data-testid="reservation-form">
            <div className="md:col-span-2">
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2">Full Name</label>
                <input
                    required
                    data-testid="res-name"
                    className={fieldCls}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2">Phone</label>
                <input
                    required
                    data-testid="res-phone"
                    className={fieldCls}
                    placeholder="+91 99429 67016"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center gap-2">
                    <Users className="w-3 h-3" strokeWidth={1.5} /> Guests
                </label>
                <input
                    required
                    type="number"
                    min={1}
                    max={50}
                    data-testid="res-guests"
                    className={fieldCls}
                    value={form.guests}
                    onChange={(e) => update("guests", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" strokeWidth={1.5} /> Date
                </label>
                <input
                    required
                    type="date"
                    data-testid="res-date"
                    className={fieldCls + " [color-scheme:dark]"}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" strokeWidth={1.5} /> Time
                </label>
                <input
                    required
                    type="time"
                    data-testid="res-time"
                    className={fieldCls + " [color-scheme:dark]"}
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-3">Space</label>
                <div className="flex flex-wrap gap-2">
                    {SPACES.map((s) => (
                        <button
                            type="button"
                            key={s}
                            data-testid={`res-space-${s.toLowerCase()}`}
                            onClick={() => update("space", s)}
                            className={`px-5 py-2 text-xs tracking-luxe uppercase border transition-all ${
                                form.space === s
                                    ? "bg-[#C8A97E] text-[#0B120E] border-[#C8A97E]"
                                    : "border-[#C8A97E]/30 text-[#A3A59E] hover:border-[#C8A97E] hover:text-[#C8A97E]"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:col-span-2">
                <label className="block text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-2">Special requests</label>
                <textarea
                    data-testid="res-notes"
                    rows={3}
                    className={fieldCls + " resize-none"}
                    placeholder="Window seat, anniversary cake, dietary needs…"
                    value={form.special_requests}
                    onChange={(e) => update("special_requests", e.target.value)}
                />
            </div>
            <div className="md:col-span-2 pt-4">
                <button
                    type="submit"
                    disabled={submitting}
                    data-testid="res-submit"
                    className="group relative inline-flex items-center gap-3 bg-[#C8A97E] hover:bg-[#A68658] disabled:opacity-60 text-[#0B120E] px-10 py-4 text-xs tracking-luxe uppercase font-medium transition-colors"
                >
                    <span>{submitting ? "Sending…" : "Request Reservation"}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={1.75} />
                </button>
            </div>
        </form>
    );
}
