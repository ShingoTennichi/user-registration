import styles from "../../../styles/Home.module.css";
import { User } from "../../../types/types";
import ResetButton from "../ResetButton";

export default function Update({
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
      <h4>Update User</h4>
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
                    value={input?.id}
                    onChange={(e) => handleInput(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="firstName">First Name:</label>
                </td>
                <td>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={input?.firstName}
                    onChange={(e) => handleInput(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="lastName">Last Name:</label>
                </td>
                <td>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={input?.lastName}
                    onChange={(e) => handleInput(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                </td>
                <td>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={input?.email}
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
            onClick={() => updateUser(input, setUsers)}
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
}

async function updateUser(input: User, setUsers: Function): Promise<void> {
  const data: Response = await fetch("/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
    },
    body: JSON.stringify(input),
  });

  const result: User[] | null = await data.json();
  if (result !== null) {
    setUsers(result);
  } else {
    throw new Error("Incorrect input ID is inputted");
  }
}
