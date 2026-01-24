import { useState, useEffect, useRef } from 'react'
import { FaCopy, FaCheckCircle, FaHeart } from 'react-icons/fa'

function GiftIBAN() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef(null)

  // Replace with actual IBAN
  const ibanNumber = 'IT06S0817834940000018172910'
  const accountHolder = 'Galter Cristian e Ropelato Ilaria'

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

  const copyToClipboard = async () => {
    try {
      // Remove spaces for actual IBAN
      const ibanWithoutSpaces = ibanNumber.replace(/\s/g, '')
      await navigator.clipboard.writeText(ibanWithoutSpaces)
      setCopied(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy IBAN:', err)
    }
  }

  return (
    <section
      id="gift"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Section Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Per Noi
          </h2>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">
              <FaHeart />
            </div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>

        {/* Introduction Text */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            Il regalo più prezioso sarà averti con noi nel giorno del nostro “si”. <br/> 
            Ma se vorrai accompagnarci anche nella realizzazione dei nostri sogni e progetti futuri potrai farlo qui.
          </p>
        </div>

        {/* IBAN Box */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg p-8 sm:p-10 border border-gold/20">
            {/* Account Holder */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">
                Intestatario
              </p>
              <p className="font-cinzel text-gray-800 text-lg font-semibold">
                {accountHolder}
              </p>
            </div>

            {/* IBAN Number */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-3">
                IBAN
              </p>
              <div className="bg-white border-2 border-gold/30 rounded-lg p-4 sm:p-5">
                <p className="font-mono text-gray-800 text-base sm:text-lg md:text-xl font-semibold text-center break-all">
                  {ibanNumber}
                </p>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className={`w-full py-4 px-6 rounded-lg font-cinzel font-semibold text-base sm:text-lg tracking-wider transition-all duration-300 flex items-center justify-center ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gold hover:bg-gold-dark text-white hover:scale-105 shadow-md hover:shadow-lg'
              }`}
            >
              {copied ? (
                <>
                  <FaCheckCircle className="mr-2 text-xl" />
                  IBAN COPIATO!
                </>
              ) : (
                <>
                  <FaCopy className="mr-2 text-xl" />
                  COPIA IBAN
                </>
              )}
            </button>

            {/* Additional Info */}
            <p className="text-gray-500 text-sm text-center mt-6 italic">
              Grazie di cuore per il vostro pensiero
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-12 bg-gold/30"></div>
            <FaHeart className="mx-4 text-gold/50 text-lg" />
            <div className="h-px w-12 bg-gold/30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftIBAN
