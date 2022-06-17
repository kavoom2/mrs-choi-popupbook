/**
 * * Popup book의 페이지 상태를 정의합니다.
 *
 * @RESET 초기화 후, 다시 펼쳐질 수 있도록 준비하는 상태입니다.
 *
 * @PREOPEN 막이 사용자에게 보여질 때, 펼쳐지기 이전 상태를 나타냅니다. 현재 페이지 < 해당 페이지 이전입니다.
 *
 * @OPEN 해당 페이지가 펼쳐져 내부 팝업 오브젝트들이 보이는 상태를 나타냅니다. 현재 페이지 === 해당 페이지입니다.
 *
 * @CLOSE 현재 페이지가 해당 페이지를 지나서 닫힌 상태를 나타냅니다. 현재 페이지 > 해당 페이지입니다.
 */

export const RESET = "POPUP_STATUS_RESET";

export const PREOPEN = "POPUP_STATUS_PREOPEN";

export const OPEN = "POPUP_STATUS_OPEN";

export const CLOSE = "POPUP_STATUS_CLOSE";
