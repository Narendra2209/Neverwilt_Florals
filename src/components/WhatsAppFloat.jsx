import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
    const phoneNumber = "919876543210";
    const message = "Hello Neverwilt Florals 🌸, I would like to make an enquiry.";

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center justify-center group overflow-hidden"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} /> {/* WhatsApp-like icon style */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-bold opacity-0 group-hover:opacity-100">
                Chat Now
            </span>
        </button>
    );
}
