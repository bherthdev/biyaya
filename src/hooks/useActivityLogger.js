import { useAddNewActivityMutation } from '../features/UserLogs/activitiesApiSlice';
import Order from '../features/pos/Order';
import useAuth from './useAuth';

const useActivityLogger = () => {
    const { name, avatar } = useAuth();
    const { formatDate } = Order()

  const [addNewActivity, { isLoading, isSuccess, isError, error }] = useAddNewActivityMutation();


  const log = async (actionType, description) => {

    const result = await addNewActivity({
        name,
        date: formatDate(),
        avatar,
        actionType,
        description,
        seen: false
    })
    //  if (result) console.log("result", result)

  };

  return { log };
};

export default useActivityLogger;
