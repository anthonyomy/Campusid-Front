import { uploadAvatar, fetchUser } from 'api';

export const FETCH_CURRENT_USER = 'fetchCurrentUser';
export const FETCH_CURRENT_USER_SUCCESS = 'fetchCurrentUserSuccess';
export const FETCH_CURRENT_USER_ERROR = 'fetchCurrentUserError';

export const SET_ERROR_PAGE = 'setErrorPage';

export const UPDATE_AVATAR = 'updateAvatar';
export const UPDATE_AVATAR_SUCCESS = 'updateAvatarSuccess';
export const UPDATE_AVATAR_ERROR = 'updateAvatarError';

export const USER_LOGIN_IN = 'userLoginIn';
export const USER_LOGIN_SUCCESS = 'userLoginSuccess';
export const USER_LOGIN_ERROR = 'userLoginError';

export const SET_CLASS = 'setClass';
export const SET_COURSES = 'setCourses';
export const SET_IS_ADMIN = 'setAdmin';

export const USER_LOGOUT = 'userLogout';

export const fetchCurrentUser = (email: string) => (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_CURRENT_USER,
            payload: { fetchingUser: true },
        });
        fetchUser(email).then(
            (res: {
                data: {
                    avatar: string;
                    classId: number;
                    email: string;
                    firstname: string;
                    id: number;
                    lastname: string;
                    password: string;
                    role: string;
                };
            }) => {
                dispatch({
                    type: FETCH_CURRENT_USER_SUCCESS,
                    payload: {
                        user: res.data,
                        fetchingUser: false,
                    },
                });
            }
        );
    } catch (err) {
        console.log(err);

        dispatch({
            type: FETCH_CURRENT_USER_ERROR,
            payload: { fetchingUserError: true },
        });
    }
};

export function userLogin(data: {}) {
    return { type: USER_LOGIN_IN, payload: data };
}
export function userLoginSuccess() {
    return { type: USER_LOGIN_SUCCESS };
}
export function userLoginError() {
    return { type: USER_LOGIN_ERROR };
}
export function userLogout() {
    return { type: USER_LOGOUT };
}

export function setErrorPage(data: boolean) {
    return { type: SET_ERROR_PAGE, payload: data };
}

export function setAdmin(data: boolean) {
    return { type: SET_IS_ADMIN, payload: data };
}

export function setCourses(data: Record<string, any>) {
    return { type: SET_COURSES, payload: data };
}

export const updateAvatar = (
    data: string | null,
    userId: any | null,
    onClose: (() => void) | null = null
) => (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_AVATAR,
            payload: {
                avatarUploading: true,
                avatarUploadError: false,
            },
        });
        uploadAvatar(data, userId).then((res: string) => {
            dispatch({
                type: UPDATE_AVATAR_SUCCESS,
                payload: {
                    image: data,
                    avatarUploading: false,
                },
            });
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: UPDATE_AVATAR_ERROR,
            payload: {
                avatarUploading: false,
                avatarUploadError: true,
            },
        });
    }
    if (!!onClose) onClose();
};
