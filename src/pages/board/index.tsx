import  Head from 'next/head'
import style from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SuporteButton } from '../../components/SuporteButton'

export default function Board() {
  return(
    <>
      <Head>
        <title>Minhas Tarefas - Board</title>
      </Head>
      <main className={style.container}>
        <form>
          <input 
          type="text"
          placeholder="Digite sua tarefa..."
          />

          <button type="submit">
            <FiPlus size={20} color="#17181f" />
          </button>
        </form>
        <h1>Você tem duas tarefas</h1>

        <section>
          <article className={style.taskList}>
            <p>Aprender criar projetos usando Next JS e aplicando firebase com back.</p>
            <div className={style.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>17 Junho 2020</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF"/>
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#FF3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className={style.vipContainer}>
        <h3>Obrigado por apoiar esse projeto</h3>
        <div>
          <FiClock size={28}  color="#FFF" />
          <time>Ùltima doação foi a 3 dias</time>
        </div>
      </div>

      <SuporteButton />
    </>
  )
}