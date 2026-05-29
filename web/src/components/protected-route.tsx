import { Navigate } from "react-router-dom";

type ProtectedRouteProps ={
    children: React.ReactNode
}

export function ProtectedRoute({children}:ProtectedRouteProps){
    const token = localStorage.getItem('accessToken');

    if(!token){
        return <Navigate to='/login' replace></Navigate>
    }
    return <>{children}</>
}