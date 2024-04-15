export interface WebSocketMessage {
  type: string;
  payload: unknown;
}

export interface WebSocketEvent {
  type: string;
  data: unknown;
}
