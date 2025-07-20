import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../translations/translations'

function Footer({ currentPage, setCurrentPage }) {
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    
    // Footer data organized by sections
    const footerData = [
        {
        title: t('footer.learning'),
        links: [
            { 
            text: t('footer.learningCommunity'), 
            href: "contact",
            type: "page" // For scroll links
            },
            { 
            text: t('footer.pastVideos'), 
            href: "courses",
            type: "page"
            }
        ]
        },
        {
        title: t('footer.organization'), 
        links: [
            { 
            text: t('footer.faq'), 
            href: "#faq",
            type: "anchor"
            },
            { 
            text: t('footer.contactUs'), 
            href: "contact",
            type: "page"
            },
            { 
            text: t('footer.privacyPolicy'), 
            href: "https://lizardon.notion.site/Privacy-Policy-20dd34a592f9800cbd32e2e36cc3a0b0?source=copy_link",
            type: "external" // For external links
            }
        ]
        }
    ]
    // Handle different types of links
    const handleLinkClick = (link) => {
        if (link.type === "external") {
        window.open(link.href, '_blank')
        } else if (link.type === "page") {
        setCurrentPage(link.href)
        } else if (link.type === "anchor") {
        // Handle anchor links (scroll to section)
            if (currentPage === "home") {
                const element = document.querySelector(link.href)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            } else {
                setCurrentPage("home")
                setTimeout(() => {
                    const element = document.querySelector(link.href)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 500)
            }
        }
    }


    return (
        <footer className="mt-0 w-full bg-gray-800 pt-12">
            <div className="flex justify-between max-w-7xl mx-auto px-4 pb-8">
                {/* Left Side - Social Media */}
                <div className="flex justify-between items-start w-1/2">
                    <h3 className="text-xl font-semibold mb-4 text-[#667eea]">{t('footer.followUs')}</h3>
                </div>
                {/* Right Side - Footer Content */}
                <div className="flex justify-between text-center w-1/2">
                    {footerData.map((section, index) => (
                    <div key={index}>
                            <h3 className="text-xl font-semibold mb-4 text-[#667eea]">
                            {section.title}
                            </h3>
                            
                            <div className="space-y-2">
                            {section.links.map((link, linkIndex) => (
                                <button
                                key={linkIndex}
                                onClick={() => handleLinkClick(link)}
                                className="block text-gray-300 hover:text-[#667eea] transition-colors duration-300 cursor-pointer text-left w-full"
                                >
                                {link.text}
                                </button>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
            </div>
        {/* Copyright Section */}
        <div className="border-t border-gray-600 py-3">
        <p className="text-gray-400 text-sm text-center">
            {t('footer.copyright')}
        </p>
        </div>
    </footer>
    )
}

export default Footer

            