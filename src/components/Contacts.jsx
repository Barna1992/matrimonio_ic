import { useState, useEffect, useRef } from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

function Contacts() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Replace with actual contact information
  const contacts = {
    ilaria: {
      name: 'Ilaria',
      phone: '+39 123 456 7890',
      phoneRaw: '+39123456789', // Without spaces for tel: link
    },
    cristian: {
      name: 'Cristian',
      phone: '+39 098 765 4321',
      phoneRaw: '+390987654321',
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Contatti
          </h2>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">✦</div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>

        {/* Introduction Text */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            Per qualsiasi informazione o chiarimento non esitare a contattarci
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Ilaria Card */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gold/20 hover:shadow-2xl hover:border-gold/40 transition-all duration-300 h-full">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gold to-gold-light p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaPhone className="text-gold text-3xl" />
                </div>
                <h3 className="font-cinzel text-white text-2xl font-semibold">
                  {contacts.ilaria.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
                    Telefono
                  </p>
                  <a
                    href={`tel:${contacts.ilaria.phoneRaw}`}
                    className="inline-flex items-center justify-center text-gray-800 text-xl font-semibold hover:text-gold transition-colors"
                  >
                    <FaPhone className="mr-3 text-gold" />
                    {contacts.ilaria.phone}
                  </a>
                </div>

                <a
                  href={`tel:${contacts.ilaria.phoneRaw}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gold hover:bg-gold-dark text-white font-cinzel font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <FaPhone className="mr-2" />
                  Chiama
                </a>
              </div>
            </div>
          </div>

          {/* Cristian Card */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gold/20 hover:shadow-2xl hover:border-gold/40 transition-all duration-300 h-full">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gold-dark to-gold p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaPhone className="text-gold text-3xl" />
                </div>
                <h3 className="font-cinzel text-white text-2xl font-semibold">
                  {contacts.cristian.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
                    Telefono
                  </p>
                  <a
                    href={`tel:${contacts.cristian.phoneRaw}`}
                    className="inline-flex items-center justify-center text-gray-800 text-xl font-semibold hover:text-gold transition-colors"
                  >
                    <FaPhone className="mr-3 text-gold" />
                    {contacts.cristian.phone}
                  </a>
                </div>

                <a
                  href={`tel:${contacts.cristian.phoneRaw}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gold hover:bg-gold-dark text-white font-cinzel font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <FaPhone className="mr-2" />
                  Chiama
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-12 bg-gold/30"></div>
            <FaEnvelope className="mx-4 text-gold/50 text-lg" />
            <div className="h-px w-12 bg-gold/30"></div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Saremo felici di rispondere a tutte le vostre domande
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contacts
