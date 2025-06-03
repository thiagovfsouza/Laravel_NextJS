import { withAuth } from '../../../components/withAuth';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { clientApi } from '../../../services/apiClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ClientDetails = () => {
  const router = useRouter();
  const { loading: authLoading } = useAuth();
  const [client, setClient] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  // Carrega cliente ao abrir a página
  useEffect(() => {
    async function fetchClient() {
        const { id } = router.query;
      try {
        if (!id) {
            return;
        }
        const data = await clientApi.getClientById(id);
        setClient(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (err) {
        toast.error('Erro ao carregar cliente');
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
        fetchClient();
    }
  }, [authLoading]);

  // Função de atualização
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { id } = router.query;
      const updated = await clientApi.updateClient(id, {
        name: name,
        email: email,
        phone: phone
      });
      if (updated.error) {
        toast.error(updated.error);
        return;
      }
        toast.success('Cliente atualizado!');
        setClient(updated);
        router.push('/dashboard/clients');
    } catch (err) {
        if (err.response && err.response.status === 422) {
            if (err.response && err.response.data) {
                const errors = err.response.data.errors;
                if (errors) {
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errors[key].forEach(errorMessage => {
                                toast.error(errorMessage);
                            });
                        }
                    }
                } else {
                    toast.error('Erro ao atualizar cliente: ' + (err.response.data.message || 'Erro desconhecido'));
                }
            }
        }else{
            toast.error('Erro ao atualizar cliente');
        }
    } finally {
        setLoading(false);
    }
  };

  if (authLoading || !name) {
    return (
      <Layout title="Clientes">
        <div className="flex justify-center py-8">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Cliente - ${client.name}`}>
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Cliente</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Link href="/dashboard/clients" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {loading ? 'Atualizando' : 'Atualizar'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(ClientDetails);
