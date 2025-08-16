import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { CartStore } from "./shared/stores/CartStore";

// Stores
export const cartStore = new CartStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);