import { BaseResponse } from "../common/base-response";

export interface TeamResponse extends BaseResponse {
    id: number;
    code: string;
    name: string;
    organizationId: number;
    organizationName: string;
    active: boolean;
    membersCount: number;
}
