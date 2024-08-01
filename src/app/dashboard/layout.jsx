import Link from "next/link";

const links = [
    { name: "Home", href: "/" },
    { name: "File List", href: "files-lists" },
];

export default function DashboardLayout({ children }) {
    return (
        <>
            <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-blue-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center">
                                GT
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex overflow-hidden bg-white pt-16">
                <aside
                    id="sidebar"
                    className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
                    aria-label="Sidebar"
                >
                    <div className="relative flex-1 flex flex-col min-h-0 borderR border-gray-200 bg-white pt-0">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex-1 px-3 bg-white divide-y space-y-1">
                                <ul className="space-y-2 pb-2">
                                    {links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-base capitalize text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                                            >
                                                <span className="ml-3">{link.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                <div
                    className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                    id="sidebarBackdrop"
                ></div>
                <div
                    id="main-content"
                    className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
                >
                    <main>
                        <div className="pt-6 px-4">
                            <div className="w-full h-screen">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}