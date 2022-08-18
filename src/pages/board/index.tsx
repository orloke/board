import Head from "next/head";
import { FiCalendar, FiClock, FiEdit, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton";
import styles from "./styles.module.scss";

const Board = () => {
  return (
    <>
      <Head>
        <title>Minhas Tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form>
          <input type="text" placeholder="Digite sua tarefa.." />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>Primeira tarefa</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#ffb800" />
                  <time>17 de agosto 2022</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="white" />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#ff3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>
      <div className={styles.vipContainer} >
        <h3>
            Obrigado por apoiar esse projeto
        </h3>
        <div>
            <FiClock size={28} color="white" />
            <time>
                Última doação foi a 3 dias
            </time>
        </div>
      </div>

      <SupportButton/>
    </>
  );
};

export default Board;
