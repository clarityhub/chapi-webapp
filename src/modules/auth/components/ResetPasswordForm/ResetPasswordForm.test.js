import React from 'react';
import { shallow } from 'enzyme';

import ResetPasswordForm from './ResetPasswordForm';

describe('<ResetPasswordForm />', () => {
	test('renders', () => {
		const wrapper = shallow(<ResetPasswordForm />);

		expect(wrapper.exists()).toBe(true);
	});
});