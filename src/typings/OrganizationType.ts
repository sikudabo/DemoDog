export type OrganizationType = {
    _id: string;
    avatar: string;
    email: string;
    name: string;
    password: string;
    userType: string;
};

export type OrganizationFormType = {
    email: string;
    name: string;
    password: string;
};