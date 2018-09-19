'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

exports.hello = (event, context, callback) => {
	console.log(event);
	console.log(process.env);

	switch (event.httpMethod) {
		case 'DELETE':
			deleteItem(event, callback);
			break;
		case 'GET':
			getItem(event, callback);
			break;
		case 'POST':
			saveItem(event, callback);
			break;
		case 'PUT':
			updateItem(event, callback);
			break;
		default:
			sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
	}
};

function saveItem(event, callback) {
	const item = JSON.parse(event.body);

	item.id = uuidv1();

	databaseManager.saveItem(item).then(response => {
		console.log(response);
		sendResponse(200, item.id, callback);
	});
}

function getItem(event, callback) {
	const id = event.pathParameters.id;

	databaseManager.getItem(id).then(response => {
		console.log(response);
		sendResponse(200, JSON.stringify(response), callback);
	});
}

function deleteItem(event, callback) {
	const id = event.pathParameters.id;

	databaseManager.deleteItem(id).then(response => {
		sendResponse(200, 'DELETE ITEM', callback);
	});
}

function updateItem(event, callback) {
	const id = event.pathParameters.id;

	const body = JSON.parse(event.body);
	const paramName = body.paramName;
	const paramValue = body.paramValue;

	databaseManager.updateItem(id, paramName, paramValue).then(response => {
		console.log(response);
		sendResponse(200, JSON.stringify(response), callback);
	});
}

function sendResponse(statusCode, message, callback) {
	const response = {
		statusCode: statusCode,
		body: JSON.stringify(message)
	};
	callback(null, response);
}
