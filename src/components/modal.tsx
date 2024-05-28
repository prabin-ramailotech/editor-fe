import { Modal } from "antd";

type modalProps = {
  title?: string;
  cancelText?: string;
  okText?: string;
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
};
const CustomModal = ({
  title,
  cancelText,
  okText,
  open,
  onOk,
  onCancel,
  children,
}: modalProps) => {
  return (
    <>
      <Modal
        title={title}
        cancelText={cancelText}
        okText={okText}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
