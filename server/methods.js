Meteor.methods({
    updatePic: function(base64) {
        try {
            //validateImgBase64(base64);
            return Birthdays.update({
                _id: id
            }, {
                $set: {
                    'profile.pic': base64,
                }
            });
        } catch (e) {
            throw new Meteor.Error(403, e.message);
        }
        return true;
    }
});
