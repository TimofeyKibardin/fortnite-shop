import { Routes, Route } from 'react-router-dom';

import Header from '../widgets/header/Header';
import Footer from '../widgets/footer/Footer';
import HomePage from '../pages/home/HomePage';
import CartPage from '../pages/cart/CartPage';


function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/cart' element={<CartPage />}/>
            </Routes>
            <Footer />  
        </div>
    );
}

export default App;