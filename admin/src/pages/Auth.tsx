import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const whiteListPath = ['/login']
    if (whiteListPath.includes(location.pathname)) {
        return children;
    }

    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to='/login' replace></Navigate>
    }
    return children
}
export default Auth;
