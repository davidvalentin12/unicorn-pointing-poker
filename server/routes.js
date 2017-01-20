var Room = require('./room/room');

function getAllRooms(req, res) {
    Room.find(function (err, rooms) {
        if (err) {
            res.send(err);
        }

        res.json(rooms);
    });
}

module.exports = function (app) {

    Room(app);

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
