import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { loading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
    }, [loading, user, router]);

    if (loading) {
        return <Loader />;
      }

      if (!user && !loading) {
        return null;
      }

    return <Component {...props} />;
  };
}
