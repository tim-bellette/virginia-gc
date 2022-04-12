export class Booking {
    public name: string = '';

    public type: BookingTypes | undefined = undefined;
    public teeType: BookingTeeTypes | undefined = undefined;
    public preference: PlayingPreference | undefined = undefined;


    public get displayName(): string {
        let displayName = this.name || '';

        switch (this.teeType) {
            case BookingTeeTypes.Males:
                displayName += ` 🧔`;
                break;

            case BookingTeeTypes.Females:
                displayName += ` 👩`;
                break;
        }

        switch (this.preference) {
            case PlayingPreference.Positive:
                displayName = `⭐ ${displayName}`;
                break;

            case PlayingPreference.OK:
                displayName = `👌 ${displayName}`;
                break;

            case PlayingPreference.Negative:
                displayName = `😠 ${displayName}`;
                break;
        }

        return displayName;
    }
}