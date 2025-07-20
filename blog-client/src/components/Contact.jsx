import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../translations/translations'

function Contact() {
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    const [activeFaq, setActiveFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(
            prev => ({
                ...prev,
                [name]: value
            })
        )
    };
    const formRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,   // Your service ID
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,       // Your template ID
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY  // Your public key (optional, already set in init)
            );
            
            console.log('SUCCESS!', result);
            setFormData({ name: '', email: '', message: '' });
            setNotification({ type: 'success', message: t('contact.success') });
        } catch (error) {
            console.log('FAILED...', error);
            setNotification({ type: 'error', message: t('contact.error') });
        } finally {
            setIsLoading(false);
        }
        };
    
    // Auto-dismiss notification after 5 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

      // Initialize EmailJS when component mounts
    useEffect(() => {
        emailjs.init({
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Replace with your actual public key
        });
    }, []);

    // FAQ
    const faq = t('home.faq.questions')

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    }
    return (
        <div className="bg-[#f8f9fa] pt-20">
            <div className="max-w-7xl mx-auto mt-10 bg-gray-300 h-64">
            </div>
            
            {/* FAQ Section */}
            <div id="faq" className="w-full mt-10">
                <h2 className="text-4xl font-bold text-center text-[#333] tracking-wide mb-8">{t('home.faq.title')}</h2>
                <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-stretch gap-2">
                    <div className="space-y-4 md:w-1/2 w-full">
                        {faq.map((faqItem, index) => (
                            <div key={index} className="overflow-hidden">
                            {/* Question Button */}
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className={`w-full p-4 text-left text-lg font-semibold flex justify-between items-center transition-all duration-600 hover:text-indigo-500 ${
                                        activeFaq === index ? 'text-indigo-500' : 'text-[#333]'
                                    }`}
                                    >
                                    <span>{faqItem.question}</span>
                                    
                                    {/* Plus/Cross Icon */}
                                    <span 
                                        className={`text-xl text-indigo-500 transition-transform duration-1000 ${
                                        activeFaq === index ? 'rotate-45' : 'rotate-0'
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>

                                {/* Answer */}
                                <div 
                                    className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                                        activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                                        {faqItem.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="hidden md:block flex-1 ml-4 space-y-4 text-[#333]">
                        <div className="space-y-2">
                            <label className="w-20 font-bold" htmlFor="name">{t('contact.name')} *</label>
                            <input 
                            className="w-full border border-gray-300 rounded p-2" 
                            type="text" 
                            id="name" 
                            name="name" 
                            onChange={handleInputChange}
                            value={formData.name}
                            placeholder={t('contact.namePlaceholder')} required/>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="w-20 font-bold" htmlFor="email">{t('contact.email')} *</label>
                            <input 
                            className="w-full border border-gray-300 rounded p-2" 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={handleInputChange}
                            value={formData.email}
                            placeholder={t('contact.emailPlaceholder')} required/>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="w-20 font-bold" htmlFor="message">{t('contact.message')} *</label>
                            <textarea 
                            className="w-full h-32 border border-gray-300 rounded p-2" 
                            id="message" 
                            name="message" 
                            onChange={handleInputChange}
                            value={formData.message}
                            placeholder={t('contact.messagePlaceholder')} required></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`text-[#f8f9fa] font-bold px-4 py-2 rounded flex items-center gap-2 transition-all duration-300 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#667eea] hover:bg-[#5a6fd8]'
                            }`}
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {isLoading ? t('contact.sending') : t('contact.send')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Notification Popup */}
            {notification && (
                <div className="fixed top-25 right-4 z-50 max-w-sm">
                    <div className={`p-4 rounded-lg shadow-lg text-white flex items-center gap-3 ${
                        notification.type === 'success' 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                    }`}>
                        <div className="flex-1">
                            {notification.message}
                        </div>
                        <button 
                            onClick={() => setNotification(null)}
                            className="text-white hover:text-gray-200 text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact
