import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { mainPathname } from "../../routes/_utils/constant";

function CrashErrorScreen({ onResolve, ...restProps }) {
  const navigate = useNavigate();

  const handleClickResolve = () => {
    navigate(mainPathname);
    onResolve();
  };

  return <>에러 페이지 임시 컴포넌트</>;
}

CrashErrorScreen.propTypes = {
  onResolve: PropTypes.func,
};

export default CrashErrorScreen;
