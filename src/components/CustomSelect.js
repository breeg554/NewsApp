import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
const CustomSelect = styled.div`
	position: relative;
	width: 170px;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
`;

const Options = styled.div`
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	position: absolute;
	overflow-y: scroll;
	height: ${({ isOpen }) => (isOpen ? 'auto' : 0)};
	max-height: 150px;
	top: 100%;
	left: 0;
	width: 100%;
	z-index: 2;
	background-color: #fff;
	padding: 0.4rem 0.2rem;
	margin-top: 0.2rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 3px;
`;
const Option = styled.div`
	text-transform: capitalize;
	margin-top: 0.2rem;
	padding: 0.2rem;
	display: flex;
	align-items: center;
	label {
		flex-grow: 1;
		cursor: pointer;
		background-color: #fff;
	}
	input {
		opacity: 0;
		display: none;
	}
`;
const Button = styled.button`
	width: 100%;
	text-align: left;
	text-transform: capitalize;
	position: relative;
	cursor: pointer;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	color: #fff;
	background-color: ${({ theme }) => theme.colors.primaryBlue};
	border: none;
	border-radius: 3px;
	&:focus {
		outline: none !important;
	}
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		font-size: 1.1em;
		right: 0.3em;
		transform: translateY(-50%)
			rotate(${({ isOpen }) => (isOpen ? '180deg' : 0)});
	}
`;
const handleOutsiteClickCheck = (wrapperRef, isOpen, setOpen) => {
	useEffect(() => {
		const handleClickOutsite = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutsite);

		return () => {
			document.removeEventListener('click', handleClickOutsite);
		};
	}, [wrapperRef]);
};
const Select = ({ data, type, dataType, setOptions }) => {
	const wrapperRef = useRef(null);
	const [isOpen, setOpen] = useState(false);
	const selected = data.find((el) => el.short === type);

	handleOutsiteClickCheck(wrapperRef, isOpen, setOpen);

	return (
		<CustomSelect ref={wrapperRef}>
			<Button onClick={() => setOpen(!isOpen)} isOpen={isOpen}>
				{selected.name}
				<span>
					<FiChevronDown />
				</span>
			</Button>
			<Options isOpen={isOpen}>
				{data.map((el) => (
					<Option key={el.id}>
						<input
							type="radio"
							id={el.short}
							name={dataType}
							value={el.short}
							checked={type === el.short ? true : false}
							onChange={(e) => setOptions(e)}
						/>
						<label htmlFor={el.short} onClick={() => setOpen(!isOpen)}>
							{el.name}
						</label>
					</Option>
				))}
			</Options>
		</CustomSelect>
	);
};

export default Select;
