import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './pages/auth/layout.jsx';
import Login from './pages/auth/authPages/Login.jsx';
import CreateAccount from './pages/auth/authPages/CreateAccount/page.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
        </Route>



        <Route path="*" element={<Navigate to="/auth" replace />} />




      </Routes>
    </BrowserRouter>
  )
}

export default App;
