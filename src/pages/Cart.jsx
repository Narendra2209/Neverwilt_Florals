import React from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();
    const total = getCartTotal();

    const handleWhatsAppCheckout = () => {
        if (cart.length === 0) return;

        let message = "Hello Neverwilt Florals 🌸\n\nI would like to place an order:\n\n";

        cart.forEach(item => {
            message += `▫️ ${item.name} \n   Qty: ${item.quantity} | Cost: ₹${item.price * item.quantity}\n`;
        });

        message += `\n*Total Amount: ₹${total}*\n`;
        message += `\n------------------\nPlease Provide:\n\nCustomer Name:\nDelivery Date:\nDelivery Address:`;

        // Phone number from config/constants
        const phoneNumber = "916363073675";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="font-serif text-3xl text-gray-400 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any flowers yet.</p>
                <Link
                    to="/shop"
                    className="bg-brand-dark text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-gray-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-serif text-3xl font-bold text-brand-dark mb-12 text-center md:text-left">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                {/* Cart Items */}
                <div className="lg:col-span-8">
                    <div className="space-y-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-lg font-medium text-brand-dark">
                                            <Link to={`/product/${item.id}`} className="hover:text-brand-pink transition-colors">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm font-medium text-gray-900 mt-2 block sm:hidden">₹{item.price * item.quantity}</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end justify-between">
                                        <p className="text-lg font-medium text-gray-900 hidden sm:block">₹{item.price * item.quantity}</p>

                                        <div className="flex items-center space-x-6 mt-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-2 text-gray-400 hover:text-brand-dark"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-2 text-gray-400 hover:text-brand-dark"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                title="Remove item"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-4 mt-16 lg:mt-0">
                    <div className="bg-brand-cream/10 rounded-2xl p-6 sm:p-8 space-y-6 border border-brand-cream">
                        <h2 className="font-serif text-xl font-bold text-brand-dark">Order Summary</h2>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium">₹{total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span className="text-brand-pink font-medium">To be discussed</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold text-brand-dark">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleWhatsAppCheckout}
                                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
                            >
                                <MessageCircle className="h-5 w-5" />
                                <span>Checkout via WhatsApp</span>
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                Secure checkout. Order details will be sent to our WhatsApp for confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
