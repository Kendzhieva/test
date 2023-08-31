import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Test from './pages/Test/Test';
import Answers from './pages/Answers/Answers';
import OneUserAnswer from './pages/OneUserAnswer/OneUserAnswer';
import AddTest from './pages/AddTest/AddTest';
import AddQuestion from './pages/AddQuestion/AddQuestion';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/test/:title' element={<Test/>}/>
          <Route path='/answers' element={<Answers/>}/>
          <Route path='/add/test' element={<AddTest/>}/>
          <Route path='/add/question' element={<AddQuestion/>}/>
          <Route path='/answers/:title/:name/:id' element={<OneUserAnswer/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
