import { IRepos } from '../IRepos'

export default function Repos({ reposList }: { reposList: IRepos[] }) {
	return (
		<>
			{reposList[0] && <div>{reposList[0].language}</div>}

			{reposList.map((repo) => {
				const {
					id,
					git_url,
					stargazers_count,
					full_name,
					description,
					created_at,
				} = repo

				return (
					<div key={id}>
						<a href={git_url}>{full_name}</a>
						<p>{description}</p>
						<p>Created: {created_at}</p>
						<p>Stars: {stargazers_count}</p>
					</div>
				)
			})}
		</>
	)
}
