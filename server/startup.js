// if the database is empty on server start, create some sample data.
Meteor.startup(function() {
    if (Projects.find().count() === 0) {
        var data = [{
            _id: "1",
            name: "Township-Schule von Ithuba",
            url: "http://www.ithuba.at/town",
            contact: "chr@ithuba.at",
            mail: "spende@ithuba.at",
            logo: "public/ithuba.png"
        }, {
            _id: "2",
            name: "Projekt-Poin von Laafi",
            url: "http://www.laafi.at/poin",
            contact: "helge@laafi.at",
            mail: "spende@laafi.at",
            logo: "public/laafi.png"
        }];

        for (var i = 0; i < data.length; i++) {
            Projects.insert({
                name: data[i].name,
                url: data[i].url,
                contact: data[i].contact,
                mail: data[i].mail,
                logo: data[i].logo
            });
        }

        var data = {
            title: "Christoph Chorhers 50. Geburtstag",
            text: "Schreib hier warum ....",
            created: (new Date()).getTime(),
            day: 14,
            month: 6,
            year: 2014,
            active: true,
            owner: "chr@chr.at",
            slug: "b1",
            privslug: "secret",
            projects_id: ["1", "2"]
        };

        var bid = Birthdays.insert({
            title: data.title,
            text: data.text,
            timestamp: data.timestamp,
            day: data.day,
            month: data.month,
            year: data.year,
            active: data.active,
            owner: data.owner,
            slug: data.slug,
            privslug: data.privslug,
            projects_id: data.projects_id,
            pic: AVATAR
        });

        Donations.insert({
            firstname: "Matthias",
            lastname: "Treitler",
            timestamp: (new Date()).getTime(),
            url: "www.festgeben.at",
            comment: "Ein echt gute Gelegenheit um zu spenden",
            amount: 20,
            always: false,
            anonym: false,
            newsletter: true,
            birthday_id: bid,
            project_id: 1
        });
    }

});
