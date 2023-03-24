import React, { useState } from 'react'
import './App.css'
import { IResponse } from './IRepos'
import Repos from './components/Repos'
import throttle from './util/util'

function App(): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('')

	const [data, setData] = useState<IResponse>({ items: [], total_count: 0 })

	const search = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const input = form.querySelector('#searchText') as HTMLInputElement
		const query = input.value.trim()
		if (query === '') {
			return
		}

		try {
			await throttleResponse(query, 1, 30)
		} catch (error) {
			console.error(error)
			alert('Failed to search for repositories')
		}
		input.value = ''
	}

	const searchForRepos = async (
		query: string,
		page: number,
		perPage: number
	) => {
		const result = await fetch(
			'https://api.github.com/search/repositories' +
				(query ? `?q=${query}` : "?q=''") +
				`&per_page=${perPage}&page=${page}`
		)
		const repos = (await result.json()) as IResponse
		setData(repos)
		setInputValue(query)
	}
	const throttleResponse = throttle(searchForRepos, 1000)

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
						{data?.total_count}Result for search Repos keywords :{' '}
						{inputValue}
					</p>
				)}
				<Repos
					reposList={data?.items}
					total={data?.total_count}
					onSearchForRepos={searchForRepos}
				/>
			</div>
		</div>
	)
}

export default App
