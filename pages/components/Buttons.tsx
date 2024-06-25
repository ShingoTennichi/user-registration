import styles from "../../styles/Home.module.css";

export default function Buttons({
  btnState,
  setBtnState,
  handleInput,
}: {
  btnState: string;
  setBtnState: Function;
  handleInput: Function;
}) {
  return (
    <div className={styles.btns}>
      <button
        onClick={() => handleBtnState("create", setBtnState, handleInput)}
        className={
          btnState === "create"
            ? `${styles.btnLeft} ${styles.btnActive}`
            : styles.btnLeft
        }
      >
        Create
      </button>
      <button
        onClick={() => handleBtnState("delete", setBtnState, handleInput)}
        className={
          btnState === "delete"
            ? `${styles.btnCenter} ${styles.btnActive}`
            : styles.btnCenter
        }
      >
        Delete
      </button>
      <button
        onClick={() => handleBtnState("update", setBtnState, handleInput)}
        className={
          btnState === "update"
            ? `${styles.btnRight} ${styles.btnActive}`
            : styles.btnRight
        }
      >
        Update
      </button>
    </div>
  );
}

function handleBtnState(
  state: string,
  setBtnState: Function,
  handleInput: Function
) {
  setBtnState(state);
  handleInput(null, "reset");
}
