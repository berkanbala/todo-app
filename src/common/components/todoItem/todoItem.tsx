import styles from "./todoItem.module.scss";
import { useNavigate } from "react-router-dom";
import Delete from "../../../assets/icons/delete.svg";
import Pencil from "../../../assets/icons/pencilsvg.svg";

export const TodoItem = ({ id, toggle, remove, text, time }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input type="checkbox" checked={false} onChange={() => toggle(id)} />
        <div className={styles.description}>
          <div>{text} </div>
          <div>{time} </div>
        </div>
      </div>

      <div className={styles.actions}>
        <div onClick={() => remove(id)}>
          <img src={Delete} alt="delete" />
        </div>
        <div onClick={() => navigate(`/update/${id}`)}>
          <img src={Pencil} alt="pencil" />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  id: number;
  // user_id: number;
  // time: string;
  // text: boolean;
  // checked: boolean;
  // createdAt: Date;
  // updatedAt: Date;
  text: string;
  time: string;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}
