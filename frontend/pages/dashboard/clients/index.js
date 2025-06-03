import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { withAuth } from '../../../components/withAuth';
import { clientApi } from '../../../services/apiClient';
import Layout from '../../../components/Layout';
import { toast } from 'react-toastify';
import { FiEye, FiTrash2, FiChevronLeft, FiChevronRight, FiPlus, FiAlertCircle } from 'react-icons/fi';

function ConfirmToast({ onConfirm }) {
    return (
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-medium">Tem certeza que deseja excluir este Cliente?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onConfirm} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
            Sim
          </button>
          <button onClick={() => toast.dismiss()} className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm">
            Cancelar
          </button>
        </div>
      </div>
    );
  }

export function ClientsPage() {
  const { loading: authLoading } = useAuth();
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await clientApi.getClients(page);
        setClients(data.data || []);
        setLastPage(data.last_page || 1);
      } catch (err) {
        toast.error('Erro ao carregar clientes');
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    }

    if (!authLoading) {
      fetchClients();
    }
  }, [page, authLoading]);

  async function handleDelete(id) {
    toast(
        <ConfirmToast
         onConfirm={async () => {
            try {
                await clientApi.deleteClient(id);
                toast.success('Cliente excluído com sucesso!');

                const updated = await clientApi.getClients(page);
                setClients(updated.data || []);
              } catch (err) {
                toast.error('Erro ao excluir cliente');
              }
        }} />,
        {
            position: 'top-center',
            autoClose: false,
            style: { textAlign: 'center' }
          }
      );
  }

  if (authLoading || loadingData) {
    return (
      <Layout title="Clientes">
        <div className="flex justify-center py-8">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Clientes">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
        </div>

        <Link href="/dashboard/clients/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200 flex items-center space-x-2">
            <FiPlus size={24} />
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      <FiEye className="mr-1" size={16} />
                    </Link>

                    <button
                      onClick={() => handleDelete(client.id)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      type="button"
                    >
                      <FiTrash2 className="mr-1" size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Página <span className="font-semibold">{page}</span> de{' '}
          <span className="font-semibold">{lastPage}</span>
        </p>

        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`p-2 rounded ${page === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-300'}`}
            type="button"
            aria-label="Página anterior"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => setPage((prev) => (prev < lastPage ? prev + 1 : prev))}
            disabled={page >= lastPage}
            className={`p-2 rounded ${page >= lastPage ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-300'}`}
            type="button"
            aria-label="Próxima página"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ClientsPage);
