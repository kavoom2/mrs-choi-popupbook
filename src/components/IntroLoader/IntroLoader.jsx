import { useProgress } from "@react-three/drei";
import styled from "styled-components";
import LoaderScreen from "./LoaderScreen";

// TODO: Asset이 불러와 지기 전, 로딩 화면을 구성해야 합니다.
// 1. 전경 색상을 로딩 화면 색상과 동일하게 하여 빈 화면이 아니도록 판단하게 해야 합니다.
// 2. 로딩 상태 완료 이후 사용자가 Start를 조작하게 하여 Intro 진입 | 소리 출력을 유도합니다.
// 3. 로딩 페이지 UI 작업

function IntroLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  console.log(active, progress, errors, item, loaded, total);

  return (
    <LoaderScreen>
      <FallbackBackgrounds />

      <ProgressTextContainer>
        <span className="content">불러오는 중입니다... {progress}%</span>
      </ProgressTextContainer>
    </LoaderScreen>
  );
}

export default IntroLoader;

const FallbackBackgrounds = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: center center;
  transform: scale(1.2);

  background-color: #d6d2bc;
`;

const ProgressTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  word-break: keep-all;
  text-align: center;

  .content {
    font-size: 24px;
    color: teal;
  }
`;
