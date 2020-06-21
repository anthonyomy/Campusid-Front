//This file contains all selectors, they are used to get the content of the redux state
export const getCurrentUser = (state: Record<string, any>) => state?.user;
export const getProfileImage = (state: Record<string, any>) =>
    state?.user?.avatar?.image;
export const getErrorPage = (state: Record<string, any>) => state?.errorPage;
export const getIsAdmin = (state: Record<string, any>) => state?.isAdmin;
export const getIdCurrentClass = (state: Record<string, any>) =>
    state?.user.idCurrentClass;
export const getIdboard = (state: Record<string, any>) => state?.user?.idboard;
export const getClassId = (state: Record<string, any>) => state?.user?.classId;
