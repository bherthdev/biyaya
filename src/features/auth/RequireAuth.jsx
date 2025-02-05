import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import AccessDenied from "../../components/AccessDenied"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()
    const content = (
        allowedRoles.includes(roles)
            ? <Outlet />
            :  <AccessDenied />
              // <Navigate to="/access-denied" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth