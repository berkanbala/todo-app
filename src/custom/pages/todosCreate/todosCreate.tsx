import { useNavigate } from "react-router-dom";
import { createTodo } from "../../../common/services/todo";
import { useEffect, useState } from "react";
import { Header } from "../../../common/components/layout/ui/header/header";
import { Button } from "../../../common/components/layout/ui/button/button";
import { toast } from "react-toastify";
import { Input } from "../../../common/components/layout/ui/input/input";
import styles from "./todosCreate.module.scss";

export const TodosCreate = () => {
  const [textValue, setTextValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!window.localStorage.getItem("accessToken")) {
    window.location.href = "/login";
    return;
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await createTodo({ text: textValue, time: timeValue });
      toast.success(response.message);
      navigate("/");
    } catch (error: any) {
      console.warn(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div onClick={() => navigate("/")} className={styles.back}>
          Back
        </div>
        <form onSubmit={submit}>
          <Input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Add a new to-do"
            disabled={loading}
          />
          <Input
            value={timeValue}
            onChange={(e: any) => setTimeValue(e.target.value)}
            type="date"
            disabled={loading}
          />
          <Button type="submit" text="Add" disabled={loading} />
        </form>
      </div>
    </div>
  );
};
