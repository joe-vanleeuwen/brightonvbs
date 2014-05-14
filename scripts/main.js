// initialize me some parse
Parse.initialize("9m9WLThdwXddNxxOHpYCyM67vIfHeVV5slrWjSM9", "noniAGaV8VRq8riDKfGI732nEBIVPgq8qK8SkaNg");

$(document).ready(function () {
    // create optiosn for selects
    $('#month').html('<option value="">month</option>' + makeMonths().join(''));
    $('#day').html('<option value="">day</option>' + makeOptions(1, 31).join(''));
    $('#year').html('<option value="">year</option>' + makeOptions(2000, 2014).join(''));
    $('#grade').html('<option value="">grade</option><option value="K4">K4</option><option value="K5">K5</option>' + makeGrades(1, 5).join(''));
    // keyup events
    phoneNumber('.parent-phone .phone-number')
    phoneNumber('.emergency-phone .phone-number')
    // make them waves
    makeWaves(14)
    // click events
    ok();
    notModal();
    modalOff();
    submit();
    admin();
    login();
    forgotPassword();
    resetPassword();

})

function makeOptions (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+'</option>'; })
}

function makeMonths () {
    return _.map(_.range(0, 12), function (n) { return '<option value="'+n+'">'+['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n]+'</option>'})
}

function makeGrades (start, end) {
    return _.map(_.range(start, end + 1), function (n) { var str = n+(['st', 'nd', 'rd'][n - 1] || 'th'); return '<option value="'+str+'">'+str+'</option>'})
}

function clickie (input, n) {
    $(input).keyup(function() {
        // val is numeric
        if ($.isNumeric($(this).val())) {
            // focus on next input
            if ($(this).val().length >= n) $(this).next(input).focus();
        }
    });
}

function phoneNumber (klass) {
    // each over the inputs with class 'phone-number'
    _.each($(klass), function (input, i) {
        // make click event for each input
        clickie(input, [3,3,4][i]);
    })
}

// make n number of waves
function makeWaves (n) {
    var waves = _.map(_.range(n), function (n) {
        return '<div class="wave" style="left: '+(n * 7)+'%"></div>'
    }).join('');

    $('.waves').append(waves);
}

function getInputs () {

    return [
        {
            el:     $('#child .first'),
            error:  'child\'s first name',
            prop:   'childFirstName'
        },
        {
            el:    $('#child .last'),
            error: 'child\'s last name',
            prop:  'childLastName'
        },
        {
            el:    $('#child #year'),
            error: 'child\'s year of birth'
        },
        {
            el:    $('#child #month'),
            error: 'child\'s month of birth'
        },
        {
            el:    $('#child #day'),
            error: 'child\'s day of birth'
        },
        {
            el:    $('#child #grade'),
            error: 'child\'s grade',
            prop:  'childGrade'
        },
        {
            el:    $('#parent .full-name'),
            error: 'parent\'s name',
            prop:  'parentName'
        },
        {
            el:    $($('#parent .phone-number')[0]),
            error: 'parent\'s phone number'
        },
        {
            el:    $($('#parent .phone-number')[1]),
            error: 'parent\'s phone number',
        },
        {
            el:    $($('#parent .phone-number')[2]),
            error: 'parent\'s phone number',
        },
        {
            el:    $('#parent .email'),
            error: 'parent\'s email',
            prop:  'parentEmail'
        },
        {
            el:    $('#parent .address'),
            error: 'address',
            prop:  'addressStreet'
        },
        {
            el:    $('#parent .city'),
            error: 'city',
            prop:  'addressCity'
        },
        {
            el:    $('#parent .state'),
            error: 'state',
            prop:  'addressState'
        },
        {
            el:    $('#parent .zip'),
            error: 'zipcode',
            prop:  'addressZipcode'
        },
        {
            el:    $('#emergency .full-name'),
            error: 'emergency contact\'s name',
            prop:  'emergencyName'
        },
        {
            el:    $($('#emergency .phone-number')[0]),
            error: 'emergency contact\'s phone number'
        },
        {
            el:    $($('#emergency .phone-number')[1]),
            error: 'emergency contact\'s phone number'
        },
        {
            el:    $($('#emergency .phone-number')[2]),
            error: 'emergency contact\'s phone number'
        },
        {
            el:    $('#emergency .relationship'),
            error: 'emergency contact\'s relationship',
            prop:  'emergencyRelationship'
        },
        {
            el:    $('#notes .allergy-info'),
            prop:  'infoAllergy'
        },
        {
            el:    $('#notes .special-instruction'),
            prop:  'infoSpecial'
        }
    ]
}

// for validating phone
function phoneValidation (inputs) {
    return _.filter(inputs, function (input, i) { return ((i < 2 ? input.el.val().length !== 3 : input.el.val().length !== 4) || !/^\d+$/.test(input.el.val())) });
}

// for validating state and zip
function comparotor (input, l, re) {
    return input.el.val().length !== l ? [input] : !re.test(input.el.val()) ? [input] : [];
}

// for validating inputs
function validate (inputs) {
    var errors = [];

    // get phone numbers
    var phoneNumbers     = _.filter(inputs, function (input) { return input.el.hasClass('phone-number') })
    var parentNumbers    = _.filter(phoneNumbers, function (input) { return input.error.slice(0,1) === 'p' })
    var emergencyNumbers = _.filter(phoneNumbers, function (input) { return input.error.slice(0,1) === 'e' })
    // get address info
    var state = _.find(inputs, function (input) { return input.el.hasClass('state') });
    var zip   = _.find(inputs, function (input) { return input.el.hasClass('zip') });
    // get the rest of the inputs
    var otherInputs = _.filter(_.difference(inputs, phoneNumbers, [state, zip]), function (input) { return input.el.prop('tagName') !== 'TEXTAREA' });    

    // process all inputs
    errors = errors.concat(_.filter(otherInputs, function (input) { return !input.el.val().length }));
    errors = errors.concat(comparotor(state, 2, /^[a-zA-Z]+$/));
    errors = errors.concat(comparotor(zip,   5, /^\d+$/));
    errors = errors.concat(phoneValidation(parentNumbers));
    errors = errors.concat(phoneValidation(emergencyNumbers));

    return _.uniq(_.map(errors, function (input) { return input.error}))
}

// for displaying errors
function displayErrors (errors) {
    $('#error').css({
        opacity:   1,
        'z-index': 100
    });

    $('#errors').html(_.map(errors, function (error) { return '<li>'+error+'</li>' }).join(''));
}

// for displaying errors
function displaySuccess () {
    $('#success').css({
        opacity:   1,
        'z-index': 100
    });
}

function process (inputs) {
    var attributes = {};

    var withProps      = _.filter(inputs, function (input) { return input.prop });
    var withoutProps   = _.filter(inputs, function (input) { return !input.prop });
    var birthDay       = _.map(_.filter(withoutProps, function (input) { return input.error.slice(0,1) === 'c' }), function (input) { return parseInt(input.el.val()) });
    var parentPhone    = _.map(_.filter(withoutProps, function (input) { return input.error.slice(0,1) === 'p' }), function (input) { return input.el.val()});
    var emergencyPhone = _.map(_.filter(withoutProps, function (input) { return input.error.slice(0,1) === 'e' }), function (input) { return input.el.val()});
    _.each(withProps, function (input) { attributes[input.prop] = input.el.val(); });

    // attributes.childBirthday  = new Date(birthDay[0], birthDay[1], birthDay[2]);
    attributes.childBirthday  = birthDay[1]+'/'+birthDay[2]+'/'+birthDay[0];
    attributes.parentPhone    = '('+parentPhone[0]+') '   +parentPhone[1]   +'-'+parentPhone[2];
    attributes.emergencyPhone = '('+emergencyPhone[0]+') '+emergencyPhone[1]+'-'+emergencyPhone[2];
    
    return attributes;
}
 
// for submitting applicant
function submit () {
    $('.submit').click(function () {
        var errors = validate(getInputs());

        if (errors.length) return displayErrors(errors);

        displaySuccess();
        var Applicant = Parse.Object.extend('Applicant');
        var applicant = new Applicant(process(getInputs())).save();
    })
}

// for removing modals
function ok () {
    $('.ok').click(function () {
        $('.modal').css({
            opacity:   0,
            'z-index': -1
        })
    })
}

// no bubble click event when clicking modal
function notModal () {
    $('.modal-box').click(function(event){
        event.stopPropagation();
    });
}

// for removing modals
function modalOff () {
    $('.modal').click(function () {
        $('.modal').css({
            opacity:   0,
            'z-index': -1
        })
    })
}

// login for admin
function admin () {
    $('.nav').click(function () {
        if (Parse.User.current()) {
            window.location = 'admin'
        } else {
            $('.login-error').css('display', 'none');
            $('.forgot-password-input').css('display', 'none');
            $('.forgot-password-input').attr('placeholder', 'email');
            $('.login-partial input').val('')
            $('.login').css('opacity', Math.abs(parseInt($('.login').css('opacity')) -1 ));
        }
    }) 
}

// keyup enter for login
function login () {
    $('.login-partial input').keyup(function (e) {
        var username = $($('.login-partial input')[0]).val();
        var password = $($('.login-partial input')[1]).val();
        if (e.which === 13) {
            Parse.User.logIn(username, password, {
                success: function (user) {
                    $('.nav').click();
                    console.log(user, 'logged in');
                },
                error: function (error) {
                    $($('.login-partial input')[1]).val('');
                    $('.login-error').css('display', 'block');
                }
            })
        }
    })
}

// for clicking forgot password
function forgotPassword () {
    $('.forgot-password').click(function () {
        $('.forgot-password-input').css('display', 'block');
    })
}

// keyup enter for resetting password
function resetPassword () {
    $('.forgot-password-input').keyup(function (e) {
        if (e.which === 13) {
            var email = $(this).val();
            var that = $(this);

            Parse.User.requestPasswordReset(email, {
                success: function() {
                    that.val('');
                    that.attr('placeholder', 'check email');
                },
                error: function(error) {
                    that.val('');
                    that.attr('placeholder', 'not found');
                }
            });
        }
    })
}

function autoFill () {
    var lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
    // get inputs
    var inputs = getInputs();
    // get phone numbers
    var phoneNumbers = _.filter(inputs, function (input) { return input.el.hasClass('phone-number') });
    _.each(phoneNumbers, function (input, i) { input.el.val(_.map(_.range((i%3 < 2 ? 3 : 4)), function () { return _.random(1,9) }).join('')) });
    // get address info
    var state = _.find(inputs, function (input) { return input.el.hasClass('state') });
    var zip   = _.find(inputs, function (input) { return input.el.hasClass('zip') });

    state.el.val('abcdefg'[_.random(6)]+'abcdefg'[_.random(6)])
    zip.el.val(_.map(_.range(5), function () { return _.random(9) }).join(''))

        // // get the rest of the inputs
    var otherInputs = _.filter(_.difference(inputs, phoneNumbers, [state, zip]), function (input) { return input.el.prop('tagName') !== 'SELECT' });
    _.each(otherInputs, function (input) { input.el.val(lorem[_.random(lorem.length - 1)])})

    var selects = _.filter(inputs, function (input) { return input.el.prop('tagName') === 'SELECT' });
    _.each(selects, function (select) { select.el.prop('selectedIndex', _.random(1, select.el.children('option').length - 1)) })
}




