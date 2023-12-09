import Image from 'next/image'
import styles from './page.module.css'
import Nav from '@/components/landingpage/Nav'
import Hero from '@/components/landingpage/Hero'
import Convertsection from '@/components/landingpage/Convertsection'

export default function Home() {
  return (
        <section className='landing-page'>
          <Nav />
          <Hero />
          <Convertsection />

        </section>
  )
}
