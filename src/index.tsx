import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { CartProvider } from './app/providers/CartProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <CartProvider>
        <App />
    </CartProvider>
);