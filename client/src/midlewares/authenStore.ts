import { create } from "zustand";

export type AuthenType = true | false | null;
export type authenticationType = "register" | "login" | null;
export type AdminType = 0 | 1 | null;
type isLoginModalType = {
  authen: AuthenType;
};
type isLoginActionType = {
  setAuthen: (authentication: AuthenType) => void;
};
type AuthenModalType = {
  authentication: authenticationType;
};
type AuthenActionType = {
  setAuthentication: (authentication: authenticationType) => void;
};
type AminModalType = {
  isAdmin: AdminType;
};
type AdminActionType = {
  setIsAdmin: (authentication: AdminType) => void;
};

const useAuthenStore = create<
  isLoginModalType &
    isLoginActionType &
    AuthenModalType &
    AuthenActionType &
    AminModalType &
    AdminActionType
>((set) => ({
  authen: false,
  setAuthen: (authen: AuthenType) => {
    set({ authen: authen });
  },
  authentication: null,
  setAuthentication: (authentication: authenticationType) => {
    set({ authentication: authentication });
  },
  isAdmin: null,
  setIsAdmin: (authentication: AdminType) => {
    set({ isAdmin: authentication });
  },
}));

export default useAuthenStore;
