import React, { useEffect, useState } from "react";

function ChunkErrorScreen() {
  const [networkStatus, setNetworkStatus] = useState(null);

  const handleClickRefresh = () => window.location.reload();

  useEffect(() => {
    setNetworkStatus(navigator?.onLine ?? false);
  }, []);

  if (networkStatus === null) return null;

  if (networkStatus === false)
    return <>네트워크 오류 발생. 서버와의 연결이 불안정합니다.</>;

  return <>서비스가 업데이트 되었습니다. 새로고침 후 다시 시도해 주세요.</>;
}

export default ChunkErrorScreen;
