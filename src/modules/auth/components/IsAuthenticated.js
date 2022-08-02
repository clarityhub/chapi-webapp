import withAuth from '../context/withAuth';

const IsAuthenticated = ({ auth, children }) => (
	auth.isAuthenticated() && children
);

export default withAuth(IsAuthenticated);
