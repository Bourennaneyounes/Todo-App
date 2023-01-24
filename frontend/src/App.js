import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/todos' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
