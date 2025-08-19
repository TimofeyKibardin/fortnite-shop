import { Routes, Route } from 'react-router-dom';

import Header from '../widgets/header/Header';
import Footer from '../widgets/footer/Footer';
import HomePage from '../pages/home/HomePage';
import CartPage from '../pages/cart/CartPage';
import { useEffect, useState } from 'react';


function App() {
    const [itemTitle, setItemTitle] = useState<string>(() => {
        const stored = localStorage.getItem("itemTitle");
        return stored ?? "";
    });

    // Save itemRarity in localStorage
    useEffect(() => {
        localStorage.setItem('itemTitle', itemTitle);
    }, [itemTitle]);

    return (
        <div>
            <Header setItemTitle={setItemTitle} />
            <Routes>
                <Route path='/' element={<HomePage itemTitle={itemTitle} />}/>
                <Route path='/cart' element={<CartPage />}/>
            </Routes>
            <Footer />  
        </div>
    );
}

export default App;