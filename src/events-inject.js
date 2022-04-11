$(() => {

    var ENABLE_PREFERENCE = true;

    var attributes = {
        name: 'name',
        bookingType: 'bookingtype',
        gender: 'gender',
        preference: 'preference'
    };

    var bookingTypes = {
        member: 'member',
        visitor: 'visitor',
        other: 'other'
    };

    var genders = {
        male: 'male',
        female: 'female'
    };

    var preferences = {
        positive: 'positive',
        ok: 'ok',
        negative: 'negative'
    };

    $('.teetime-day-table .cell:has(.btn-book-me)').css('top', '-1px').css('border', '0');
    $('.btn-book-me').css('background-color', "#4AA96C");

    $('.booking-name').each(function() {
        var $this = $(this);
        var bookingColor = $(this).css('color');

        //$this.attr('data-name', $this.text().trim());
        setAttributes($this, {name: $this.text().trim()});

        if (bookingColor === 'rgb(0, 0, 0)') {
            if ($this.parents('.visitor-cell').length) {
                // Visitor
                setAttributes($this, { bookingType: bookingTypes.visitor });
            } else {
                // Male
                setAttributes($this, { bookingType: bookingTypes.member, gender: genders.male });
            }

        } else if (bookingColor === 'rgb(56, 142, 142)') {
            // Female
            setAttributes($this, { bookingType: bookingTypes.member, gender: genders.female });
        }
        else {
            // Other type of book
            setAttributes($this, { bookingType: bookingTypes.other });
        }
    });

    function setAttributes($element, values) {
        if (!$element.hasClass('booking-name')) {
            return; // invalid element
        }

        for (var attribute in attributes) {
            if (typeof (values[attribute]) !== 'undefined') {
                $element.attr(`data-${attribute}`, values[attribute]);
            }
        }

        refreshElement($element);
    }

    function getBooking($element) {
        var booking = {};

        for (var attribute in attributes) {
            booking[`${attribute}`] = $element.attr(`data-${attributes[attribute]}`);
        }

        return booking;
    }

    function refreshElement($element) {
        if (!$element.hasClass('booking-name')) {
            return; // invalid element
        }

        var $cell = $element.parents('.cell-taken');
        var booking = getBooking($element);
        var displayName = booking.name;

        if (booking.bookingType === 'member') {
            $element.css('color', '#000');

            if (booking.gender === 'male') {
                displayName += '🧔';
                $cell.css('background-color', '#A0E7E5');
            } else if (booking.gender === 'female') {
                displayName += '👩';
                $cell.css('background-color', '#FFAEBC')
            }
        } else if (booking.bookingType === 'visitor') {
            $element.css('color', '#000');
            $cell.css('background-color', '#FFCAAD');
        } else {
            $element.css('color', '#FFF');
            $cell.css('background-color', '#9D9D9D')
        }

        switch (booking.preference) {
            case preferences.positive: {
                displayName = `⭐ ${displayName}`;
                $cell.css('background-color', '#16C172');
                break;
            }

            case preferences.ok: {
                displayName = `🙂 ${displayName}`;
                $cell.css('background-color', '#C3E5AE');
                break;
            }

            case preferences.negative: {
                displayName = `⚠ ${displayName}`;
                $cell.css('background-color', '#F1534E');
                break;
            }
        }

        $element.text(displayName);
    }


    var PreferenceFeature = (() => {
        let _people = undefined;

        function loadStorage(callback) {
            chrome.storage.sync.get({
                people: {
                    positive: [],
                    ok: [],
                    negative: []
                }
            }, (items) => {
                callback(items.people);
            });
        }

        function syncStorage() {
            let people = getPreferencesFromDOM();

            chrome.storage.sync.set({
                people: people
            });
        }
 

        function initPreferences() {
            loadStorage((people) => {
                initPeople(people);
                initMenu();
            });
        }

        function initPeople(people) {
            for (var preference in preferences) {
                if (!people[preference]) 
                    continue;

                people[preference].forEach((person) => {
                    $(`.booking-name[data-name="${person}"]`).each(function () {
                        setAttributes($(this), { preference: preferences[preference] });
                    });
                });
            }
        }

        function initMenu() {
            $('.booking-name').each(function () {
                var cell = $(this).parents('.cell-taken');
                var name = $(this).attr('data-name');
                cell.contextMenu({
                    selector: '.booking-name',
                    items: {
                        'name': { name: name, disabled: true },
                        'positive': { name: `😁 Fun to play with` },
                        'ok': { name: `🙂 Okay to play with` },
                        'remove': { name: `😐 Neutral`, callback: function(key, options) {
                            setAttributes(options.$trigger, { preference: null});
                            syncStorage();
                        } },
                        'negative': { name: `😠 Not fun to play with` }
                    },
                    callback: function (key, options) {
                        setAttributes(options.$trigger, { preference: key });
                        syncStorage();
                    }
                });
            });
        }

        return {
            init: initPreferences
        };

    })();

    if (ENABLE_PREFERENCE) {
        PreferenceFeature.init();
    }

    

    if ($('.event-list').length) {
        // Event list page
        setTimeout(() => {
            $('a.eventStatusLocked').each(function() {
                $link = $(this).children('span');
                let opening = $link.attr('title');
                let text = $link.text();

                if (text === 'LOCKED') {
                    let $parent = $(this).parents('.eventStatusClass').first();
                    let $available = $parent.find('.event-available').children('span');

                    $available.text(opening);
                    $available.css('color', '#F00');
                    $link.css('color', '#F00');
                }
            });
        }, 1000);
    }
});
