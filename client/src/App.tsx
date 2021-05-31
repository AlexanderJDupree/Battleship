import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { socket, SocketContext } from './contexts';
import { Navigation } from './components';
import { Home, About, Game, NotFound } from './pages';

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
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </SocketContext.Provider>
    </main>
  );
}

export default App;
