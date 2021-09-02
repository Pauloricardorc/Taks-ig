import Link from 'next/link'
import style from './styles.module.scss'

export function SuporteButton(){
  return(
    <div className={style.donateContainer}>
      <Link href="/donate">
        <button>Apoiar</button>
      </Link>
    </div>
  )
}