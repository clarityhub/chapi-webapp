import React from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from '@clarityhub/unity-web/lib/components/Link';

import Card, {  CardBody, CardHeader } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { OrderedList, ListItem } from '@clarityhub/unity-web/lib/components/List';

export default () => (
	<Card>
		<CardHeader>Quick Start</CardHeader>
		<CardBody>
			<Typography>Start using Clarity Hub by creating an Access Key and following a guide to get started</Typography>
			<OrderedList>
				<ListItem><Typography><Link to="/access-keys/create">Create an Access Key</Link></Typography></ListItem>
				<ListItem><Typography><ExternalLink href="https://docs.clarityhub.io">Create your first app</ExternalLink></Typography></ListItem>
			</OrderedList>
		</CardBody>
	</Card>
);