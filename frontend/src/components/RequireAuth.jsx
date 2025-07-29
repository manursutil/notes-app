import { Navigate } from "react-router-dom";

const RequireAuth = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default RequireAuth;