import React, { useState } from "react";
import styles from "./login.module.scss";
import { login } from "../../../common/services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await login({ username, password });
      window.localStorage.setItem("accessToken", response.token.split(" ")[1]);
      navigate("/");
      toast.success("You've made a successful entry.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    if (loading) {
      return;
    }

    navigate("/register");
  };

  if (window.localStorage.getItem("accessToken")) {
    navigate("/");

    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>Giriş Yap</div>
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
          <button disabled={loading} type="submit">
            Giriş Yap
          </button>
        </form>
        <div className={styles.register}>
          <span>You haven't account? </span>
          <span onClick={handleSignUp}>Register</span>
        </div>
      </div>
    </div>
  );
};
