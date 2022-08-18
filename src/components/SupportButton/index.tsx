import Link from 'next/link'
import styles from './styles.module.scss'

export const SupportButton = () => {
  return (
    <div className={styles.doanteContainer}>
        <Link href ='/donate'>
            <button>Apoiar</button>
        </Link>
    </div>
  )
}
