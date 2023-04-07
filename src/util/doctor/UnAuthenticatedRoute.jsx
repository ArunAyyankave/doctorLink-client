import { Navigate } from "react-router-dom";
import { checkIfDocLoggedIn } from "../../redux/features/doctorSlice";

const UnAuthenticatedRoute = ({ children }) => {

  if (checkIfDocLoggedIn()) {
    return <Navigate to='/doctor' replace />;
  }
  return children;
};

export default UnAuthenticatedRoute;