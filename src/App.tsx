// Root component — immediately.run renders the default export of THIS file.
// Global CSS is imported here (not main.tsx). A read-only system app: it reads
// the user's app-scoped spaces and lists them; no writes, no management.
import './index.css';
import './App.css';
import SpacesPanel from './components/SpacesPanel';

function App() {
  return <SpacesPanel />;
}

export default App;
