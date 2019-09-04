import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { CSVLink } from 'react-csv';

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as firebase from 'firebase';
import { firebaseConfig, actionsOptions, csvHeader } from './utils/constants';

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
			selectedPoint: null,
			selectedActionAtPoint: null,
			csvData: null
		};

		this.csvFileName = 'RBStats.csv';
		this._updatePoint = this._updatePoint.bind(this);
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
				});

				this._createCSVData(data);
			})
			.catch(error => {
				this.setState({
					loading: false,
					locations: [],
				});

				console.log('error:', error);
			});
	}

	_createCSVData(data) {
		const newCSVData = [];

		data.forEach(location => {
			newCSVData.push({
				x1: String(location.accelerometerData[0].x),
				y1: String(location.accelerometerData[0].y),
				z1: String(location.accelerometerData[0].z),
				x2: String(location.accelerometerData[1].x),
				y2: String(location.accelerometerData[1].y),
				z2: String(location.accelerometerData[1].z),
				x3: String(location.accelerometerData[2].x),
				y3: String(location.accelerometerData[2].y),
				z3: String(location.accelerometerData[2].z),
				x4: String(location.accelerometerData[3].x),
				y4: String(location.accelerometerData[3].y),
				z4: String(location.accelerometerData[3].z),
				x5: String(location.accelerometerData[4].x),
				y5: String(location.accelerometerData[4].y),
				z5: String(location.accelerometerData[4].z),
				altitude: String(location.altitude),
				accuracy: String(location.accuracy),
				manufacturer: location.manufacturer,
				label: location.label,
			});
		});

		console.log('CSV DATA:', newCSVData);

		this.setState({
			csvData: newCSVData,
		});
	}

	_updatePoint() {
		if (this.state.selectedActionAtPoint) {
			const firebaseRef = this.db.firestore().collection('geo_points').doc(this.state.selectedPoint.id);

			const newObject = {
				...this.state.selectedPoint,
				label: this.state.selectedActionAtPoint.value,
			};

			firebaseRef.update(newObject);
		} else {
			alert(' Please select an action did at a location. ');
		}
	}

	_renderDownloadCSVButton() {
		if (this.state.csvData) {
			return (
				<div id="downloadDiv">
					<CSVLink style={{ margin: 12 }} data={this.state.csvData} filename={this.csvFileName} headers={csvHeader}>
						Download .CSV
					</CSVLink>
					<p >
						{
							'After that please upload to Google Drive.'
						}
					</p>
				</div>
			);
		}

		return null;
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

	_renderSelectedPoint() {
		if (this.state.selectedPoint) {
			if (this.state.selectedPoint.label) {
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
						<label>
							Action did at location: <b>{this.state.selectedPoint.label}</b>
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
		}

		return null;
	}

	render() {
		return (
			<div id="mainDiv">
				<div id="headerDiv" />

				<div id="rowDiv">
					<div id="mapDiv">
						<MyMapComponent
							isMarkerShown
							googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
							loadingElement={<div style={{ height: '100%' }} />}
							containerElement={<div style={{ height: '100%' }} />}
							mapElement={<div style={{ height: '100%' }} />}
							markers={this._renderPoints()}
						/>
					</div>

					<div id="statsDiv">
						<h3 align="center"> Selected Point </h3>
						{this._renderSelectedPoint()}
					</div>
				</div>

				<div id="reloadDiv">
					<Button
						variant="primary"
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

