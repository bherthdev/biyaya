import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from './ordersApiSlice'
import EditOrderForm from './EditOrderForm'
import PageLoader from '../../components/PageLoader'


const EditOrder = () => {
    const { id } = useParams()

    const order = useSelector(state => selectOrderById(state, id))

    const content = item ? <EditOrderForm order={order} /> : <PageLoader />

    return content
}

export default EditOrder