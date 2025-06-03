import { withAuth } from '../../../components/withAuth';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { clientApi } from '../../../services/apiClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const NewClient = () => {
  const router = useRouter();
  const { loading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await clientApi.createClient({
        name,
        email,
        phone
      });

      if (response.error) {
        toast.error(response.error);
        return;
      }

      toast.success('Cliente cadastrado com sucesso!');
      router.push('/dashboard/clients');
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data?.errors;
        if (errors) {
          Object.values(errors).forEach(errorMessages => {
            errorMessages.forEach(message => toast.error(message));
          });
        } else {
          toast.error('Erro ao cadastrar cliente');
        }
      } else {
        toast.error('Erro ao cadastrar cliente');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout title="Clientes">
        <div className="flex justify-center py-8">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout title="Novo Cliente">
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Novo Cliente</h2>

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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Cadastrando' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withAuth(NewClient);
