import { create } from 'zustand';

import { IUser } from '@/appInterface/store/auth';

interface IAuthStore {
  user: IUser
  permissions: any

  authActions: {
    setUser: (user: IUser) => void
  }
}

// init values due to typescript with any
const iUser: any = {}

const useAuthStore = create<IAuthStore>()((set) => ({
  user: iUser,
  permissions: {},

  authActions: {
    setUser: (user: IUser) => set((state) => ({ ...state, user })),
  }
}));

export default useAuthStore;