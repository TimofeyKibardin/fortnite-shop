import { makeAutoObservable } from "mobx";
import { CartItem } from '../types/CartItem';

const CART_STORAGE_KEY = "fortnite_cart";

export class CartStore {
    cart: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    private saveToStorage() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    }

    private loadFromStorage() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                this.cart = JSON.parse(stored);
            } catch {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
    }

    addToCart(item: CartItem) {
        if (!this.cart.find((i) => i.combinedId === item.combinedId)) {
            this.cart.push(item);
            this.saveToStorage();
        }
    }

    removeFromCart(combinedId: string) {
        this.cart = this.cart.filter((i) => i.combinedId !== combinedId);
        this.saveToStorage();
    }

    clearCart() {
        this.cart = [];
        this.saveToStorage();
    }

    isInCart(combinedId: string) {
        return this.cart.some((i) => i.combinedId === combinedId);
    }
}