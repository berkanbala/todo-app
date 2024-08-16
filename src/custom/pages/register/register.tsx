import React, { useState } from "react";
import styles from "./register.module.scss";
import { toast } from "react-toastify";
import { register } from "../../../common/services/user";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("Şifreler eşleşmiyor.");

      return;
    }

    try {
      setLoading(true);
      await register({ username, password });
      toast.success("You've made a successful entry.");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (loading) {
      return;
    }

    navigate("/login");
  };

  if (window.localStorage.getItem("accessToken")) {
    navigate("/");

    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>Kayıt Ol</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            disabled={loading}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Şifreyi Onayla"
            disabled={loading}
          />
          <button type="submit">Kayıt Ol</button>
        </form>
        <div className={styles.login}>
          <span>You haven an account? </span>
          <span onClick={handleLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};
