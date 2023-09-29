import { Card } from 'antd';
import dayjs from 'dayjs';
import type { CSSProperties, FC } from 'react';

const cardStyle: CSSProperties = {
	backgroundColor: '#F4F4F4',
	maxWidth: '300px',
};

const headStyle: CSSProperties = {
	fontSize: 12,
	width: '100%',
	padding: 8,
	textAlign: 'center',
	paddingBottom: 0,
};

const teamStyle: CSSProperties = {
	width: '35%',
	textAlign: 'center',
	color: '#474747',
	padding: 8,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
};

const scoreStyle: CSSProperties = {
	width: '30%',
	textAlign: 'center',
	display: 'flex',
	color: '#429941',
	justifyContent: 'center',
	alignItems: 'center',
};

type TProps = {
	stadium?: string;
	team1: string;
	team1LogoURL: string;
	team1Score: string | number;
	team2: string;
	team2LogoURL: string;
	team2Score: string | number;
	playedAt: string;
};

const MatchScore: FC<TProps> = ({
	team1,
	team2,
	team1LogoURL,
	team2LogoURL,
	team1Score,
	team2Score,
	stadium = '',
	playedAt,
}) => (
	<Card style={cardStyle}>
		<Card.Grid hoverable={false} style={headStyle}>
			{stadium}
		</Card.Grid>
		<Card.Grid hoverable={false} style={teamStyle}>
			<img
				src={`${import.meta.env.VITE_STATIC_URL}${team1LogoURL}`}
				alt={team1}
				title={team1}
				width={48}
				height={48}
			/>
			{team1.toUpperCase()}
		</Card.Grid>
		<Card.Grid hoverable={false} style={scoreStyle}>
			{dayjs(playedAt).diff(dayjs(), 'milliseconds') > 0 ? (
				<div>{dayjs(playedAt).format('DD.MM.YYYY HH:mm')}</div>
			) : (
				<div>
					{team1Score} : {team2Score}
				</div>
			)}
		</Card.Grid>
		<Card.Grid hoverable={false} style={teamStyle}>
			<img
				src={`${import.meta.env.VITE_STATIC_URL}${team2LogoURL}`}
				alt={team2}
				title={team2}
				width={48}
				height={48}
			/>
			{team2.toUpperCase()}
		</Card.Grid>
	</Card>
);

MatchScore.defaultProps = {
	stadium: '',
};

export default MatchScore;
