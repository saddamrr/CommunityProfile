import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-slate-800 tracking-wide">
                    Admin Panel
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <SidebarLink href="/admin" label="Dashboard" />
                    <SidebarLink href="/admin/users" label="Users" />
                    <SidebarLink href="/admin/community" label="Community Settings" />
                    <SidebarLink href="#" label="Gallery" />
                </nav>

                {/* Footer */}
                <div className="p-4 text-xs text-slate-400 border-t border-slate-800">
                    © 2026 Artisan Tech House
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                            {auth.user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {auth.user.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.profile.edit')}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Edit Profile
                        </Link>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, label }) {
    const { url } = usePage();

    const active = href === '/admin'
        ? url === '/admin'
        : url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block px-4 py-2.5 rounded-lg transition text-sm font-medium
                ${active 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
        >
            {label}
        </Link>
    );
}

