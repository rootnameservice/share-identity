import React from "react";
import { useModalState } from "@/redux/modal/modalSlice";
import { CloseButton, CloseIcon, Title } from "../Theme/StyledGlobal";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContainer,
  ContentContainer,
  Content,
} from "./StyledModal";

import ShareRegistration from "../Share/ShareRegistration";
import Wallets from "../Wallet/Wallets";

export interface ContentProps {
  fullWidth?: boolean;
  fullHeight?: boolean;
  isHeaderEnabled?: boolean;
}

export const ModalContainer: React.FC = () => {
  const { useModal, closeModal } = useModalState();
  const { isModalOpen, props } = useModal();

  const router = useRouter();

  const isCloseDisabled = props?.isCloseDisabled || false;
  const type = props?.id || "";
  const isFullHeight = props?.fullHeight;
  const isFullWidth = props?.fullWidth;
  const isOpen = isModalOpen;
  const title = props?.title;

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
      case "Wallets":
        return <Wallets />;
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
              {!props?.isXDisabled && (
                <CloseButton
                  onClick={() => {
                    closeModal();
                    router.replace("/", { scroll: false });
                  }}
                >
                  <CloseIcon />
                </CloseButton>
              )}
              {!props?.isHeaderEnabled && title && <Title>{title}</Title>}
              {getContent(type)}
            </Content>
          </ContentContainer>
        </DialogContainer>
      </Dialog>
    </>
  );
};

export default ModalContainer;
