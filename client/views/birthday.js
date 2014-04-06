Template.birthdayForm.events({
    'submit form': function(evt, tpl) {
        evt.preventDefault();
        Birthdays.insert({
            title: $('#name').val(),
            owner: $('#mail').val(),
            day: parseInt($('#dayInt').val()),
            month: parseInt($('#monthInt').val()),
            active: true,
            timestamp: (new Date()).getTime()
        });
    }
})

var donationsHandle = null;
Deps.autorun(function() {
    var birthday_id = Session.get('birthday_id');
    if (birthday_id)
        donationsHandle = Meteor.subscribe('donations', birthday_id);
    else
        donationsHandle = null;
});



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
