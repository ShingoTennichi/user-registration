import styles from "../../../styles/Home.module.css";
import { User } from "../../../types/types";
import ResetButton from "../ResetButton";

export default function Delete({
  input,
  handleInput,
  setUsers,
}: {
  input: User;
  handleInput: Function;
  setUsers: Function;
}) {
  return (
    <section className={styles.container}>
      <h4>Delete User</h4>
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="id">ID:</label>
                </td>
                <td>
                  <input
                    id="id"
                    type="text"
                    name="id"
                    value={input.id}
                    onChange={(e) => handleInput(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.actionBtns}>
          <ResetButton handleInput={handleInput} />
          <button
            type="button"
            className={styles.btn}
            onClick={() => deleteUser(input, setUsers)}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

async function deleteUser(input: User, setUsers: Function): Promise<void> {
  const data: Response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application-json",
    },
    body: JSON.stringify(input),
  });

  const result: User[] | null = await data.json();
  if (result !== null) {
    setUsers(result);
    console.log("deleted a input successfully");
  } else {
    console.log("Incorrect input ID is inputted");
  }
}
