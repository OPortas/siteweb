import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Specialities } from './components/Specialities';
import { Reviews } from './components/Reviews';
import { Map } from './components/Map';
import { LoadingScreen } from './components/LoadingScreen';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <LoadingScreen />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <About />
          <Specialities />
          <Reviews />
          <Map />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}