import React from 'react';

import Card, { CardBody, CardHeader } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

export default () => (
	<Card>
		<CardHeader>Get Started</CardHeader>
		<CardBody>
			<Typography>Analyze the conversations you have with your customers</Typography>
			<Typography>Get your API Keys</Typography>
			<Typography>Read our documentation</Typography>
		</CardBody>
	</Card>
);