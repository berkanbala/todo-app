import { useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import { Button } from "../button/button";

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <span>Hello Test</span>
      <Button onClick={logout} text="Logout" />
    </div>
  );
};
