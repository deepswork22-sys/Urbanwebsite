import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0B120E] border-t border-[#C8A97E]/10 pt-24 pb-12 px-6 lg:px-12" data-testid="site-footer">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                <div>
                    <h3 className="font-serif-display text-3xl text-[#FDFBF7]">The Urban Bungalow</h3>
                    <p className="mt-4 text-sm text-[#A3A59E] max-w-xs leading-relaxed">
                        Patna's first lifestyle hub — wellness, café, community, all beneath one quiet arch.
                    </p>
                </div>
                <div>
                    <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">Visit</p>
                    <p className="text-sm text-[#FDFBF7] leading-relaxed flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#C8A97E]" strokeWidth={1.5} />
                        House no. 77, Rajendra Nagar Road 8, Patna-16, Bihar
                    </p>
                    <p className="mt-3 text-sm text-[#A3A59E]">Open daily · 1:00 PM — 1:00 AM</p>
                </div>
                <div>
                    <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">Connect</p>
                    <a href="tel:+919942967016" className="flex items-center gap-2 text-sm text-[#FDFBF7] hover:text-[#C8A97E] transition-colors">
                        <Phone className="w-4 h-4" strokeWidth={1.5} />099429 67016
                    </a>
                    <a href="https://instagram.com/the_urban_bungalow" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#FDFBF7] hover:text-[#C8A97E] transition-colors mt-3">
                        <Instagram className="w-4 h-4" strokeWidth={1.5} />@the_urban_bungalow
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#C8A97E]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A3A59E]">
                <p>© {new Date().getFullYear()} The Urban Bungalow. All rights reserved.</p>
                <p className="font-serif-display italic text-[#C8A97E]">One place. Many stories.</p>
            </div>
        </footer>
    );
}
