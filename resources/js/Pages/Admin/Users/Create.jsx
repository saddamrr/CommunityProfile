import { useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'member',
  });

  function submit(e) {
    e.preventDefault();
    post(route('admin.users.store'));
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Create New User</h1>
          <Link
            href={route('admin.users.index')}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            ← Back
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={submit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.username}
                onChange={e => setData('username', e.target.value)}
                placeholder="johndoe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Role</label>
              <select
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                value={data.role}
                onChange={e => setData('role', e.target.value)}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition"
              >
                {processing ? 'Creating...' : 'Create User'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
