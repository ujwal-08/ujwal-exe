import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Projects from '../sections/Projects'
import Achievements from '../sections/Achievements'
import Stack from '../sections/Stack'
import Contact from '../sections/Contact'

export default function Home() {
  useDocumentTitle(
    undefined,
    'Portfolio of Ujwal Manjunath, a CSDS undergraduate building intelligent systems across AI, software engineering, embedded systems and accessibility.',
  )
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Stack />
      <Contact />
    </>
  )
}
