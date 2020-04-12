import streamsApi from '../api/streams';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	EDIT_STREAM,
	FETCH_STREAM,
	DELETE_STREAM,
	FETCH_STREAMS,
} from './types';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const createStream = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streamsApi.post('/streams', { ...formValues, userId });
	dispatch({
		type: CREATE_STREAM,
		payload: response.data,
	});
};

export const fetchStreams = () => async (dispatch) => {
	const response = await await streamsApi.get('/streams');
	dispatch({
		type: FETCH_STREAMS,
		payload: response.data,
	});
};

export const fetchStream = (streamId) => async (dispatch) => {
	const response = await await streamsApi.get(`/streams/${streamId}`);
	dispatch({
		type: FETCH_STREAM,
		payload: response.data,
	});
};

export const deleteStream = (streamId) => async (dispatch) => {
	await await streamsApi.delete(`/streams/${streamId}`);
	dispatch({
		type: DELETE_STREAM,
		payload: streamId,
	});
};

export const editStream = (streamId, formValues) => async (dispatch) => {
	const response = await await streamsApi.put(
		`/streams/${streamId}`,
		formValues
	);
	dispatch({
		type: EDIT_STREAM,
		payload: response.data,
	});
};
