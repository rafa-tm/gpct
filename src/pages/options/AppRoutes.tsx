import { HashRouter, Routes, Route } from 'react-router-dom';
import EditorPage from '@src/pages/options/Editor';
import AuthPage from '@src/pages/options/Auth';
import RegisterPage from '@src/pages/options/Register';
import HomePage from '@src/pages/options/Home';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@root/src/firebase';
import { useAuthUserStore } from '@root/src/shared/zustand/useAuthUserStore';
import { getUser } from '@root/src/core/controllers/User';

export default function AppRoutes() {
  const setAuth = useAuthUserStore(state => state.setAuth);
  const setUser = useAuthUserStore(state => state.setUser);
  const isAuth = useAuthUserStore(state => state.isAuth);
  const user = useAuthUserStore(state => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        getUser(user.uid).then(user => {
          setUser(user);
          setAuth(true);
        });
      } else {
        setAuth(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setAuth, setUser]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" index element={isAuth && user ? <HomePage /> : <EditorPage />} />
        <Route path="/edit/:id" element={<EditorPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}
