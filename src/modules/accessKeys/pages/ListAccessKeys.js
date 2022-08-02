import React, { useContext, useState } from 'react';

import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import { JSONAPITable } from '@clarityhub/unity-web/lib/components/Table';

import GetAccessKeysContainer from '../containers/GetAccessKeysContainer';
import DefaultLayout from '../../app/layouts/DefaultLayout';
import CurrentOrganization from '../../organizations/context/CurrentOrganization';
import DeleteAccessKeyContainer from '../containers/DeleteAccessKeyContainer';
import DeleteAccessKeyModal from '../components/DeleteAccessKeyModal';

const columns = [
	['Name', 'name'],
	['Description', 'description'],
	['Created', ({ createdAt }) => {
		return new Date(createdAt).toLocaleString();
	}],
];

const ListAccessKeys = ({ history }) => {
	const [{ currentOrganization }] = useContext(CurrentOrganization);
	const [deleteModal, setDeleteModal] = useState(false);

	const handleShowDeleteModal = (accessKey) => {
		setDeleteModal({
			accessKey,
		});
	};

	const handleCloseModal = () => {
		setDeleteModal(false);
	};

	const handleDelete = (onDelete) => {
		return () => {
			onDelete({
				accessKeyId: deleteModal.accessKey.accessKeyId,
				organizationId: currentOrganization.organizationId,
			});

			setDeleteModal(false);
		};
	};

	return (
		<DefaultLayout title="Access Keys">
			<DeleteAccessKeyContainer>
				{({ onDelete, submitting, error }) => (
					<DeleteAccessKeyModal
						open={deleteModal}
						loading={submitting}
						error={error}
						onDelete={handleDelete(onDelete)}
						onClose={handleCloseModal}
						{...deleteModal.accessKey}
					/>
				)}
			</DeleteAccessKeyContainer>

			<Card>
				<CardBody>
					<LinkButton history={history} to="/access-keys/create" type="primary">Create Access Key</LinkButton>
				</CardBody>
			</Card>
			
			<Card>
				<CardBody>
					<GetAccessKeysContainer organizationId={currentOrganization.organizationId}>
						{({ loading, error, accessKeys, retry }) => {
							if (loading) {
								return <Loading flex size={2} />;
							}

							if (error) {
								// TODO Error page
								return (
									<Notification variant="thin" type="danger">
										There were problems with processing your request.

										<Button
											type="white"
											onClick={retry}
										>
											Retry
										</Button>
									</Notification>
								);
							}

							return (
								<JSONAPITable
									data={{
										data: accessKeys,
									}}
									columns={columns}
									actionColumn={({ row }) => {
										return (
											<div style={{ minWidth: '200px' }}>
												<LinkButton
													history={history}
													to={`/access-keys/${row.accessKeyId}`}
													size="small"
													type="primary"
												>
													Edit
												</LinkButton>
												<Button size="small" type="danger" text onClick={() => handleShowDeleteModal(row)}>Delete</Button>
											</div>
										);
									}}
								/>
								
							);
						}}
					</GetAccessKeysContainer>
				</CardBody>
			</Card>
		</DefaultLayout>
	);
};

export default ListAccessKeys;
