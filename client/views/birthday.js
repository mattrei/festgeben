////////// Donations //////////
var donationsHandle = null;
Deps.autorun(function() {
    var birthday_id = Session.get('birthday_id');
    if (birthday_id)
        donationsHandle = Meteor.subscribe('donations', birthday_id);
    else
        donationsHandle = null;
});

Template.donations.loading = function() {
    return !donationsHandle.ready();
};

Template.donations.donations = function() {
    return Donations.find({}, {
        sort: {
            donated: 1
        }
    });
};


////////// Birthday //////////
Template.birthday.events({
    'blur #title-input': function(evt) {
        var value = String(evt.target.value || "");
        Birthdays.update(this._id, {
            $set: {
                title: value,
                modified: (new Date()).getTime()
            }
        });
    },
    'blur #text-input': function(evt) {
        var value = String(evt.target.value || "");
        Birthdays.update(this._id, {
            $set: {
                text: value,
                modified: (new Date()).getTime()
            }
        });
    },

    'click #btn-active': function(evt) {
        Birthdays.update(this._id, {
            $set: {
                active: !this.active
            }
        });
    }


});


Template.birthday.helpers({
    isactive: function() {
        return this.active;
    },
    editing: function() {
        return Session.equals('editBirthday', this.privslug);
    }
});

Template.donationForm.rendered = function() {
    $('.ui.accordion').accordion();
    $('.ui.checkbox').checkbox();
};
