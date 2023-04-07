import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import UsersManage from "../pages/admin/UserManage";
import DoctorManage from "../pages/admin/DoctorManage";
import AdminLogin from "../pages/admin/AdminLogin";
import Appointments from "../pages/admin/Appointments";

import AuthenticatedRoute from "../util/admin/authenticatedRoute";
import UnAuthenticatedRoute from "../util/admin/unAuthenticatedRoute";

function AdminRoutes() {
    return (
        <Routes>
            <Route index element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
            <Route path="signin" element={<UnAuthenticatedRoute><AdminLogin /></UnAuthenticatedRoute>} />
            <Route path="users" element={<AuthenticatedRoute><UsersManage /></AuthenticatedRoute>} />
            <Route path="doctors" element={<AuthenticatedRoute><DoctorManage /></AuthenticatedRoute>} />
            <Route path="appointments" element={<AuthenticatedRoute><Appointments /></AuthenticatedRoute>} />
        </Routes>
    )
}

export default AdminRoutes;