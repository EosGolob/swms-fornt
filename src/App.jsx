import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckShopAndOrder from './components/CheckShopAndOrder';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/shop' element={<CheckShopAndOrder/>}></Route>     
      </Routes>
    </Router>
  );
}
export default App
