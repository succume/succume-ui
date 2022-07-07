// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { IconClose } from '@douyinfe/semi-icons';
import { Button, Modal, TabPane, Tabs } from '@douyinfe/semi-ui';
import { useState } from 'react';
import Cropper from 'react-cropper';

const defaultSrc =
  'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg';

function AvatarCropper() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState<any>();

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          aspectRatio={1}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>
      <div>
        <div
          style={{
            display: 'inline-block',
            padding: '10px',
            boxSizing: 'border-box',
            width: '100px',
            height: '100px',
          }}
        >
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: '100px', height: '100px', overflow: 'hidden' }}
          />
        </div>

        {/* <div */}
        {/*  className="box" */}
        {/*  style={{ width: '50%', float: 'right', height: '300px' }} */}
        {/* > */}
        {/*  <h1> */}
        {/*    <span>Crop</span> */}
        {/*    <button style={{ float: 'right' }} onClick={getCropData}> */}
        {/*      Crop Image */}
        {/*    </button> */}
        {/*  </h1> */}
        {/*  <img style={{ width: '100%' }} src={cropData} alt="cropped" /> */}
        {/* </div> */}
      </div>
      <br style={{ clear: 'both' }} />
    </div>
  );
}

export default function UserAvatarModal(props: any) {
  const { avatarDialogVisible, setAvatarDialogVisible } = props;

  const handleCancel = () => {
    setAvatarDialogVisible(false);
  };

  return (
    <Modal
      style={{
        top: '10%',
      }}
      header={null}
      visible={avatarDialogVisible}
      onOk={() => {}}
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Tabs
        defaultActiveKey="0"
        activeKey={'0'}
        onChange={() => {}}
        tabBarExtraContent={
          <Button onClick={() => handleCancel()}>
            <IconClose />
          </Button>
        }
      >
        <TabPane tab={'Avatar'} itemKey={'0'}>
          <AvatarCropper />
        </TabPane>
        <TabPane tab={'Frame'} itemKey={'1'}></TabPane>
      </Tabs>
    </Modal>
  );
}
