import { useAddNewActivityMutation } from '../features/UserLogs/activitiesApiSlice';
import useAuth from './useAuth';
import useGenerateORDATE from './useGenerateORDATE';

const useActivityLogger = () => {
  const { name, avatar } = useAuth();
  const { formatDate } = useGenerateORDATE();
  const [addNewActivity] = useAddNewActivityMutation();

  const notification = (orderTransaction) => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        popupNotif(orderTransaction)
      } else {
        console.log('Permission denied')
      }
    })
  }


  const popupNotif = (orderTransaction) => {
    const notification = new Notification(`Biyaya - Kape Tindahan Atbp`,{
      body: `New order saved!\nBarista: ${orderTransaction?.barista}\nOrder ID: ${orderTransaction?._id}\nGrand Total: ₱ ${Number(orderTransaction?.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
    })

    notification.onclick = ()=>{
       console.log('Notification clicked!')
    }
  }


  const log = async (actionType, description, orderTransaction) => {
    try {

      await addNewActivity({
        name,
        date: formatDate(),
        avatar,
        actionType,
        description,
        orderID: orderTransaction?._id,
        seen: false,
      });

      orderTransaction && notification(orderTransaction)

    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  return { log };
};

export default useActivityLogger;
