import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuLinks = [
    { to: 'home', label: 'Home' },
    { to: 'story', label: 'La Nostra Storia' },
    { to: 'details', label: 'Dettagli' },
    { to: 'rsvp', label: 'RSVP' },
    { to: 'gallery', label: 'Galleria' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="font-script text-gold text-3xl sm:text-4xl cursor-pointer hover:text-gold-light transition-colors"
            onClick={closeMenu}
          >
            I & C
          </Link>

          {/* Hamburger Button - Top Right */}
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger Lines with Animation */}
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } my-1`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gold transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Backdrop Blur Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}

      {/* Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
            <h2 className="font-cinzel text-gold text-2xl">Menu</h2>
            <button
              onClick={closeMenu}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gold transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              {menuLinks.map((link, index) => (
                <li
                  key={link.to}
                  className="transform transition-all duration-300"
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    spy={true}
                    activeClass="text-gold"
                    className="font-cinzel text-gray-700 hover:text-gold transition-colors cursor-pointer text-lg tracking-wider block py-2 border-b border-transparent hover:border-gold"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="px-6 py-6 border-t border-gray-200">
            <p className="font-script text-gold text-3xl text-center">
              Ilaria & Cristian
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
