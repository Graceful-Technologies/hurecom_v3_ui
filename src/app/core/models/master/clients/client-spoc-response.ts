import { BaseResponse } from "../../common/base-response";

export interface ClientSpocResponse extends BaseResponse {
    id: number;
    clientId: number;
    clientName: string;
    name: string;
    email: string;
    mobileNumber: string;
    landlineNumber: string;
    active: boolean;
}
