
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import NotFoundPage from './Pages/NotFound';
import EstatesPage from './Pages/EstatesPage';
import AdminDashboard from './Pages/AdminDashboard';
import EstateDetails from './Pages/EstateDetails';
import AddEstatePage from './Pages/AddEstatePage';
import MyEstatesPage from './Pages/MyEstatesPage';
import ForbiddenPage from './Pages/ForbiddenPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/estates/:page' element={<EstatesPage />}></Route>
        <Route path='/estates/' element={<EstatesPage />}></Route>
        <Route path='/my_estates' element={<MyEstatesPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/add_estate' element={<AddEstatePage />}></Route>
        <Route path='/admin_db' element={<AdminDashboard />}></Route>
        <Route path='/details/:estateId' element={<EstateDetails />}></Route>
        <Route path='/*' element={<NotFoundPage />}></Route>
        <Route path='/forbidden' element={<ForbiddenPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
