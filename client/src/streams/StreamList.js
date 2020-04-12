import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../actions';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<button className="ui button primary">Edit</button>
					<button className="ui button negative">Delete</button>
				</div>
			);
		}
	}
	renderContent() {
		if (this.props.streams.length === 0) {
			return <div>Loading</div>;
		} else {
			return this.props.streams.map((stream) => (
				<div key={stream.id} className="item">
					{this.renderAdmin(stream)}
					<i className="large camera middle aligned icon"></i>
					<div className="content">
						<a className="header">{stream.title}</a>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			));
		}
	}
	render() {
		return <div className="ui celled list">{this.renderContent()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
	};
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
