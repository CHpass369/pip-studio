import { Route } from 'react-router';

import { Login } from './login/Login';
import { Register } from './register/Register';


const routes = () => (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </>
);

export { routes };
