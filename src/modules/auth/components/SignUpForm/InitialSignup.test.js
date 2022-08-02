import React from 'react';
import { shallow } from 'enzyme';

import InitialSignup from './InitialSignup';

describe('<InitialSignup />', () => {
	test('renders', () => {
		const wrapper = shallow(<InitialSignup />);

		expect(wrapper.exists()).toBe(true);
	});
});