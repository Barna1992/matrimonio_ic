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

      {/* Celebration & Location Section */}
      <CelebrationLocation />

      {/* Timeline Section */}
      <Timeline />

      {/* RSVP Section */}
      <RSVP />

      {/* Gift/IBAN Section */}
      <GiftIBAN />

      {/* Contact Section */}
      <Contacts />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
