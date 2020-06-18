import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import { updateAvatar } from 'common/state/actions';
import SimpleDialog from 'common/components/SimpleDialog';

import { useCurrentUser } from 'common/hooks';

import AvatarEditorDialogActions from '../AvatarEditorDialogActions';
import getCroppedImg from './cropImage';

import styles from './style';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    uploadedImage: string | null;
    setFileDataHandler: (fileData: string) => void;
    deleteHandler: () => void;
};

type CroppedArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const CropperWrapper = ({
    uploadedImage,
    setFileDataHandler,
    deleteHandler,
    callback,
}: {
    uploadedImage: string;
    setFileDataHandler: (fileData: string) => void;
    deleteHandler: () => void;
    callback: (croppedAreaPx: CroppedArea, rotation: number) => void;
}) => {
    const classes = styles();
    const [rotation, setRotation] = useState(0);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const onCropChange = (selectedCrop: { x: number; y: number }) => {
        setCrop(selectedCrop);
    };

    const [zoom, setZoom] = useState<number | number[]>(1);
    const onZoomChange = (zoomValue: number | number[]) => {
        setZoom(zoomValue);
    };

    const onCropComplete = (
        _croppedArea: CroppedArea,
        croppedAreaPx: CroppedArea
    ) => {
        setRotation(rotation);

        callback(croppedAreaPx, rotation);
    };

    return (
        <>
            <Cropper
                style={{ containerStyle: { position: 'relative' } }}
                classes={{ containerClassName: classes.cropperContainer }}
                image={uploadedImage}
                crop={crop}
                zoom={Number(zoom)}
                aspect={1}
                rotation={rotation}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
                onRotationChange={setRotation}
                cropShape="round"
            />
            <AvatarEditorDialogActions
                editMode
                uploadedImage={uploadedImage}
                onZoomChange={onZoomChange}
                zoom={zoom}
                onRotationChange={() => setRotation(r => r + 90)}
                setFileDataHandler={setFileDataHandler}
                deleteHandler={deleteHandler}
            />
        </>
    );
};

const AvatarEditorDialog = ({
    isOpen,
    onClose,
    uploadedImage,
    setFileDataHandler,
    deleteHandler,
}: Props) => {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();

    const [cropperInfos, setCropperInfos] = useState<{
        croppedArea: CroppedArea;
        rotation: number;
    } | null>(null);

    const errorMessage =
        currentUser?.avatar?.avatarUploadError &&
        'Une erreur vient de se produire, veuillez réessayer plus tard';

    const onSubmit = async () => {
        if (cropperInfos) {
            const croppedImage = await getCroppedImg(
                uploadedImage?.toString() || '',
                cropperInfos?.croppedArea,
                cropperInfos?.rotation
            );
            try {
                dispatch(
                    updateAvatar(croppedImage, currentUser.idboard, onClose)
                );
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <SimpleDialog
            title="Image de profil"
            open={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            submitButtonText="Sauvegarder"
            isSubmitLoading={false}
            showActionBar
            showHorizontalRule
            error={errorMessage}
            fullSizeActions
        >
            <div>
                {uploadedImage && (
                    <CropperWrapper
                        uploadedImage={uploadedImage}
                        setFileDataHandler={setFileDataHandler}
                        deleteHandler={deleteHandler}
                        callback={(
                            croppedArea: CroppedArea,
                            rotation: number
                        ) => {
                            setCropperInfos({
                                croppedArea,
                                rotation,
                            });
                        }}
                    />
                )}
            </div>
        </SimpleDialog>
    );
};
export default AvatarEditorDialog;
