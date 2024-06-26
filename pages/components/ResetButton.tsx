import styles from "../../styles/Home.module.css";

export default function ResetButton({ handleInput }: { handleInput: Function }) {
  return (
    <button className={styles.btn} onClick={(e) => handleInput(e, "reset")}>
      Reset
    </button>
  );
}
