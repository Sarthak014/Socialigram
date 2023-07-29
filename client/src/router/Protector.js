import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Protected({ children }) {
  const isAuth = useSelector((state) => state.token);

  if (!isAuth) {
    return (<Navigate to="/" replace />);
  }
  return children;
}

export default Protected;
