var Room = require('./room.model');
function getAllRooms(req, res) {
    Room.find(function (error, rooms) {
        res.json(rooms);
    });
}
function createRoom(req, res) {
    console.log(req);
    Room.create({
        name: req.body.name
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }

        // get and return all the todos after you create another
    });
}

module.exports = function (app) {
    app.get('/api/rooms', getAllRooms);
    app.post('/api/room', createRoom);
};