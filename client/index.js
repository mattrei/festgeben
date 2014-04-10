// Define Minimongo collections to match server/publish.js.
Projects = new Meteor.Collection("projects");
Birthdays = new Meteor.Collection("birthdays");
Donations = new Meteor.Collection("donations");

Session.setDefault('editBirthday', null);


var projectsHandle = Meteor.subscribe('projects', function() {});


////////// Projects //////////
Template.projects.loading = function() {
    return !projectsHandle.ready();
};

Template.projects.projects = function() {
    return Projects.find({}, {
        sort: {
            name: 1
        }
    });
};

Router.configure({
    notFoundTemplate: 'notFound'
});

Router.map(function() {
    this.route('about');
    this.route('contact');
    this.route('home', {
        path: '/'
    });

    this.route('birthday', {
        path: /^\/(\d+)\/(\S+)/,
        template: 'birthday',
        notFoundTemplate: 'birthdayNotFound',

        waitOn: function() {
            return Meteor.subscribe('birthdays');
        },

        data: function() {
            var b;
            if (this.params.edit) {
                //TODO change privslug to _id
                b = Birthdays.findOne({
                    year: parseInt(this.params[0]),
                    slug: this.params[1],
                    privslug: this.params.edit
                });
            } else {
                // only active birthdays for the public
                b = Birthdays.findOne({
                    year: parseInt(this.params[0]),
                    slug: this.params[1],
                    active: true
                });
            }

            if (b)
                Session.set('birthday_id', b._id);

            return b;
        },

        onStop: function() {
            Session.set('birthday_id', null);
        }

    });

});
