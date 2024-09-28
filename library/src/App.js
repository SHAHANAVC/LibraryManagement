
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import AddNew from './component/AddNew';
import Edit from './component/Edit';

function App() {
  return (
    <>
     <Header/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addbook' element={<AddNew/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
    </>
  );
}

export default App;
