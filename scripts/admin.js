// initialize me some parse
Parse.initialize("9m9WLThdwXddNxxOHpYCyM67vIfHeVV5slrWjSM9", "noniAGaV8VRq8riDKfGI732nEBIVPgq8qK8SkaNg");

$(document).ready(function () {
    fetchApplicants();
})

function fetchApplicants () {
    var query = new Parse.Query('Applicant');
    query.find().then(function (applicants) {
        console.log(applicants)
        var ths = _.map(applicants, function (applicant) { return _.map(applicant.attributes, function (attribute) { return '<td>'+attribute+'</td>'}) })
        
        $('tbody').html('<tr>'+ths+'</tr>')
    })
}

