
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Auth from './Components/Auth';
import Chats from './Components/Chats';

function App() {
  return (
    <Router>
<Header />
        <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/chats' element={<Chats />} />
        </Routes>

    </Router>
  );
}

export default App;
