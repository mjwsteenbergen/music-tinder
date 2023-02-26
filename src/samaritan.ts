export type Song = {
    id: string;
    name: string;
    image: string;
    artist: string;
}

export type FeedbackOp = "positive" | "negative";

export type Feedback = {
    id: string;
    feedback: FeedbackOp;
}

type Server = {
    getSongs(): Promise<Song[]>;
    sendFeedback(feedback: Feedback[]): Promise<Song[]>;
    turnIntoPlaylist(): Promise<boolean>;
}


const baseUrl = "https://api.nntn.nl/music-tinder/"

export class Samaritan {
    getSongs(): Promise<Song> {
        return fetch(baseUrl + "songs", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
        }).then(i => i.json());
    }
    
    sendFeedback(feedback: Feedback): Promise<Song> {
        return fetch(baseUrl + "feedback", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        }).then(i => i.json());
    }

    submit() {
        return fetch(baseUrl + "save", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            }
        })
    }
}