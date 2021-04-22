import './styles/main.css';
import { DebugMessage } from 'common/lib/events';

function App() {
  return (
    <main className='App'>
      <div className='container mx-auto'>
        <h1 className='bg-info text-light text-center'>Hello World!</h1>
        <p>{DebugMessage}</p>
      </div>
    </main>
  );
}

export default App;
