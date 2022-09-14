import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

/** 패스워드 가리기/ 보기
 * @param {String} icon 아이콘 
 */

const EyeIcon = ({ icon }) => {
  return (
    <>
      <FontAwesomeIcon icon={icon} size="2x" />
    </>
  );
};

export default React.memo(EyeIcon);
