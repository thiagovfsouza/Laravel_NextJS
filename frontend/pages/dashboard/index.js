import { withAuth } from '../../components/withAuth';
import { useAuth } from '../../hooks/useAuth';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';

export function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Painel Administrativo</h1>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bem-vindo, <strong>{user?.name}</strong></span>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4 overflow-x-auto">
            <Link href="/dashboard" className="text-blue-600 font-medium whitespace-nowrap hover:text-blue-800">
              Dashboard
            </Link>
            <Link href="/dashboard/clients" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
              Clientes
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bem-vindo ao Painel</h2>
        <p className="text-gray-600">
          Use o menu acima para acessar as funcionalidades do sistema.
        </p>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);
