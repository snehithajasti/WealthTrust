import Home from './pages/Home';
import Features from './pages/Features';
import Analytics from './pages/Analytics';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Expensetracking from './pages/Expensetracking';
import Goalsandbudgets from './pages/Goalsandbudgets';
import Investments from './pages/Investments';
import Userinfo from './pages/Userinfo';
import {Routes,Route} from 'react-router-dom';
import { assets } from './assets/assets';
import EditTransaction from './pages/EditTransaction';




function App() {
    console.log(import.meta.env.VITE_ALPHA_VANTAGE_API_KEY);
    return(
        <div className='min-h-screen bg-slate-300'>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/about" element={<About />} />
                <Route path="/userinfo" element={<Userinfo />} />
                <Route path="/expensetracking" element={<Expensetracking />} />
                <Route path="/goalsandbudgets" element={<Goalsandbudgets />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/transactions/:id" element={<EditTransaction/>} />
            </Routes>
        </div>
    )
}

export default App
