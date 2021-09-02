import style from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/client'

export function SignInButton(){

  const [session] = useSession()

  return session ? (
    <button
      type="button"
      className={style.signInButton}
      onClick={() => signOut() }
    >
      <img src={session.user.image} alt="Foto do Usuario" />
      Olá {session.user.name}
      <FiX color="#737380" className={style.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={style.signInButton}
      onClick={() => signIn('github') }
    >
      <FaGithub color="#FFb800" className={style.Icon} />
      Entrar em Github
    </button>
  )
}