import React from 'react';
import Layout from '@clarityhub/unity-web/lib/scaffolding/Layout';
import styled from '@emotion/styled';

const ContentWrapper = styled.div`
    position: absolute;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const FullFormLayout = ({ children }) => (
	<Layout>
		<ContentWrapper>
			{children}
		</ContentWrapper>
	</Layout>
);

export default FullFormLayout;
