import { useNavigate } from "react-router-dom";
import styles from "./header.module.scss";

export const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <span>Hello Test</span>
      <button onClick={logout}>Çıkış Yap</button>
    </div>
  );
};
