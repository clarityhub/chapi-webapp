import withAuth from '../context/withAuth';

const IsNotAuthenticated = ({ auth, children }) => (
	!auth.isAuthenticated() && children
);

export default withAuth(IsNotAuthenticated);
