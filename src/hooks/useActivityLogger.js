import { useAddNewActivityMutation } from '../features/UserLogs/activitiesApiSlice';
import useAuth from './useAuth';
import useGenerateORDATE from './useGenerateORDATE';

const useActivityLogger = () => {
  const { name, avatar } = useAuth();
  const { formatDate } = useGenerateORDATE();
  const [addNewActivity] = useAddNewActivityMutation();

  const log = async (actionType, description, orderID) => {
    try {
      await addNewActivity({
        name,
        date: formatDate(),
        avatar,
        actionType,
        description,
        orderID,
        seen: false,
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  return { log };
};

export default useActivityLogger;
