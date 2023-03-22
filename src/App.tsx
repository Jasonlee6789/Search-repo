import React, { useEffect, useState } from 'react'
import './App.css'
import { IRepos } from './IRepos'

function App() {
	const [input, setInput] = useState('')
	const [repos, setRepos] = useState<IRepos[]>([])

	const search = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const input = form.querySelector('#searchText') as HTMLInputElement
		setInput(input.value)
		searchForRepos(input.value)
		input.value = ''
	}

	const searchForRepos = async (query: String): Promise<IRepos[]> => {
		const result = await fetch(
			'https://api.github.com/search/repositories' +
				(query ? `?q=${query}` : "?q=''")
		)
		const repos = await result.json()
		return repos.items
	}

	useEffect(() => {
		;(async () => {
			const query = encodeURIComponent(input)
			const response = await searchForRepos(query)
			setRepos(response)
		})()
	}, [])

	return (
		<div className="App">
			<h1>Github Repositories Search App</h1>
			<form className="searchForm" onSubmit={(event) => search(event)}>
				<input id="searchText" type="text" />
				<button>Search</button>
			</form>
		</div>
	)
}

export default App
