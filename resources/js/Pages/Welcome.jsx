import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayoutPublic";
import Navbar from "@/Components/Navbar";

export default function CommunityLanding({ community }) {
    return (
        <GuestLayout>
            <Head title={community?.name} />

            <Navbar community={community} />

            {/* HERO SECTION */}
            <section
                className="relative text-white overflow-hidden pt-20 min-h-screen flex items-center"
                style={{
                    backgroundImage: community?.hero_image
                        ? `url(/storage/${community.hero_image})`
                        : "linear-gradient(to bottom right, #312e81, #1e3a8a, #020617)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-lg">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Welcome to Our Community
                        </h1>
                        <p className="mt-6 text-lg text-gray-200 leading-relaxed">
                            Let’s work together with our community in order to
                            fulfill your goals and needs. Feel free to explore
                            our project to see what we already working on
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#about"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold shadow-lg text-center transition"
                            >
                                Explore Our Project
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="max-w-6xl mx-auto py-20 px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6">About Us</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {community?.short_description ??
                                "Kami adalah komunitas yang fokus pada pengembangan electronics, embedded system, IoT, dan automation."}
                        </p>
                    </div>

                    {/* Right */}
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-1 shadow-xl">
                        <div className="bg-white rounded-3xl p-8">
                            <h3 className="text-xl font-semibold mb-4">
                                Our Expertise
                            </h3>

                            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                                {community?.skills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6 text-center mb-12">
                    <h2 className="text-4xl font-bold">Community in Numbers</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Beberapa pencapaian yang telah kami bangun bersama
                        komunitas.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatCard
                        label="Members"
                        value={community?.stats?.members ?? 120}
                    />
                    <StatCard
                        label="Projects"
                        value={community?.stats?.projects ?? 35}
                    />
                    <StatCard
                        label="Events"
                        value={community?.stats?.events ?? 18}
                    />
                    <StatCard
                        label="Partners"
                        value={community?.stats?.partners ?? 6}
                    />
                </div>
            </section>

            {/* GALLERY SECTION */}
            {community?.galleries?.length > 0 && (
                <section className="max-w-7xl mx-auto py-20 px-6">
                    <h2 className="text-4xl font-bold mb-10">
                        Gallery Kegiatan
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {community.galleries.map((img) => (
                            <div
                                key={img.id}
                                className="group relative rounded-2xl overflow-hidden shadow-lg"
                            >
                                <img
                                    src={`/storage/${img.image}`}
                                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                                    <p className="text-white text-sm">
                                        Community Activity
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* JOIN SECTION */}
            <section
                id="join"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20"
            >
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold">Join with us</h2>
                    <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
                        Jadilah bagian dari komunitas teknologi yang aktif,
                        kolaboratif, dan penuh inovasi.
                    </p>

                    <div className="mt-8">
                        <a
                            href="/login"
                            className="inline-block px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-gray-100"
                        >
                            Join Now
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-gray-400 py-10">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">
                            {community?.name ?? "Artisan Tech House"}
                        </h3>
                        <p className="text-sm">
                            Building future engineers and innovators.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-2">Links</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <a href="#about" className="hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#join" className="hover:text-white">
                                    Join
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-2">
                            Contact
                        </h4>
                        <p className="text-sm">
                            Email: {community?.email ?? "info@community.dev"}
                        </p>
                    </div>
                </div>
            </footer>
        </GuestLayout>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-3xl font-extrabold text-indigo-600">{value}</p>
            <p className="text-gray-600 mt-2">{label}</p>
        </div>
    );
}
