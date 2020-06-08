import React, { useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Loading from './Load';
const pulse = keyframes`
	0%{
		display:block;
		transform: translate(-50%, -50%) scale(1);	
    }
    10%{
        background-color: rgba(255, 255, 255, 0.2);
    }
	99% {
		transform: translate(-50%, -50%) scale(10);
		background-color: rgba(255, 255, 255, 0.2);
	}
	100%{
		background-color: rgba(255, 255, 255, 0);
	}
`;
const animation = css`
	animation: ${pulse} 0.5s ease-in-out forwards;
`;
const Button = styled.button`
	position: relative;
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.primaryBlue};
	padding: 0.5em 1em;
	border-radius: 3px;
	border: none;
	font-size: 1rem;
	color: #fff;
	transition: background-color 0.1s ease-in-out;
	overflow: hidden;
	&::after {
		content: '';
		display: block;
		position: absolute;
		top: ${({ yCords }) => `${yCords}px`};
		left: ${({ xCords }) => `${xCords}px`};
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		background-color: rgba(255, 255, 255, 0);
		border-radius: 50%;
		${({ bool }) => (bool ? animation : null)}
	}
	&:hover {
		background-color: ${({ theme }) => theme.colors.thirdBlue};
	}
	&:focus {
		outline: none !important;
	}
`;

const SearchButton = (props) => {
	const btnRef = useRef();

	const [xCords, setX] = React.useState(0);
	const [yCords, setY] = React.useState(0);
	const [boolAnimate, setAnimate] = React.useState(false);

	const getCords = (e) => {
		setX(e.clientX - btnRef.current.offsetLeft);
		setY(e.clientY - btnRef.current.offsetTop);
		setAnimate(true);
	};

	return (
		<Button
			ref={btnRef}
			onClick={(e) => {
				getCords(e);
				props.getNews(1, true);
				props.clearData();
			}}
			onAnimationEnd={() => setAnimate(false)}
			xCords={xCords}
			yCords={yCords}
			bool={boolAnimate}
			disabled={props.isFetching}
		>
			{props.children}
			{props.isFetching ? <Loading size="1.2rem" /> : null}
		</Button>
	);
};

export default SearchButton;
