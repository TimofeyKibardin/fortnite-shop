import { ReactNode, useEffect, useState } from "react";
import { CartContext } from "../../shared/context/CartContext";
import { CartItem } from "../../shared/types/CartItem";

const CART_STORAGE_KEY = 'fortnite_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Инициализация из localStorage
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                try {
                    setCart(JSON.parse(stored));
                } catch {
                    localStorage.removeItem(CART_STORAGE_KEY);
                }
            }
    }, []);

    // Изменение корзины - синхронизация localStorage
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Очистка корзины
    const clearCart = () => setCart([]);

    // Удаление из корзины
    const removeFromCart = (combinedId: string) => {
        setCart((prev) => prev.filter((i) => i.combinedId !== combinedId));
    }

    // Добавление в корзину
    const addToCart = (item: CartItem) => {
        setCart((prev) => prev.find((i) => i.mainId === item.mainId) ? prev : [...prev, item]);
    }

    const isInCart = (combinedId: string) => cart.some((i) => i.combinedId === combinedId);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
}