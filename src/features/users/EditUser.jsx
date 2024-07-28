import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import PageLoader from '../../components/PageLoader'


const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))


    const content = user ? <EditUserForm user={user} /> : <PageLoader />

    return content
}

export default EditUser