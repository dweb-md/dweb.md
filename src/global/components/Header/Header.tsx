import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../../contexts';
import Layout from '../Layout/Layout';
import NavButton from '../NavButton/NavButton';

import './header.scss';

function Header() {
	const { copy } = useContext(GlobalContext);

	const navigate = useNavigate();
	const generateNavigateTo = (to: string) => () => navigate(to);

	return <div className="header">
		<Layout>
			<div className="header__contents">
				<img className="header__logo" src="/img/dwebmd_logo.svg" alt='logo' onClick={generateNavigateTo('/')} />
				<div className="header__nav">
					<NavButton text={copy.home} onClick={generateNavigateTo('/')} />
					<NavButton text={copy.mission} onClick={generateNavigateTo('/mission')} />
					<NavButton text={copy.objectives} onClick={generateNavigateTo('/objectives')} />
					<NavButton text={copy.news} onClick={generateNavigateTo('/news')} />
				</div>
			</div>
		</Layout>
	</div>
}

export default Header;
