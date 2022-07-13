// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

import { IconUpload } from '@douyinfe/semi-icons';
import { Button, Toast, Upload } from '@douyinfe/semi-ui';
import axios from 'axios';
import moment from 'moment';
import type { FC } from 'react';
import React, { useState } from 'react';
import Cropper from 'react-cropper';

import { useStore } from '@/store';
import base64ToUrl from '@/utils/base64ToUrl';

import styles from './styles/AvatarStep.module.scss';

const defaultSrc =
  'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const AvatarStep: FC<Props> = ({ prevStep, nextStep }) => {
  const store = useStore();
  const [image, setImage] = useState<string>(defaultSrc);
  const [cropper, setCropper] = useState<any>();
  const [imageName, setImageName] = useState<string>(
    `default-${moment().unix()}.jpeg`
  );

  const handleUpload = (e: any) => {
    setImage(e.currentFile.url);
    setImageName(`${moment().unix()}.jpeg`);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      axios
        .put('http://localhost/api/github', {
          filename: imageName,
          content: cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.2),
        })
        .then((res) => {
          if (res.status === 200) {
            const url = res.data.data.content.download_url;

            store.user.setUserInfo({
              ...store.user.userInfo,
              picture: url,
            });

            base64ToUrl(url).then((result) => {
              console.log(result);
            });

            Toast.success('头像上传成功.');
          } else {
            Toast.warning('头像上传失败');
          }
        });
    }
  };

  return (
    <div className={styles.avatar_step_container}>
      <div className={styles.avatar_step_wrapper}>
        <div className={styles.avatar_step_cropper}>
          <Cropper
            zoomTo={1}
            zoomable={false}
            aspectRatio={1}
            initialAspectRatio={1}
            preview=".cropper-preview-box"
            src={image}
            background={true}
            responsive={true}
            autoCropArea={1}
            checkOrientation={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>
        <div className={styles.avatar_step_cropper_features}>
          <div className={styles.avatar_step_previewer_container}>
            <div className={styles.avatar_step_previewer}>
              <div
                className={`cropper-preview-box ${styles.cropper_preview_box}`}
              />
              <span className={styles.avatar_step_previewer_label}>
                Preview
              </span>
            </div>
          </div>
          <div className={styles.avatar_step_features_container}>
            <div className={styles.avatar_step_features_wrapper}>
              <Upload
                action=""
                limit={1}
                onChange={(e) => handleUpload(e)}
                showUploadList={false}
              >
                <Button
                  className={styles.cropper_btn}
                  icon={<IconUpload />}
                  theme="light"
                >
                  Select Avatar
                </Button>
              </Upload>

              <Button
                className={styles.cropper_btn}
                onClick={() => getCropData()}
              >
                Confirm Avatar
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.new_user_steps_controllers}>
          <Button className={styles.prevBtn} onClick={() => prevStep()}>
            Previous
          </Button>

          <Button
            className={styles.nextBtn}
            type="primary"
            onClick={() => nextStep()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarStep;
