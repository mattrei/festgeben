/**
 * HELPERS
 */
var x, // x position of crop image
    y, // y position of crop image
    width, // width of crop image
    height, // height of crop image
    error, //
    modal,
    realImage,
    displayImage;

var widthAvatar = 128,
    heightAvatar = 128;

Template.changePicModalBody.image = function() {
    if (this.pic)
        return this.pic
    else
        return AVATAR;
};
Template.changePic.rendered = function() {

    var tmpl = this;

    // cache the dom
    modal = $(tmpl.find('#editYourAvatarModal'));

    modal.modal({
        onHide: function() {
            clear();
        },
        onShow: function() {
            loadImage(tmpl, this.pic);
            $(function() {
                displayImage.imgAreaSelect({
                    aspectRatio: '1:1',
                    handles: true,
                    fadeSpeed: 200,
                    onSelectChange: preview,
                    parent: $('.modal-content')
                });
            });
        }
    }).modal('attach events', '#change-pic', 'show');
};

Template.changePicModalBody.rendered = function() {
    displayImage = $(this.find('#avatarUserImg'));
    realImage = $(this.find('#realImage'));
    realImage.hide();
    error = $(this.find('.error'));
    $(function() {
        displayImage.imgAreaSelect({
            aspectRatio: '1:1',
            handles: true,
            fadeSpeed: 200,
            onSelectChange: preview
        });
    });
};

/**
 * EVENTS
 */
Template.changePicModalBody.events({
    'change input[name=avatarFile]': function(evt, tmpl) {
        evt.preventDefault();
        var input = tmpl.find('input[name=avatarFile]');
        if (input.files && input.files[0]) {
            FileReaderObject.previewImage(input.files[0], function(err, file) {
                if (err) {
                    error.html(createAlertDanger(err.message));
                    Meteor.setTimeout(function() {
                        error.html('');
                    }, 5000);
                } else {
                    loadImage(tmpl, file.result);
                    $(function() {
                        displayImage.imgAreaSelect({
                            aspectRatio: '1:1',
                            handles: true,
                            fadeSpeed: 200,
                            onSelectChange: preview
                        });
                    });
                }
            });
        }
    }
});

Template.changePicModal.events({
    'click #save-pic': function(evt) {
        evt.preventDefault();
        var canvas = document.createElement("canvas");
        canvas.width = widthAvatar;
        canvas.height = heightAvatar;
        var scaleX = realImage.width() / displayImage.width();
        var scaleY = realImage.height() / displayImage.height();
        var ctx = canvas.getContext("2d");

        var img = new Image();
        img.src = realImage.src;
        alert(scaleX + " " + scaleY + " " + width + " " + height + " " + x + " " + y);

        image = $('#realImage');

        ctx.drawImage(image, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, widthAvatar, heightAvatar);

        Birthdays.update(this._id, {
            $set: {
                'pic': canvas.toDataURL()
            }
        });
    }
});
/**
 * FUNCTION CLASS DEFINE
 */
var processChangeAvatar = function(tmp) {
    var canvas = document.createElement("canvas");
    canvas.width = widthAvatar;
    canvas.height = heightAvatar;
    var scaleX = realImage.width / displayImage.width();
    var scaleY = realImage.height / displayImage.height();
    var ctx = canvas.getContext("2d");
    ctx.drawImage(realImage, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, widthAvatar, heightAvatar);

    Birthdays.update({
        _id: id
    }, {
        $set: {
            'pic': canvas.toDataURL()
        }
    });

    /*
    Meteor.call('updatePic', canvas.toDataURL(), function(err, res) {
        if (err) {
            error.html(createAlertDanger(err.message));
            Meteor.setTimeout(function() {
                error.html('');
            }, 5000);
        } else {
            modal.modal('hide');
        }
    });
    */
};

function preview(img, selection) {
    if (!selection.width || !selection.height)
        return;
    var scaleX = widthAvatar / selection.width;
    var scaleY = heightAvatar / selection.height;
    $('#preview img').css({
        width: Math.round(scaleX * img.width),
        height: Math.round(scaleY * img.height),
        marginLeft: -Math.round(scaleX * selection.x1),
        marginTop: -Math.round(scaleY * selection.y1)
    });
    x = selection.x1;
    y = selection.y1;
    width = selection.width;
    height = selection.height;
};

function loadImage(tmp, src) {
    $(tmp.find('#avatarUserImg')).attr('src', src);
    $(tmp.find('#preview img')).attr('src', src);
    $(tmp.find('#realImage')).attr('src', src);
};

function clear() {
    // hide crop area
    $('.imgareaselect-border1').parent().hide();
    $('.imgareaselect-outer').hide();
    // reset input
    //http://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
    var inputAvatar = $('input[name=avatarFile]');
    inputAvatar.wrap('<form>').closest('form').get(0).reset();
    inputAvatar.unwrap();
};

FileReaderObject = {
    previewImage: function(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // check file
            if (!_.contains(FILEUPLOAD.IMG.TYPE, file.type)) {
                callback(new Meteor.Error(412, "File format not supported. Please upload .jpg, .png or .gif"));
                return;
            }
            // check size
            if (file.size > FILEUPLOAD.IMG.MAXSIZE) {
                callback(new Meteor.Error(412, "File is too large. 1512kb is the size limit"));
                return;
            }
            file.result = e.target.result;
            callback(null, file);
        };
        reader.onerror = function() {
            callback(reader.error);
        };

        reader.readAsDataURL(file);
    }
};
