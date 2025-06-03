import { withAuth } from '../../components/withAuth';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import Layout from '../../components/Layout';

export function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bem-vindo ao Painel</h2>
        <p className="text-gray-600">Use o menu acima para navegar pelas funcionalidades.</p>
      </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
