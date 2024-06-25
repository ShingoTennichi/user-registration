import styles from "../../styles/Home.module.css";
import { User } from "../../types/types";
import Create from "./Form/Create";
import Delete from "./Form/Delete";
import Update from "./Form/Update";

export default function Forms({
  input,
  handleInput,
  btnState,
  setUsers,
}: {
  input: User;
  handleInput: Function;
  btnState: string;
  setUsers: Function;
}) {
  return (
    <div className={styles.wrap}>
      {btnState === "create" && (
        <Create input={input} handleInput={handleInput} setUsers={setUsers} />
      )}
      {btnState === "delete" && (
        <Delete input={input} handleInput={handleInput} setUsers={setUsers} />
      )}
      {btnState === "update" && (
        <Update input={input} handleInput={handleInput} setUsers={setUsers} />
      )}
    </div>
  );
}
