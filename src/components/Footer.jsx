import { FaHeart } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gold-dark via-gold to-gold-light py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Message */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="h-px w-12 bg-white/30"></div>
            <FaHeart className="mx-4 text-white text-2xl animate-pulse" />
            <div className="h-px w-12 bg-white/30"></div>
          </div>
          <p className="font-script text-white text-3xl sm:text-4xl md:text-5xl mb-2">
            Ilaria & Cristian
          </p>
          <p className="font-cinzel text-white/90 text-sm sm:text-base tracking-widest uppercase">
            24 Ottobre 2026
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 my-6"></div>

        {/* Copyright and Credits */}
        <div className="text-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} Ilaria & Cristian. Tutti i diritti riservati.
          </p>
          <p className="text-white/50 text-xs mt-2">
            Realizzato con il <FaHeart className="inline text-white/70 text-xs mx-1" /> per il nostro giorno speciale
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
