import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom'; // TODO

import { Typography } from '@material-ui/core'; // TODO
import Card, { CardBody, CardHeader } from '@clarityhub/unity-web/lib/components/Card';
import { Table, TableRow, TableCell, TableBody } from '@clarityhub/unity-web/lib/components/Table';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import CurrentOrganizationContext from '../../organizations/context/CurrentOrganization';
import GetAccessKeysContainer from '../../accessKeys/containers/GetAccessKeysContainer';

const YourAccount = () => {
	const [{ currentOrganization }] = useContext(CurrentOrganizationContext);

	return (
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
                                    Balance
								</Typography>
							</TableCell>
							<TableCell>Unlimited (during beta)</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Typography bold align="right">
                                    Access Keys
								</Typography>
							</TableCell>
							<TableCell>
								<GetAccessKeysContainer organizationId={currentOrganization.organizationId}>
									{({ loading, accessKeys }) => {
										if (loading) {
											return <Loading size={1} />;
										}
                                        
										const length = accessKeys ? accessKeys.length : 0;
                                        
										return (
											<Fragment>
												<Link to="/access-keys">
												    {length} Key{length === 1 ? '' : 's'}
												</Link>
											</Fragment>
										);
									}}
								</GetAccessKeysContainer>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardBody>
		</Card>
	);
};

export default YourAccount;
