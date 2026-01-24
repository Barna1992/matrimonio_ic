import { useState, useEffect } from 'react'

function Hero() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setIsVisible(true)

    // Countdown timer
    const weddingDate = new Date('2026-10-24T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background image - different positioning for mobile vs desktop */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right_-10rem] sm:bg-[center_right_-5rem] md:bg-center"
        style={{ backgroundImage: "url('/background-1.jpeg')" }}
      ></div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Main Title */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h1 className="font-script text-gold text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 leading-tight">
            Ilaria & Cristian
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <p className="font-cinzel text-gray-700 text-xl sm:text-2xl md:text-3xl tracking-widest uppercase mb-12">
            si sposano!
          </p>
        </div>

        {/* Countdown */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 border border-gold/20">
                <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-gold">
                  {countdown.days}
                </div>
                <div className="font-cinzel text-xs sm:text-sm text-gray-600 uppercase tracking-wider mt-2">
                  Giorni
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 border border-gold/20">
                <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-gold">
                  {countdown.hours}
                </div>
                <div className="font-cinzel text-xs sm:text-sm text-gray-600 uppercase tracking-wider mt-2">
                  Ore
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 border border-gold/20">
                <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-gold">
                  {countdown.minutes}
                </div>
                <div className="font-cinzel text-xs sm:text-sm text-gray-600 uppercase tracking-wider mt-2">
                  Minuti
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 border border-gold/20">
                <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-gold">
                  {countdown.seconds}
                </div>
                <div className="font-cinzel text-xs sm:text-sm text-gray-600 uppercase tracking-wider mt-2">
                  Secondi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Text */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              Finalmente è giunto anche per noi il momento di realizzare questo sogno.
            </p>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
              Nella speranza di avervi vicini quel giorno, vi lasciamo alcune informazioni
              per essere pronti a festeggiare con noi.
            </p>
          </div>
        </div>

        {/* Decorative divider */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="mt-12 flex items-center justify-center">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">✦</div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
