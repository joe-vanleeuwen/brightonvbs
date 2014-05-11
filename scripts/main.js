$(document).ready(function () {
    $('#month').html('<option>Month</option>' + makeMonths().join(''));
    $('#day').html('<option>Day</option>' + makeOptions(1, 31).join(''));
    $('#year').html('<option>Year</option>' + makeOptions(2000, 2014).join(''));
    $('#grade').html('<option>Grade</option>' + makeGrades(1, 6).join(''));

    phoneNumber('.parent .phone-number')
    phoneNumber('.emergency .phone-number')

    makeWaves(14)
})

function makeOptions (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+'</option>'; })
}

function makeMonths () {
    return _.map(_.range(0, 12), function (n) { return '<option>'+['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n]+'</option>'})
}

function makeGrades (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+(['st', 'nd', 'rd'][n - 1] || 'th')+'</option>'})
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

