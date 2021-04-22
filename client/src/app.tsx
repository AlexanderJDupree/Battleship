import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home, About } from './pages';

function App() {
  return (
    <main className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/about' exact component={() => <About />} />
          <Route path='/' exact component={() => <Home />} />
        </Switch>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
