import { GetStaticProps } from 'next'
import Head from 'next/head'
import style from '../styles/styles.module.scss'
import firebase from '../services/firebaseConnection'
import { useState } from 'react'

type Data = {
	id: string;
	donate: boolean;
	lastDonate: Date;
	image: string;
}

interface HomeProps{
	data: string;
}

export default function Home({ data }: HomeProps) {

	const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data))

	return (
		<>
			<Head>
				<title>Board - Organizando suas Tarefas</title>
			</Head>
			<main className={style.contentContainer}>
				<img src="/images/board-user.svg" alt="Ferramenta board" />
				<section className={style.callToAction}>
					<h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...</h1>
					<p>
						<span>100% Gratuita</span> e online.
					</p>
				</section>
				{donaters.length !== 0 && <h3>Apoidores:</h3>}
				<div className={style.donaters}>
					{donaters.map(item => (
						<img key={item.image} src={item.image} alt="imagem do colaborador" />
					))}
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async() => {

	const donaters = await firebase.firestore().collection('users').get()

	const data = JSON.stringify(donaters.docs.map( u => {
		return{
			id: u.id,
			...u.data(),
		}
	}))

	return{
		props:{
			data
		}
	}
	revalidate: 60 * 60 // a cada 60Min esse site vai buscar para saber se existe alguma alteração nessas informações
}
