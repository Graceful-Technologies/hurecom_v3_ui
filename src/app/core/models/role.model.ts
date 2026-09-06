export interface Role {
    id: number;
    name: string;
    key: string;
    description: string;
    icon: string;
    color: string;
    permissions: string[];
    userCount: number;
    createdOn: string;
    active: boolean;
    isSystem: boolean;
}
