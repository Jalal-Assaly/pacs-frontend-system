export interface Visitor{
    ID: string;
    RL: string;
    DP: boolean;
    TS: {
        ST: string;
        ET: string;
        DW: string[];
    };
    CL: number;
}