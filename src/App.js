import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TeamPage from './pages/TeamPage';
import DiscussProjectPage from './pages/DiscussProjectPage';
import VideoToTextPage from './pages/VideoToTextPage';
import NotFoundPage from './pages/NotFoundPage';
//comment
import './assets/css/styles.css';
import VideoToText from './pages/VideoToText';
import VideoHighlightPage from './pages/VideoHighlightPage';
function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/project" component={ProjectPage} />
      <Route exact path="/project/:id" component={ProjectDetailPage} />
      <Route exact path="/team" component={TeamPage} />
      <Route exact path="/discuss-project" component={DiscussProjectPage} />
      <Route exact path="/video-text" component={VideoToTextPage} />
      <Route exact path="/video-highlight" component={VideoHighlightPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    </div>
  );
}

export default App;
