import React, { Component } from 'react';
import { func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
// import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';

import Button from '@clarityhub/unity-web/lib/components/Buttons/Button';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';

import withAuth from '../../context/withAuth';
import logger from '../../../../services/logger';

class InitialSignup extends Component {
    static propTypes = {
    	onSubmit: func.isRequired,
    };

    render() {
    	const { auth, history } = this.props;
    	return (
    		<Formik
    			initialValues={{
    				email: '',
    				password: '',
    				confirmPassword: '',
    			}}
    			validateOnBlur
    			validateOnChange={false}
    			validate={(values, error) => {
    				let errors = {};
    				if (values.password !== values.confirmPassword) {
    					errors.password = 'Passwords must match';
    					errors.confirmPassword = 'Passwords must match';
    				}
					
    				return errors;
    			}}
    			onSubmit={async (values, actions) => {
    				const user = {
    					username: values.email,
    					password: values.password,
    				};
    				try {
    					const newUser = await auth.signup(user);

    					this.props.onSubmit({ newUser, ...user, email: values.email});
    				} catch (e) {
    					logger.error(e);
    					actions.setSubmitting(false);
						
    					if (e.code === 'UsernameExistsException') {
    						try {
    							await auth.login(user.username, user.password);
    							history.push('/');
    						} catch(err) {
    							// either direct to confirmation or to /login
    							if (err.code === 'NotAuthorizedException') {
    								history.replace('/auth/login', { err: e.message, user: { email: user.username }});
    							} else {
    								this.props.onSubmit({...user, email: values.email});
    							}
    						}
							
    					}
    				}
    			}}
    			render={({ handleSubmit, handleChange, values, isSubmitting, errors }) => (
    				<form onSubmit={handleSubmit}>
    					<InputGroup>
    						<LabelledInput
    							label="Email"
    							name="email"
    							autoFocus
    							onChange={handleChange}
    							value={values.email}
    							error={errors.email}
    						/>
    					</InputGroup>
    					<div>
							Password requirements:
    						<ul>
    							<li>At least 8 characters long</li>
    							<li>At least one uppercase character</li>
    							<li>At least one lowercase character</li>
    							<li>At least one special character</li>
    						</ul>
    					</div>
    					<InputGroup>
    						<LabelledInput
    							label="Password"
    							name="password"
    							type="password"
    							onChange={handleChange}
    							value={values.password}
    							error={errors.password}
    						/>
    					</InputGroup>
    					<InputGroup>
    						<LabelledInput
    							label="Confirm Password"
    							name="confirmPassword"
    							type="password"
    							onChange={handleChange}
    							value={values.confirmPassword}
    							error={errors.confirmPassword}
    						/>
    					</InputGroup>
    					<InputGroup>
    						<Button
    							disabled={isSubmitting}
    							loading={isSubmitting}
    							type="primary"
    							block
    						>
								Sign Up
    						</Button>
    					</InputGroup>
    				</form>
    			)}
    		/>
    	);
    }
}

export default withRouter(withAuth(InitialSignup));