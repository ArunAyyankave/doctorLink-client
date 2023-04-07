import { Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/UserRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path='/admin/*' element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
