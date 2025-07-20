
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../translations/translations'

function Home({ setCurrentPage }) {
    const [activeFaq, setActiveFaq] = useState(null);
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    // Solutions
    const solutions = [
        {id: "1", text: t('home.solutionFeatures.feature1')},
        {id: "2", text: t('home.solutionFeatures.feature2')},
        {id: "3", text: t('home.solutionFeatures.feature3')}
        ]
    // Courses
    const courses = [
        {id: "beginner", level: t('home.courses.beginner.level'), title: t('home.courses.beginner.title'), description: t('home.courses.beginner.description'), buttonText: t('home.courses.beginner.buttonText'), image: 'https://placehold.co/120x80'},
        {id: "intermediate", level: t('home.courses.intermediate.level'), title: t('home.courses.intermediate.title'), description: t('home.courses.intermediate.description'), buttonText: t('home.courses.intermediate.buttonText'), image: 'https://placehold.co/120x80'},
        {id: "advanced", level: t('home.courses.advanced.level'), title: t('home.courses.advanced.title'), description: t('home.courses.advanced.description'), buttonText: t('home.courses.advanced.buttonText'), image: 'https://placehold.co/120x80'}
        ]
    // FAQ
    const faq = t('home.faq.questions')

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    }

    // Teachers
    const teachers = [
        {
          id: 1,
          name: "但理",
          photo: "https://placehold.co/120x120/667eea/ffffff?text=但理",
          description: t('home.teachers.danli')
        },
        {
          id: 2,
          name: "萨路", 
          photo: "https://placehold.co/120x120/667eea/ffffff?text=萨路",
          description: t('home.teachers.salu')
        }
      ]

    return (
        <div>
            {/* Hero Section */}
            <section className="mt-20 flex items-center justify-center w-full py-5" 
               style={{ background: 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)' }}>
                <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#f8f9fa]">
                    <h1 className="md:text-6xl font-bold mb-6 tracking-wide mb-10">
                        {t('home.welcomeTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                        {t('home.welcomeSubtitle')}
                    </p>
                    <button 
                        onClick={() => setCurrentPage('courses')}
                        className="tracking-widest inline-block hover:bg-[linear-gradient(45deg,_#ff9500_10%,_#ff6b9d_100%)] hover:shadow-[0_10px_10px_rgba(255,107,107,0.3)] px-10 py-3 rounded-full font-bold text-xl transition-all duration-300 bg-[linear-gradient(45deg,_#ff6b6b_30%,_#ee5a24_100%)]"
                    >
                        {t('home.viewCourses')}
                    </button>
                </div>
            </section>
            {/* Solution Section */}
            <div id="solutions" className="w-full bg-[#f8f9fa]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row px-4 gap-5 py-12">
                    <div className="text-[#333] md:w-1/2 px-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-bold tracking-wide mb-8">{t('home.practicalJapanese')}</h2>
                            <p className="text-xl tracking-wide leading-relaxed mb-10">{t('home.practicalDescription')}</p>
                        </div>

                        <ul className="space-y-6 mb-12 text-xl">
                            {solutions.map((solution) => (
                                <li key={solution.id} className="relative pl-6 before:content-['★'] before:absolute before:left-0 before:text-yellow-500 before:font-bold">
                                    {solution.text}
                                </li>
                            ))}
                        </ul>
                    </div>  
                    <div className="md:w-1/2">
                        <div className="w-full h-full bg-white rounded-lg shadow-md">
                            <img src="https://placehold.co/600x400" alt="placeholder" className="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div id="courses" className="w-full bg-white mb-10">
                <div className="max-w-7xl mx-auto text-[#333] px-5 py-10 text-center">
                    <h2 className="text-4xl font-bold tracking-wide mb-8">{t('home.chooseCourse')}</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {courses.map((course) => (
                    <div
                    key={course.id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 flex flex-col transform`}
                    >
                    {/* Course Header */}
                    <div className="p-8 text-center text-white" 
                        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="text-sm opacity-80 mb-2">
                        {course.level}
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">
                        {course.title}
                        </h3>
                    </div>

                    {/* Course Body */}
                    <div className="flex-1 p-8 flex flex-col">
                        <p className="text-gray-600 mb-6 flex-1">
                        {course.description}
                        </p>
                        
                        <button
                        onClick={() => setCurrentPage('courses')}
                        className="block w-full text-center bg-[#28a745] hover:bg-[#218838] text-lg font-bold tracking-wider text-white py-4 px-3 rounded-full transition-colors duration-300 mt-auto"
                        >
                        {course.buttonText}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* FQA Section */}
            <div id="faq" className="w-full bg-[#f8f9fa] py-10">
                <div className="max-w-7xl mx-auto text-[#333] px-5 text-center">
                    <h2 className="text-4xl font-bold tracking-wide mb-8">{t('home.faq.title')}</h2>
                </div>
                <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row gap-10">
                    <div className="md:w-1/2">
                        <div className="w-full rounded-lg shadow-md">
                            <img src="https://placehold.co/600x400" alt="placeholder" className="w-full object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="space-y-4 md:w-1/2">
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
                </div>
            </div>
            {/* Teachers Section */}
            <div id="teachers" className="w-full bg-white py-10">
                <div className="max-w-7xl mx-auto text-[#333] px-5 text-center">
                    <h2 className="text-4xl font-bold tracking-wide mb-8">{t('home.aboutUs')}</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-5 mb-10">
                {teachers.map((teacher) => (
                <div 
                    key={teacher.id}
                    className="bg-[#667eea] rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
                >
                    {/* Teacher Photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white relative">
                    <img 
                        src={teacher.photo} 
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    
                    {/* Teacher Info */}
                    <div className="flex-1 text-white text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2 text-white">
                        {teacher.name}
                    </h3>
                    <p className="text-base leading-relaxed text-white">
                        {teacher.description}
                    </p>
                    </div>
                </div>  
                ))}
            </div>
        </div>
    )
}

export default Home