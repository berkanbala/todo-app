import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "./todoItem.module.scss";
import Delete from "../../../assets/icons/delete.svg";
import Pencil from "../../../assets/icons/pencilsvg.svg";

export const TodoItem = ({
  removeLoading,
  id,
  toggle,
  remove,
  text,
  time,
  checked,
}: IProps) => {
  const navigate = useNavigate();

  const handleUpdate = (id: number) => {
    if (removeLoading) {
      return;
    }

    navigate(`/update/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input type="checkbox" checked={checked} onChange={() => toggle(id)} />
        <div
          className={classNames(styles.description, checked && styles.active)}
        >
          <div>{text} </div>
          <div>{time} </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div onClick={() => remove(id)}>
          <img src={Delete} alt="delete" />
        </div>
        <div onClick={() => handleUpdate(id)}>
          <img src={Pencil} alt="pencil" />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  id: number;
  checked: boolean;
  text: string;
  time: string;
  removeLoading: boolean;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}
