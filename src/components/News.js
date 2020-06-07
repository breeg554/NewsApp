import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Loading from './Load';

const Wrapper = styled.div`
	position: relative;
	padding: 0 1rem;
	padding-bottom: 2rem;
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 1rem;
	grid-column-gap: 1rem;
	width: 100%;
	max-width: 1270px;
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
	${({ theme }) => theme.mediaQ.small} {
		margin-top: 3rem;
		grid-template-columns: 1fr 1fr;
	}
	${({ theme }) => theme.mediaQ.medium} {
		grid-template-columns: 1fr 1fr 1fr;
	}
	${({ theme }) => theme.mediaQ.large} {
		margin-top: 5rem;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;
	}
`;
const NoMore = styled.span`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.7rem;
`;
const News = ({ data, isFetching, hasMore, err }) => {
	const cards = data.map((art, index) => <Card key={index} article={art} />);

	return (
		<Wrapper>
			{err ? <NoMore>Something gets wrong!</NoMore> : cards}
			{isFetching && hasMore && !err ? (
				<Loading size="2rem" top="100%" />
			) : null}
			{!err && !hasMore ? <NoMore>No more result!</NoMore> : null}
		</Wrapper>
	);
};

export default News;
