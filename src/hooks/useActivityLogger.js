import { useAddNewActivityMutation } from '../features/UserLogs/activitiesApiSlice';
import useAuth from './useAuth';
import useGenerateORDATE from './useGenerateORDATE';

const useActivityLogger = () => {
  const { name, avatar } = useAuth();
  const { generateDate } = useGenerateORDATE();
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
    const notification = new Notification(`Biyaya - Kape Tindahan Atbp`, {
      body: `New order saved!\nBarista: ${orderTransaction?.barista}\nOrder ID: ${orderTransaction?._id}\nGrand Total: ₱ ${Number(orderTransaction?.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
      vibrate: [200, 100, 200],
    })

    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      // window.open("https://biyaya.vercel.app/dashboard", "_blank");
    }
  }


  const log = async (actionType, description, orderTransaction) => {
    try {

      await addNewActivity({
        name,
        date: generateDate(),
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
