import Container from '@material-ui/core/Container';

import TabPanel from './components/tabs'
import ModalError from './components/modal-error'

function App() {
  return (
    <div className="App">
		  <TabPanel />
      <ModalError />
    </div>
  );
}

export default App;
