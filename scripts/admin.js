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
    logout();
    checkUser(fetchApplicants);
})

function checkUser (fun) {
    if (Parse.User.current()) return fun();
    $('.unauthorized').css('display', 'block');
}

function fetchApplicants () {
    var query = new Parse.Query('Applicant');
    query.find().then(function (applicants) {
        $('.admin-table').css('display', 'table');
        $('.logout-nav').css('display', 'block');
        makeRows(applicants);
    })
}

function makeRows (applicants) {
    _.each(applicants, function (applicant, i) { new Row({model: applicant, number: i+1}) })
}

function logout () {
    $('.logout').click(function () {
        Parse.User.logOut();
        window.location = '../';
    })
}



