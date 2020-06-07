import React from 'react';
import styled from 'styled-components';
import Button from './SearchButton';
import Select from './CustomSelect';
import { CategoryData, CountryData } from '../utils/data';
const Wrapper = styled.div`
	padding: 0.5rem;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	max-width: 1270px;
	margin: 0 auto;
`;
const SideWrap = styled.div`
	width: 70%;
	display: flex;
	flex-wrap: wrap;
`;
const SubHeader = ({
	getNews,
	setOptions,
	clearData,
	isFetchingBtn,
	country,
	category,
}) => {
	return (
		<Wrapper>
			<SideWrap>
				<Select
					data={CountryData}
					type={country}
					dataType="country"
					setOptions={setOptions}
				/>
				<Select
					data={CategoryData}
					type={category}
					dataType="category"
					setOptions={setOptions}
				/>
			</SideWrap>
			<Button
				getNews={getNews}
				isFetching={isFetchingBtn}
				clearData={clearData}
			>
				Search
			</Button>
		</Wrapper>
	);
};

export default SubHeader;
