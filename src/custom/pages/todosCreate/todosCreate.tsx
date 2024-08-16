import { useState } from "react";
import styles from "./todosCreate.module.scss";
import { Header } from "../../../common/components/layout/ui/header/header";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../../common/services/todo";

export const TodosCreate = () => {
  const [textValue, setTextValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const navigate = useNavigate();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await createTodo({ text: textValue, time: timeValue });
      console.log(response);
    } catch (error) {
      console.warn(error);
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
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Yeni bir yapılacak ekle"
          />
          <input
            type="date"
            value={timeValue}
            onChange={(event: any) => setTimeValue(event.target.value)}
            className={styles.datePicker}
          />
          <button type="submit">Ekle</button>
        </form>
      </div>
    </div>
  );
};
