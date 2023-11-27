import { HashRouter, Route, Routes } from 'react-router-dom';

import Editor from '@pages/options/Editor';
import Auth from '@pages/options/Auth';
import Register from '@pages/options/Register';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
}
