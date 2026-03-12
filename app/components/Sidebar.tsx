import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#0F8F8C] text-white h-screen p-6">
      <h1 className="text-xl font-bold mb-10">Maxirain Admin</h1>

      <nav className="space-y-4">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/admin/products">Products</Link>

        <Link href="/admin/categories">Categories</Link>
      </nav>
    </div>
  );
}
