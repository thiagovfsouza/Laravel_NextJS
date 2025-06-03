import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function Layout({ children, title = "Dashboard" }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Painel</h1>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bem-vindo, <strong>{user?.name}</strong></span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-200 flex items-center justify-center"
              aria-label="Sair da conta"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4 overflow-x-auto">
            <Link
              href="/dashboard"
              className={`whitespace-nowrap ${
                router.pathname === '/dashboard'
                  ? 'text-blue-700 font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/clients"
              className={`whitespace-nowrap ${
                router.pathname === '/dashboard/clients'
                  ? 'text-blue-700 font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clientes
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
