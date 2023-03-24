import React, { useState } from 'react'
import './App.css'
import { IResponse } from './IRepos'
import Repos from './components/Repos'
import throttle from './util/util'

function App(): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [data, setData] = useState<IResponse>({
		items: [],
		total_count: 0,
	})

	const searchForRepos = async (
		query: string,
		page: number,
		perPage: number
	) => {
		try {
			// Set isLoading to true when starting to fetch data
			setIsLoading(true)

			const result = await fetch(
				'https://api.github.com/search/repositories' +
					(query ? `?q=${query}` : "?q=''") +
					`&per_page=${perPage}&page=${page}`
			)

			const repos = (await result.json()) as IResponse
			setData(repos)
			setInputValue(query)
		} catch (error) {
			console.error(error)
			alert('Failed to search for repositories')
		} finally {
			// Set isLoading to false when data fetching is done
			setIsLoading(false)
		}
	}

	const throttleResponse = throttle(searchForRepos, 1000)

	const search = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const input = form.querySelector('#searchText') as HTMLInputElement
		const query = input.value.trim()
		if (query === '') {
			return
		}
		await throttleResponse(query, 1, 30)
		input.value = ''
	}
	const changePage = (page: number) => {
		throttleResponse(inputValue, page, 30)
	}
	return (
		<div className="App">
			<h1>Github Repositories Search App</h1>
			<form className="searchForm" onSubmit={(event) => search(event)}>
				<input id="searchText" type="text" />
				<button>Search</button>
			</form>
			<div className="repos-container">
				{inputValue && (
					<p>
						Search Results: {data?.total_count} Repositories with
						keywords : {inputValue}
					</p>
				)}
				<Repos
					reposList={data?.items}
					total={data?.total_count}
					onPageChange={changePage}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

export default App
