import { IRepos } from '../IRepos'
import { List } from 'antd'
import { StarTwoTone } from '@ant-design/icons'

interface IReposProps {
	reposList: IRepos[]
	//isLoading: boolean
	total: number
	onSearchForRepos: (query: string, page: number, perPage: number) => void
}
export default function Repos({
	reposList,
	total,
	onSearchForRepos,
}: IReposProps) {
	return (
		<>
			<List
				itemLayout="vertical"
				//loading={}
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page)
						//onSearchForRepos()
					},
					pageSize: 10,
					total: total,
					position: 'top',
				}}
				dataSource={reposList}
				renderItem={(repo) => (
					<List.Item key={repo.id}>
						<List.Item.Meta
							title={<a href={repo.html_url}>{repo.full_name}</a>}
							description={'Description: ' + repo.description}
						/>
						<p>Repo Owner: {repo.owner.login}</p>
						<p>Created: {repo.created_at}</p>
						<span>
							{repo.stargazers_count} <StarTwoTone />
						</span>
					</List.Item>
				)}
			/>
		</>
	)
}
