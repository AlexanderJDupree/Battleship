import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { socket, SocketContext } from './contexts';
import { Navbar, Footer } from './components';
import { Home, About } from './pages';

function App() {
  return (
    <main className='App'>
      <SocketContext.Provider value={socket}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/about' exact component={() => <About />} />
            <Route path='/' exact component={() => <Home />} />
          </Switch>
          <Footer />
        </Router>
      </SocketContext.Provider>
    </main>
  );
}

export default App;
