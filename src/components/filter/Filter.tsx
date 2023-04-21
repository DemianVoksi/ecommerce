import { useState } from 'react';
import {
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight
} from 'react-icons/md';
import './filter.css';

/*
Filters: 

- producer (checkbox)
- price (collapse from-to)
- screen size (checkbox)
- cpu (checkbox)
- os (checkbox)
- ram (collapse from-to)
- storage (collapse from-to)

Make an object of all the queries and build the query from there

*/

export const Filter = () => {
	const [visibility, setVisibility] = useState(false);

	return (
		<div className={visibility ? 'filter-wrapper' : 'filter-wrapper-hide'}>
			<div>
				<div className="icon-wrapper">
					{visibility ? (
						<MdKeyboardDoubleArrowLeft
							size={40}
							onClick={() => setVisibility(!visibility)}
						/>
					) : (
						<MdKeyboardDoubleArrowRight
							size={40}
							onClick={() => setVisibility(!visibility)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
