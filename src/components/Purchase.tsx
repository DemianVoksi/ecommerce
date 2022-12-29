import React, { useState } from 'react';
import './purchase.css';
import { CartInPurchase } from './CartInPurchase';
import { Footer } from './Footer';
import { Header } from './Header';

export const Purchase = () => {
	const [name, setName] = useState<string | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [city, setCity] = useState<string | null>(null);
	const [zipCode, setZipCode] = useState<number | null>(null);
	const [country, setCountry] = useState<string | null>(null);
	const [region, setRegion] = useState<string | null>(null);
	const [cardNo, setCardNo] = useState<number | null>(null);
	const [safetyCode, setSafetyCode] = useState<number | null>(null);
	const [expiration, setExpiration] = useState<Date | null>(null);
	const [cardHolder, setCardHolder] = useState<string | null>(null);

	const handlePurchase = () => {};

	return (
		<div className='purchase'>
			<Header />
			<div className='purchase-content'>
				<div className='cart-contents'>
					<CartInPurchase />
				</div>
				<div className='purchase-form-container'>
					<form className='purchase-form' onSubmit={handlePurchase}>
						<div className='purchase-form-div' id='name-div'>
							<label
								className='purchase-form-label'
								id='name-label'
								htmlFor='name'
							>
								Name:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='name-input'
								name='name'
								type='text'
								required={true}
								value={name!}
								onChange={(e) => setName(e.target.value)}
							></input>
						</div>
						<div className='purchase-form-div' id='address-div'>
							<label
								className='purchase-form-label'
								id='address-label'
								htmlFor='address'
							>
								Address:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='address-input'
								name='address'
								type='text'
								required={true}
								value={address!}
								onChange={(e) => setAddress(e.target.value)}
							></input>
						</div>
						<div className='purchase-form-div' id='city-div'>
							<label
								className='purchase-form-label'
								id='city-label'
								htmlFor='city'
							>
								City:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='city-input'
								name='city'
								type='text'
								required={true}
								value={city!}
								onChange={(e) => setCity(e.target.value)}
							></input>
						</div>
						<div className='purchase-form-div' id='zip-code-div'>
							<label
								className='purchase-form-label'
								id='zip-code-label'
								htmlFor='zip-code'
							>
								Zip Code:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='zip-code-input'
								name='zip-code'
								type='number'
								required={true}
								value={zipCode!}
								onChange={(e) => setZipCode(parseInt(e.target.value))}
							></input>
						</div>
						<div className='purchase-form-div' id='country-div'>
							<label
								className='purchase-form-label'
								id='country-label'
								htmlFor='country'
							>
								Country:{' '}
							</label>
							{/* https://stackoverflow.com/a/53388031 */}
							<select
								className='purchase-form-input'
								id='country-input'
								name='country'
								required={true}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value=''>Select your country</option>
								<option value='country1'>country1</option>
								<option value='country2'>country2</option>
							</select>
						</div>
						<div className='purchase-form-div' id='region-div'>
							<label
								className='purchase-form-label'
								id='region-label'
								htmlFor='region'
							>
								Region:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='region-input'
								name='region'
								type='text'
								required={false}
								value={region!}
								onChange={(e) => setRegion(e.target.value)}
							></input>
						</div>
						<div className='purchase-form-div' id='cardNo-div'>
							<label
								className='purchase-form-label'
								id='cardNo-label'
								htmlFor='cardNo'
							>
								Card number:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='cardNo-input'
								name='cardNo'
								type='number'
								minLength={13}
								maxLength={16}
								required={true}
								value={cardNo!}
								onChange={(e) => setCardNo(parseInt(e.target.value))}
							></input>
						</div>
						<div className='purchase-form-div' id='safety-code-div'>
							<label
								className='purchase-form-label'
								id='safety-code-label'
								htmlFor='safety-code'
							>
								Card safety code (CVV):{' '}
							</label>
							<input
								className='purchase-form-input'
								id='safety-code-input'
								name='safety-code'
								type='number'
								minLength={3}
								maxLength={4}
								required={true}
								value={safetyCode!}
								onChange={(e) => setSafetyCode(parseInt(e.target.value))}
							></input>
						</div>
						<div className='purchase-form-div' id='expiration-div'>
							{/* NOT DONE */}
							<label
								className='purchase-form-label'
								id='expiration-label'
								htmlFor='expiration'
							>
								Card expiration date:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='expiration-input'
								name='expiration'
								type='date'
								required={true}
							></input>
						</div>
						<div className='purchase-form-div' id='card-holder-div'>
							<label
								className='purchase-form-label'
								id='card-holder-label'
								htmlFor='card-holder'
							>
								Card holder:{' '}
							</label>
							<input
								className='purchase-form-input'
								id='card-holder-input'
								name='card-holder'
								type='text'
								required={true}
								value={cardHolder!}
								onChange={(e) => setCardHolder(e.target.value)}
							></input>
						</div>
						<div className='button-container'>
							<button className='purchase-button' type='submit'>
								Purchase
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};
