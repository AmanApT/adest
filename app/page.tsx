import Nav from '@/components/landingpage/Nav'
import Hero from '@/components/landingpage/Hero'
import Convertsection from '@/components/landingpage/Convertsection'
import Whyus from '@/components/landingpage/Whyus'

export default function Home() {
  return (
        <section className='landing-page'>
          <Nav />
          <Hero />
          <Convertsection />
          <Whyus />

        </section>
  )
}
