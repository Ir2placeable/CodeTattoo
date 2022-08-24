import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EyeIcon = ({ icon }) => {
  return (
    <>
      <FontAwesomeIcon icon={icon} size="2x" />
    </>
  );
};

export default React.memo(EyeIcon);
