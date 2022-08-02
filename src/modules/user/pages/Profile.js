import React from 'react';

import DefaultLayout from '../../app/layouts/DefaultLayout';
import UpdatePassword from '../components/UpdatePassword';
import UpdateProfile from '../components/UpdateProfile';

export default () => (
	<DefaultLayout>
		<UpdateProfile />
		<UpdatePassword />
	</DefaultLayout>
);