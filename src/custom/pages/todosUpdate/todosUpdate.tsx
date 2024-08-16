import { useEffect, useState } from "react";
import styles from "./todosUpdate.module.scss";
import { Header } from "../../../common/components/layout/ui/header/header";
import { useNavigate } from "react-router-dom";
import { useParams } from "next/navigation";
// import { getOneTodo } from "../../../common/services/todo";

export const TodosUpdate = () => {
  const [textValue, setTextValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  // useEffect(()=>{
  //   const getOneDetail = async () => {
  //     try {
  //       const response = await getOneTodo(id);
  //       console.log(response)
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   };

  //   getOneDetail();
  // },[id])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div onClick={() => navigate("/")} className={styles.back}>
          Back
        </div>
        <form>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Yeni bir yapılacak ekle"
          />
          <input
            value={timeValue}
            onChange={(e: any) => setTimeValue(e.target.value)}
            type="date"
          />
          <button type="submit">Ekle</button>
        </form>
      </div>
    </div>
  );
};
