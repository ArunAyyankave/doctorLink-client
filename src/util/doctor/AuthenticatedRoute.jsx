import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkIfDocLoggedIn } from '../../redux/features/doctorSlice';
// import { loginRoute } from '../constants/routes';

const AuthenticatedRoute = ({ children }) => {

  let location = useLocation();

  const doc = useSelector(slice => slice.doc)

  if (!checkIfDocLoggedIn()) {
    return <Navigate to='/doctor/signin' replace />;
  }
  return children;
};

export default AuthenticatedRoute;