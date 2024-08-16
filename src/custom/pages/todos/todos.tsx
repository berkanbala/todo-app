import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../../../common/services/todo";
import styles from "./todos.module.scss";
import { TodoItem } from "../../../common/components/todoItem/todoItem";
import { Header } from "../../../common/components/layout/ui/header/header";
import { toast } from "react-toastify";
import { string } from "yup";

export const Todos = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allTodos = async () => {
      try {
        const response = await getAllTodos();
        setData(response.data);
      } catch (error) {
        console.warn(error);
      }
    };

    allTodos();
  }, []);

  const handleToggle = (id: number) => {
    // const todo = data.find((t) => t.id === id);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTodo(id.toString());
    console.log(response);
    toast.success("başarıyla silindi.");
  };

  const handlePDF = () => {};

  if (!window.localStorage.getItem("accessToken")) {
    return <div>Giriş yapmalısınız</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h2> TODO APP </h2>
          <button onClick={handlePDF}> Download PDF </button>
          <button onClick={() => navigate("/create")}>Create Todo</button>
        </div>
        <div className={styles.content}>
          {data.length > 0 ? (
            data.map((todo) => (
              <TodoItem
                key={todo.todo_id}
                id={todo.todo_id}
                text={todo.text}
                time={todo.time}
                toggle={handleToggle}
                remove={handleDelete}
              />
            ))
          ) : (
            <div className={styles.emptyMessage}>Yapılacaklar listesi boş.</div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ITodo {
  todo_id: number;
  user_id: number;
  time: string;
  text: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
