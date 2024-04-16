/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import WebSocketService from "../../services/websockets/WebSocketService";
import Layout from "../../layouts";
import Loading from "../../components/Loading";

function Landing() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);

  const URL = "wss://stream.binance.com/ws";

  useEffect(() => {
    const wsService = WebSocketService.getInstance(
      URL,
      //   process.env.REACT_APP_WEBSOCKET_URL
    );

    const handleOpen = () => {
      const params = {
        method: "SUBSCRIBE",
        params: ["!ticker@arr"],
        id: 1,
      };
      wsService.sendParams(params);
    };

    const handleMessage = (message: string) => {
      try {
        const parsedData = JSON.parse(message);
        if (Array.isArray(parsedData)) {
          const newArray = parsedData
            .slice(0, 10)
            .map((data) => ({ name: data.s, c: data.c, p: data.p }));
          setData(newArray);
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
      setLoading(false);
    };

    const handleError = (error: ErrorEvent) => {
      setLoading(true);
      console.log("error :>> ", error);
    };

    wsService.onOpen(handleOpen);
    wsService.onMessage(handleMessage);
    wsService.onError(handleError);

    return () => {
      wsService.close();
    };
  }, []);
  return (
    <Layout>
      <div css={containerStyle}>
        {loading && <Loading />}
        {data.length > 0 && (
          <ul css={itemList}>
            {data.map((item: Record<string, string>) => (
              <li key={item.name} css={itemStyle}>
                <span>{item.name}</span>
                <span>{item.c}</span>
                <span>{item.p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default Landing;

const containerStyle = css`
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const itemStyle = css`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  list-style: none;
  padding: 1rem;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const itemList = css`
  width: 100%;
  margin: 1rem 2rem;
  height: 100vh;
`;
