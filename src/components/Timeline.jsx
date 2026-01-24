import { useState, useEffect, useRef } from 'react'
import { FaChurch, FaMoon } from 'react-icons/fa'
import { GiWineGlass, GiCakeSlice } from 'react-icons/gi'
import { LuPartyPopper } from "react-icons/lu";
import { FaCarSide } from "react-icons/fa6";

function Timeline() {
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

  const timelineItems = [
    {
      time: '11:00',
      title: 'Santa Messa',
      icon: FaChurch,
      description: 'Cerimonia religiosa presso la Chiesa Santa Maria Maddalena',
    },
    {
      time: '',
      title: 'Dopo la cerimonia',
      icon: FaCarSide,
      description: 'Trasferimento alla location in meno di 10 minuti',
    },
    {
      time: '13:00',
      title: 'Aperitivo Castello',
      icon: GiWineGlass,
      description: 'Brindisi e aperitivo al Castel Ivano',
    },
    {
      time: '18:00',
      title: 'Taglio torta',
      icon: GiCakeSlice,
      description: 'Il momento più dolce della giornata',
    },
    {
      time: '20:00',
      title: 'Festa',
      icon: LuPartyPopper,
      description: 'Tutti pronti a ballare e divertirsi!',
    },
    {
      time: '00:00',
      title: 'Tutti a nanna!',
      icon: FaMoon,
      description: 'E\' stata una giornata lunga ed emozionante, è ora di ricaricarsi',
    },
  ]

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Timeline
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
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Gli ingredienti principali della giornata saranno il sorriso e le emozioni,
            ma anche le tempistiche saranno necessarie affinché vada tutto per il meglio!
            <br/>Ecco perciò una scaletta generale della giornata:
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 transform sm:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = item.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className={`flex items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-row`}>
                    {/* Content */}
                    <div className={`w-full sm:w-5/12 ${isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'} ml-20 sm:ml-0`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                        <div className={`font-cinzel text-gold text-2xl sm:text-3xl font-bold mb-2 ${isEven ? 'sm:text-right' : 'sm:text-left'} text-left`}>
                          {item.time}
                        </div>
                        <h3 className={`font-cinzel text-gray-800 text-xl font-semibold mb-2 ${isEven ? 'sm:text-right' : 'sm:text-left'} text-left`}>
                          {item.title}
                        </h3>
                        <p className={`text-gray-600 ${isEven ? 'sm:text-right' : 'sm:text-left'} text-left`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Icon Circle */}
                    <div className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 -translate-x-1/2">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Icon className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Spacer for alternating layout on desktop */}
                    <div className="hidden sm:block w-5/12"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Closing Text */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >

        </div>
      </div>
    </section>
  )
}

export default Timeline
