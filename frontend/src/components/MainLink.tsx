import type { FC } from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';

type TProps = {
	to: string;
	text: string;
};

const MainLink: FC<TProps> = ({ to, text }) => {
	const location = useLocation();
	const resolved = useResolvedPath(location);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link style={{ color: match?.pathname === '/contact-us' ? '#429941' : 'black' }} to={to}>
			{text}
		</Link>
	);
};

export default MainLink;
