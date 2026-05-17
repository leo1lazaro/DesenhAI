export const SOCKET_EVENTS = {
    /*
    |--------------------------------------------------------------------------
    | Connection
    |--------------------------------------------------------------------------
    */
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    /*
    |--------------------------------------------------------------------------
    | Chat
    |--------------------------------------------------------------------------
    */
    CHAT_JOIN: "chat:join",
    CHAT_USER_JOINED: "chat:userJoined",
    CHAT_SEND: "chat:send",
    CHAT_RECEIVE: "chat:receive",
    CHAT_TYPING: "chat:typing",

    /*
    |--------------------------------------------------------------------------
    | Canva
    |--------------------------------------------------------------------------
    */
    DRAW: "draw",
    DRAW_UPDATE: "draw:update",
    CLEAR_DRAW: "draw:clear",
    START_GAME: "start-game",

    /*
    |--------------------------------------------------------------------------
    | Sala
    |--------------------------------------------------------------------------
    */
    ROOM_CREATE: "room:create",
    ROOM_CREATED: "room:created",
    ROOM_JOIN: "room:join",
    ROOM_UPDATED: "room:updated",
    ROOM_START_GAME: "room:iniciarGame",
    ROOM_ROUND_NEXT: "room:proximoRound",
    ROOM_STATE_UPDATE: "room:atualizaRound",
    /*
    |--------------------------------------------------------------------------
    | Sala
    |--------------------------------------------------------------------------
    */
    LOBBY_JOIN: "lobby:join",
    LOBBY_UPDATE: "lobby:update"

} as const;