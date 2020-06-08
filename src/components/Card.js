import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

const Wrapper = styled.article`
	display: flex;
	flex-direction: column;
	max-width: 280px;
	background-color: #efefef;
	margin: 0 auto 1.5rem auto;
	border-radius: 4px;
	box-shadow: -1px 9px 33px -1px rgba(0, 0, 0, 0.45);
`;
const NewsImg = styled.div`
	flex: 1;
	position: relative;
	max-width: 100%;
	height: 150px;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	span {
		position: absolute;
		z-index: 1;
		top: 1rem;
		left: 1rem;
		color: #fff;
		font-weight: 400;
		font-size: 1rem;
	}
`;
const Content = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	padding: 0.5rem 1rem 1rem 1rem;
	h4 {
		margin: 1rem 0;
		font-size: 1rem;
	}
	time {
		color: #555;
		font-size: 0.8em;
	}
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.secondaryBlue};
	}
`;

const trimToLongTitle = (string) => {
	const maxLen = 135;
	let subString = string;
	if (string.length > maxLen) {
		subString = string.substring(0, maxLen).concat(' ...');
	}
	return subString;
};

const Card = ({ article }) => {
	return (
		<Wrapper>
			<NewsImg>
				<img src={article.urlToImage} alt="article background" />
				<span>{article.source.name}</span>
			</NewsImg>
			<Content>
				<div>
					<Moment fromNow>{article.publishedAt}</Moment>
					<h4>{trimToLongTitle(article.title)}</h4>
				</div>
				<a href={article.url} target="_blank" rel="noopener noreferrer">
					Read more
				</a>
			</Content>
		</Wrapper>
	);
};

export default Card;
