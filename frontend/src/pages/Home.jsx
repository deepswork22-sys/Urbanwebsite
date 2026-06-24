import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import ReservationForm from "../components/site/ReservationForm";
import MenuPreview from "../components/site/MenuPreview";
import { ArrowDown, MapPin, Star, Sparkles, Coffee, Flower2, PartyPopper, Baby } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1759219782028-d47f7ce44f61?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxmYWNhZGUlMjByZXN0YXVyYW50JTIwbmlnaHQlMjBleHRlcmlvcnxlbnwwfHx8fDE3ODIzMzUzOTV8MA&ixlib=rb-4.1.0&q=85";
const CAFE_IMG = "https://images.unsplash.com/photo-1768051297672-2d17db1b9e09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBjYWZlJTIwaW50ZXJpb3IlMjBtb29keSUyMGxpZ2h0aW5nfGVufDB8fHx8MTc4MjMzNTM4NHww&ixlib=rb-4.1.0&q=85";
const PILATES_IMG = "https://images.pexels.com/photos/35553893/pexels-photo-35553893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const BANQUET_IMG = "https://images.pexels.com/photos/12688995/pexels-photo-12688995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const PLAYZONE_IMG = "https://images.pexels.com/photos/9821661/pexels-photo-9821661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const INSIDE_IMG = "https://images.pexels.com/photos/12530856/pexels-photo-12530856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const SPACES = [
    {
        kicker: "Wellness Café",
        title: "The Urban Café",
        body: "Slow mornings, single-origin coffee and a menu built around feeling good. The warm heart of the bungalow.",
        img: CAFE_IMG,
        icon: Coffee,
        span: "md:col-span-7 md:row-span-2",
        height: "h-[520px] md:h-full",
    },
    {
        kicker: "Move & Restore",
        title: "Pilates Studio",
        body: "Reformer-led Pilates in a light-filled studio. Because you had us at Pilates.",
        img: PILATES_IMG,
        icon: Flower2,
        span: "md:col-span-5",
        height: "h-[340px]",
    },
    {
        kicker: "Gather & Celebrate",
        title: "The Banquet",
        body: "A flexible candle-lit space for birthdays, brunches and big moments.",
        img: BANQUET_IMG,
        icon: PartyPopper,
        span: "md:col-span-5",
        height: "h-[340px]",
    },
    {
        kicker: "Little Adventurers",
        title: "PlayZone",
        body: "A safe, imaginative corner where the kids can be loud while you slow down.",
        img: PLAYZONE_IMG,
        icon: Baby,
        span: "md:col-span-12",
        height: "h-[420px]",
    },
];

