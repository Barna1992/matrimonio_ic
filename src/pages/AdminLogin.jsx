import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Errore nel login')
      }

      sessionStorage.setItem('admin_token', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-gold text-3xl sm:text-4xl tracking-wider uppercase mb-4">
            Area Admin
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-gold"></div>
            <div className="mx-4 text-gold text-2xl">&#10022;</div>
            <div className="h-px w-16 bg-gold"></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 border-gold/20"
        >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-cinzel text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
              placeholder="Inserisci la password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-cinzel font-semibold text-lg tracking-wider transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gold hover:bg-gold-dark text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? 'Accesso...' : 'ACCEDI'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
