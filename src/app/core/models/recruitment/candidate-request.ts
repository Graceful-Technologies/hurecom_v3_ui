export interface CandidateRequest {
    name: string;
    email: string;
    mobileNumber: string;
    alternateMobileNumber?: string;
    gender?: string;
    dateOfBirth?: string;

    currentCompany?: string;
    currentDesignation?: string;
    totalExperience?: number;
    relevantExperience?: number;

    skills: string;
    qualification?: string;

    currentCtc?: number;
    expectedCtc: number;

    noticePeriod?: string;
    lastWorkingDay?: string;

    currentLocation?: string;
    preferredLocation?: string;
    workModePreference?: string;

    source: string;
    remarks?: string;

    resume?: File;
}