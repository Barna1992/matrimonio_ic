import Header from './components/Header'
import Hero from './components/Hero'
import CelebrationLocation from './components/CelebrationLocation'
import Timeline from './components/Timeline'
import RSVP from './components/RSVP'
import GiftIBAN from './components/GiftIBAN'
import Contacts from './components/Contacts'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Story Section */}
      <section
        id="story"
        className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl mb-8">
            La Nostra Storia
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Story content placeholder
          </p>
        </div>
      </section>

      {/* Celebration & Location Section */}
      <CelebrationLocation />

      {/* Timeline Section */}
      <Timeline />

      {/* RSVP Section */}
      <RSVP />

      {/* Gift/IBAN Section */}
      <GiftIBAN />

      {/* Gallery Section */}
      <section
        id="gallery"
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl mb-8">
            Galleria
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Photo gallery placeholder
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <Contacts />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
