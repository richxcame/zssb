import './index.sass';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { TCompetitionTable, TCompetitionTableItem } from '@/types/competition';

type TProps = {
	table: TCompetitionTable;
};

const CompetitionTable: FC<TProps> = ({ table }) => {
	const { t, i18n } = useTranslation();

	const columns: ColumnsType<TCompetitionTableItem> = [
		{
			title: '#',
			dataIndex: '',
			render: (_, __, index) => <div>{index + 1}</div>,
			key: '#',
		},
		{
			title: t('team', { count: 2 }),
			dataIndex: 'name',
			render: (data, __, _) => <span>{data[i18n.language as 'tk']}</span>,
			key: 'team',
		},
		{
			title: 'PLD',
			dataIndex: 'pld',
			align: 'center',
			key: 'pld',
		},
		{
			title: 'W',
			dataIndex: 'w',
			align: 'center',
			key: 'w',
		},
		{
			title: 'D',
			dataIndex: 'd',
			align: 'center',
			key: 'd',
		},
		{
			title: 'L',
			dataIndex: 'l',
			align: 'center',
			key: 'l',
		},
		{
			title: 'G',
			dataIndex: 'f',
			colSpan: 2,
			onCell: () => ({
				colSpan: 2,
			}),
			align: 'center',
			render: (id, row) => (
				<div>
					{row.f}-{row.a}
				</div>
			),
			key: 'g',
		},
		{
			title: 'A',
			dataIndex: 'a',
			colSpan: 0,
			onCell: () => ({
				colSpan: 0,
			}),
			key: 'a',
		},
		{
			title: 'PTS',
			dataIndex: 'pts',
			width: '60px',
			align: 'center',
			key: 'pts',
		},
	];

	return (
		<div>
			<Table
				pagination={false}
				className='table-striped-rows'
				columns={columns}
				dataSource={table}
				size='small'
			/>
		</div>
	);
};

export default CompetitionTable;
