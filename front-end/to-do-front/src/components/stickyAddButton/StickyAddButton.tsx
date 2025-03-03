import React from 'react';
import { Button } from 'react-bootstrap';
import './StickyAddButton.css';
import { FiPlus } from 'react-icons/fi';

interface StickyAddButtonProps {
  onClick: () => void;
  set: () => void;
}

function StickyAddButton({ onClick, set }: StickyAddButtonProps) {
    function OnClick () {   
        set();
        onClick();
    }
  return (
    <Button className="sticky-add-button" onClick={OnClick}>
      +
    </Button>
  );
};

export default StickyAddButton;