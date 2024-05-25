export interface VisitorLog {
    id: string;
    timestamp: string;
    accessRequest: {
        UAT: {
            ID: string;
            RL: string;
            DP: string;
            TS: {
                ST: string;
                ET: string;
                DW: string[];
            };
            CL: string;
        };
        APA: {
            LC: string;
            IT: string;
            OL: number;
        };
        NC: string;
    },
    accessPolicy: {
        ID: string;
        UAS: UAS[];
        APA: {
            ALC: string;
            AOL: number;
        };
    };
    accessResponse: {
        decision: boolean;
    }
}

interface UAS {
    ADP: string;
    ARL: string[];
    ACL: string[];
    AES: string[];
}