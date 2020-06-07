import React, { Component, createRef } from 'react';
import Header from './components/Header';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import SubHeader from './components/SubHeader';
import News from './components/News';

const GlobalStyles = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}
`;

const Wrapper = styled.main`
	padding: 0.5rem 0.5rem 2rem 0.5rem;
`;
class App extends Component {
	constructor(props) {
		super(props);
		this.newsRef = createRef(null);
		this.state = {
			news: [],
			isFetching: false,
			isFetchingBtn: false,
			page: 1,
			category: 'general',
			country: 'pl',
			hasMore: true,
			err: false,
		};
	}
	setOptions = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	clearData = () => {
		this.setState({
			page: 1,
			news: [],
		});
	};
	getNews = (page, btn_click) => {
		const { country, category } = this.state;
		if (btn_click) {
			this.setState({
				isFetching: true,
				isFetchingBtn: true,
				err: false,
			});
		} else {
			this.setState({
				isFetching: true,
				err: false,
			});
		}

		try {
			fetch(
				`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=4ffe6ce3296a421fb417513afaa5f938`
			)
				.then((res) => {
					if (!res.ok) {
						throw Error(res.status);
					}
					return res.json();
				})
				.then((res) => {
					this.setState((prevState) => {
						return {
							news: [...prevState.news, ...res.articles],
							hasMore:
								res.totalResults > prevState.news.length + res.articles.length,
							page: prevState.page + 1,
						};
					});
				})
				.then(() => {
					this.setState({
						isFetching: false,
						isFetchingBtn: false,
					});
				})
				.catch((err) => {
					this.setState({
						err: true,
						isFetching: false,
						isFetchingBtn: false,
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	checkScroll = () => {
		const { hasMore } = this.state;
		if (
			window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight &&
			hasMore
		) {
			this.getNews(this.state.page);
		}
	};
	componentDidMount() {
		window.addEventListener('scroll', this.checkScroll);
		this.getNews(1);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.checkScroll);
	}

	render() {
		const {
			news,
			isFetching,
			category,
			country,
			hasMore,
			isFetchingBtn,
			err,
		} = this.state;
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyles />

				<Header />
				<Wrapper>
					<SubHeader
						getNews={this.getNews}
						isFetchingBtn={isFetchingBtn}
						setOptions={this.setOptions}
						clearData={this.clearData}
						category={category}
						country={country}
					/>

					<News
						newsRef={this.newsRef}
						data={news}
						isFetching={isFetching}
						hasMore={hasMore}
						err={err}
					/>
				</Wrapper>
			</ThemeProvider>
		);
	}
}

export default App;
