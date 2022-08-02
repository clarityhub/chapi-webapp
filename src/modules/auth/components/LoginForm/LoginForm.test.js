import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
	test('renders', () => {
		const wrapper = shallow(<LoginForm />);

		expect(wrapper.exists()).toBe(true);
	});
});