import { User } from '@root/src/core/models';
import { create } from 'zustand';

interface AuthUserState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  toggleAuth: () => void;
  setAuth: (isAuth: boolean) => void;
}

export const useAuthUserStore = create<AuthUserState>()(set => ({
  user: null,
  isAuth: false,
  setUser: user => set({ user }),
  toggleAuth: () => set(state => ({ isAuth: !state.isAuth })),
  setAuth: isAuth => set({ isAuth }),
}));
