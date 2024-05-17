import { UserAttributes } from "./user-attributes.mode";

export interface AccessPolicy{
    ID: string;
    APA: {
        ALC: string;
        AOL: number;
    };
    UAS: UserAttributes[];
}