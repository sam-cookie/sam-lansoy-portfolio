import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <main style={{ overflow: 'visible' }}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}