// Projects -- {name: String,
//              url: String,
//              mail: String,
//              logo: String,
//              contact: String}
Projects = new Meteor.Collection("projects");
Meteor.publish('projects', function() {
    return Projects.find();
});

// Birthdays -- {title: String,
//               text: String,
//               created: Number,
//               modified: Number,
//               day: Number,
//               month: Number,
//               year: Number,
//               active: Boolean,
//               pic: String,
//               owner: String,
//               slug: String,
//               privslug: String,
//               projects_id: [String, ...]}
Birthdays = new Meteor.Collection("birthdays");
Meteor.publish('birthdays', function() {
    return Birthdays.find();
});

// Donations -- {name: String,
//              mail: String,
//              url: String,
//              comment: String,
//              amount: Number,
//              newsletter: Boolean,
//              anonym: Boolean,
//              status: String,
//              birthday_id: String
//              project_id: String}
Donations = new Meteor.Collection("donations");
Meteor.publish('donations', function(birthday_id) {
    check(birthday_id, String);
    return Donations.find({
        birthday_id: birthday_id
    });
});
