/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Transponder = require('./transponder.model');

exports.register = function(socket) {
  Transponder.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Transponder.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('transponder:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('transponder:remove', doc);
}