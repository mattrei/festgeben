// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Projects.find().count() === 0) {
    var data = [
      {_id: "1",
       name: "Township-Schule von Ithuba",
       url: "http://www.ithuba.at/town",
       contact: "chr@ithuba.at",
       mail: "spende@ithuba.at",
       logo: "public/ithuba.png"
      },
      {_id: "2",
       name: "Projekt-Poin von Laafi",
       url: "http://www.laafi.at/poin",
       contact: "helge@laafi.at",
       mail: "spende@laafi.at",
       logo: "public/laafi.png"
      }
    ];

    for (var i = 0; i < data.length; i++) {
      Projects.insert({name: data[i].name,
                                  url: data[i].url,
                                  contact: data[i].contact,
                                  mail: data[i].mail,
                                  logo: data[i].logo});
    }

    var data = [
      {title: "Christoph Chorherrs 50. Geburtstag",
       text: "Schreib hier warum ....",
       timestamp: (new Date()).getTime(),
       day: "14",
       month: "6",
       active: true,
       pic: "public/cc.jpg",
       owner: "chr@chr.at",
       projects_id: ["1","2"]
      }
    ];
    Birthdays.insert({title: data[i].title,
                                  text: data[i].text,
                                  timestamp: data[i].timestamp,
                                  day: data[i].day,
                                  month: data[i].month,
                                  active: data[i].active,
                                  pic: data[i].pic,
                                  owner: data[i].owner,
                                  projects_id: data[i].projects_id});
  }
});