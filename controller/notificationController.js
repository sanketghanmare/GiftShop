const notificationDao = require('../dao/notificationDao');
module.exports = (app) => {
    app.get('/buyer/notifications/:id', (req, res) => {
        console.log("getting notifications for ", req.params.id)
        notificationDao.findNotificationsForBuyer(req.params.id)
            .then(response => {console.log(response); res.json(response)})
    });

    app.delete('/buyer/notifications/delete/:id', (req,res) => {
        console.log("deleting notification ", req.params.id)
        notificationDao.deleteNotificationByID(req.params.id)
            .then(response => {res.send(response)});
    });

}