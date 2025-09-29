import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, MapPin, ExternalLink, Github, FileText } from 'lucide-react';
import { projects, skills } from '../../data/projects';

const ProfileView = () => {
    const [email, setEmail] = useState('');
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        // JavaScript email obfuscation - protects from scrapers
        const user = 'josh.dutcher';
        const domain = 'joshdutcher.com';
        setEmail(`${user}@${domain}`);
    }, []);

    return (
        <div className="text-white p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-6 md:mb-8">
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl">
                    <img 
                        src="/images/josh.jpg" 
                        alt="Josh Dutcher"
                        className="w-full h-full object-cover"
        />
                </div>
                <div className="text-center md:text-left">
                    <p className="text-sm font-semibold uppercase">Profile</p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">Josh Dutcher</h1>
                    <p className="text-gray-400 mb-2">Software Engineer</p>
                    <p className="text-gray-400">25 years experience • Wichita, KS</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">About</h2>
                    <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                        Experienced software engineer with 25 years in backend development and infrastructure,
                        including high-pressure data delivery for the 2024 election cycle. Skilled in Python, AWS,
                        and Snowflake, with a track record of building resilient systems that solve real-world problems.
                        Recently led the technical and operational launch of a boutique law firm, demonstrating the
                        ability to deliver under resource constraints and wear multiple hats in fast-moving environments.
                    </p>

                    <h3 className="text-lg md:text-xl font-bold mb-3">Top Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm">
                                {skill}
                            </span>
          ))}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold mb-3">Education</h3>
                    <p className="text-gray-300 text-sm md:text-base">Bachelor of Science in Information Systems and Technology</p>
                    <p className="text-gray-400 text-sm md:text-base">University of Kansas</p>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl font-bold mb-4">Contact</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            {email ? (
                                <a
                                    href={`mailto:${email}`}
                                    className="text-green-500 hover:text-green-400 text-sm md:text-base break-all"
                            >
                                    {email}
                                </a>
                        ) : (
                            <span className="text-sm md:text-base text-gray-300">
                                josh.dutcher [at] joshdutcher [dot] com
                            </span>
                        )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            <button
                                onClick={() => setShowContactModal(true)}
                                className="text-green-500 hover:text-green-400 text-sm md:text-base text-left"
                        >
                                Contact Form
                            </button>
                        </div>
                        <div className="text-xs md:text-sm text-gray-400 pl-7 md:pl-8">
                            Prefer email contact for fastest response. Phone number provided via email.
                        </div>
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm md:text-base">Wichita, KS</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            <a href="https://www.linkedin.com/in/joshdutcher/" className="text-green-500 hover:text-green-400 text-sm md:text-base">
                                LinkedIn Profile
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Github className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            <a href="https://github.com/joshdutcher" className="text-green-500 hover:text-green-400 text-sm md:text-base">
                                GitHub Profile
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                            <a href="https://www.joshsresume.com" className="text-green-500 hover:text-green-400 text-sm md:text-base">
                                Resume
                            </a>
                        </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold mb-4 mt-8">Stats</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-400 text-sm">Total Projects</p>
                            <p className="text-white font-semibold text-sm md:text-base">{Object.values(projects).flat().length}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Years Active</p>
                            <p className="text-white font-semibold text-sm md:text-base">25 years</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Top Technologies</p>
                            <p className="text-white font-semibold text-sm md:text-base">Python, AWS, Go</p>
                        </div>
                    </div>
                </div>
            </div>

            {showContactModal && (
            <ContactModal onClose={() => setShowContactModal(false)} />
        )}
        </div>
    );
};

// Contact Modal Component
interface ContactModalProps {
    onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '' // Hidden field for bot detection
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Honeypot check - if filled, it's likely a bot
        if (formData.honeypot) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);

        try {
            // For now, just simulate success - you can integrate with a form service later
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Contact Josh</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {submitStatus === 'success' ? (
                        <div className="text-center py-8">
                            <div className="text-green-500 text-4xl mb-2">✓</div>
                            <p className="text-white mb-2">Message sent successfully!</p>
                            <p className="text-gray-400 text-sm">I&apos;ll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Honeypot field - hidden from users */}
                            <input
                                type="text"
                                name="honeypot"
                                value={formData.honeypot}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {submitStatus === 'error' && (
                                <div className="text-red-500 text-sm">
                                    There was an error sending your message. Please try email directly.
                                </div>
                            )}

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;