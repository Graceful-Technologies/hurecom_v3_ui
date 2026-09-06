import { BaseResponse } from "../../common/base-response";

export interface ClientResponse extends BaseResponse {
    id: number;
    name: string;
    active: boolean;
    locationCount: number;
    spocCount: number;
}
