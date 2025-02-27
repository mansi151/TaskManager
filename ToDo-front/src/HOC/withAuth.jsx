import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar/navbar";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <Navbar />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuth;
