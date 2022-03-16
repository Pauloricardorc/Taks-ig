import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOption = {
  "client-id": "AahRkdSwW6rLK69jyupo8MP_YMk-9HEwcwOEbLEJJjEddNQS_fQNO9ZHH3X4JoYGTlTGgMcv347T9ovO",
  currency: "BRL",
  intent: "capture",
}

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOption}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider> 
  )
}

export default MyApp
