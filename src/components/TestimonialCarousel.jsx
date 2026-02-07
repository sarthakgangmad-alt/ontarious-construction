import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        rating: "5.0",
        title: "Absolutely Exceptional!",
        text: "I’m beyond impressed with the level of professionalism and results delivered. Artina Contracting’s team truly understands what clients need and goes the extra mile at every step. The entire experience was seamless and impactful — highly recommended!",
        name: "Richard H.",
        role: "Senior Partner, Horizon Group"
    },
    {
        rating: "4.9",
        title: "Transformed Our Expectations!",
        text: "Working with Artina Contracting exceeded all our expectations. Their insight, strategic execution, and unwavering support made the project run smoothly and efficiently. If you want quality, vision, and reliability — this is where you get it.",
        name: "Amanda L.",
        role: "Director of Operations"
    },
    {
        rating: "5.0",
        title: "Unmatched Quality & Customer Focus",
        text: "Artina Contracting’s commitment to excellence is obvious from day one. Their attention to detail, clear communication, and proactive problem-solving truly set them apart. We saw real value and measurable impact.",
        name: "Marcus T.",
        role: "Property Developer"
    },
    {
        rating: "4.8",
        title: "Highly Professional & Results-Driven",
        text: "From concept to completion, Artina Contracting delivered on every promise. The team is proactive, knowledgeable, and always available to guide us. We’re extremely satisfied with the outcome.",
        name: "Jennifer W.",
        role: "Project Lead"
    },
    {
        rating: "4.9",
        title: "Elevated Our Business Growth!",
        text: "The expertise and support we received were outstanding. Artina Contracting helped us refine our strategy, optimize execution, and scale faster than expected. One of the best decisions we’ve made.",
        name: "Robert C.",
        role: "CEO, C-Corp"
    }
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-slide functionality
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 4000); // 4 seconds

        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Swipe handlers
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <div
            className="w-full max-w-4xl mx-auto px-4 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative h-[450px] md:h-[400px] flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                nextSlide();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevSlide();
                            }
                        }}
                        className="absolute w-full max-w-2xl bg-stone-900/80 backdrop-blur-sm border border-stone-800 p-8 md:p-12 rounded-2xl shadow-xl cursor-grab active:cursor-grabbing text-center"
                    >
                        <Quote className="text-orange-500/20 w-16 h-16 absolute top-8 left-8 -z-10" />

                        <div className="flex justify-center space-x-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill="#f97316" className="text-orange-500 w-5 h-5" />
                            ))}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            {testimonials[currentIndex].title}
                        </h3>

                        <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-8">
                            "{testimonials[currentIndex].text}"
                        </p>

                        <div className="border-t border-stone-800 pt-6 inline-block w-full">
                            <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                            <p className="text-orange-500 font-medium text-sm tracking-wider uppercase">{testimonials[currentIndex].role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 p-3 bg-stone-900 border border-stone-800 rounded-full text-stone-400 hover:text-white hover:border-orange-500 hover:bg-stone-800 transition-all z-10 hidden md:block"
                aria-label="Previous testimonial"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 p-3 bg-stone-900 border border-stone-800 rounded-full text-stone-400 hover:text-white hover:border-orange-500 hover:bg-stone-800 transition-all z-10 hidden md:block"
                aria-label="Next testimonial"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-orange-500 w-8"
                                : "bg-stone-700 hover:bg-stone-500"
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
