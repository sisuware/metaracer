/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Motorcycle = require('./motorcycle.model');

exports.register = function(socket) {
  Motorcycle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Motorcycle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('motorcycle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('motorcycle:remove', doc);
}