export default function Home() {
    return (
        <div className="relative grain bg-[#0B120E] min-h-screen text-[#FDFBF7]">
            <Navbar />

            {/* HERO */}
            <section className="relative h-screen min-h-[760px] overflow-hidden" data-testid="hero-section">
                <img src={HERO_IMG} alt="The Urban Bungalow facade at night" className="absolute inset-0 w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B120E]/40 via-[#0B120E]/55 to-[#0B120E]" />
                <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                        <p className="fade-up text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-6 flex items-center gap-3">
                            <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                            Patna · Rajendra Nagar
                        </p>
                        <h1 className="fade-up delay-1 font-serif-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] max-w-5xl">
                            One place.<br />
                            <em className="not-italic text-[#C8A97E] font-serif-display italic">Many stories.</em>
                        </h1>
                        <p className="fade-up delay-2 mt-8 max-w-xl text-base md:text-lg text-[#FDFBF7]/80 font-light leading-relaxed">
                            Patna's first lifestyle hub — a wellness café, Pilates studio, kids' play zone and banquet, all beneath one quiet arch.
                        </p>
                        <div className="fade-up delay-3 mt-12 flex flex-wrap gap-4">
                            <a
                                href="#reserve"
                                data-testid="hero-reserve-btn"
                                className="bg-[#C8A97E] hover:bg-[#A68658] text-[#0B120E] px-8 py-4 text-xs tracking-luxe uppercase font-medium transition-colors"
                            >
                                Reserve a seat
                            </a>
                            <a
                                href="#spaces"
                                data-testid="hero-explore-btn"
                                className="border border-[#C8A97E]/60 hover:border-[#C8A97E] hover:bg-[#C8A97E]/10 text-[#C8A97E] px-8 py-4 text-xs tracking-luxe uppercase font-medium transition-colors"
                            >
                                Explore the spaces
                            </a>
                        </div>
                    </div>
                </div>
                <a href="#intro" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C8A97E] animate-bounce" aria-label="Scroll">
                    <ArrowDown className="w-5 h-5" strokeWidth={1.5} />
                </a>
            </section>

            {/* INTRO BAND */}
            <section id="intro" className="relative py-24 md:py-32 px-6 lg:px-12 border-b border-[#C8A97E]/10" data-testid="intro-section">
                <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-end">
                    <div className="md:col-span-7">
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-6">A lifestyle corner in Patna</p>
                        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-[#FDFBF7] leading-[1.05] tracking-tight">
                            Wellness, café & community —<br />
                            <em className="text-[#C8A97E] not-italic italic font-serif-display">beautifully together.</em>
                        </h2>
                    </div>
                    <div className="md:col-span-5 md:pl-12">
                        <p className="text-[#A3A59E] text-base md:text-lg leading-relaxed font-light">
                            More than a café — it's a place to move, eat well, let the kids play and gather with the people you love. Step under the arch and every part of a good day is waiting.
                        </p>
                        <div className="mt-10 grid grid-cols-3 gap-8 pt-8 border-t border-[#C8A97E]/15">
                            <div>
                                <div className="font-serif-display text-3xl text-[#C8A97E] flex items-baseline gap-1">
                                    4.2<Star className="w-4 h-4 fill-[#C8A97E]" strokeWidth={0} />
                                </div>
                                <p className="text-[10px] tracking-luxe uppercase text-[#A3A59E] mt-1">235 reviews</p>
                            </div>
                            <div>
                                <div className="font-serif-display text-3xl text-[#C8A97E]">2.3K</div>
                                <p className="text-[10px] tracking-luxe uppercase text-[#A3A59E] mt-1">Followers</p>
                            </div>
                            <div>
                                <div className="font-serif-display text-3xl text-[#C8A97E]">4</div>
                                <p className="text-[10px] tracking-luxe uppercase text-[#A3A59E] mt-1">Spaces, one roof</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SPACES — BENTO */}
            <section id="spaces" className="relative py-32 px-6 lg:px-12" data-testid="spaces-section">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 max-w-2xl">
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">Four spaces · one bungalow</p>
                        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-[#FDFBF7] leading-[1.05] tracking-tight">
                            Pick your corner<br />
                            <em className="italic text-[#C8A97E] not-italic font-serif-display">of the day.</em>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-12 md:auto-rows-[260px] gap-4">
                        {SPACES.map((s) => {
                            const Icon = s.icon;
                            return (
                                <article
                                    key={s.title}
                                    data-testid={`space-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={`${s.span} ${s.height} relative group overflow-hidden border border-[#C8A97E]/10`}
                                >
                                    <img
                                        src={s.img}
                                        alt={s.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B120E] via-[#0B120E]/60 to-transparent" />
                                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                                        <div className="flex items-center gap-2 text-[10px] tracking-luxe uppercase text-[#C8A97E] mb-3">
                                            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                                            {s.kicker}
                                        </div>
                                        <h3 className="font-serif-display text-3xl md:text-4xl text-[#FDFBF7] mb-3">{s.title}</h3>
                                        <p className="text-sm text-[#FDFBF7]/75 max-w-md font-light leading-relaxed">{s.body}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* INSIDE STRIP */}
            <section className="relative py-32 px-6 lg:px-12 border-y border-[#C8A97E]/10 bg-[#151F19]" data-testid="inside-section">
                <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5">
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /> Inside the bungalow
                        </p>
                        <h2 className="font-serif-display text-4xl md:text-5xl font-light leading-[1.05] tracking-tight">
                            Brass, candlelight,<br />
                            <em className="italic text-[#C8A97E] not-italic font-serif-display">and conversation.</em>
                        </h2>
                        <p className="mt-8 text-[#A3A59E] leading-relaxed font-light">
                            Designed by hand with warm woods, terracotta floors and arched alcoves — every corner is meant to make you stay a little longer.
                        </p>
                    </div>
                    <div className="md:col-span-7 grid grid-cols-2 gap-4">
                        <img src={INSIDE_IMG} alt="Cafe interior" className="w-full h-72 object-cover" />
                        <img src={CAFE_IMG} alt="Cafe seating" className="w-full h-72 object-cover translate-y-8" />
                    </div>
                </div>
            </section>

            {/* MENU */}
            <MenuPreview />

            {/* RESERVE */}
            <section id="reserve" className="relative py-32 px-6 lg:px-12 bg-[#0B120E]" data-testid="reserve-section">
                <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16">
                    <div className="md:col-span-5">
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">Reserve a seat</p>
                        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
                            Save your table<br />
                            <em className="italic text-[#C8A97E] not-italic font-serif-display">at the bungalow.</em>
                        </h2>
                        <p className="mt-8 text-[#A3A59E] leading-relaxed font-light max-w-sm">
                            Tell us when you're coming and how many. We'll hold a spot and call you back to confirm.
                        </p>
                        <div className="mt-10 pt-8 border-t border-[#C8A97E]/15 space-y-3 text-sm text-[#A3A59E]">
                            <p><span className="text-[#C8A97E] tracking-luxe uppercase text-[10px] block mb-1">Address</span>House no 77, Rajendra Nagar, Road 8, Patna-16</p>
                            <p><span className="text-[#C8A97E] tracking-luxe uppercase text-[10px] block mb-1">Hours</span>1:00 PM — 1:00 AM · Open daily</p>
                            <p><span className="text-[#C8A97E] tracking-luxe uppercase text-[10px] block mb-1">Call</span><a href="tel:+919942967016" className="text-[#FDFBF7] hover:text-[#C8A97E]">099429 67016</a></p>
                        </div>
                    </div>
                    <div className="md:col-span-7 bg-[#151F19] border border-[#C8A97E]/15 p-8 md:p-12">
                        <ReservationForm />
                    </div>
                </div>
            </section>

            {/* VISIT */}
            <section id="visit" className="relative py-32 px-6 lg:px-12 bg-[#151F19]" data-testid="visit-section">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">Find us</p>
                    <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
                        Drop by the<br /><em className="italic text-[#C8A97E] not-italic font-serif-display">bungalow.</em>
                    </h2>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=The+Urban+Bungalow+Rajendra+Nagar+Patna"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#C8A97E] hover:bg-[#A68658] text-[#0B120E] px-8 py-4 text-xs tracking-luxe uppercase font-medium transition-colors"
                            data-testid="visit-directions"
                        >
                            Get Directions
                        </a>
                        <a
                            href="https://wa.me/919942967016"
                            target="_blank"
                            rel="noreferrer"
                            className="border border-[#C8A97E]/60 hover:border-[#C8A97E] hover:bg-[#C8A97E]/10 text-[#C8A97E] px-8 py-4 text-xs tracking-luxe uppercase font-medium transition-colors"
                            data-testid="visit-whatsapp"
                        >
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
