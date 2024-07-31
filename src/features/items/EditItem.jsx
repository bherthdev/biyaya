import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItemById } from './itemsApiSlice'
import EditItemForm from './EditItemForm'
import PageLoader from '../../components/PageLoader'


const EditItem = () => {
    const { id } = useParams()

    const item = useSelector(state => selectItemById(state, id))


    const content = item ? <EditItemForm item={item} /> : <PageLoader />

    return content
}

export default EditItem