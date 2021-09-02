import Head from 'next/head'
import style from '../styles/styles.module.scss'

export default function Home() {
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
				
				<div className={style.donaters}>
					<img src="https://github.com/pauloricardorc.png" alt="" />
				</div>
			</main>
		</>
	)
}
