import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FiCalendar } from "react-icons/fi";
import db from "../../services/firebaseConnect";
import styles from './task.module.scss'

interface PropsTask{
  id: string,
  created: string,
  tarefa: string,
  nome: string,
  userId: string,
}

interface PropsDocSnap{
  docSnap: PropsTask
}

const Task = ({ docSnap }:PropsDocSnap)  => {
	return (
		<>
    <Head>
      <title>Detalhe da sua tarefa</title>
    </Head>

    <article className={styles.container} >
      <div className={styles.actions} >
        <div>
          <FiCalendar size={30} color = 'white'/>
          <span>Tarefa criada</span>
          <time> {docSnap.created} </time>
        </div>
      </div>
      <p>{docSnap.tarefa}</p>
    </article>

		</>
	);
};

export default Task;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const id = params?.id as string;

	const session = await getSession({ req });
	

	const docRef = doc(db, "tarefas", id);
	const docSnap = await getDoc(docRef).then((snapshot) => {
		const data = {
			id: snapshot.id,
			created: format(snapshot.data()?.created.toDate(), "dd MMMM yyyy"),
			tarefa: snapshot.data()?.tarefa,
			nome: snapshot.data()?.nome,
			userId: snapshot.data()?.userId,
		};
		return data;
	}).catch(()=>{
		return {}
	})	

	if (!session?.vip || Object.keys(docSnap).length === 0) {
		return {
			redirect: {
				destination: "/board",
				permanent: false,
			},
		};
	}

	return {
		props: {
			docSnap,
		},
	};
};
