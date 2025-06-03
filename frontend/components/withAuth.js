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

export async function withAuthSSR(callback) {
    return async function wrappedGetServerSideProps(context) {
      const { req } = context;
      const session = req?.user;

      if (!session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return callback(context);
    };
  }
