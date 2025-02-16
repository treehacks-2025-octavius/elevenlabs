import { Conversation } from './Conversation';
import './App.css';

export default function Home() {
  return (
    <main>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="big-title">
          Octavius Assistance Request
        </h1>
        <Conversation />
      </div>
    </main>
  );
}
