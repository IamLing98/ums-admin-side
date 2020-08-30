export const ROLE_SUPERADMIN = 'PDT';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SUBADMIN = 'ROLE_SUBADMIN';
export const ROLE_CLIENT = 'ROLE_CLIENT';
export const ROLE_SURVEYOR = 'ROLE_SURVEYOR';

export const ROLE_SUPERADMIN_BADGE = 'PDT';
export const ROLE_ADMIN_BADGE = 'badge-primary';
export const ROLE_SUBADMIN_BADGE = 'badge-info';
export const ROLE_CLIENT_BADGE = 'badge-warning';
export const ROLE_SURVEYOR_BADGE = 'badge-dark';
export const parseApiErrors = (error)=>{
    return error.response.body.violations.reduce(
        (parsedErrors,violation)=>{
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};