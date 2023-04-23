import { useState } from 'react';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
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
	const [producerVisibility, setProducerVisibility] = useState(false);
	const [priceVisibility, setPriceVisibility] = useState(false);
	const [screenVisibility, setScreenVisibility] = useState(false);
	const [cpuVisibility, setCpuVisibility] = useState(false);
	const [osVisibility, setOsVisibility] = useState(false);
	const [ramVisibility, setRamVisibility] = useState(false);
	const [storageVisibility, setStorageVisibility] = useState(false);

	return (
		<div className={visibility ? 'filter-wrapper' : 'filter-wrapper-hide'}>
			<div>
				<div className="icon-wrapper">
					{visibility ? (
						<div className="filter-p">
							<p className="para">filter</p>
							<MdKeyboardDoubleArrowLeft
								size={40}
								onClick={() => setVisibility(!visibility)}
							/>
						</div>
					) : (
						<div className="filter-p">
							<MdKeyboardDoubleArrowRight
								size={40}
								onClick={() => setVisibility(!visibility)}
							/>
							<p className="para">filter</p>
						</div>
					)}
				</div>
			</div>
			<div
				className={
					visibility ? 'filter-categories' : 'filter-categories-hide'
				}
			>
				<form className="filter-form">
					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() =>
								setProducerVisibility(!producerVisibility)
							}
						>
							<p className="fcategory-p">producer</p>
							<div className="fcategory-icon">
								{producerVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>
						<div
							className={
								producerVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input
									type="checkbox"
									id="apple"
									name="Apple"
								/>
								<label htmlFor="apple">Apple</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="Dell" name="Dell" />
								<label htmlFor="Dell">Dell</label>
							</div>

							<div className="single-input">
								<input
									type="checkbox"
									id="lenovo"
									name="Lenovo"
								/>
								<label htmlFor="lenovo">Lenovo</label>
							</div>

							<div className="single-input">
								{' '}
								<input type="checkbox" id="hp" name="HP" />
								<label htmlFor="hp">HP</label>
							</div>

							<div className="single-input">
								<input type="checkbox" id="acer" name="Acer" />
								<label htmlFor="acer">Acer</label>

								<div className="single-input">
									<input
										type="checkbox"
										id="asus"
										name="Asus"
									/>
									<label htmlFor="asus">Asus</label>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
