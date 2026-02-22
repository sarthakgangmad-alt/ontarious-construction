import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0F2B46] text-white py-20 border-t border-[#1a3c5e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <img
                                src="/logo.png"
                                alt="Catconstruction"
                                className="h-24 w-auto object-contain rounded"
                            />
                        </Link>
                        <p className="text-slate-300 leading-relaxed mb-6 font-light">
                            Building Excellence. Delivering Quality.
                            <br />
                            Premium residential and commercial renovation in Toronto & GTA.
                        </p>
                        <div className="text-[#C5A059] text-sm font-semibold tracking-wider uppercase">
                            <p>Licensed & Insured</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#C5A059]">Quick Links</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
                            <li><Link to="/portfolio" className="hover:text-white hover:translate-x-1 transition-all inline-block">Our Projects</Link></li>
                            <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#C5A059]">Services</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Residential Renovation</Link></li>
                            <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Commercial Build-outs</Link></li>
                            <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home Additions</Link></li>
                            <li><Link to="/services" className="hover:text-white hover:translate-x-1 transition-all inline-block">Interlocking & Concrete</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-[#C5A059]">Contact Us</h4>
                        <div className="space-y-5 text-slate-300">
                            <div className="flex items-start">
                                <MapPin size={18} className="text-[#C5A059] mt-1 mr-3 shrink-0" />
                                <p>Toronto &<br />Greater Toronto Area</p>
                            </div>
                            <div className="flex items-center">
                                <Phone size={18} className="text-[#C5A059] mr-3 shrink-0" />
                                <p><a href="tel:4783127259" className="hover:text-white transition-colors">+1 (478) 312-7259</a></p>
                            </div>
                            <div className="flex items-center">
                                <Mail size={18} className="text-[#C5A059] mr-3 shrink-0" />
                                <p><a href="mailto:info@catconstruction.ca" className="hover:text-white transition-colors">info@catconstruction.ca</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1a3c5e] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Catconstruction. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#C5A059] transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-[#C5A059] transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-[#C5A059] transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
