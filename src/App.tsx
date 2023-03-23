import React, { useEffect, useState } from 'react'
import './App.css'
import { IRepos } from './IRepos'
import Repos from './components/Repos'

function App(): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('')
	const [repos, setRepos] = useState<IRepos[]>([])

	const search = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.target as HTMLFormElement
		const input = form.querySelector('#searchText') as HTMLInputElement
		const query = input.value.trim()
		if (query === '') {
			return
		}

		try {
			const response = await searchForRepos(query)
			setRepos(response)
			setInputValue(query)
		} catch (error) {
			console.error(error)
			alert('Failed to search for repositories')
		}
		input.value = ''
	}

	const searchForRepos = async (query: String): Promise<IRepos[]> => {
		const result = await fetch(
			'https://api.github.com/search/repositories' +
				(query ? `?q=${query}` : "?q=''")
		)
		const repos = await result.json()
		console.log(repos.items)
		return repos.items
	}

	useEffect(() => {
		;(async () => {
			const query = encodeURIComponent(inputValue)
			const response = await searchForRepos(query)
			setRepos(response)
		})()
	}, [inputValue])

	return (
		<div className="App">
			<h1>Github Repositories Search App</h1>
			<form className="searchForm" onSubmit={(event) => search(event)}>
				<input id="searchText" type="text" />
				<button>Search</button>
			</form>
			{inputValue && (
				<p>Result for search Repos keywords : {inputValue}</p>
			)}
			<Repos reposList={repos} />
		</div>
	)
}

export default App
