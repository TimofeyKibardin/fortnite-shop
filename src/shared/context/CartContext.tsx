import { createContext, useContext } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
    cart: CartItem[];   // Массив объектов в корзине
    addToCart: (item: CartItem) => void;    // Добавить в корзину
    removeFromCart: (combinedId: string) => void;   // Удалить из корзины
    isInCart: (combinedId: string) => boolean; // Находится ли товар в корзине
    clearCart: () => void;  // Очистить всю корзину
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be within CartProvider');
    return context;
}