import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
  const [rsvps, setRsvps] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin')
      return
    }
    fetchRsvps(token)
  }, [navigate])

  const fetchRsvps = async (token) => {
    try {
      const response = await fetch('/api/admin/rsvps', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        sessionStorage.removeItem('admin_token')
        navigate('/admin')
        return
      }

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setRsvps(data.rsvps)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    navigate('/admin')
  }

  const exportCSV = () => {
    const headers = ['Nome', 'Email', 'Ospiti', 'Presenza', 'Intolleranze', 'Note', 'Data']
    const rows = rsvps.map((r) => [
      r.full_name,
      r.email,
      r.number_of_guests,
      r.attendance === 'yes' ? 'Si' : 'No',
      r.dietary_restrictions || '',
      r.additional_notes || '',
      new Date(r.created_at).toLocaleDateString('it-IT'),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rsvp_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const totalGuests = rsvps
    .filter((r) => r.attendance === 'yes')
    .reduce((sum, r) => sum + parseInt(r.number_of_guests || '0', 10), 0)
  const attending = rsvps.filter((r) => r.attendance === 'yes').length
  const notAttending = rsvps.filter((r) => r.attendance === 'no').length

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <p className="font-cinzel text-gold text-xl">Caricamento...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="font-cinzel text-gold text-3xl tracking-wider uppercase">
              Dashboard RSVP
            </h1>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-lg font-cinzel text-sm tracking-wider transition-all"
            >
              Esporta CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-white rounded-lg font-cinzel text-sm tracking-wider transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gold/20 text-center">
            <p className="font-cinzel text-gray-500 text-sm uppercase tracking-wider">Risposte</p>
            <p className="font-cinzel text-gold text-3xl mt-1">{rsvps.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gold/20 text-center">
            <p className="font-cinzel text-gray-500 text-sm uppercase tracking-wider">Presenti</p>
            <p className="font-cinzel text-green-600 text-3xl mt-1">{attending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gold/20 text-center">
            <p className="font-cinzel text-gray-500 text-sm uppercase tracking-wider">Assenti</p>
            <p className="font-cinzel text-red-500 text-3xl mt-1">{notAttending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gold/20 text-center">
            <p className="font-cinzel text-gray-500 text-sm uppercase tracking-wider">Tot. Ospiti</p>
            <p className="font-cinzel text-gold text-3xl mt-1">{totalGuests}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-xl border-2 border-gold/20 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gold/20 bg-gold/5">
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Nome</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Ospiti</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Presenza</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Intolleranze</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Note</th>
                <th className="px-4 py-3 font-cinzel text-gray-700 text-sm uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 font-cinzel">
                    Nessuna risposta ricevuta
                  </td>
                </tr>
              ) : (
                rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-gold/5 transition-colors">
                    <td className="px-4 py-3 text-gray-800">{rsvp.full_name}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{rsvp.email}</td>
                    <td className="px-4 py-3 text-gray-800 text-center">{rsvp.number_of_guests}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          rsvp.attendance === 'yes'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {rsvp.attendance === 'yes' ? 'Si' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{rsvp.dietary_restrictions || '-'}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{rsvp.additional_notes || '-'}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                      {new Date(rsvp.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
