import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { socket, SocketContext } from './contexts';
import { Navigation, Footer } from './components';
import { Home, About, Game } from './pages';

function App() {
  return (
    <main className='App'>
      <SocketContext.Provider value={socket}>
        <Router>
          <Navigation />
          <Switch>
            <Route path='/game' exact component={Game} />
            <Route path='/about' exact component={About} />
            <Route path='/' exact component={Home} />
          </Switch>
          <Footer />
        </Router>
      </SocketContext.Provider>
    </main>
  );
}

export default App;
