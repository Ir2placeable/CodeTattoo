import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { AlarmBox, AlarmCountBox} from "../../../styledComponents";

const AlarmIcon = () => {
  return (
    <>
      <AlarmBox>
        <FontAwesomeIcon icon={faBell} size="2x" />
        <AlarmCountBox>
        </AlarmCountBox>
      </AlarmBox>
    </>
  );
};

export default AlarmIcon;
