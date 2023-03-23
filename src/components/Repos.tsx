import { IRepos } from '../IRepos'
interface IReposProps {
	reposList: IRepos[]
}
export default function Repos({ reposList }: IReposProps) {
	return (
		<>
			{reposList.length &&
				reposList.map((repo) => {
					const {
						id,
						git_url,
						stargazers_count,
						full_name,
						owner,
						description,
						created_at,
					} = repo
					return (
						<div key={id}>
							Repo name: <a href={git_url}>{full_name}</a>
							<p>Description: {description}</p>
							<p>Repo Owner: {owner.login}</p>
							<p>Created: {created_at}</p>
							<p>Stars: {stargazers_count}</p>
						</div>
					)
				})}
		</>
	)
}
