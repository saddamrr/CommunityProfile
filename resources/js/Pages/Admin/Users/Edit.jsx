import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    role: user.role || 'member',
    is_active: user.is_active ? 1 : 0,
  });

  function submit(e) {
    e.preventDefault();
    put(route('admin.users.update', user.id));
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
          <Link
            href={route('admin.users.index')}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            ← Back
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={submit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Role</label>
              <select
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <select
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.is_active}
                onChange={(e) => setData('is_active', Number(e.target.value))}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition"
              >
                {processing ? 'Saving...' : 'Update User'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
