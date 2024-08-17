import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/components/layout/ui/button/button";
import { login } from "../../../common/services/user";
import { toast } from "react-toastify";
import { Input } from "../../../common/components/layout/ui/input/input";
import styles from "./login.module.scss";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (window.localStorage.getItem("accessToken")) {
    window.location.href = "/";

    return;
  }

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>Log In</div>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            disabled={loading}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            disabled={loading}
          />
          <Button type="submit" text="Login" disabled={loading} />
        </form>
        <div className={styles.register}>
          <span>You haven't account? </span>
          <span onClick={handleSignUp}>Register</span>
        </div>
      </div>
    </div>
  );
};
