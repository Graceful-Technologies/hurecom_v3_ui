import { BaseResponse } from "../common/base-response";

export interface JobResponse extends BaseResponse{
    id: number;
    organizationId: number;
    organizationName: string;
    clientId: number;
    clientName: string;
    clientLocationId: number;
    clientLocation: string;
    clientSpocId: number;
    clientSpocName: string;
    jobCode: string;
    title: string;
    openPositions: number;
    jobDescription: string;
    minExperience: number;
    maxExperience: number;
    maxCtc: number;
    skills: string;
    employmentType: string;
    employmentTypeValue: string;
    workMode: string;
    workModeValue: string;
    status: string;
    statusValue: string;
}