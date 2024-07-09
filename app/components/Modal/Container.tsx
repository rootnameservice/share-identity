import React, { useState } from "react";
import { ModalState, useModalState } from "@/redux/modal/modalSlice";
import { CloseButton, CloseIcon } from "../Theme/StyledGlobal";
import { useSearchParams } from "next/navigation";
import { getModalFromPath } from "@/utils/common";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContainer,
  ContentContainer,
  Content,
} from "./StyledModal";

import ShareRegistration from "../Share/ShareRegistration";

export interface ContentProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  isHeaderEnabled?: boolean;
}

export const ModalContainer: React.FC = () => {
  const { useModal, closeModal } = useModalState();
  const { isModalOpen, props } = useModal();

  const router = useRouter();
  const params = useSearchParams();
  const state = params.get("state") || "";
  const modal: ModalState = getModalFromPath(state, props?.id);

  const [isPathModalOpen, setIsPathModalOpen] = useState(modal.isModalOpen);

  const isCloseDisabled = props?.isCloseDisabled || false;
  const type = props?.id || modal.props?.id || "";
  const isFullHeight = props?.fullHeight || modal.props?.fullHeight;
  const isFullWidth = props?.fullWidth || modal.props?.fullWidth;
  const isOpen = isModalOpen || isPathModalOpen;

  /**
   * Storing a non-serializeable (e.g, react components)
   * in redux is not recommended, So instead of passing the components
   * thru RTK Query, create a switch here to get the needed components.
   *
   * "reduxy way :("
   */
  const getContent = (type: string) => {
    switch (type) {
      case "Share RNS":
        return <ShareRegistration />;
      default:
        return;
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        disableEscapeKeyDown={isCloseDisabled}
        onClose={() => {
          if (isCloseDisabled) {
            // do not allow modal to be closed
          } else {
            closeModal();
            setIsPathModalOpen(false);
            router.push("/", { scroll: false });
          }
        }}
      >
        <DialogContainer>
          <ContentContainer>
            <Content
              props={{
                fullHeight: isFullHeight,
                fullWidth: isFullWidth,
              }}
            >
              <CloseButton
                onClick={() => {
                  closeModal();
                  setIsPathModalOpen(false);
                  router.replace("/", { scroll: false });
                }}
              >
                <CloseIcon />
              </CloseButton>
              {getContent(type)}
            </Content>
          </ContentContainer>
        </DialogContainer>
      </Dialog>
    </>
  );
};

export default ModalContainer;
