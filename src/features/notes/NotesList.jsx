import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import useAuth  from "../../hooks/useAuth";
import { AiOutlineUserAdd } from 'react-icons/ai';

const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth();


  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('noteList', {
    pollingInterval: 15000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
});

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="text-slate-900 dark:text-slate-300">{error?.data?.message}</p>;
  }

  

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds

    if (isManager || isAdmin){
     filteredIds = [...ids]
    }else{
     filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }


    const tableContent = ids?.length && filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

    content = (
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900  dark:text-gray-400">
           Task List
          </h1>

          <a
            href="/dash/notes/new"
            className=" text-[12px] px-4 py-2 text-white dark:text-gray-300 font-medium bg-slate-500 dark:bg-slate-700 hover:bg-slate-700 dark:active:bg-slate-800 rounded-md duration-150"
          >
            <AiOutlineUserAdd size={25} />
          </a>
        </div>
        <div className="overflow-hidden overflow-x-auto rounded-md border border-gray-200 mt-8 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
              <Thead thName="STATUS" />
              <Thead thName="CREATED" />
              <Thead thName="UPDATED" />
              <Thead thName="TITLE" />
              <Thead thName="OWNER" />
              <Thead thName="EDIT" />
              </tr>
            </thead>
            <Tbody tbName= {tableContent} />
          </table>
        </div>
      </div>
    );
  }

  return content;
};
export default NotesList;
