import React, { Component } from 'react';
// import './App.css';
import Button from 'react-bootstrap/Button';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCzenI1WpO2JBbltc3ARFKTCJyUumY-zkk',
	authDomain: 'rbtrack-ab0e9.firebaseapp.com',
	databaseURL: 'https://rbtrack-ab0e9.firebaseio.com',
	projectId: 'rbtrack-ab0e9',
	storageBucket: 'rbtrack-ab0e9.appspot.com',
	messagingSenderId: '381452575978',
	appId: '1:381452575978:web:9999b9c4b6d38967',
};

const actionsOptions = [
	{ label: '', value: null },
	{ label: 'Walk', value: 'walk' },
	{ label: 'Stay', value: 'stay' },
	{ label: 'Bike / e-Bike', value: 'bike' },
	{ label: 'Scooter', value: 'scooter' },
	{ label: 'e-Scooter', value: 'e-scooter' },
	{ label: 'e-Board', value: 'rb' },
	{ label: 'e-Board Bad Road', value: 'rb-bad' },
];

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			loading: false,
			selectedPoint: null,
			selectedActionAtPoint: null,
		};

		this._updatePoint = this._updatePoint.bind(this);
	}

	componentDidMount() {
		this.db = firebase.initializeApp(firebaseConfig);

		this._reloadFirebaseData();
	}

	_reloadFirebaseData() {
		this.setState({
			loading: true,
		});

		this.db
			.firestore()
			.collection('geo_points')
			.get()
			.then(dataSnapshot => {
				const data = dataSnapshot.docs.map(doc => {
					return { ...doc.data(), id: doc.id };
				});

				this.setState({
					loading: false,
					locations: data,
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
					locations: [],
				});

				console.log('error:', error);
			});
	}

	_updatePoint() {
		if (this.state.selectedActionAtPoint) {
			console.log(' selected action points:', this.state.selectedActionAtPoint);
			console.log(' update point:', this.state.selectedPoint);

			const firebaseRef = this.db.firestore().collection('geo_points').doc(this.state.selectedPoint.id);

			console.log(' firebaseRef:', firebaseRef);

			const newObject = {
				...this.state.selectedPoint,
				label: this.state.selectedActionAtPoint.value,
			};

			console.log(' new object:', newObject);

			firebaseRef.update(newObject);
			
		} else {
			alert(' Please select an action did at a location. ');
		}
	}

	_renderPoints() {
		return this.state.locations.map(location => {
			var iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

			switch (location.label) {
				case 'walk':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/wht-blank-lv.png';
					break;

				case 'stay':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/wht-square-lv.png';
					break;

				case 'bike':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/purple-circle-lv.png';
					break;

				case 'scooter':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/blu-circle-lv.png';
					break;

				case 'e-scooter':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/blu-stars-lv.png';
					break;

				case 'rn':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/grn-diamond-lv.png';
					break;

				case 'rb-bad':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/red-diamond-lv.png';
					break;

				default:
					iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
					break;
			}

			return (
				<Marker
					position={{ lat: location.latitude, lng: location.longitude }}
					onClick={() => {
						this.setState({
							selectedPoint: location,
						});
					}}
					name={'Test'}
					title={'Test marker'}
					key={location.id}
					icon={{ url: iconURL }}
				/>
			);
		});
	}

	_renderMap() {
		if (this.state.locations.length !== 0) {
			return (
				<Map
					google={this.props.google}
					zoom={16}
					style={mapStyles}
					initialCenter={{ lat: 45.757855, lng: 21.228995 }}
				>
					{this._renderPoints()}
				</Map>
			);
		}

		return null;
	}

	_renderSelectedPoint() {
		if (this.state.selectedPoint) {
			if (this.state.selectedPoint.label) {
				return (
					<form>
						<br />
						<label>
							Latitude: {this.state.selectedPoint.latitude}{' '}
						</label>
						<br />
						<label>
							Longitude: {this.state.selectedPoint.longitude}{' '}
						</label>
						<br />
						<label>
							Accuracy: {this.state.selectedPoint.accuracy}{' '}
						</label>
						<br />
						<label>
							UniqueId: {this.state.selectedPoint.uniqueId}{' '}
						</label>
						<br />
						<label>
							{`Manufacturer: ${this.state.selectedPoint.manufacturer}`}
						</label>
						<br />
						<label>
							{`Action did at location: ${this.state.selectedPoint.label}`}
						</label>
						<br />
					</form>
				);
			} else {
				return (
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
						}}
					>
						<label>
							Latitude: {this.state.selectedPoint.latitude}{' '}
						</label>
						<label>
							Longitude: {this.state.selectedPoint.longitude}{' '}
						</label>
						<label>
							Accuracy: {this.state.selectedPoint.accuracy}{' '}
						</label>
						<br />
						<label>
							UniqueId: {this.state.selectedPoint.uniqueId}{' '}
						</label>
						<label>
							{`Manufacturer: ${this.state.selectedPoint.manufacturer}`}
						</label>
						<label>Select action did at location : </label>
						<Select
							options={actionsOptions}
							onChange={value => {
								console.log('  value:', value);
								this.setState({
									selectedActionAtPoint: value,
								});
							}}
						/>
						<Button
							variant="primary"
							onClick={this._updatePoint}
							style={{
								hight: 60,
								width: 200,
								marginTop: 500,
								display: 'flex',
								flex: 1,
							}}
						>
							Update
						</Button>
					</div>
				);
			}
		}

		return null;
	}

	render() {
		return (
			<div style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							...mapStyles,
							marginTop: 32,
							marginLeft: 32,
							display: 'flex',
						}}
					>
						{this._renderMap()}
					</div>
					<div>
						<Button
							variant="primary"
							disabled={this.state.loading}
							onClick={() => {
								this._reloadFirebaseData();
							}}
							style={{ margin: 40 }}
						>
							Reload
						</Button>

						{this.state.loading ? 'loading...' : 'not loading'}
					</div>
				</div>
				<div style={dataPartStyles}>
					<h2 style={{ display: 'flex' }}>Selected Point</h2>
					{this._renderSelectedPoint()}
				</div>
			</div>
		);
	}
}

const dataPartStyles = {
	margin: 32,
	border: '1px solid gray',
	height: 900,
	padding: 12,
};

const mapStyles = {
	width: 800,
	height: 500,
	backgroundColor: 'blue',
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyArAl-k3E70PTxcFnFhKdilCW37KckQHBM',
	libraries: ['visualization'],
})(App);
