import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton";
import db from "../../services/firebaseConnect";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "react-toastify";

interface BoardProps {
  user: {
    name: string;
    id: string;
  };
  data: 
    {
      id: string;
      nome: string;
      created: string;
      tarefa: string;
      userId: string;
    }[]
  ;
}

const Board = ({ user, data }: BoardProps) => {
  const [input, setInput] = useState("");
  const [tasks, settasks] = useState(data);

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();

    if (input === "") {
      alert("Preencha alguma tarefa");
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.name,
    })
      .then((doc) => {
        toast.success("Tarefa criada com sucesso", {
          position: toast.POSITION.TOP_RIGHT
        });
        data.unshift({
          id: doc.id,
          created: format(new Date(), "dd MMMM yyyy"),
          tarefa: input,
          userId: user.id,
          nome: user.name,
        });
        settasks(data);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTask = async (id:string) =>{
    await deleteDoc(doc(db, "tarefas", id)).then(()=>{
      let taskDeleted = tasks.filter(item=>item.id !== id);
      settasks(taskDeleted);
    });
    toast.warning("Tarefa deletada!", {
      position: toast.POSITION.TOP_RIGHT
    }) 
  }

  return (
    <>
      <Head>
        <title>Minhas Tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>
          Você tem {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"}
        </h1>

        <section>
          {tasks.map((task, index) => (
            <article key={index} className={styles.taskList}>
              <Link href={`board/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#ffb800" />
                    <time>{task.created}</time>
                  </div>
                  <button>
                    <FiEdit2 size={20} color="white" />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDeleteTask(task.id)}>
                  <FiTrash size={20} color="#ff3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto</h3>
        <div>
          <FiClock size={28} color="white" />
          <time>Última doação foi a 3 dias</time>
        </div>
      </div>

      <SupportButton />
    </>
  );
};

export default Board;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    name: session.user.name,
    //@ts-ignore
    id: session.token.sub,
  };

  const q = query(
    collection(db, "tarefas"),
    where("userId", "==", user.id),
    orderBy("created", "desc")
  );
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      created: format(doc.data().created.toDate(), "dd MMMM yyyy"),
    };
  });

  return {
    props: {
      user,
      data,
    },
  };
};
