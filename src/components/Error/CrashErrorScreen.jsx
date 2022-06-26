import { mainPathname } from "@routes/_utils/constant";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CrashErrorScreen({ onResolve, ...restProps }) {
  const navigate = useNavigate();

  const handleClickResolve = () => {
    navigate(mainPathname);
    onResolve();
  };

  return <>Unexpected error occured</>;
}

CrashErrorScreen.propTypes = {
  onResolve: PropTypes.func,
};

export default CrashErrorScreen;
