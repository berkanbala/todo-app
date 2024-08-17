import { deleteTodo, getAllTodos } from "../../../common/services/todo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "../../../common/components/todoItem/todoItem";
import { TodosPDF } from "./todosPDF";
import { Loading } from "../../../common/components/layout/ui/loading/loading";
import { Header } from "../../../common/components/layout/ui/header/header";
import { Button } from "../../../common/components/layout/ui/button/button";
import { toast } from "react-toastify";
import { ITodo } from "./helpers";
import { pdf } from "@react-pdf/renderer";
import styles from "./todos.module.scss";

export const Todos = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      navigate("/login");
      return;
    }

    const allTodos = async () => {
      try {
        setLoading(true);
        const response = await getAllTodos();
        setData(response.data);
      } catch (error: any) {
        console.warn(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    allTodos();
  }, []);

  const handleToggle = (id: number) => {
    setData(
      data.map((el) => {
        if (el.todo_id == id) {
          return {
            ...el,
            checked: !el.checked,
          };
        }
        return el;
      })
    );
  };

  const handleDelete = async (id: number) => {
    if (removeLoading) {
      return;
    }

    try {
      setRemoveLoading(true);
      const response = await deleteTodo(id.toString());
      toast.success(response.message);
      setData(data.filter((el) => el.todo_id !== id));
    } catch (error: any) {
      console.warn(error);
      toast.error(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handlePDF = async () => {
    if (removeLoading) {
      return;
    }

    const blob = await pdf(<TodosPDF data={data} />).toBlob();
    const linkElement = document.createElement("a");
    linkElement.href = URL.createObjectURL(blob);
    linkElement.target = "_blank";
    linkElement.click();
    linkElement.remove();
  };

  const handleCreate = () => {
    if (removeLoading) {
      return;
    }

    navigate("/create");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h2> TODO APP </h2>
          <Button onClick={handlePDF} text="Download PDF" />
          <Button onClick={handleCreate} text="Create Todo" />
        </div>
        <div className={styles.content}>
          {data.length > 0 ? (
            data.map((todo) => (
              <TodoItem
                removeLoading={removeLoading}
                key={todo.todo_id}
                id={todo.todo_id}
                text={todo.text}
                time={todo.time}
                toggle={handleToggle}
                remove={handleDelete}
                checked={todo.checked}
              />
            ))
          ) : (
            <div className={styles.emptyMessage}>The to-do list is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
};
