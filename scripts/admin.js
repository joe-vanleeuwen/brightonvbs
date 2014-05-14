// initialize me some parse
Parse.initialize("9m9WLThdwXddNxxOHpYCyM67vIfHeVV5slrWjSM9", "noniAGaV8VRq8riDKfGI732nEBIVPgq8qK8SkaNg");

var ths = [
    ['childFirstName'],
    ['childLastName'],
    ['childGrade'],
    ['childBirthday', 'tar'],
    ['parentName'],
    ['parentPhone',  'tar'],
    ['parentEmail'],
    ['addressStreet'],
    ['addressCity'],
    ['addressState'],
    ['addressZipcode'],
    ['emergencyName'],
    ['emergencyPhone', 'tar'],
    ['emergencyRelationship']
]

var Row = Parse.View.extend({

    tagName: 'tr',

    events: {
        'click .allergy': 'showAllergy',
        'click .special': 'showSpecial'
    },

    initialize: function (options) {
        console.log('hey')
        this.number = options.number
         $('tbody').append(this.$el);
         this.render();
    },

    render: function () {
        var that = this;
        this.$el.html('<td>'+(this.number)+'.</td>' + _.map(ths, function (th) { return '<td class="'+ (th[1] || '')+'">'+that.model.get(th[0])+'</td>' }).join(''));
        this.$el.append('<td class="'+(this.model.get('infoAllergy') ? 'allergy' : '')+'">'+(this.model.get('infoAllergy') ? 'view allergy info' : 'no allergies')+'</td>')
        this.$el.append('<td class="'+(this.model.get('infoSpecial') ? 'special' : '')+'">'+(this.model.get('infoSpecial') ? 'view special instructions' : 'no special instructions')+'</td>')
    },

    showAllergy: function () {
        this.modal();
        $('#type').text('allergies');
        $('#info-text').text(this.model.get('infoAllergy'))
    },

    showSpecial: function () {
        this.modal();
        $('#type').text('special instructions');
        $('#info-text').text(this.model.get('infoSpecial'))
    },

    modal: function () {
        $('#info').css({
            opacity: 1,
            'z-index': 100
        });
        $('#child-name').text(this.model.get('childFirstName')+' '+this.model.get('childLastName'));
    }


})

$(document).ready(function () {
    fetchApplicants();
})

function fetchApplicants () {
    var query = new Parse.Query('Applicant');
    query.find().then(function (applicants) {
        // $('tbody').html(makeRows(ths, applicants))
        makeRows(applicants)
        console.log(applicants[3])
        console.log(applicants[3].get('infoAllergy'))
        console.log(applicants[3].get('infoAllergy') == true)
    })
}

// function makeRows (ths, applicants) {
//     return _.map(applicants, function (applicant, i) { return '<tr><td>'+(i+1)+'.</td>' + _.map(ths, function (th) { return '<td class="'+ (th[1] || '')+'">'+applicant.get(th[0])+'</td>' }).join('') + '</tr>' }).join('');
// }

function makeRows (applicants) {
    _.each(applicants, function (applicant, i) { console.log(applicant); new Row({model: applicant, number: i+1}) })
}



