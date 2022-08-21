import Link from 'next/link'
import { useState } from 'react'
import styles from './styles.module.scss'

export const SupportButton = () => {

  const [display, setDisplay] = useState<'none'|'flex'>('flex')

  return (
    <div className={styles.doanteContainer} style = {{display: display}}>
        <span onClick={()=>setDisplay('none')} >X</span>
        <Link href ='/donate'>
            <button>Apoiar</button>
        </Link>
    </div>
  )
}
