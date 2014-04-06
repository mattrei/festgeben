// Define Minimongo collections to match server/publish.js.
Projects = new Meteor.Collection("projects");
Birthdays = new Meteor.Collection("birthdays");
Donations = new Meteor.Collection("donations");

Session.setDefault('editBirthday', null);

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
var projectsHandle = Meteor.subscribe('projects', function () {});

var donationsHandle = null;
// Always be subscribed to the todos for the selected list.
Deps.autorun(function () {
  var birthday_id = Session.get('birthday_id');
  if (birthday_id)
    donationsHandle = Meteor.subscribe('donations', birthday_id);
  else
    donationsHandle = null;
});


////////// Projects //////////

Template.projects.loading = function () {
  return !projectsHandle.ready();
};

Template.projects.projects = function () {
  return Projects.find({}, {sort: {name: 1}});
};

Router.configure({
  notFoundTemplate: 'notFound'
});

Router.map(function () {
  this.route('about');
  this.route('contact');
  this.route('home', { path: '/' });

  this.route('birthday', {
        path: /^\/(\d+)\/(\S+)/, 
      template: 'birthday',
        notFoundTemplate: 'birthdayNotFound', 
      
          waitOn: function () {
            return Meteor.subscribe('birthdays');
          },

        data: function () {
            if (this.params.edit) {
                Session.set('editBirthday', this.params.edit);
                //TODO change privslug to _id
                return Birthdays.findOne({year: parseInt(this.params[0]), slug: this.params[1], privslug: this.params.edit});
            }
            else 
                return Birthdays.findOne({year: parseInt(this.params[0]), slug: this.params[1]});
        },
      
      onStop: function () {
              Session.set('editBirthday', null);
            }
        
  });
    
});
