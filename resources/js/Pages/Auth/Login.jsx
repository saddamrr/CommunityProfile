import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Login" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-slate-900 px-4">

        {/* Card */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-25 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Welcome Back
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Login to access admin dashboard
            </p>
          </div>

          {status && (
            <div className="mb-4 rounded-lg bg-green-50 text-green-700 text-sm px-4 py-2">
              {status}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">

            <div>
              <InputLabel htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                name="username"
                value={data.username}
                className="mt-1 block w-full rounded-xl"
                autoComplete="username"
                isFocused
                onChange={(e) => setData('username', e.target.value)}
              />
              <InputError message={errors.username} className="mt-1" />
            </div>

            <div>
              <InputLabel htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full rounded-xl"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />
              <InputError message={errors.password} className="mt-1" />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) =>
                    setData('remember', e.target.checked)
                  }
                />
                <span className="text-gray-600">Remember me</span>
              </label>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              )}
            </div>

            {/* Button */}
            <PrimaryButton
              className="w-full justify-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-lg"
              disabled={processing}
            >
              {processing ? 'Signing in...' : 'Sign In'}
            </PrimaryButton>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Artisan Tech House
          </p>
        </div>
      </div>
    </GuestLayout>
  )
}
