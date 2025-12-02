import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const MustBeAdmin = ({ component: Component, shouldBeLoggedIn, redirect = '/', shouldBeAdmin = false }) => {
    const { isLoggedIn } = useAuth();
    const [role, setRole] = useState(undefined);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
        const timer = setTimeout(() => setIsChecking(false), 300);
        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    if (isChecking) {
        return null;
    }

    if (shouldBeAdmin) {
        if (role === 'ROLE_ADMIN' && isLoggedIn) {
            return <Component />
        }
        if (!isLoggedIn && shouldBeLoggedIn) {
            return <Navigate to="/login" />
        }
        return <Navigate to={redirect || '/'} />
    }

    if (shouldBeLoggedIn) {
        if (isLoggedIn) {
            return <Component />
        }
        return <Navigate to="/login" />
    }

    return <Component />
}
export default MustBeAdmin;
