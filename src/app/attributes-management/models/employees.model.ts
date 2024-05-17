export interface Employee{
    ID: string;
    RL: string;
    DP: boolean;
    TS: {
        ST: string;
        ET: string;
        DW: string[];
    };
    CL: number;
    ES: number;
}