import { PageRequest } from "../common/page-request";

export interface UserSearchRequest extends PageRequest {
    organizationId: number;
    roleId: number;
    name: string;
    email: string;
    mobileNumber: string;
    active: boolean;
}
