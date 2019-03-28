

// UPDATE POSTION
exports.position_update = function(req, res) {
        res.render('position_update', { title: "Mise à jour des positions" });
};

// UPDATE POSTION
exports.position_list = function(req, res) {
        res.render('position_list', { title: "Historique des positions" });
};