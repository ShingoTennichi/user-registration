import styles from "../../styles/Home.module.css";
import { User } from "../../types/types";

export default function UserList({
  users,
  handleInput,
  setBtnState,
}: {
  users: User[];
  handleInput: Function;
  setBtnState: Function;
}) {
  return (
    <section className={styles.userList}>
      <h3>User List</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={(e) =>
                      handleAction(e, handleInput, setBtnState, "update", user)
                    }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) =>
                      handleAction(e, handleInput, setBtnState, "delete", user)
                    }
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

function handleAction(
  event: any,
  handleInput: Function,
  setBtnState: Function,
  action: string,
  user: User
): void {
  setBtnState(action);
  handleInput(event, action, user);
}
