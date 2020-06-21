import { useSelector } from 'react-redux';
import { getCurrentUser } from 'common/state/selectors';

type User = {
    idboard: number;
    lastname: string;
    firstname: string;
    role: string;
    avatar: {
        image: string | null;
        avatarUploadError: string | undefined;
        avatarUploading: boolean;
    };
};

export const useCurrentUser: () => User = () => useSelector(getCurrentUser);
