import { IRepos } from '../IRepos'
import { List } from 'antd'
import { StarTwoTone } from '@ant-design/icons'
import { DateTime } from 'luxon'
interface IReposProps {
	reposList: IRepos[]
	isLoading: boolean
	total: number
	onPageChange: (page: number) => void
}
export default function Repos({
	reposList,
	total,
	onPageChange,
	isLoading,
}: IReposProps) {
	return (
		<>
			<List
				itemLayout="vertical"
				loading={isLoading}
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page)
						onPageChange(page)
					},
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
						<p>
							Created:{' '}
							{DateTime.fromISO(repo.created_at).toFormat(
								'yyyy-MM-dd hh:mm:ss a'
							)}
						</p>
						<p>Program Language: {repo.language}</p>
						<span>
							{repo.stargazers_count} <StarTwoTone />
						</span>
					</List.Item>
				)}
			/>
		</>
	)
}
