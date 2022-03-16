import style from './styles.module.scss'
import Head from 'next/head'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { PayPalButtons } from '@paypal/react-paypal-js'
import firebase from '../../services/firebaseConnection'

// CLIENT_ID = AahRkdSwW6rLK69jyupo8MP_YMk-9HEwcwOEbLEJJjEddNQS_fQNO9ZHH3X4JoYGTlTGgMcv347T9ovO
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps{
  user:{
    nome: string;
    id: string;
    image: string;
  }
}

export default function Donate({ user }: DonateProps) {

  const [vip, setVip] = useState(false)

  async function handleSaveDonate(){
    await firebase.firestore().collection('users')
    .doc(user.id)
    .set({ 
      donate: true,
      lastDonate: new Date(),
      image: user.image
    })
    .then(() => {
      setVip(true)
    })
  }

  return(
    <>
      <Head>
        <title>Ajude a plataforma board à fica online</title>
      </Head>
      <main className={style.container}>
        <img src="/images/rocket.svg" alt="image de seja apoiador" />

        {vip && (
          <div className={style.vip}>
            <img src={user.image} alt="imagem do apoiador" />
            <span>Parabéns vocẽ é um apoiador</span>
          </div>
        )}

        <h1>Seja um apoiador desde projeto 🏆 </h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Pareça na nossa home, tinha funcionalidades exclusivas.</strong>

        <PayPalButtons 
          createOrder={ (data, action) => {
            return action.order.create({
              purchase_units: [{
                amount: {
                  value: '1'
                }
              }]
            })
          }}
          onApprove={(data, action) => {
            return action.order.capture().then(function(details) {
              console.log('Compra Aprovada', + details.payer.name.given_name)
              handleSaveDonate()
            })
          }}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(!session?.id){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image
  }

  return{ 
    props:{
      user
    }
  }
}