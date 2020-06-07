import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.span`
	position: absolute;
	top: ${({ top }) => (top ? top : '50%')};
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: ${({ size }) => (size ? size : '1rem')};
	color: ${({ theme }) => theme.colors.secondaryBlue};
	display: flex;

	svg {
		animation: ${rotate} 0.4s cubic-bezier(0.42, 0, 0, 1.08) infinite;
	}
`;

const Load = ({ size, top }) => {
	return (
		<Icon size={size} top={top}>
			<AiOutlineLoading3Quarters />
		</Icon>
	);
};

export default Load;
