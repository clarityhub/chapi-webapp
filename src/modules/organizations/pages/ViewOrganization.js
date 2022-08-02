import React, { useContext } from 'react';

import { Typography } from '@material-ui/core'; // TODO
import Card, { CardBody, CardHeader } from '@clarityhub/unity-web/lib/components/Card';
import { Table, TableRow, TableCell, TableBody } from '@clarityhub/unity-web/lib/components/Table';

import DefaultLayout from '../../app/layouts/DefaultLayout';
import CurrentOrganizationContext from '../context/CurrentOrganization';

const ViewOrganization = () => {
	const [{ currentOrganization }] = useContext(CurrentOrganizationContext);

	return (
		<DefaultLayout title="Organization">
			<Card>
				<CardHeader>Organization Info</CardHeader>
				<CardBody>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography bold align="right">
										Organization Name
									</Typography>
								</TableCell>
								<TableCell>{currentOrganization.organizationName}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography bold align="right">
										Billing Plan
									</Typography>
								</TableCell>
								<TableCell>{currentOrganization.billingPlan}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography bold align="right">
										Balance
									</Typography>
								</TableCell>
								<TableCell>Unlimited (during beta)</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography bold align="right">
										Created On
									</Typography>
								</TableCell>
								<TableCell>{new Date(currentOrganization.createdAt).toLocaleDateString()}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardBody>
			</Card>
		</DefaultLayout>
	);
};

export default ViewOrganization;
