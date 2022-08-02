import { useState, useCallback, useContext } from 'react';
import { editAccessKey } from '../actions';
import LoaderContext from '../../../utilities/LoaderContext';

// TODO refactor with DeleteAccessKeyContainer
const EditAccessKeyContainer = ({ children }) => {
	const [, dispatch] = useContext(LoaderContext);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const onEdit = useCallback(({ accessKeyId, organizationId, data }) => {
		setSubmitting(true);
		return editAccessKey(accessKeyId, data, { organizationId })(dispatch).then(() => {
			setSubmitting(false);
		}).catch((err) => {
			setSubmitting(false);
			setError(err);
		});
	}, [dispatch]);
    
	return children({
		onEdit,
		submitting,
		error,
	});
};

export default EditAccessKeyContainer;
