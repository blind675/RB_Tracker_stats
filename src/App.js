import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { CSVLink } from 'react-csv';

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import * as firebase from 'firebase';
import { firebaseConfig, actionsOptions, csvHeader, newCSVRowFromLocationObject } from './utils/constants';

const MyMapComponent = withScriptjs(
	withGoogleMap(props =>
		<GoogleMap defaultZoom={16} defaultCenter={{ lat: 45.757855, lng: 21.228995 }}>
			{props.isMarkerShown && props.markers}
		</GoogleMap>
	)
);

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			loading: false,
			selectedActionAtPoint: null,
			csvData: null,
			drawMap: false,
			selectedList: [],
		};

		this.csvFileName = 'RBStats.csv';
		this._updatePoints = this._updatePoints.bind(this);
		this._deletePoints = this._deletePoints.bind(this);
	}

	componentDidMount() {
		this.db = firebase.initializeApp(firebaseConfig);
		let current_datetime = new Date();
		let formatted_date =
			current_datetime.getDate() + '-' + (current_datetime.getMonth() + 1) + '-' + current_datetime.getFullYear();

		this.csvFileName = 'RBStats-' + formatted_date + '.csv';

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
					drawMap: true,
				});

				this._createCSVData(data);
			})
			.catch(error => {
				this.setState({
					loading: false,
					locations: [],
					drawMap: true,
				});

				console.log('error:', error);
			});
	}

	_createCSVData(data) {
		const newCSVData = [];

		data.forEach(location => {
			if (location.label && location.accelerometerData.length > 30) {
				newCSVData.push(newCSVRowFromLocationObject(location));
			}
		});

		this.setState({
			csvData: newCSVData,
		});
	}

	_deletePoints() {
		confirmAlert({
			title: 'Are you sure?',
			message:
				'This will remove all the points that have been assigned labels. Please make sure you have downloaded a .cvs file before deleting points.',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						var promisesArray = [];

						this.state.locations.forEach(location => {
							if (location.label) {
								const firebaseRef = this.db.firestore().collection('geo_points').doc(location.id);
								promisesArray.push(firebaseRef.delete());
							}
						});

						Promise.all(promisesArray).then(() => {
							this.setState({
								selectedList: [],
								selectedActionAtPoint: null,
								locations: [],
							});

							this._reloadFirebaseData();
						});
					},
				},
				{
					label: 'No',
				},
			],
		});
	}

	_updatePoints() {
		if (this.state.selectedActionAtPoint) {
			this.setState({
				loading: true,
			});

			var promisesArray = [];
			this.state.selectedList.forEach(selectedLocationId => {
				var location = this.state.locations.find(loc => loc.id === selectedLocationId);
				location.label = this.state.selectedActionAtPoint.value;

				const firebaseRef = this.db.firestore().collection('geo_points').doc(location.id);

				promisesArray.push(firebaseRef.update(location));
			});

			Promise.all(promisesArray).then(() => {
				this.setState({
					selectedList: [],
					selectedActionAtPoint: null,
					locations: [],
				});

				this._reloadFirebaseData();
			});
		} else {
			alert(' Please select an action did at a location. ');
		}
	}

	_selectDeselectMarker(location) {
		const localLoc = this.state.locations.find(loc => loc.id === location.id);

		var newSelectedArray = [];
		if (localLoc.label) {
			newSelectedArray.push(localLoc.id);
		} else {
			if (this.state.selectedList.includes(location.id)) {
				// remove location.id from selected list
				var index = this.state.selectedList.indexOf(location.id);
				if (index > -1) {
					this.state.selectedList.splice(index, 1);
				}
				newSelectedArray = this.state.selectedList;
			} else {
				this.state.selectedList.push(location.id);
				newSelectedArray = this.state.selectedList;
			}
		}
		this.setState({
			drawMap: true,
			selectedList: newSelectedArray,
		});
	}

	_renderDownloadCSVButton() {
		if (this.state.csvData) {
			return (
				<div id="downloadDiv">
					<CSVLink
						style={{ margin: 12 }}
						data={this.state.csvData}
						filename={this.csvFileName}
						headers={csvHeader}
					>
						Download .CSV
					</CSVLink>
					<p>
						{'After the download please upload the file to Reactive Boards Google Drive.'}
					</p>

					<Button
						variant="danger"
						onClick={this._deletePoints}
						style={{
							hight: 60,
							width: 200,
							marginTop: 16,
							marginBottom: 16,
							marginRight: 32,
						}}
					>
						Delete Points
					</Button>
				</div>
			);
		}

		return null;
	}

	_renderPoints() {
		return this.state.locations.map(location => {
			var iconURL;

			switch (location.label) {
				case 'stay':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/wht-square-lv.png';
					break;

				case 'walk':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/wht-blank-lv.png';
					break;

				case 'car':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/wht-circle-lv.png';
					break;

				case 'bike':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/purple-circle-lv.png';
					break;

				case 'e-bike':
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/purple-square-lv.png';
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
					iconURL = null;
					break;
			}

			if (iconURL === null) {
				iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

				if (this.state.selectedList.includes(location.id)) {
					iconURL = 'http://maps.google.com/mapfiles/kml/paddle/orange-circle.png';
				}
			}

			if ( location.accelerometerData.length < 50 ) {
				iconURL = 'http://maps.google.com/mapfiles/ms/icons/red-stars.png';
			}

			return (
				<Marker
					position={{ lat: location.latitude, lng: location.longitude }}
					onClick={() => {
						this._selectDeselectMarker(location);
					}}
					name={'Test'}
					title={'Test marker'}
					key={location.id}
					icon={{ url: iconURL }}
				/>
			);
		});
	}

	_renderSelectedPoint() {
		if (this.state.selectedList.length === 1) {
			const location = this.state.locations.find(location => location.id === this.state.selectedList[0]);

			if (location.label) {
				return (
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
							margin: 12,
						}}
					>
						<label>
							Latitude: {location.latitude}{' '}
						</label>
						<label>
							Longitude: {location.longitude}{' '}
						</label>
						<label>
							Accuracy: {location.accuracy}{' '}
						</label>
						<br />
						<label>
							Point ID: {location.id}{' '}
						</label>
						<label>
							Data values: {location.accelerometerData.length}{' '}
						</label>
						<label>
							UniqueId: {location.uniqueId}{' '}
						</label>
						<label>
							{`Manufacturer: ${location.manufacturer}`}
						</label>
						<label>
							Action did at location: <b>{location.label}</b>
						</label>
					</div>
				);
			} else {
				return (
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
							margin: 12,
						}}
					>
						<label>
							Latitude: {location.latitude}{' '}
						</label>
						<label>
							Longitude: {location.longitude}{' '}
						</label>
						<label>
							Accuracy: {location.accuracy}{' '}
						</label>
						<br />
						<label>
							Point ID: {location.id}{' '}
						</label>
						<label>
							Data values: {location.accelerometerData.length}{' '}
						</label>
						<label>
							UniqueId: {location.uniqueId}{' '}
						</label>
						<label>
							{`Manufacturer: ${location.manufacturer}`}
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
							onClick={this._updatePoints}
							style={{
								hight: 60,
								width: 200,
								display: 'flex',
								flex: 1,
								marginTop: 16,
								marginBottom: 16,
							}}
						>
							Update
						</Button>
					</div>
				);
			}
		} else if (this.state.selectedList.length > 1) {
			return (
				<div
					style={{
						display: 'flex',
						flex: 1,
						flexDirection: 'column',
						margin: 12,
					}}
				>
					<label>
						Select {this.state.selectedList.length} points
					</label>
					<label>Select action did at locations : </label>
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
						onClick={this._updatePoints}
						style={{
							hight: 60,
							width: 200,
							display: 'flex',
							flex: 1,
							marginTop: 16,
							marginBottom: 16,
						}}
					>
						Update All
					</Button>
				</div>
			);
		}

		return null;
	}

	_renderMap() {
		if (this.state.drawMap === true) {
			return (
				<MyMapComponent
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{ height: '100%' }} />}
					containerElement={<div style={{ height: '100%' }} />}
					mapElement={<div style={{ height: '100%' }} />}
					markers={this._renderPoints()}
				/>
			);
		}

		return null;
	}

	render() {
		return (
			<div id="mainDiv">
				<div id="headerDiv" />

				<div id="rowDiv">
					<div id="mapDiv">
						{this._renderMap()}
					</div>

					<div id="statsDiv">
						<h3 align="center"> Selected Point </h3>
						{this._renderSelectedPoint()}
					</div>
				</div>

				<div id="reloadDiv">
					<Button
						variant="secondary"
						disabled={this.state.loading}
						onClick={() => {
							this._reloadFirebaseData();
						}}
						style={{ margin: 12 }}
					>
						Reload
					</Button>
					<label>
						{this.state.loading ? 'loading...' : 'not loading'}
					</label>
				</div>

				{this._renderDownloadCSVButton()}
			</div>
		);
	}
}

export default App;
