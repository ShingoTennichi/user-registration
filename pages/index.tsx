import Head from "next/head";
import { useState } from "react";
import { globalPrisma } from "../prisma/globalPrismaClient";
import { User, Props } from "../types/types";
import UserList from "./components/UserList";
import { ChangeEvent } from "react";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";

const INITIAL_USER_STATE: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

export async function getServerSideProps(): Promise<{
  props: { data: User[] };
}> {
  const prisma: globalPrisma = globalPrisma;
  const data = await prisma.user.findMany();
  return { props: { data } };
}

export default function Home(props: Props) {
  const [users, setUsers] = useState<User[]>(props.data);
  const [btnState, setBtnState] = useState<string>("create");
  const [input, setInput] = useState<User>(INITIAL_USER_STATE);

  function handleInput(
    event: ChangeEvent<HTMLInputElement>,
    option = null,
    input: User = INITIAL_USER_STATE
  ): void {
    if (option === "reset") {
      setInput(INITIAL_USER_STATE);
    } else if (option === "update") {
      setInput({
        id: input.id,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      });
    } else if (option === "delete") {
      setInput({ ...INITIAL_USER_STATE, id: input.id });
    } else {
      const { name, value } = event.target;
      setInput((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }
  return (
    <>
      <Head>
        <title>User Registration App</title>
        <meta
          name="description"
          content="Web application that demonstrates user registration with Next.js, Prisma and CockroachDB"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2>User Registration App</h2>
        <Forms
          input={input}
          handleInput={handleInput}
          btnState={btnState}
          setUsers={setUsers}
        />
        <Buttons
          btnState={btnState}
          setBtnState={setBtnState}
          handleInput={handleInput}
        />
        <UserList
          users={users}
          handleInput={handleInput}
          setBtnState={setBtnState}
        />
      </main>
    </>
  );
}
