import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ component: Component, shouldBeLoggedIn, redirect, mustBeAdmin=false }) => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        // console.log(isLoggedIn, shouldBeLoggedIn)
    }, [])

    if (!mustBeAdmin && ( Component.name === 'CreateCoursePage' || Component.name === 'EditCatalog' )) {
        return <Navigate to={'/'} />
    }

    if (!isLoggedIn && shouldBeLoggedIn) {
        return <Navigate to="/login" />
    }

    if (isLoggedIn && !shouldBeLoggedIn) {
        return <Navigate to={redirect ? redirect : '/'} />
    }

    return <Component />
}
export default PrivateRoute;