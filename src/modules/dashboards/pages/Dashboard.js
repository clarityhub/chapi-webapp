import React from 'react';

// import GetStarted from '../components/GetStarted';
import DefaultLayout from '../../app/layouts/DefaultLayout';
import QuickStart from '../components/QuickStart';
import YourAccount from '../components/YourAccount';

const Dashboard = () => {
	return (
		<DefaultLayout title="Dashboard">
			<YourAccount />
			<QuickStart />
			{/* <GetStarted /> */}
		</DefaultLayout>
	);
};

export default Dashboard;
