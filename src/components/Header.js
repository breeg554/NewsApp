import React, { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.header`
	color: #fff;
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primaryBlue};
	h1 {
		font-weight: 300;
		font-size: 2rem;
		${({ theme }) => theme.mediaQ.small} {
			font-size: 3rem;
		}
	}
`;

const Header = () => {
	return (
		<Wrapper>
			<h1>News</h1>
		</Wrapper>
	);
};

export default Header;
