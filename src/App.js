import React, { Component } from 'react';
// import './App.css';
import Button from 'react-bootstrap/Button';
import { Map, HeatMap, Marker, GoogleApiWrapper } from 'google-maps-react';

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

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: [],
			loading: false,
		};
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
				const data = dataSnapshot.docs.map(doc => doc.data());

				// generate hit map array
				const hitMapArray = data.map(point => {
					return { lat: point.latitude, lng: point.longitude };
				});

				console.log(' response: ', data);
				console.log(' hitmap: ', hitMapArray);

				this.setState({
					loading: false,
					locations: hitMapArray,
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

	_renderPoints() {
		return this.state.locations.map(location => {
			return <Marker position={{ lat: location.latitude, lng: location.longitude }} name={'Test'} />;
		});
	}

	_renderMap() {
		if (this.state.locations.length !== 0 ) {
			return (<Map
						google={this.props.google}
						zoom={16}
						style={mapStyles}
						initialCenter={{ lat: 45.757855, lng: 21.228995 }}
					>
						<HeatMap
							positions={this.state.locations}
							opacity={0.5}
							radius={10}
						/>
						{/* {this._renderPoints()} */}
					</Map>);
		}

		return null;
	}

	render() {
		return (
			<div style={{ flex: 1 }}>
				<div
					style={{
						...mapStyles,
						flex: 1,
					}}
				>
					{this._renderMap()}
				</div>
				<div style={{ flex: 1 }}>
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
		);
	}
}

const mapStyles = {
	width: 700,
	height: 600,
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyArAl-k3E70PTxcFnFhKdilCW37KckQHBM',
	libraries: ['visualization'],
})(App);
