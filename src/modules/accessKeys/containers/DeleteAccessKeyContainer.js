import { useState, useCallback, useContext } from 'react';
import { deleteAccessKey } from '../actions';
import LoaderContext from '../../../utilities/LoaderContext';

const DeleteAccessKeyContainer = ({ children }) => {
	const [, dispatch] = useContext(LoaderContext);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const onDelete = useCallback(({ accessKeyId, organizationId }) => {
		setSubmitting(true);

		return deleteAccessKey(accessKeyId, { organizationId })(dispatch).then(() => {
			setSubmitting(false);
		}).catch((err) => {
			setSubmitting(false);
			setError(err);
		});
	}, [dispatch]);


	return children({
		onDelete,
		submitting,
		error,
	});
};

export default DeleteAccessKeyContainer;
