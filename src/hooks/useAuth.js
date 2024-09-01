import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, name, username, position, roles, avatar, biyaya_secret, dev } = decoded.UserInfo

        isManager = roles === 'Manager' ? true : false
        isAdmin = roles === 'Admin' ? true : false

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { id, name, username, position, roles, status, isManager, isAdmin, avatar, biyaya_secret, dev }
    }

    return { id:'', name:'', username: '', position: '', roles: '', avatar: '', isManager, isAdmin, status, dev: false }
}
export default useAuth