import { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Initialize state lazy style to avoid flicker if possible, 
    // but useEffect is safer for hydration matching in some frameworks.
    // Since this is Vite SPA, immediate read is fine.
    const [products, setProducts] = useState(() => {
        const stored = localStorage.getItem('neverwilt_products_v2');
        return stored ? JSON.parse(stored) : initialProducts;
    });

    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('neverwilt_cart_v2');
        return stored ? JSON.parse(stored) : [];
    });

    // Persist Products
    useEffect(() => {
        localStorage.setItem('neverwilt_products_v2', JSON.stringify(products));
    }, [products]);

    // Persist Cart
    useEffect(() => {
        localStorage.setItem('neverwilt_cart_v2', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQ = item.quantity + delta;
                return newQ > 0 ? { ...item, quantity: newQ } : item;
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts(prev => [...prev, newProduct]);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            addProduct,
            deleteProduct
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
