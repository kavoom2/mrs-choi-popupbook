<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=1bM9sHVYVzX6KWOBwRmJBGjyOX3EKie4y" width="25%"/>
</div>
<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=1f7EhAt7rEcyhndnrOF3XDGM6xpxUmYH_" />
</div>

# :wave: Hey, Ms.Choi!

[create-react-app](https://create-react-app.dev/) 기반 [react-three-fiber](https://github.com/pmndrs/react-three-fiber)와 [@react-three/drei](https://github.com/pmndrs/drei)로 구현한 **WebGL 팝업북**입니다.<br/>
200일 선물이 되어버린 100일 선물 :sweat_smile:

- **[팝업북 보러 보기](https://hey-ms-choi.com)**

## 프로젝트 개요

기존 업무에서 접했던 것들을 개선하여 반영하고,
한 편으로는 해보지 못했던 것들은 이 프로젝트로 접해보는 시간을 가졌습니다.

- 반응형 디자인을 고려한 레이아웃 디자인과 WebGL 서비스 설계
- React Context와 XState(단일 상태 머신)으로 구현한 서비스 App의 상태 관리
- 3D 리소스 AtoZ 구현(블렌더, 포토샵으로 제작한 리소스)
- WebGL 성능 최적화
  - gltf 모델 최적화
  - 벡터 연산 시 싱글톤 인스턴스를 사용하여 성능 향상
- 페이지 초기 로딩 중 사용성 개선(로딩 화면에 필요한 특정 리소스를 Preload하도록 설정)
- AWS(S3 + Cloudfront + Route53)로 정적 웹사이트 배포
- GitHub Actions를 이용한 배포 자동화
  - 빌드 시 package.json을 해싱 값에 따라 이전에 캐싱한 패키지들을 사용할 수 있도록 구성
  - AWS Cloudfront 캐시 초기화 작업 연동
- 검색 엔진 최적화

## 기술 스택

- React
- React Three Fiber
- React Three Drei
- XState
- React Use & Rooks(Custom Hooks)
- React App Rewired & Customize Cra(Webpack)
- React Snap & React Helmet Async(SEO)
- React Router
- Styled Components
- GitHub Actions(CD)

## 시작하기

### 로컬 개발환경에서 실행하기

1. 이 레포지토리를 클론해 주세요.

   ```bash
   $ git clone https://github.com/kavoom2/ms-choi-popupbook.git
   ```

2. NodeJS v16.0.0 이상을 설치하고, 의존성 패키지들을 설치합니다.

   ```bash
   $ nvm use v16.13.12
   $ npm install
   ```

3. 개발 서버를 실행해 주세요.

   ```bash
   $ npm run start

   // 아래 명령어로 입력하면 WebGL를 디버깅 모드로 실행합니다.
   $ npm run start:webglDebug
   ```
