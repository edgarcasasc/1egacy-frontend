import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Cargar del almacenamiento local si existe
const initialCart = browser && localStorage.getItem('1egacy_cart') 
    ? JSON.parse(localStorage.getItem('1egacy_cart')) 
    : [];

export const cart = writable(initialCart);

// Guardar cambios automáticamente
if (browser) {
    cart.subscribe((items) => {
        localStorage.setItem('1egacy_cart', JSON.stringify(items));
    });
}

// Acciones
export const addToCart = (product) => {
    cart.update((items) => {
        const existing = items.find((i) => i.id === product.id); // Asegúrate que tus productos tengan 'id' o '_id'
        if (existing) {
            return items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...items, { ...product, quantity: 1 }];
    });
};

export const removeFromCart = (id) => {
    cart.update((items) => items.filter((i) => i.id !== id));
};

// Totales calculados automáticamente
export const cartCount = derived(cart, $cart => 
    $cart.reduce((acc, item) => acc + item.quantity, 0)
);

export const cartTotal = derived(cart, $cart => 
    $cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
);