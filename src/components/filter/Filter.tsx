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
							<p className="fcategory-p">Producer</p>
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
									id="Apple"
									name="Apple"
								/>
								<label htmlFor="Apple">Apple</label>
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
							</div>
							<div className="single-input">
								<input type="checkbox" id="asus" name="Asus" />
								<label htmlFor="asus">Asus</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() => setRamVisibility(!ramVisibility)}
						>
							<p className="fcategory-p">Memory (in GB RAM)</p>
							<div className="fcategory-icon">
								{ramVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>
						<div
							className={
								ramVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input type="checkbox" id="4" name="4" />
								<label htmlFor="4">4</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="8" name="8" />
								<label htmlFor="8">8</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="16" name="16" />
								<label htmlFor="16">16</label>
							</div>
							<div className="single-input">
								{' '}
								<input type="checkbox" id="32" name="32" />
								<label htmlFor="32">32</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() =>
								setScreenVisibility(!screenVisibility)
							}
						>
							<p className="fcategory-p">
								Screen size (in inches)
							</p>
							<div className="fcategory-icon">
								{screenVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>
						<div
							className={
								screenVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input type="checkbox" id="11.6" name="11.6" />
								<label htmlFor="11.6">11.6</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="13.3" name="13.3" />
								<label htmlFor="13.3">13.3</label>
							</div>

							<div className="single-input">
								<input type="checkbox" id="13.6" name="13.6" />
								<label htmlFor="13.6">13.6</label>
							</div>

							<div className="single-input">
								{' '}
								<input type="checkbox" id="14" name="14" />
								<label htmlFor="14">14</label>
							</div>

							<div className="single-input">
								<input type="checkbox" id="14.2" name="14.2" />
								<label htmlFor="14.2">14.2</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="15.6" name="15.6" />
								<label htmlFor="15.6">15.6</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="16" name="16" />
								<label htmlFor="16">16</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() => setOsVisibility(!osVisibility)}
						>
							<p className="fcategory-p">Operating system</p>
							<div className="fcategory-icon">
								{osVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>
						<div
							className={
								osVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input
									type="checkbox"
									id="monterey"
									name="monterey"
								/>
								<label htmlFor="monterey">macOS Monterey</label>
							</div>
							<div className="single-input">
								<input
									type="checkbox"
									id="ventura"
									name="ventura"
								/>
								<label htmlFor="ventura">macOS Ventura</label>
							</div>

							<div className="single-input">
								<input
									type="checkbox"
									id="chrome"
									name="chrome"
								/>
								<label htmlFor="chrome">Chrome OS</label>
							</div>

							<div className="single-input">
								{' '}
								<input
									type="checkbox"
									id="10-pro"
									name="10-pro"
								/>
								<label htmlFor="10-pro">Windows 10 Pro</label>
							</div>

							<div className="single-input">
								<input
									type="checkbox"
									id="11-pro"
									name="11-pro"
								/>
								<label htmlFor="11-pro">Windows 11 Pro</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() =>
								setStorageVisibility(!storageVisibility)
							}
						>
							<p className="fcategory-p">Storage size (in GB)</p>
							<div className="fcategory-icon">
								{storageVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>
						<div
							className={
								storageVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input type="checkbox" id="32" name="32" />
								<label htmlFor="32">32</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="64" name="64" />
								<label htmlFor="64">64</label>
							</div>

							<div className="single-input">
								<input type="checkbox" id="256" name="256" />
								<label htmlFor="256">256</label>
							</div>

							<div className="single-input">
								{' '}
								<input type="checkbox" id="512" name="512" />
								<label htmlFor="512">512</label>
							</div>

							<div className="single-input">
								<input type="checkbox" id="1024" name="1024" />
								<label htmlFor="1024">1024</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() => setCpuVisibility(!cpuVisibility)}
						>
							<p className="fcategory-p">CPU type</p>
							<div className="fcategory-icon">
								{cpuVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>

						<div
							className={
								cpuVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="single-input">
								<input type="checkbox" id="i5" name="i5" />
								<label htmlFor="i5">Intel i5</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="i7" name="i7" />
								<label htmlFor="i7">Intel i7</label>
							</div>

							<div className="single-input">
								<input
									type="checkbox"
									id="pentium-silver"
									name="pentium-silver"
								/>
								<label htmlFor="pentium-silver">
									Intel Pentium Silver
								</label>
							</div>

							<div className="single-input">
								<input
									type="checkbox"
									id="pentium-gold"
									name="pentium-gold"
								/>
								<label htmlFor="pentium-gold">
									Intel Pentium Gold
								</label>
							</div>

							<div className="single-input">
								{' '}
								<input
									type="checkbox"
									id="mediatek"
									name="mediatek"
								/>
								<label htmlFor="mediatek">MediaTek</label>
							</div>

							<div className="single-input">
								{' '}
								<input
									type="checkbox"
									id="m1-pro"
									name="m1-pro"
								/>
								<label htmlFor="m1-pro">Apple M1 Pro</label>
							</div>
							<div className="single-input">
								<input type="checkbox" id="m2" name="m2" />
								<label htmlFor="m2">Apple M2</label>
							</div>
							<div className="single-input">
								{' '}
								<input
									type="checkbox"
									id="m2-pro"
									name="m2-pro"
								/>
								<label htmlFor="m2-pro">Apple M2 Pro</label>
							</div>
						</div>
					</div>

					<div className="fcategory-wrapper">
						<div
							className="fcategory-show-wrapper"
							onClick={() => setPriceVisibility(!priceVisibility)}
						>
							<p className="fcategory-p">Select price range</p>
							<div className="fcategory-icon">
								{priceVisibility ? (
									<MdKeyboardArrowUp size={30} />
								) : (
									<MdKeyboardArrowDown size={30} />
								)}
							</div>
						</div>

						<div
							className={
								priceVisibility
									? 'fcategory-checkboxes'
									: 'fcategory-checkboxes-hide'
							}
						>
							<div className="price-wrapper">
								<div className="from-price">
									<label className="from-price-label">
										From:{' '}
									</label>
									<select className="from-price-select">
										<option value="1000">1000 SEK</option>
										<option value="2000">2000 SEK</option>
										<option value="3000">3000 SEK</option>
										<option value="4000">4000 SEK</option>
										<option value="5000">5000 SEK</option>
										<option value="6000">6000 SEK</option>
										<option value="7000">7000 SEK</option>
										<option value="8000">8000 SEK</option>
										<option value="9000">9000 SEK</option>
										<option value="10000">10000 SEK</option>
										<option value="11000">11000 SEK</option>
										<option value="12000">12000 SEK</option>
										<option value="13000">13000 SEK</option>
										<option value="14000">14000 SEK</option>
										<option value="15000">15000 SEK</option>
										<option value="16000">16000 SEK</option>
										<option value="17000">17000 SEK</option>
										<option value="18000">18000 SEK</option>
										<option value="19000">19000 SEK</option>
										<option value="20000">20000 SEK</option>
										<option value="21000">21000 SEK</option>
										<option value="22000">22000 SEK</option>
										<option value="23000">23000 SEK</option>
										<option value="24000">24000 SEK</option>
										<option value="25000">25000 SEK</option>
										<option value="26000">26000 SEK</option>
										<option value="27000">27000 SEK</option>
										<option value="28000">28000 SEK</option>
										<option value="29000">29000 SEK</option>
										<option value="30000">30000 SEK</option>
										<option value="31000">31000 SEK</option>
										<option value="32000">32000 SEK</option>
										<option value="33000">33000 SEK</option>
										<option value="34000">34000 SEK</option>
										<option value="35000">35000 SEK</option>
										<option value="36000">36000 SEK</option>
										<option value="37000">37000 SEK</option>
									</select>
								</div>
								<div className="to-price">
									<label className="to-price-label">
										To:{' '}
									</label>
									<select className="to-price-select">
										<option value="1000">1000 SEK</option>
										<option value="2000">2000 SEK</option>
										<option value="3000">3000 SEK</option>
										<option value="4000">4000 SEK</option>
										<option value="5000">5000 SEK</option>
										<option value="6000">6000 SEK</option>
										<option value="7000">7000 SEK</option>
										<option value="8000">8000 SEK</option>
										<option value="9000">9000 SEK</option>
										<option value="10000">10000 SEK</option>
										<option value="11000">11000 SEK</option>
										<option value="12000">12000 SEK</option>
										<option value="13000">13000 SEK</option>
										<option value="14000">14000 SEK</option>
										<option value="15000">15000 SEK</option>
										<option value="16000">16000 SEK</option>
										<option value="17000">17000 SEK</option>
										<option value="18000">18000 SEK</option>
										<option value="19000">19000 SEK</option>
										<option value="20000">20000 SEK</option>
										<option value="21000">21000 SEK</option>
										<option value="22000">22000 SEK</option>
										<option value="23000">23000 SEK</option>
										<option value="24000">24000 SEK</option>
										<option value="25000">25000 SEK</option>
										<option value="26000">26000 SEK</option>
										<option value="27000">27000 SEK</option>
										<option value="28000">28000 SEK</option>
										<option value="29000">29000 SEK</option>
										<option value="30000">30000 SEK</option>
										<option value="31000">31000 SEK</option>
										<option value="32000">32000 SEK</option>
										<option value="33000">33000 SEK</option>
										<option value="34000">34000 SEK</option>
										<option value="35000">35000 SEK</option>
										<option value="36000">36000 SEK</option>
										<option value="37000">37000 SEK</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
