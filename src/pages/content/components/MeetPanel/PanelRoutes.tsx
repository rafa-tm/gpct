import { HashRouter, Routes, Route } from 'react-router-dom';

import AuthPage from '@src/pages/content/components/MeetPanel/Auth';
import ViewScriptPage from '@src/pages/content/components/MeetPanel/ViewScript';
import ListScriptsPage from '@src/pages/content/components/MeetPanel/ListScripts';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@root/src/firebase';
import { useAuthUserStore } from '@root/src/shared/zustand/useAuthUserStore';
import { getUser } from '@root/src/core/controllers/User';

export default function PanelRoutes() {
  const setAuth = useAuthUserStore(state => state.setAuth);
  const setUser = useAuthUserStore(state => state.setUser);

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
        <Route path="/" index element={<ViewScriptPage />} />
        <Route path="/:id" index element={<ViewScriptPage />} />
        <Route path="/list" element={<ListScriptsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}
