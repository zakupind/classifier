import Container from '@material-ui/core/Container';
import { AppBar } from '@material-ui/core';
import { Link } from '@material-ui/core';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Classifier from './pages/classifire'
import Articles from './pages/articles'
import TabPanel from './components/tabs'

function App() {
  return (
    <div className="App">
		<TabPanel />
        {/* <Link href="/classifier">Классификатор</Link>
		<Link href="/articles">Статьи</Link>

	<Router>
		<Switch>
			<Route exact path="/classifier" component={Classifier} />
			<Route exact path="/articles" component={Articles} />
		</Switch>
	</Router> */}

    </div>
  );
}

export default App;
