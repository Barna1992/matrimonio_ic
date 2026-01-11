import Header from './components/Header'
import Hero from './components/Hero'

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

      {/* Details Section */}
      <section
        id="details"
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl mb-8">
            Dettagli del Matrimonio
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Wedding details placeholder
          </p>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        id="rsvp"
        className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl mb-8">
            Conferma la tua Presenza
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            RSVP form placeholder
          </p>
        </div>
      </section>

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
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl mb-8">
            Contatti
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Contact information placeholder
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
