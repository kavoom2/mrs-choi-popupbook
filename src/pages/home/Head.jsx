import thumbnail from "@assets/logo/thumbnail.png";
import { Helmet } from "react-helmet-async";

function Head() {
  return (
    <Helmet>
      <title>Hey Ms.Choi!</title>
      <meta property="og:url" content="https://hey-ms-choi.com/" />
      <meta property="og:title" content="Hey Ms Choi!" />
      <meta name="description" content="우리의 예쁜 추억을 보여 드릴게요!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={thumbnail} />
      <meta name="theme-color" content="#e8cd76" />
      <meta
        property="og:description"
        content="우리의 예쁜 추억을 보여 드릴게요!"
      />
    </Helmet>
  );
}

export default Head;
