export interface Visitor {
    ID: string;
    SSN: string;
    FN: string;
    LN: string;
    EM: string;
    DP: string;
    TS: TS;
    CL: string;
}

interface TS {
    ST: string;
    ET: string;
    DW: string[];
}