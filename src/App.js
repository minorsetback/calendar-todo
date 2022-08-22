import Calendar from './components/Calendar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Todos from './components/Todos';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Calendar />} />
          <Route path='/:id' element={<Todos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
