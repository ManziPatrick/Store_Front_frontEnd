import { ReactNode } from 'react';
import { useAuth } from '../../services/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
	element,
	requiredRoles,
}: {
	element: ReactNode;
	requiredRoles: string[];
}) => {
	const { isAuthenticated, role } = useAuth();

	if (!isAuthenticated) {
		// User is not authenticated, redirect to the login page.
		return <Navigate to="/login" />;
	}

	if (!requiredRoles.includes(role)) {
		// User has a different role, handle as needed (e.g., redirect to an unauthorized page).
		return <Navigate to="/unauthorized" />;
	}

	return element;
};

export default ProtectedRoute;
