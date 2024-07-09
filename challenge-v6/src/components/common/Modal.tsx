
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { memo } from 'react';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  padding: 0.4em 0.6em;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

const ModalFooter = styled.div`
  text-align: left;
  margin-top: 20px;
`

interface ModalType {
  show: boolean;
  title?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onClose: () => void;
}

/**
ModalContainer z-index: 1001
*/
const Modal: React.FC<ModalType> = ({ show, onClose, title, footer, children }) => {
  if (!show) {
    return null;
  }
  const modal = (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {footer}
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  )
  return createPortal(modal, document.body);
}

const MemoizedModal = memo(Modal)

export default MemoizedModal;
