// initialize me some parse
Parse.initialize("9m9WLThdwXddNxxOHpYCyM67vIfHeVV5slrWjSM9", "noniAGaV8VRq8riDKfGI732nEBIVPgq8qK8SkaNg");

$(document).ready(function () {
    $('#month').html('<option value="">Month</option>' + makeMonths().join(''));
    $('#day').html('<option value="">Day</option>' + makeOptions(1, 31).join(''));
    $('#year').html('<option value="">Year</option>' + makeOptions(2000, 2014).join(''));
    $('#grade').html('<option value="">Grade</option><option value="K4">K4</option><option value="K5">K5</option>' + makeGrades(1, 5).join(''));

    phoneNumber('.parent-phone .phone-number')
    phoneNumber('.emergency-phone .phone-number')

    makeWaves(14)
    var inputs = getInputs();
    console.log(validate(inputs))
})

function makeOptions (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+'</option>'; })
}

function makeMonths () {
    return _.map(_.range(0, 12), function (n) { var str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n]; return '<option value="'+str+'">'+str+'</option>'})
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
        // val is not numeric
        } else {
            // characters exist in input
            $(this).css('background', $(this).val().length ? 'rgba(255, 0, 0, 0.35)' : 'white');
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

function submit () {
    $('.submit').click(function () {
        console.log('yo we be savin');
        var Applicant = Parse.Object.extend('Applicant');
        var applicant = new Applicant(
            // put function here/validate
        ).save();
    })
}

function getInputs () {

    return [
        [ $('#child .first'),                  'child\'s first name'    ],
        [ $('#child .last'),                   'child\'s last name'     ],
        [ $('#child #month'),                  'child\'s month of birth'],
        [ $('#child #day'),                    'child\'s day of birth'  ],
        [ $('#child #year'),                   'child\'s year of birth' ],
        [ $('#child #grade'),                  'child\'s grade'         ],
        [ $('#parent .full-name'),             'parent\'s name'   ],
        [ $($('#parent .phone-number')[0]),    'parent\'s phone number'],
        [ $($('#parent .phone-number')[1]),    'parent\'s phone number'],
        [ $($('#parent .phone-number')[2]),    'parent\'s phone number'],
        [ $('#parent .email'),                 'parent\'s email'],
        [ $('#parent .address'),               'address'],
        [ $('#parent .city'),                  'city'],
        [ $('#parent .state'),                 'state'],
        [ $('#parent .zip'),                   'zipcode'],
        [ $('#emergency .full-name'),          'emergency contact\'s name'],
        [ $($('#emergency .phone-number')[0]), 'emergency contact\'s phone number'],
        [ $($('#emergency .phone-number')[1]), 'emergency contact\'s phone number'],
        [ $($('#emergency .phone-number')[2]), 'emergency contact\'s phone number'],
        [ $('#emergency .relationship'),       'emergency contact\'s relationship'],
        [ $('#notes .allergy-info')],
        [ $('#notes .special-instruction')]
    ]
}

function phoneValidation (inputs) {
    return _.filter(inputs, function (input, i) { return ((i < 2 ? input[0].val().length !== 3 : input[0].val().length !== 4) || !/^\d+$/.test(input[0].val())) });
}

function comparotor (input, l, re) {
    // return input[0].val().length === l ? [] : [input];
    return input[0].val().length === l ? [] : !re.test(input[0].val()) ? [input] : [];
}

function validate (inputs) {
    var errors = [];

    // get phone numbers
    var phoneNumbers     = _.filter(inputs, function (input) { return input[0].hasClass('phone-number') })
    var parentNumbers    = _.filter(phoneNumbers, function (input) { return input[1].slice(0,1) === 'p' })
    var emergencyNumbers = _.filter(phoneNumbers, function (input) { return input[1].slice(0,1) === 'e' })
    // get address info
    var state = _.find(inputs, function (input) { return input[0].hasClass('state') });
    var zip   = _.find(inputs, function (input) { return input[0].hasClass('zip') });
    // get the rest of the inputs
    var otherInputs = _.filter(_.difference(inputs, phoneNumbers, [state, zip]), function (input) { return input[0].prop('tagName') !== 'TEXTAREA' });    

    // process all inputs
    errors = errors.concat(comparotor(state, 2, /^[a-zA-Z]+$/));
    errors = errors.concat(comparotor(zip,   5, /^\d+$/));
    errors = errors.concat(phoneValidation(parentNumbers));
    errors = errors.concat(phoneValidation(emergencyNumbers));
    // errors = errors.concat(_.filter(otherInputs, function (input) { return !input[0].val().length }));

    return _.uniq(_.map(errors, function (input) { return input[1]}))

}





