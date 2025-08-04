import React, { useState } from 'react';
import StepperForm from './StepperForm';

const ApplyButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button className="btn btn-koopfon-secondary btn-lg px-4 py-2" onClick={handleOpen}>
        Hemen Başvur
      </button>
      <StepperForm open={open} handleClose={handleClose} />
    </>
  );
};

export default ApplyButton;
