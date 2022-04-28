import $ from 'jquery';
import { parse, formatDistance } from 'date-fns';
import { Booking } from './Booking';
import { People } from './People';

export class BookingHelper {

    private people: People | null = null;

    public static init(): void {
        var helper = new BookingHelper();

        helper.prettyListings();

        People.LoadFromStorage((people) => {
            helper.people = people;
            helper.identifyBookings();
            people.onStorageUpdated = (newPeople: People) => {
                helper.people = newPeople;
                helper.refreshPeople();
            }
        });
    }

    

    public identifyBookings() {
        $('.booking-name').each((_i, el) => {
            let $booking = $(el);

            // Set booking name
            $booking.attr('data-booking-name', $booking.text().trim());

            // Determine booking type and gender
            let bookingColour = $booking.css('color');
            if (bookingColour === 'rgb(0, 0, 0)') {
                if ($booking.parents('.visitor-cell').length) {
                    // Visitor booking
                    $booking.attr('data-booking-type', BookingTypes.Visitor);
                } else {
                    // Member (Male)
                    $booking.attr('data-booking-type', BookingTypes.Member);
                    $booking.attr('data-booking-gender', BookingTeeTypes.Males);
                }
            } else if (bookingColour === 'rgb(56, 142, 142)') {
                // Member (Female)
                $booking.attr('data-booking-type', BookingTypes.Member);
                $booking.attr('data-booking-gender', BookingTeeTypes.Females);
            } else {
                // Other
                $booking.attr('data-booking-type', BookingTypes.Other);
            }

            this.styleCell($booking);
            this.addContextMenu($booking);
        });
    }

    // Improve the event list page
    public prettyListings() {
        if ($('.event-list').length) {
            setTimeout(() => {
                $('a.eventStatusLocked').each((_i, el) => {
                    let $link = $(el);
                    let $linkText = $link.children('span');
                    let opening = $linkText.attr('title') || '';

                    if ($linkText.text() === 'LOCKED') {
                        let $parent = $link.parents('.eventStatusClass').first();
                        let $available = $parent.find('.event-available').children('span');


                        let found = opening.match(/Opening at: (.*)/);
                        if (found) {
                            let timeValue = found[1];
                            let date = parse(timeValue, 'dd-MM-yyyy HH:mm', new Date());
                            let distance = formatDistance(date, new Date(), { addSuffix: true});
                            
                            $available.text(`Available ${distance}`);
                        } else {
                            $available.text(opening);
                        }
                        
                        $available.css('color', '#F00');
                        $linkText.css('color', '#F00');
                    }
                });
            }, 500);
        }
    }


    private addContextMenu($booking: JQuery) {
        let booking = this.getBooking($booking);
        let $cell = $booking.parents('.cell-taken');

        $cell.contextMenu({
            selector: '.booking-name',
            items: {
                'name': { name: booking.name, disabled: true },
                'positive': { name: '😁 Fun to play with' },
                'ok': { name: '🙂 Okay to play with'},
                'remove': { name: '😐 Neutral' },
                'negative': { name: '😡 Not fun to play with' }
            },
            callback: (key: string, options: { $trigger: JQuery }) => {
                let newBooking = this.getBooking(options.$trigger);                
                this.people?.setPlayingPreference(newBooking.name, <PlayingPreference>key);

                this.styleCell(options.$trigger);
            }
        });
    }

    private getBooking($booking: JQuery) {
        let booking = new Booking();

        booking.name = $booking.attr('data-booking-name') || '';
        booking.type = <BookingTypes>$booking.attr('data-booking-type');
        booking.teeType = <BookingTeeTypes>$booking.attr('data-booking-gender');
        booking.preference = this.people?.getPlayingPreference(booking.name);

        return booking;
    }
   
    private refreshPeople() {
        $('.booking-name').each((_i, el) => {
            let $booking = $(el);
            this.styleCell($booking);
        });
    }

    private styleCell($booking: JQuery) {
        let booking = this.getBooking($booking);
        let $cell = $booking.parents('.cell-taken');

        $booking.text(booking.displayName);
        $booking.css('color', this.getFontColor(booking));
        $cell.css('background-color', this.getBackgroundColor(booking));
    }


    public getFontColor(booking: Booking): string {
        switch (booking.type) {
            case BookingTypes.Member:
                return '#000';

            case BookingTypes.Other:
                return '#FFF';

            default:
                return '#000';
        }
    }

    public getBackgroundColor(booking: Booking): string {

        if (booking.preference != undefined) {
            switch (booking.preference) {
                case PlayingPreference.Positive:
                    return '#16C172';

                case PlayingPreference.OK:
                    return '#C3E5AE';

                case PlayingPreference.Negative:
                    return '#F1534E';
            }
        }


        if (booking.type === BookingTypes.Member) {
            if (booking.teeType === BookingTeeTypes.Males) {
                return '#A0E7E5';
            } else if (booking.teeType === BookingTeeTypes.Females) {
                return '#FFAEBC'
            }
        } else if (booking.type === BookingTypes.Visitor) {
            return '#FFCAAD';
        }

        return '#9D9D9D';
    }
    
}