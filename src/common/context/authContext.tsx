import { createContext, useContext, useState } from "react";
import { IUser } from "../models/user";

const AppContext = createContext<IAppContext>({} as any);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<IUser>({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{
        auth: {
          userInfo,
          setUserInfo,
          isAuthenticated,
          setIsAuthenticated,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

interface IAppContext {
  auth: {
    userInfo: IUser;
    setUserInfo: (_val: any) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: any;
  };
}

interface Props {
  children: React.ReactNode;
}
