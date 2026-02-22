import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Ruler, Clock, Star, Hammer, Layers, Layout, Home as HomeIcon, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiquidMetalButton } from '../components/ui/LiquidMetal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HomeContactForm from '../components/HomeContactForm';

export default function Home() {
    const canvasRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const totalOriginalFrames = 211;
    const frameStep = 1; // Play every frame for maximum smoothness
    const frameInterval = 50; // Slower playback (20fps)

    // Store loaded images in a ref to avoid re-renders
    const imagesCache = useRef([]);

    // Preload Images
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const promises = [];
            // Generate list of frames to load (1, 3, 5, ...)
            for (let i = 1; i <= totalOriginalFrames; i += frameStep) {
                promises.push(new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `/hero-sequence/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
                    img.onload = () => resolve({ index: i, img });
                    img.onerror = () => resolve({ index: i, img: null }); // Don't fail all if one fails
                }));
            }

            try {
                const results = await Promise.all(promises);
                if (!isMounted) return;

                // Store in cache: key = frameIndex, value = img object
                // We map loaded frames to a continuous array for easy looping
                const loaded = results
                    .filter(r => r.img !== null)
                    .sort((a, b) => a.index - b.index)
                    .map(r => r.img);

                imagesCache.current = loaded;
                setImagesLoaded(true);
            } catch (err) {
                console.error("Failed to load sequence", err);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // Animation Loop (Canvas)
    useEffect(() => {
        if (!imagesLoaded || imagesCache.current.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let lastTime = 0;
        let currentFrameIndex = 0; // Index in the REDUCED cache array

        const drawFrame = (index) => {
            const img = imagesCache.current[index];
            if (!img) return;

            // object-cover logic for canvas
            const w = canvas.width;
            const h = canvas.height;
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW, drawH, curX, curY;
            if (imgRatio > canvasRatio) {
                drawH = h;
                drawW = h * imgRatio;
                curX = (w - drawW) / 2;
                curY = 0;
            } else {
                drawW = w;
                drawH = w / imgRatio;
                curX = 0;
                curY = (h - drawH) / 2;
            }

            ctx.drawImage(img, curX, curY, drawW, drawH);
        };

        // Set canvas size to match first image (assuming consistant size)
        // Or fit to container
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
                // Draw current frame immediately after resize
                drawFrame(currentFrameIndex);
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = (time) => {
            if (time - lastTime >= frameInterval) {
                currentFrameIndex = (currentFrameIndex + 1) % imagesCache.current.length;
                drawFrame(currentFrameIndex);
                lastTime = time;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [imagesLoaded]);

    return (
        <div className="bg-white">
            {/* Optimized Canvas Hero Section */}
            <section className="relative h-screen flex items-center bg-[#0F2B46] text-white overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    {/* 
                       While loading, show static fallback (Frame 1).
                       Once loaded, show Canvas.
                     */}
                    {!imagesLoaded && (
                        <img
                            src="/hero-sequence/ezgif-frame-001.jpg"
                            alt="Loading..."
                            className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm transition-opacity duration-500"
                        />
                    )}

                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F2B46]/95 via-[#0F2B46]/80 to-transparent z-10 mix-blend-multiply" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center space-x-3 text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-8 text-sm md:text-base">
                            <span className="w-16 h-0.5 bg-[#C5A059]"></span>
                            <span>Ontarious Construction</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                            Premium Builders. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C079]">
                                Limitless Potential.
                            </span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-[#C5A059] mb-10 tracking-wide">
                            Call Now: <a href="tel:647-642-1281" className="hover:text-white transition-colors">(647) 642-1281</a>
                        </p>
                        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-light border-l-4 border-[#C5A059] pl-6">
                            Professional Residential & Commercial Renovation Services across Toronto & the GTA. Quality that stands the test of time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/contact">
                                <LiquidMetalButton
                                    size="lg"
                                    icon={<ArrowRight className="w-5 h-5" />}
                                    metalConfig={{ colorBack: '#C5A059', colorTint: '#E5C079' }}
                                    className="font-bold uppercase tracking-wider"
                                >
                                    Request a Quote
                                </LiquidMetalButton>
                            </Link>
                            <a href="tel:647-642-1281" className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-slate-500 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#0F2B46] hover:border-white transition-all rounded-sm">
                                Call (647) 642-1281
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Snippet */}
            <section className="py-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C5A059]/10 rounded-full z-0"></div>
                            <h2 className="relative z-10 text-4xl md:text-6xl font-black text-[#0F2B46] mb-8 leading-tight">
                                Quality Without Compromise.
                            </h2>
                        </div>
                        <div>
                            <p className="text-xl text-slate-600 leading-relaxed mb-6 font-light">
                                <span className="font-bold text-[#0F2B46]">Ontarious Construction</span> is a premier residential and commercial renovation firm proudly serving Toronto and the Greater Toronto Area.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                We are committed to meticulous craftsmanship, professionalism, and delivering projects that consistently exceed expectations. Our licensed team ensures precision, structural integrity, and architectural excellence from foundational work to the final finish.
                            </p>
                            <Link to="/about" className="text-[#0F2B46] font-bold uppercase tracking-widest border-b-2 border-[#C5A059] pb-1 hover:text-[#C5A059] transition-colors">
                                Discover Our Standards
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-slate-50 relative z-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 px-2">
                        <span className="text-[#C5A059] font-bold uppercase tracking-wider text-sm">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0F2B46] mt-3">Premium Services</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Residential Renovations', desc: 'Full-scale interior transformations including kitchens, bathrooms, and basements.', image: '/services/res_renovation_1771742585128.png' },
                            { title: 'Commercial Build-Outs', desc: 'Customized commercial renovations tailored for retail, office, and hospitality.', image: '/services/com_buildout_1771742607982.png' },
                            { title: 'Home Additions', desc: 'Seamlessly integrated structural expansions that enhance your living space.', image: '/services/home_addition_1771742626405.png' },
                            { title: 'Custom Outdoor Spaces', desc: 'High-end decks, patios, and outdoor living structures.', image: '/services/outdoor_space_1771742647048.png' },
                            { title: 'Concrete & Interlocking', desc: 'Durable, architecturally designed driveways, walkways, and retaining walls.', image: '/services/concrete_interloc_1771742667218.png' },
                            { title: 'General Contracting', desc: 'Comprehensive project management to oversee every phase of construction.', image: '/services/gen_contracting_1771742685294.png' }
                        ].map((service, i) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white shadow-sm hover:shadow-2xl transition-all duration-300 group rounded-xl overflow-hidden border border-slate-100 flex flex-col h-full"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-[#0F2B46]/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-[#0F2B46] mb-4">{service.title}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed text-sm flex-grow">{service.desc}</p>
                                    <Link to="/services" className="text-[#C5A059] font-bold text-xs uppercase tracking-wider flex items-center mt-auto">
                                        View Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Homepage Contact Form Section */}
            <section className="py-24 bg-white relative z-20 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0F2B46] mb-4">Request Your Free Consultation</h2>
                        <p className="text-xl text-slate-500 font-light">Complete the form below to receive a detailed estimate for your premium construction project.</p>
                    </div>
                    <HomeContactForm />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-[#0F2B46] relative overflow-hidden z-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#163b5e] skew-x-12 translate-x-20 opacity-50" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-[#C5A059] font-bold uppercase tracking-wider text-sm">Testimonials</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Client Satisfaction</h2>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                            <div className="flex text-[#C5A059] mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="#C5A059" size={24} />)}
                            </div>
                            <p className="text-slate-300 font-medium">5.0 Star Rating</p>
                        </div>
                    </div>

                    <TestimonialCarousel />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white text-center z-20 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-black text-[#0F2B46] mb-8">Ready to Build?</h2>
                    <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light">
                        Contact Ontarious Construction today for a consultation on your premium residential or commercial renovation project.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/contact">
                            <LiquidMetalButton
                                size="lg"
                                icon={<ArrowRight className="w-5 h-5" />}
                                metalConfig={{ colorBack: '#0F2B46', colorTint: '#4682B4' }}
                                className="font-bold text-lg px-12"
                            >
                                Contact Us
                            </LiquidMetalButton>
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-center items-center space-x-2 text-slate-400 text-sm uppercase tracking-widest font-bold">
                        <span>Toronto</span>
                        <span className="w-1 h-1 bg-[#C5A059] rounded-full"></span>
                        <span>Greater Toronto Area</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

// ... Additional Code (imports etc handled by write_to_file)
