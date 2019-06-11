export const conditionIsUser = (authUser: any) => {return !!authUser};
export const conditionIsAdmin = (authUser: any) => {return authUser && !!authUser.roles[ADMIN]};

export const USER = 'USER';
export const ADMIN = 'ADMIN';