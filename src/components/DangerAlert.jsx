import React from "react";
import { Alert } from "@heroui/react";

export default function DangerAlert({ title, description, onClose }) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex flex-col gap-4 mb-3">
      {isVisible && (
        <Alert
          color="danger"
          description={description}
          title={title}
          variant="faded"
          isClosable
          onClose={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
        />
      )}
    </div>
  );
}
