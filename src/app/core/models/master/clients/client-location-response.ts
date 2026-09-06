import { BaseResponse } from "../../common/base-response";

export interface ClientLocationResponse extends BaseResponse {
    id: number;
    clientId: number;
    clientName: string;
    countryId: number;
    countryName: string;
    stateId: number;
    stateName: number;
    cityId: number;
    cityName: number;
    branchName: number;
    displayName: string;
    active: boolean;
}
