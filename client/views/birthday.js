
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
// Always be subscribed to the todos for the selected list.
Deps.autorun(function () {
  var birthday_id = Session.get('birthday_id');
  if (birthday_id)
    donationsHandle = Meteor.subscribe('donations', birthday_id);
  else
    donationsHandle = null;
});



Template.birthday.editing = function () {
  return Session.equals('editBirthday', this.privslug);
};

Template.birthday.events({
  'blur .edit-title': function (evt) {
    var value = String(evt.target.innerText || "");
    console.log("save now " + value);
    Birthdays.update(this._id, {$set: {title: value}});
      evt.preventDefault()
  },
    'blur .edit-text': function (evt) {
    var value = String(evt.target.innerText || "");
    console.log("save now " + value);
    Birthdays.update(this._id, {$set: {text: value}});
  }
});