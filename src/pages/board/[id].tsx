import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client";
import { FiCalendar } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection'
import { format } from 'date-fns'
import style from './task.module.scss'
import Head from 'next/head'

type Task = {
  id: string;
  craeted: string | Date;
  createdFormat?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface TaskListProps{
  data: string;
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task

  return(
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article className={style.container}>
        <div className={style.action}>
          <div>
            <FiCalendar size={30} color="#FFFF" />
            <span>Tarefa criada</span>
            <time>{task.createdFormat}</time>
          </div>
        </div>
        <p>{task.tarefa}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const {id} = params;
  const session = await getSession({req});
  
  if(!session?.vip){
    return{
      redirect:{
        destination: '/board',
        permanent: false,
      }
    }
  }

  const data = await firebase.firestore().collection('tarefas')
  .doc(String(id))
  .get()
  .then((snapshot) => {
    const data = {
      id: snapshot.id,
      crated: snapshot.data().created,
      createdFormat: format(snapshot.data().created.toDate(), 'dd, MMMM yyyy'),
      tarefa: snapshot.data().tarefa,
      userId: snapshot.data().userID,
      nome: snapshot.data().nome,
    }

    return JSON.stringify(data);
  })
  .catch(() => {
    return {};
  })

  if(Object.keys(data).length === 0){
    return{
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  return{
    props:{
      data
    }
  }
}