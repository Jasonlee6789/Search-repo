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
		searchQuery: string,
		page: number,
		perPage: number
	) => {
		try {
			setIsLoading(true)
			const result = await fetch(
				'https://api.github.com/search/repositories' +
					(searchQuery ? `?q=${searchQuery}` : "?q=''") +
					`&per_page=${perPage}&page=${page}`
			)

			const repos = (await result.json()) as IResponse
			setData(repos)
			setInputValue(searchQuery)
		} catch (error) {
			console.error(error)
			alert('Failed to search for repositories')
		} finally {
			setIsLoading(false)
		}
	}

	const throttleResponse = throttle(searchForRepos, 1000)

	const search = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const input = form.querySelector('#searchText') as HTMLInputElement
		const searchQuery = input.value.trim()
		if (searchQuery === '') {
			return
		}
		await throttleResponse(searchQuery, 1, 30)
		input.value = ''
	}

	const changePage = (page: number) => {
		throttleResponse(inputValue, page, 30)
	}

	return (
		<div className="App">
			<h1>Github Repositories Search App</h1>
			<form className="searchForm" onSubmit={(event) => search(event)}>
				<input
					id="searchText"
					type="text"
					placeholder="Input Github repository keywords"
				/>
				<button>Search</button>
			</form>
			{inputValue && (
				<p>
					Search Results: <span>{data?.total_count}</span>{' '}
					Repositories with keywords : <span>{inputValue}</span>
				</p>
			)}
			<div className="repos-container">
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
