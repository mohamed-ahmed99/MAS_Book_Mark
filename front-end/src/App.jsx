import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './pages/auth/Layout.jsx';
import Login from './pages/auth/authPages/login/page.jsx';
import CreateAccount from './pages/auth/authPages/CreateAccount/page.jsx';
import MainPage from './pages/mainPage/page.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main app */}
        <Route path="/" element={<MainPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
        </Route>



        <Route path="*" element={<Navigate to="/" replace />} />




      </Routes>
    </BrowserRouter>
  )
}

export default App;
