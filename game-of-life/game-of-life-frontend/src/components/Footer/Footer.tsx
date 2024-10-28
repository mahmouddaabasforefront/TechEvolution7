// src/components/Footer/Footer.tsx
import React from 'react';

interface FooterProps {
  onStart: () => void;
  running: boolean;
  onRandomize: () => void;
  onClear: () => void;
}

const Footer: React.FC<FooterProps> = ({ onStart, running, onRandomize, onClear }) => {
  return (
    <div>
      <button onClick={onStart}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={onRandomize}>Randomize</button>
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default Footer;
