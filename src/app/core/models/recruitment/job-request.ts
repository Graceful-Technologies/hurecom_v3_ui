export interface JobRequest {
    organizationId: number;
    clientId: number;
    clientLocationId: number;
    clientSpocId: number;
    title: string;
    openPositions: number;
    jobDescription: string;
    minExperience: number;
    maxExperience: number;
    maxCtc: number;
    skills: string;
    employmentType: string;
    workMode: string;
    status: string;
}