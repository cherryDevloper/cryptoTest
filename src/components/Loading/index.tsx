/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";

// Keyframe animation for the loading spinner
const spin = keyframes`
  100% { transform: rotate(1turn); }
`;

// Emotion CSS for the loading spinner
const loaderStyle = css`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${spin} 1s infinite linear;
`;

const Loading = () => {
  return <div css={loaderStyle}></div>;
};

export default Loading;
