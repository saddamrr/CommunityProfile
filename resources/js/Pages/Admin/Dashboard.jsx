import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Total Post" value="12" />
                <Card title="Gallery" value="45" />
                <Card title="Admin" value="1" />
            </div>
        </AdminLayout>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm text-gray-500">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}