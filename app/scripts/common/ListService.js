(function() {
'use strict';
gecko.service('ListService', function() {

    var allStatesPlusDC = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    var cardMonths = [
        '01 - January',
        '02 - February',
        '03 - March',
        '04 - April',
        '05 - May',
        '06 - June',
        '07 - July',
        '08 - August',
        '09 - September',
        '10 - October',
        '11 - November',
        '12 - December'
    ];

    // Any countries that Stripe accepts
    var cardCountries = [
        'USA'
    ];

    //Years available for card expiration will be the current year plus 9 years
    var currentYear = new Date().toJSON().slice(0, 4);
    var cardYears = [];
    for (var i = 0; i < 10; i++) {
        cardYears.push(Number(currentYear) + i);
    }

    return {
        allStatesPlusDC: allStatesPlusDC,
        cardMonths: cardMonths,
        cardCountries: cardCountries,
        cardYears: cardYears
    };
});
})();
