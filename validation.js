Mesosphere({
    name: 'birthdayForm',
    template: 'birthdayForm',
    method: 'createBirthday',
    fields: {
        email: {
            required: true,
            format: 'email',
            message: "Bitte eine gültige Email angeben",
            requiredMessage: "Bitte Email angeben"
        },
        name: {
            required: true,
            format: "alphanumeric",
            requiredMessage: "Bitte Name angeben",
            transform: ["trim", "slugify"],
            rules: {
                minLength: 3
            }
        },
        day: {
            required: true,
            format: "integer",
            message: "Geburtstag zwischen 1 und 31",
            requiredMessage: "Bitte Tag angeben",
            transform: ["trim", "slugify"],
            rules: {
                minValue: 1,
                maxValue: 31
            }
        },
        month: {
            required: true,
            format: "integer",
            message: "Geburtsmonat zwischen 1 und 12",
            requiredMessage: "Bitte Monat angeben",
            transform: ["trim", "slugify"],
            rules: {
                minValue: 1,
                maxValue: 12
            }
        }

    },
    // not used currently
    aggregates: {
        birthDate: ["join", ["month", "day"], "/"],
    }

});

Meteor.methods({

    createBirthday: function(rawData) {

        Mesosphere.birthdayForm.validate(rawData, function(errors, formData) {

            if (!errors) {

                // calculate year
                day = parseInt(formData.day);
                month = parseInt(formData.month);
                today = new Date();
                year = today.getFullYear();

                tmp = new Date(year, month - 1, day)
                if (today.getTime() > tmp.getTime()) {
                // next year
                    year += 1;
                }


                Birthdays.insert({
                    title: formData.name + "s Fest",
                    text: "Beispieltext...",
                    owner: formData.email,
                    day: day,
                    month: month,
                    year: year,
                    slug: formData.name,
                    active: true,
                    timestamp: (new Date()).getTime(),
                    // TODO
                    privslug: "secret"
                });

            } else {
                _(errors).each(function(value, key) {
                    console.log(key + ": " + value.message);
                });
            }
        });
    }

});
