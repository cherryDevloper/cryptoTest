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
          setData(parsedData);
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
      setLoading(false);
    };

    const handleError = (error: ErrorEvent) => {
      setLoading(false);
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
          <ul>
            {data.slice(0, 10).map((item) => (
              <li key={item.s} css={listItemStyle}>
                <span>{item.s}</span>
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
  border-radius: 10px;
  min-width: 400px;
  height: 100vh;
  margin: 0 auto;
`;

const listItemStyle = css`
  list-style: none;
  padding: 1rem;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const itemStyle = css``;
