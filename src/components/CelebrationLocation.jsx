import { useState, useEffect, useRef } from 'react'
import { FaMapMarkerAlt, FaChurch } from 'react-icons/fa'
import { GiCastle } from 'react-icons/gi'

function CelebrationLocation() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
      id="details"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Celebrazione & Location
          </h2>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">✦</div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Chiesa Card */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gold/20 hover:shadow-2xl hover:border-gold/40 transition-all duration-300">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gold to-gold-light p-6 text-center">
                <FaChurch className="text-white text-5xl mx-auto mb-3" />
                <h3 className="font-cinzel text-white text-2xl font-semibold">
                  Cerimonia Religiosa
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <h4 className="font-cinzel text-gray-800 text-xl font-semibold mb-4">
                  Chiesa Santa Maria Maggiore
                </h4>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gold text-xl mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        Piazza Santa Maria Maggiore<br />
                        Trento, TN<br />
                        Italia
                      </p>
                    </div>
                  </div>

                  {/* Google Maps Link */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Chiesa+Santa+Maria+Maggiore+Trento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-cinzel font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Apri in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Castel Ivano Card */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gold/20 hover:shadow-2xl hover:border-gold/40 transition-all duration-300">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gold-dark to-gold p-6 text-center">
                <GiCastle className="text-white text-5xl mx-auto mb-3" />
                <h3 className="font-cinzel text-white text-2xl font-semibold">
                  Ricevimento
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <h4 className="font-cinzel text-gray-800 text-xl font-semibold mb-4">
                  Castel Ivano
                </h4>

                <div className="space-y-4">
                  {/* Description */}
                  <div className="flex items-start">
                    <GiCastle className="text-gold text-xl mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                      Per il pranzo e la festa vi aspettiamo al Castel Ivano
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gold text-xl mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        Villa Agnedo<br />
                        Trento, TN<br />
                        Italia
                      </p>
                    </div>
                  </div>

                  {/* Google Maps Link */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Castel+Ivano+Villa+Agnedo+Trento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-cinzel font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Apri in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CelebrationLocation
