$(() => {
    $('.teetime-day-table .cell:has(.btn-book-me)').css('top', '-1px').css('border', '0');
    $('.btn-book-me').css('background-color', "#4AA96C");

    $('.booking-name').each(function() {
        var bookingColor = $(this).css('color');

        if (bookingColor === 'rgb(0, 0, 0)') {
            if ($(this).parents('.visitor-cell').length) {
                $(this).parents('.cell-taken').css('background-color', '#FFCAAD');
            } else {
                // Male
                $(this).parents('.cell-taken').css('background-color', '#A0E7E5');
            }

        } else if (bookingColor === 'rgb(56, 142, 142)') {
            // Female
            $(this).css('color', '#000000');
            $(this).parents('.cell-taken').css('background-color', '#FFAEBC');
        }
        else {
            // Other
            $(this).css('color', '#FFF');
            $(this).parents('.cell-taken').css('background-color', '#9D9D9D');
        }
    });

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

                    // try {
                    // let openingDateStr = opening.substr(12, 16);
                    // let openingDay = openingDateStr.substr(0,2);
                    // let openingMonth = openingDateStr.substr(3,2);
                    // let openingYear = openingDateStr.substr(6, 4);
                    // let openingHour = openingDateStr.substr(11, 2);
                    // let openingMinute = openingDateStr.substr(14, 2);

                    // let openingDate = new Date(openingYear, openingMonth, openingDay, openingHour, openingMinute);

                    // let distance = dateFns.formatDistance(new Date(), openingDate);

                    // console.log(distance);
                    // }
                    // catch (e) {
                    //     console.log(e);
                    // }

                    //15-02-2022 17:00

//                    console.log(dateFns.format());
                }
            });
        }, 1000);
    }
});
