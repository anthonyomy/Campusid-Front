import React from 'react';
import { useDispatch } from 'react-redux';

import SimpleDialog from 'common/components/SimpleDialog';
import Avatar from 'common/components/Avatar';

import { useCurrentUser } from 'common/hooks';

import { updateAvatar } from 'common/state/actions';

import AvatarEditorDialogActions from '../AvatarEditorDialogActions';

import styles from './style';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    uploadedImage: string | null;
    setUploadedImage: (uploadedImage: string | null) => void;
    setFileDataHandler: (fileData: string) => void;
    deleteHandler: () => void;
};

const AvatarPreviewDialog = ({
    isOpen,
    onClose,
    uploadedImage,
    setFileDataHandler,
    deleteHandler,
}: Props) => {
    const dispatch = useDispatch();
    const classes = styles();
    const currentUser = useCurrentUser();

    const errorMessage =
        currentUser?.avatar?.avatarUploadError &&
        'Une erreur vient de se produire, veuillez réessayer plus tard';

    const onSubmit = async () => {
        try {
            dispatch(updateAvatar(null, currentUser.idboard, onClose));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SimpleDialog
            title="Image de profil"
            open={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            submitButtonDisabled={!!uploadedImage}
            submitButtonText="Sauvegarder"
            isSubmitLoading={currentUser?.avatar?.avatarUploading}
            showActionBar
            showHorizontalRule
            error={errorMessage}
            fullSizeActions
        >
            <div>
                <div className={classes.avatarPreviewContainer}>
                    <Avatar
                        src={uploadedImage || ''}
                        nickname={currentUser.firstname}
                        mode="large"
                    />
                </div>
                <AvatarEditorDialogActions
                    uploadedImage={uploadedImage}
                    setFileDataHandler={setFileDataHandler}
                    deleteHandler={deleteHandler}
                />
            </div>
        </SimpleDialog>
    );
};
export default AvatarPreviewDialog;
