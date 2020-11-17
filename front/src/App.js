import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/Container';
import Link from '@material-ui/core/Container';

import { ClassifierForm, ArticleList } from './components'
function App() {
  return (
    <div className="App">
      <AppBar position="static" color="'primary'">
        <Link href="#">
          Link
        </Link>
      </AppBar>

      <Container>
        <ClassifierForm />
        <ArticleList />
      </Container>
    </div>
  );
}

export default App;
