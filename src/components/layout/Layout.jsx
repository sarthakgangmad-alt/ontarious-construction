import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-[#C5A059] selection:text-[#0F2B46]">
            {/* Sticky Top Contact Bar */}
            <div className="bg-[#0F2B46] text-white py-2 text-center text-sm font-semibold tracking-wider relative z-[60] border-b border-[#1a3c5e]">
                For Inquiries & Consultations, Call Us Directly: <a href="tel:647-642-1281" className="text-[#C5A059] hover:text-white transition-colors">(647) 642-1281</a>
            </div>

            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Sitewide CTA Band */}
            <div className="bg-[#C5A059] py-12 text-center border-b-4 border-[#0F2B46]">
                <h2 className="text-3xl md:text-4xl font-black text-[#0F2B46] mb-4 uppercase tracking-wide">Let’s Build Something Exceptional.</h2>
                <p className="text-[#0F2B46] font-bold text-2xl">Call <a href="tel:647-642-1281" className="hover:text-white transition-colors">(647) 642-1281</a></p>
            </div>

            <Footer />
        </div>
    );
}
