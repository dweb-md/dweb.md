import React from 'react';
import { Header } from '../../global/components';
import { LandingSection } from './sections';

import './landing_page.scss';

function LandingPage() {
	return (<>
		<Header />
		<div className="body">
			<LandingSection />
		</div>
	</>)
}

export default LandingPage;
