import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { socket, SocketContext } from './contexts';
import { Navigation } from './components';
import { Home, About, Game, NotFound } from './pages';

function App() {
  return (
    <main className='App'>
      <SocketContext.Provider value={socket}>
        <Router>
          <div className="page-content">
            <div className="main-content">
              <Navigation />
              <Switch>
                <Route path='/game' exact component={Game} />
                <Route path='/about' exact component={About} />
                <Route path='/' exact component={Home} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </SocketContext.Provider>
    </main>
  );
}

export default App;
