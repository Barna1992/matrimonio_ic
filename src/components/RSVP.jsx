import { useState, useEffect, useRef } from 'react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

function RSVP() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    numberOfGuests: '1',
    attendance: '',
    dietaryRestrictions: '',
    allergies: '',
    additionalNotes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

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

  const validateForm = () => {
    const newErrors = {}

    // Nome completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Il nome completo è obbligatorio'
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida'
    }

    // Presenza confermata
    if (!formData.attendance) {
      newErrors.attendance = 'Seleziona se confermi la presenza'
    }

    // Numero ospiti
    if (!formData.numberOfGuests || parseInt(formData.numberOfGuests) < 1) {
      newErrors.numberOfGuests = 'Seleziona il numero di ospiti'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const maxRetries = 3
      let response

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          response = await fetch('/api/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          })
          if (response.ok || response.status < 500) break
        } catch {}
        if (attempt < maxRetries - 1) {
          await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
        }
      }

      if (!response || !response.ok) {
        let message = 'Errore nell\'invio'
        try {
          const data = await response.json()
          message = data.error || message
        } catch {}
        throw new Error(message)
      }

      // Success
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        numberOfGuests: '1',
        attendance: '',
        dietaryRestrictions: '',
        allergies: '',
        additionalNotes: '',
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Section Title */}
        <div
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="font-cinzel text-gold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Conferma Presenza
          </h2>
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">✦</div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>

        {/* Conferma Presenza Image */}
        <div
          className={`flex justify-center mb-10 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <img
            src="/conferma-presenza.jpeg"
            alt="Conferma Presenza"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg border-2 border-gold/20 object-cover"
          />
        </div>

        {/* Introduction Text */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-700 text-lg">
            Ci farebbe molto piacere averti con noi in questo giorno speciale!
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-lg p-6 flex items-start animate-fade-in">
            <FaCheckCircle className="text-green-500 text-2xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-cinzel text-green-800 text-xl font-semibold mb-2">
                Grazie per la conferma!
              </h3>
              <p className="text-green-700">
                Abbiamo ricevuto la tua risposta. Non vediamo l'ora di festeggiare insieme a te!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 bg-red-50 border-2 border-red-500 rounded-lg p-6 flex items-start animate-fade-in">
            <FaExclamationCircle className="text-red-500 text-2xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-cinzel text-red-800 text-xl font-semibold mb-2">
                Errore nell'invio
              </h3>
              <p className="text-red-700">
                Si è verificato un errore. Per favore riprova o contattaci direttamente.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 border-gold/20"
          >
            {/* Nome Completo */}
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block font-cinzel text-gray-700 font-semibold mb-2"
              >
                Nomi Completi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Mario Rossi"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-cinzel text-gray-700 font-semibold mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="mario.rossi@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Numero Ospiti */}
            <div className="mb-6">
              <label
                htmlFor="numberOfGuests"
                className="block font-cinzel text-gray-700 font-semibold mb-2"
              >
                Numero di Ospiti <span className="text-red-500">*</span>
              </label>
              <select
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seleziona...</option>
                <option value="1">1 ospite</option>
                <option value="2">2 ospiti</option>
                <option value="3">3 ospiti</option>
                <option value="4">4 ospiti</option>
                <option value="5">5+ ospiti</option>
              </select>
              {errors.numberOfGuests && (
                <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>
              )}
            </div>

            {/* Presenza Confermata */}
            <div className="mb-6">
              <label className="block font-cinzel text-gray-700 font-semibold mb-3">
                Confermi la tua presenza? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold focus:ring-gold border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">Sì, ci sarò!</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    className="w-5 h-5 text-gold focus:ring-gold border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">No, mi dispiace</span>
                </label>
              </div>
              {errors.attendance && (
                <p className="text-red-500 text-sm mt-1">{errors.attendance}</p>
              )}
            </div>

            {/* Intolleranze Alimentari */}
            <div className="mb-6">
              <label
                htmlFor="dietaryRestrictions"
                className="block font-cinzel text-gray-700 font-semibold mb-2"
              >
                Intolleranze Alimentari o Allergie
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                placeholder="Es: lattosio, glutine..."
              ></textarea>
            </div>

            {/* Note Aggiuntive */}
            <div className="mb-8">
              <label
                htmlFor="additionalNotes"
                className="block font-cinzel text-gray-700 font-semibold mb-2"
              >
                Note Aggiuntive
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                placeholder="Eventuali richieste o messaggi per gli sposi ( es: necessità di seggiolone ... )"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-cinzel font-semibold text-lg tracking-wider transition-all duration-300 transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gold hover:bg-gold-dark text-white hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Invio in corso...
                </span>
              ) : (
                'CONFERMA PRESENZA'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RSVP
