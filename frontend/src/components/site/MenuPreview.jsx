const MENU = [
    {
        category: "Slow Mornings",
        items: [
            { name: "Saffron Bun & Cardamom Latte", price: "₹ 320", note: "house signature" },
            { name: "Sourdough · Avocado · Pickled Onion", price: "₹ 380" },
            { name: "Buckwheat Pancakes, Jaggery, Berries", price: "₹ 360" },
            { name: "Masala Omelette, Charcoal Brioche", price: "₹ 290" },
        ],
    },
    {
        category: "Wellness Bowls",
        items: [
            { name: "Roasted Pumpkin · Quinoa · Tahini", price: "₹ 420" },
            { name: "Sprouted Lentil Caesar", price: "₹ 380" },
            { name: "Burnt Aubergine, Labneh, Pomegranate", price: "₹ 410", note: "chef's pick" },
            { name: "Smoked Paneer Tikka Bowl", price: "₹ 440" },
        ],
    },
    {
        category: "From the Bar",
        items: [
            { name: "Single-Origin Pour Over", price: "₹ 260" },
            { name: "Rose · Cardamom · Cold Brew", price: "₹ 300" },
            { name: "Turmeric Tonic, Aged Honey", price: "₹ 240" },
            { name: "Old Monk Iced Mocha", price: "₹ 340" },
        ],
    },
    {
        category: "Sweet Endings",
        items: [
            { name: "Burnt Basque Cheesecake", price: "₹ 320" },
            { name: "Pistachio Kulfi, Olive Oil", price: "₹ 280" },
            { name: "Dark Chocolate · Sea Salt Tart", price: "₹ 340" },
        ],
    },
];

export default function MenuPreview() {
    return (
        <section id="menu" className="relative py-32 px-6 lg:px-12 bg-[#0B120E]" data-testid="menu-section">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20">
                    <div>
                        <p className="text-[11px] tracking-luxe uppercase text-[#C8A97E] mb-4">A taste of the bungalow</p>
                        <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#FDFBF7] leading-[1.05]">
                            From our kitchen,<br />
                            <em className="text-[#C8A97E] not-italic font-serif-display italic">with intention.</em>
                        </h2>
                    </div>
                    <p className="text-sm text-[#A3A59E] max-w-sm font-light leading-relaxed">
                        Seasonal, slow-cooked and served by candle. A handpicked excerpt from our daily card.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
                    {MENU.map((group) => (
                        <div key={group.category}>
                            <h3 className="font-serif-display text-2xl text-[#C8A97E] mb-8 pb-3 border-b border-[#C8A97E]/20">
                                {group.category}
                            </h3>
                            <ul className="space-y-6">
                                {group.items.map((item) => (
                                    <li key={item.name} className="flex items-baseline gap-4">
                                        <span className="font-serif-display text-lg text-[#FDFBF7]">{item.name}</span>
                                        <span
                                            className="flex-1 border-b border-dotted border-[#C8A97E]/30 mb-1"
                                            aria-hidden
                                        />
                                        <span className="font-sans-body text-sm text-[#C8A97E] tabular-nums">
                                            {item.price}
                                        </span>
                                        {item.note && (
                                            <span className="ml-2 hidden md:inline text-[10px] tracking-luxe uppercase text-[#A3A59E] italic font-serif-display">
                                                {item.note}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="mt-20 text-center text-xs tracking-luxe uppercase text-[#A3A59E]">
                    Full menu available in-house · prices inclusive of taxes
                </p>
            </div>
        </section>
    );
}
