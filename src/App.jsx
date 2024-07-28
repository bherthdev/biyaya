import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from './config/roles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="min-h-screen transition duration-200 bg-gray-50 dark:bg-slate-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />

          {/* <Route path="login" element={<Login />} /> */}

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>

                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="users">

                      <Route index element={<> <ToastContainer /> <UsersList /></>} />

                      <Route path=":id" element={<> <ToastContainer /><EditUser /> </>} />

                      <Route path="new" element={<> <ToastContainer /><NewUserForm /> </>} />



                    </Route>
                  </Route>


                </Route>{/* End Dash */}
              </Route>
            </Route>
          </Route>{/* End Protected Routes */}

          <Route path='*' element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
