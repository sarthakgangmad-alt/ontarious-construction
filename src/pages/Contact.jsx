import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { LiquidMetalButton } from '../components/ui/LiquidMetal';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        description: '',
        budget: '',
        timeline: '',
        location: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('leads')
                .insert([{
                    name: formState.name,
                    email: formState.email,
                    phone: formState.phone,
                    project_type: formState.serviceType,
                    description: `Budget: ${formState.budget} | Timeline: ${formState.timeline} | Location: ${formState.location} | Details: ${formState.description}`
                }]);

            if (error) throw error;
            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error', error);
            setIsSubmitting(false);
            setIsSubmitted(true);
        }
    };

    const handleAwesome = () => {
        setIsSubmitted(false);
        setFormState({
            name: '',
            phone: '',
            email: '',
            serviceType: '',
            description: '',
            budget: '',
            timeline: '',
            location: ''
        });
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white pt-20 pb-24 relative">
            {/* Success Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 md:p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100 relative"
                    >
                        <div className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="text-[#C5A059]" size={40} />
                        </div>

                        <h3 className="text-2xl font-black text-[#0F2B46] mb-3 leading-tight">
                            Request Received
                        </h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Thank you for contacting Catconstruction. Our team will review your details and respond promptly.
                        </p>

                        <LiquidMetalButton
                            onClick={handleAwesome}
                            className="w-full font-bold text-lg"
                            metalConfig={{ colorBack: '#0F2B46', colorTint: '#4682B4' }}
                        >
                            Return
                        </LiquidMetalButton>
                    </motion.div>
                </div>
            )}

            <div className="bg-[#0F2B46] text-white pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        Get In Touch With <span className="text-[#C5A059]">Catconstruction</span>
                    </motion.h1>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                        For inquiries, project consultations, or to request a quote, please call us directly at +1 (478) 312-7259 or complete the contact form below. Our team will respond promptly.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10 -mt-20">
                {/* Form moved up */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-2xl font-black text-[#0F2B46] mb-6">Request Your Free Consultation</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Type of Service</label>
                                <select
                                    name="serviceType"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.serviceType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select service...</option>
                                    <option value="Residential Renovation">Residential Renovation</option>
                                    <option value="Commercial Renovation">Commercial Renovation</option>
                                    <option value="Home Addition">Home Addition</option>
                                    <option value="New Build">New Build</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Budget Range</label>
                                <select
                                    name="budget"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.budget}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select budget...</option>
                                    <option value="Under $50k">Under $50k</option>
                                    <option value="$50k - $100k">$50k - $100k</option>
                                    <option value="$100k - $250k">$100k - $250k</option>
                                    <option value="$250k+">$250k+</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Preferred Timeline</label>
                                <select
                                    name="timeline"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.timeline}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select timeline...</option>
                                    <option value="Immediately">Immediately</option>
                                    <option value="1-3 Months">1-3 Months</option>
                                    <option value="3-6 Months">3-6 Months</option>
                                    <option value="6+ Months">6+ Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Property Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="City/Neighborhood"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                    value={formState.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Project Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all resize-none"
                                value={formState.description}
                                onChange={handleChange}
                            />
                        </div>

                        <p className="text-sm text-center text-slate-500 my-4 font-medium">Call us directly at <a href="tel:478-312-7259" className="text-[#0F2B46] font-bold hover:text-[#C5A059]">+1 (478) 312-7259</a> for immediate assistance.</p>

                        <LiquidMetalButton
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full font-bold text-[#0F2B46] tracking-wider py-4"
                            metalConfig={{ colorBack: '#0F2B46', colorTint: '#4682B4' }}
                        >
                            {isSubmitting ? 'Processing request...' : 'Submit Request'}
                        </LiquidMetalButton>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Contact Info */}
                    <div className="space-y-8 flex flex-col justify-center">
                        <div>
                            <h3 className="text-2xl font-bold text-[#0F2B46] mb-6">Contact Details</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed border-l-4 border-[#C5A059] pl-4">
                                Partner with Catconstruction for premium residential and commercial renovations across the Greater Toronto Area.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                                <Phone className="text-[#C5A059] mt-1 shrink-0" size={24} />
                                <div className="ml-4">
                                    <h4 className="font-bold text-[#0F2B46] uppercase text-sm tracking-wider mb-1">Phone</h4>
                                    <p className="text-slate-600"><a href="tel:478-312-7259" className="hover:text-[#C5A059] transition-colors">+1 (478) 312-7259</a></p>
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                                <MapPin className="text-[#C5A059] mt-1 shrink-0" size={24} />
                                <div className="ml-4">
                                    <h4 className="font-bold text-[#0F2B46] uppercase text-sm tracking-wider mb-1">Service Area</h4>
                                    <p className="text-slate-600">Toronto & Greater Toronto Area</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                                <Clock className="text-[#C5A059] mt-1 shrink-0" size={24} />
                                <div className="ml-4">
                                    <h4 className="font-bold text-[#0F2B46] uppercase text-sm tracking-wider mb-1">Office Hours</h4>
                                    <p className="text-slate-600">Monday – Saturday | 8:00 AM – 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-full min-h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 relative">
                        {/* Google Map Placeholder */}
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Toronto,%20ON&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
                <h3 className="text-3xl font-black text-[#0F2B46] mb-6">Ready to start your renovation?</h3>
                <p className="text-xl text-slate-600">Call <a href="tel:478-312-7259" className="font-bold text-[#0F2B46] hover:text-[#C5A059] transition-colors">+1 (478) 312-7259</a> today.</p>
            </div>

        </div>
    );
}
