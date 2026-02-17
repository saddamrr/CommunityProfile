import AdminLayout from '@/Layouts/AdminLayout'
import { useForm, Link } from '@inertiajs/react'

export default function Edit({ admin }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: admin.name || '',
    username: admin.username || '',
    email: admin.email || '',
  })

  function submit(e) {
    e.preventDefault()
    patch(route('admin.profile.update'))
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Profile
          </h1>

          <Link
            href={route('admin.dashboard')}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            ← Back
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <form onSubmit={submit} className="space-y-5">

            <Input
              label="Full Name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              error={errors.name}
            />

            <Input
              label="Username"
              value={data.username}
              onChange={e => setData('username', e.target.value)}
              error={errors.username}
            />

            <Input
              label="Email Address"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              error={errors.email}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={processing}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow hover:shadow-lg transition font-medium"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>

              <Link
                href={route('admin.dashboard')}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

/* Reusable Input Component */
function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
