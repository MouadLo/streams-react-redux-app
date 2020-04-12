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
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					{
						<Link
							to={`/streams/delete/${stream.id}`}
							className="ui button negative"
						>
							Delete
						</Link>
					}
				</div>
			);
		}
	}
	renderList() {
		if (this.props.streams.length === 0) {
			return <div>Loading</div>;
		} else {
			return this.props.streams.map((stream) => (
				<div key={stream.id} className="item">
					{this.renderAdmin(stream)}
					<i className="large camera middle aligned icon"></i>
					<div className="content">
						<a className="header" href={`/streams/edit/${stream.id}`}>
							{stream.title}
						</a>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			));
		}
	}
	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	}
	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
