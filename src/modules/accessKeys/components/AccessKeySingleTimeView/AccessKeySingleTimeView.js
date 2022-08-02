import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import InputGroupAppend from '@clarityhub/unity-web/lib/forms/InputGroupAppend';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import CopyToClipboard from '@clarityhub/unity-web/lib/interactions/CopyToClipboard';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import {
	testAccessKeyCognito,
	testAccessKeyBasic,
} from '../../api';

/**
 * This isn't normally allowed ;) But we just need to test that authentication
 * works.
 */
const testAuthentication = async (accessKeyId, accessKeySecret, organizationId) => {
	// Test that basic and bearer auth both work
	try {
		await Promise.all([
			testAccessKeyCognito(organizationId),
			testAccessKeyBasic(accessKeyId, accessKeySecret),
		]);
	} catch (e) {
		console.error(e);

		// XXX report this! This is a critical error!
	}
};

const AccessKeySingleTimeView = ({ history, name, accessKeyId, accessKeySecret, organizationId }) => {
	const [show, setShow] = useState(false);
	
	const onToggleClick = useCallback((e) => {
		e.preventDefault();

		setShow(!show);
	}, [show, setShow]);

	useEffect(() => {
		testAuthentication(accessKeyId, accessKeySecret, organizationId);
	}, [accessKeyId, accessKeySecret, organizationId]);

	return (
		<Fragment>
			<Notification type="success" variant="thin">
				Access Key "{name}" was created successfully
			</Notification>
			<Typography>
				This is the only time we will show you your Access Key Secret.
			</Typography>
			<Typography>	
				Please copy and store your Access Key ID and Access Key Secret.
				Treat your Access Key Secret like a password.
			</Typography>

			<CopyToClipboard>
				{({ onClick }) => (
					<InputGroup>
						<LabelledInput
							label="Access Key ID"
							value={accessKeyId}
						/>
						<InputGroupAppend>
							<Button
								outline
								type="primary"
								onClick={() => onClick(accessKeyId)}
								icon={<FileCopyIcon />}
							>
								Copy
							</Button>
						</InputGroupAppend>
					</InputGroup>
				)}
			</CopyToClipboard>
			<CopyToClipboard>
				{({ onClick }) => (
					<InputGroup>
						<LabelledInput
							label="Access Key Secret"
							value={accessKeySecret}
							type={show ? 'text' : 'password'}
						/>
						<InputGroupAppend>
							<Button outline type="primary" onClick={onToggleClick}>
								{show ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</Button>
						</InputGroupAppend>
						<InputGroupAppend>
							<Button
								outline
								type="primary"
								onClick={() => onClick(accessKeySecret)}
								icon={<FileCopyIcon />}
							>
								Copy
							</Button>
						</InputGroupAppend>
					</InputGroup>
				)}
			</CopyToClipboard>

			<InputGroup>
				<ButtonSet>
					<LinkButton to="/access-keys" history={history}>Done</LinkButton>
				</ButtonSet>
			</InputGroup>
		</Fragment>
	);
};

export default withRouter(AccessKeySingleTimeView);
