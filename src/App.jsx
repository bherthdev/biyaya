import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import ItemsList from './features/items/ItemsList'
import EditItem from "./features/items/EditItem";
import NewItemForm from "./features/items/NewItemForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from './config/roles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"
import POS from "./features/pos/POS";


function App() {
  return (
    <div className="h-full w-full  dark:bg-slate-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />

          {/* <Route path="login" element={<Login />} /> */}

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="dashboard" element={<DashLayout />}>

                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="users">
                      <Route index element={<> <ToastContainer /> <UsersList /></>} />
                      <Route path=":id" element={<> <ToastContainer /><EditUser /> </>} />
                      <Route path="new" element={<> <ToastContainer /><NewUserForm /> </>} />
                    </Route>
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="items">
                      <Route index element={<> <ToastContainer /> <ItemsList /></>} />
                      <Route path=":id" element={<> <ToastContainer /><EditItem /> </>} />
                      <Route path="new" element={<> <ToastContainer /><NewItemForm /> </>} />
                    </Route>
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="pos">
                      <Route index element={<> <ToastContainer /> <POS /></>} />
                      <Route path=":id" element={<> <ToastContainer /><EditItem /> </>} />
                      <Route path="new" element={<> <ToastContainer /><NewItemForm /> </>} />
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>

                </Route>{/* End Dash */}
              </Route>
            </Route>
          </Route>{/* End Protected Routes */}

          <Route path='*' element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;

