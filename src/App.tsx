import ComicBursts from './features/effects/components/ComicBursts'
import Sparks from './features/effects/components/Sparks'
import Footer from './features/hero/components/Footer'
import Hero from './features/hero/components/Hero'
import Hud from './features/hud/components/Hud'
import MissionSelect from './features/missions/components/MissionSelect'
import Missions from './features/missions/components/Missions'
import ProgressProvider from './features/progress/ProgressProvider'
import LangProvider from './i18n/LangProvider'

const App = () => (
  <LangProvider>
    <ProgressProvider>
      <Sparks />
      <Hud />
      <main>
        <Hero />
        <MissionSelect />
        <Missions />
      </main>
      <Footer />
      <ComicBursts />
    </ProgressProvider>
  </LangProvider>
)

export default App
