import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../common/services/user";
import { Button } from "../../../common/components/layout/ui/button/button";
import { toast } from "react-toastify";
import { Input } from "../../../common/components/layout/ui/input/input";
import styles from "./register.module.scss";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (window.localStorage.getItem("accessToken")) {
    window.location.href = "/";

    return;
  }

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>Sign up</div>
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
            placeholder="Password"
            disabled={loading}
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            disabled={loading}
          />
          <Button type="submit" text="Register" disabled={loading} />
        </form>
        <div className={styles.login}>
          <span>You haven an account? </span>
          <span onClick={handleLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};
