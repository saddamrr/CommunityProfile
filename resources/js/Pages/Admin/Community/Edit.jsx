import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function Edit({ community }) {
    const { data, setData, post, processing, errors } = useForm({
        name: community?.name || '',
        tagline: community?.tagline || '',
        short_description: community?.short_description || '',
        description: community?.description || '',
        email: community?.email || '',
        skills: community?.skills || [],
        logo: null,
        hero_image: null,
    })

    const [skillInput, setSkillInput] = useState('')

    function addSkill() {
        if (!skillInput.trim()) return
        if (data.skills.includes(skillInput)) return

        setData('skills', [...data.skills, skillInput])
        setSkillInput('')
    }

    function removeSkill(skill) {
        setData(
            'skills',
            data.skills.filter(s => s !== skill)
        )
    }

    function submit(e) {
        e.preventDefault()

        post(route('admin.community.update'), {
            forceFormData: true,
            _method: 'patch',
        })
    }

    return (
        <AdminLayout>
            <Head title="Community Settings" />

            <form onSubmit={submit} className="max-w-5xl mx-auto space-y-10">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Community Settings
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your community identity and public information
                    </p>
                </div>

                {/* IDENTITY */}
                <Section title="Identity">
                    <Input
                        label="Community Name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        error={errors.name}
                    />

                    <Input
                        label="Tagline"
                        value={data.tagline}
                        onChange={e => setData('tagline', e.target.value)}
                        error={errors.tagline}
                    />

                    <Input
                        label="Public Email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        error={errors.email}
                    />
                </Section>

                {/* DESCRIPTION */}
                <Section title="Description">
                    <Textarea
                        label="Short Description"
                        value={data.short_description}
                        onChange={e => setData('short_description', e.target.value)}
                        error={errors.short_description}
                    />

                    <Textarea
                        label="Full Description"
                        rows={6}
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        error={errors.description}
                    />
                </Section>

                {/* SKILLS */}
                <Section title="Expertise / Skills">
                    <div className="flex gap-3">
                        <input
                            value={skillInput}
                            onChange={e => setSkillInput(e.target.value)}
                            placeholder="Add skill (e.g. Embedded System)"
                            className="border rounded-lg px-4 py-2 w-full"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {data.skills.map(skill => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm flex items-center gap-2"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="text-indigo-400 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </Section>

                <Section title="Branding">

                    {/* LOGO */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Community Logo</label>

                        {community?.logo && (
                            <img
                                src={`/storage/${community.logo}`}
                                className="h-20 mb-3 rounded-lg"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('logo', e.target.files[0])}
                        />

                        {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
                    </div>

                    {/* HERO IMAGE */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Hero Image</label>

                        {community?.hero_image && (
                            <img
                                src={`/storage/${community.hero_image}`}
                                className="h-40 mb-3 rounded-xl object-cover"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData('hero_image', e.target.files[0])}
                        />

                        {errors.hero_image && (
                            <p className="text-red-500 text-sm">{errors.hero_image}</p>
                        )}
                    </div>
                </Section>

                {/* SAVE */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:opacity-90"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </AdminLayout>
    )
}

/* ---------- UI COMPONENTS ---------- */

function Section({ title, children }) {
    return (
        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {children}
        </div>
    )
}

function Input({ label, error, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input {...props} className="border rounded-lg px-4 py-2 w-full" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

function Textarea({ label, error, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <textarea {...props} className="border rounded-lg px-4 py-2 w-full" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
