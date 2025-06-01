import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Head>
        <title>Laravel NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
    </AuthProvider>
  )
}
