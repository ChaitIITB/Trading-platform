// WebSocket types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Date;
}

export interface WebSocketClient {
  id: string;
  socket: any;
  subscriptions: string[];
}
