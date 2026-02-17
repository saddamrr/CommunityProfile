export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        {children}
      </div>
    </div>
  )
}
