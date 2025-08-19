import { makeAutoObservable, observable } from "mobx";
import { CartItem } from '../types/CartItem';

const CART_STORAGE_KEY = "fortnite_cart";

export class CartStore {
    cartItems = new Map<string, CartItem>(); // CartItem list
    cartIds = observable.set<string>(); // Fast check

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    private saveToStorage() {
        const items = Array.from(this.cartItems.values());
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }

    private loadFromStorage() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                const parsed: CartItem[] = JSON.parse(stored);
                parsed.forEach((item) => {
                    this.cartItems.set(item.combinedId, item);
                    this.cartIds.add(item.combinedId);
                });
            } catch {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
    }

    // Computed, returns computed result
    get cart() {
        return Array.from(this.cartItems.values());
    }

    toggle(item: CartItem) {
        this.isInCart(item.combinedId)
            ? this.removeFromCart(item.combinedId)
            : this.addToCart(item);
    }

    addToCart(item: CartItem) {
        if (!this.cartItems.has(item.combinedId)) {
            this.cartItems.set(item.combinedId, item);
            this.cartIds.add(item.combinedId);
            this.saveToStorage();
        }
    }

    removeFromCart(combinedId: string) {
        this.cartItems.delete(combinedId);
        this.cartIds.delete(combinedId);
        this.saveToStorage();
    }

    clearCart() {
        this.cartItems.clear();
        this.cartIds.clear();
        this.saveToStorage();
    }

    isInCart(combinedId: string) {
        return this.cartIds.has(combinedId);
    }
}