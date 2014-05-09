$(document).ready(function () {
    $('#month').html('<option>Month</option>' + makeMonths().join(''));
    $('#day').html('<option>Day</option>' + makeOptions(1, 31).join(''));
    $('#year').html('<option>Year</option>' + makeOptions(2000, 2014).join(''));
    $('#grade').html('<option>Grade</option>' + makeGrades(1, 6).join(''));
})

// function makeOptions (start, end, type) {
//     var options;
//     for (start < end; start++) {
//         options += '<option>'+new Date()+'</option>';
//     }
// }

function makeOptions (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+'</option>'; })
}

function makeMonths () {
    return _.map(_.range(0, 12), function (n) { return '<option>'+['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n]+'</option>'})
}

function makeGrades (start, end) {
    return _.map(_.range(start, end + 1), function (n) { return '<option>'+n+(['st', 'nd', 'rd'][n - 1] || 'th')+'</option>'})
}