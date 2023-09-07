import { Modal, Text } from "@shopify/polaris";
import { useCallback } from "react";

function AppModal({
  isShowModal,
  setIsShowModal,
  descrpition,
  action,
  ButtonText,
}) {
  const handleChange = useCallback(
    () => setIsShowModal(!isShowModal),
    [isShowModal, setIsShowModal]
  );

  return (
    <div>
      <Modal
        open={isShowModal}
        onClose={handleChange}
        title={descrpition}
        primaryAction={{
          content: ButtonText,
          onAction: action,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Text>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At odio
              aspernatur mollitia saepe placeat neque sed maxime fuga.
              Consequuntur minima similique officia veritatis corporis eveniet
              asperiores ad aperiam voluptatem tempore.
            </p>
          </Text>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default AppModal;
