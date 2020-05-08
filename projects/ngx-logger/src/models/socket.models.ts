export interface SocketSession {
    sessionId: string;
    userId?: string;
    // TODO: platform,..
}

// replace with session_request, session_start, log
export type SocketMessageType = "SESSION_REQUEST" | "SESSION_START" | "LOG";

export interface SocketMessage {
    type: SocketMessageType;
    message: any;
}
