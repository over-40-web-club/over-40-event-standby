// App.tsx
import { MusicController } from './components/MusicController';
import { BlinkingLogo } from './components/BlinkingLogo';
import { EventInfo } from './components/EventInfo';
import { EventImage } from './components/EventImage';
import { DigitalClock } from './components/DigitalClock';
import { ParticipationGuidelines } from './components/ParticipationGuidelines';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-violet-900 to-indigo-900 text-white p-8 flex flex-col items-center justify-center">
      <MusicController
        url="../src/assets/maou_bgm_healing16.mp3"
        initialVolume={0.5}
        className="fixed top-4 right-4"
      />
      <BlinkingLogo />

      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-lg p-8 space-y-8">
        <EventInfo />
        <EventImage />
        <DigitalClock />
        <ParticipationGuidelines />
        <Footer />
      </div>
    </div>
  );
}

export default App;
