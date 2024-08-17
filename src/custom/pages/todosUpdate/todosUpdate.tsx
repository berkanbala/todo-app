import { useNavigate, useParams } from "react-router-dom";
import { getOneTodo, updateTodo } from "../../../common/services/todo";
import { useEffect, useState } from "react";
import { Loading } from "../../../common/components/layout/ui/loading/loading";
import { Header } from "../../../common/components/layout/ui/header/header";
import { Button } from "../../../common/components/layout/ui/button/button";
import { toast } from "react-toastify";
import { Input } from "../../../common/components/layout/ui/input/input";
import styles from "./todosUpdate.module.scss";

export const TodosUpdate = () => {
  const [textValue, setTextValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id && !window.localStorage.getItem("accessToken")) {
      navigate("/");
      return;
    }

    const getOneDetail = async () => {
      try {
        setLoading(true);
        const response = await getOneTodo(id!);
        setTextValue(response.data.text);
        setTimeValue(response.data.time);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };

    getOneDetail();
  }, [id]);

  if (!window.localStorage.getItem("accessToken")) {
    window.location.href = "/login";

    return;
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) {
      navigate("/");
      return;
    }

    try {
      setSubmitLoading(true);
      const response = await updateTodo(id, {
        text: textValue,
        time: timeValue,
      });
      toast.success(response.message);
      navigate("/");
    } catch (error: any) {
      console.warn(error);
      toast.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
            disabled={submitLoading}
          />
          <Input
            value={timeValue}
            onChange={(e: any) => setTimeValue(e.target.value)}
            type="date"
            disabled={loading}
          />
          <Button type="submit" text="Update" disabled={loading} />
        </form>
      </div>
    </div>
  );
};
