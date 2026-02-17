import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ users }) {
    const { filters } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [status, setStatus] = useState(filters.status || '');

    // 🔥 Debounce search
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route('admin.users.index'),
                { search, role, status },
                { preserveState: true, replace: true }
            );
        }, 500);

        return () => clearTimeout(delay);
    }, [search, role, status]);

    function deleteUser(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id));
        }
    }

    function toggleActive(user) {
        if (!confirm(`Are you sure you want to ${user.is_active ? 'deactivate' : 'activate'} this user?`)) return;

        router.patch(route('admin.users.toggle-active', user.id), {}, { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

                    <Link
                        href={route('admin.users.create')}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow hover:shadow-lg transition"
                    >
                        + New User
                    </Link>
                </div>

                {/* Filter Card */}
                <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-wrap gap-3">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name, username, email..."
                        className="border rounded-lg px-3 py-2 w-64 focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded-lg px-7 py-2"
                    >
                        <option value="">All Role</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg px-9 py-2"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left">Username</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}

                            {users.data.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-500">
                                        @{user.username}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-semibold">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold
                                            ${user.is_active 
                                                ? 'bg-green-50 text-green-600' 
                                                : 'bg-red-50 text-red-600'
                                            }`}
                                        >
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button
                                            onClick={() => toggleActive(user)}
                                            className={user.is_active 
                                                ? 'text-red-600 hover:underline font-medium'
                                                : 'text-green-600 hover:underline font-medium'
                                            }
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </button>

                                        <Link
                                            href={route('admin.users.edit', user.id)}
                                            className="text-indigo-600 hover:underline font-medium"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="text-red-600 hover:underline font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-2">
                    {users.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-2 rounded border text-sm
                                ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </AdminLayout>
    );
}
