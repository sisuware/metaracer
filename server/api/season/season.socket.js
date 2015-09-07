/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Season = require('./season.model');

exports.register = function(socket) {
  Season.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Season.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('season:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('season:remove', doc);
}