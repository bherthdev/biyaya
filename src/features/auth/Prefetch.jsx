import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { itemsApiSlice } from '../items/itemsApiSlice';
import { ordersApiSlice } from '../orders/ordersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { logsApiSlice } from '../UserLogs/logsApiSlice';

const Prefetch = () => {
    useEffect(() => {
       // console.log('subscribing')
        // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const items = store.dispatch(itemsApiSlice.endpoints.getItems.initiate())
        const orders = store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())
        const logs = store.dispatch(logsApiSlice.endpoints.getLogs.initiate())

        return () => {
        //    console.log('unsubscribing')
            // notes.unsubscribe()
            users.unsubscribe()
            items.unsubscribe()
            orders.unsubscribe()
            logs.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
