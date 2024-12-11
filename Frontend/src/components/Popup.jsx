import React, { useState } from 'react';
import styled from 'styled-components';

const Popup = ({ message, type = 'error', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <StyledPopup type={type}>{message}</StyledPopup>;
};

const StyledPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${({ type }) => (type === 'error' ? '#f8d7da' : '#d4edda')};
  color: ${({ type }) => (type === 'error' ? '#721c24' : '#155724')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export default Popup;
