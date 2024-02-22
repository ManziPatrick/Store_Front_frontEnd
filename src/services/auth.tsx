// auth.js
import jwtDecode from 'jwt-decode';

const useAuth = () => {
	const token = localStorage.getItem('token');
	const data = localStorage.getItem('user');
  
	if (token) {
		const decodedToken: { role: string } = jwtDecode(token);
		const role = decodedToken.role;
		return {
		isAuthenticated: true,
		role,
		};

} else if (data) {
	return {
	isAuthenticated: true,
	role: data || 'CLIENT',
	};
} else {
	return {
	isAuthenticated: false,
	role: '',
	};
}
};

export { useAuth };
