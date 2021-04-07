import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TitleAppBar from './components/TitleAppBar';
import InputForm from './components/InputForm';
import Stream from './components/Stream';
import Results from './components/Results';

function App() 
{
  return (
    <div className="App">
      <div className="container">
        <TitleAppBar/>
        <Router>
          <Route exact path="/" component={InputForm}/>
          {/* <Route exact path="/stream/game=:game&viewers=:viewers" component={Stream}/>
          <Route exact path="/results/game=:game&viewers=:viewers" component={Results} /> */}
          <Route exact path="/stream" component={Stream}/>
          <Route exact path="/results" component={Results} />
        </Router>
      </div>   
    </div>
  );
}

export default App;