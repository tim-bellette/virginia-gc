export class People {

    public positive: string[] = [];
    public ok: string[] = [];
    public negative: string[] = [];
    
    constructor(positive: string[], ok: string[], negative: string[]) {
        this.positive = positive;
        this.ok = ok;
        this.negative = negative;
    }
    
    public static LoadFromStorage(callback: (people: People) => void) {
        chrome.storage.sync.get({
            people: {
                positive: [],
                ok: [],
                negative: []
            }
        }, (items) => {
            var people = new People(items.people.positive, items.people.ok, items.people.negative);

            chrome.storage.onChanged.addListener((changes, area) => {
                if (area === 'sync' && changes.people) {
                    people.positive = changes.people.newValue.positive;
                    people.ok = changes.people.newValue.ok;
                    people.negative = changes.people.newValue.negative;

                    if (people.onStorageUpdated) {
                        people.onStorageUpdated(people);
                    }
                }
            })

            callback(people);
        });
    }

    public onStorageUpdated: ((people: People) => void) | undefined = undefined;

    public saveToStorage() {
        chrome.storage.sync.set({
            people: {
                positive: this.positive,
                ok: this.ok,
                negative: this.negative
            }
        }, () => {});
    }

    public getPlayingPreference(name: string): PlayingPreference | undefined {
        if (this.positive.includes(name)) {
            return PlayingPreference.Positive;
        } else if (this.ok.includes(name)) {
            return PlayingPreference.OK;
        } else if (this.negative.includes(name)) {
            return PlayingPreference.Negative;
        }

        return undefined;
    }

    public setPlayingPreference(name: string, preference: PlayingPreference | null) {
        switch (preference) {
            case PlayingPreference.Positive:
                this.positive.push(name);
                this.ok = this.ok.filter(x => x !== name);
                this.negative = this.negative.filter(x => x !== name);
                break;

            case PlayingPreference.OK:
                this.positive = this.positive.filter(x => x !== name);
                this.ok.push(name);
                this.negative = this.negative.filter(x => x !== name);
                break;

            case PlayingPreference.Negative:
                this.positive = this.positive.filter(x => x !== name);
                this.ok = this.ok.filter(x => x !== name);
                this.negative.push(name);
                break;

            default:
                this.positive = this.positive.filter(x => x !== name);
                this.ok = this.ok.filter(x => x !== name);
                this.negative = this.negative.filter(x => x !== name);
                break;
        }

        this.saveToStorage();
    }



}