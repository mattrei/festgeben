
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
