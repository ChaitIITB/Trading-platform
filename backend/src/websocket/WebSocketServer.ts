// WebSocket server using Socket.io
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ConnectionManager } from '../../websocket/ConnectionManager';
import { EventEmitter } from './EventEmitter';

interface TokenSubscription {
  chains?: string[];
  minVolume?: number;
  minMarketCap?: number;
}

export class WebSocketServer {
  private io: Server;
  private connectionManager: ConnectionManager;
  private eventEmitter: EventEmitter;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    this.connectionManager = new ConnectionManager();
    this.eventEmitter = new EventEmitter();
    this.setupEventHandlers();
  }

  start(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
      this.connectionManager.addConnection(socket);

      // Handle token subscription
      socket.on('subscribe:tokens', (filters: TokenSubscription) => {
        this.handleTokenSubscription(socket, filters);
      });

      // Handle unsubscribe
      socket.on('unsubscribe:tokens', () => {
        this.handleTokenUnsubscribe(socket);
      });

      // Handle specific token tracking
      socket.on('subscribe:token', (tokenAddress: string) => {
        socket.join(`token:${tokenAddress}`);
        console.log(`Client ${socket.id} subscribed to token ${tokenAddress}`);
      });

      socket.on('unsubscribe:token', (tokenAddress: string) => {
        socket.leave(`token:${tokenAddress}`);
        console.log(`Client ${socket.id} unsubscribed from token ${tokenAddress}`);
      });

      // Handle chain-specific subscriptions
      socket.on('subscribe:chain', (chain: string) => {
        socket.join(`chain:${chain}`);
        console.log(`Client ${socket.id} subscribed to chain ${chain}`);
      });

      socket.on('unsubscribe:chain', (chain: string) => {
        socket.leave(`chain:${chain}`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        this.connectionManager.removeConnection(socket.id);
      });

      // Send initial connection confirmation
      socket.emit('connected', {
        clientId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    console.log('✓ WebSocket server started');
  }

  private handleTokenSubscription(socket: Socket, filters: TokenSubscription): void {
    // Join general tokens room
    socket.join('tokens:all');

    // Join chain-specific rooms if specified
    if (filters.chains && filters.chains.length > 0) {
      filters.chains.forEach((chain) => {
        socket.join(`chain:${chain}`);
      });
    }

    // Store filter preferences for this client
    this.connectionManager.setClientFilters(socket.id, filters);

    console.log(`Client ${socket.id} subscribed to tokens with filters:`, filters);
    socket.emit('subscribed', { filters, timestamp: new Date().toISOString() });
  }

  private handleTokenUnsubscribe(socket: Socket): void {
    socket.leave('tokens:all');
    this.connectionManager.clearClientFilters(socket.id);
    console.log(`Client ${socket.id} unsubscribed from tokens`);
  }

  private setupEventHandlers(): void {
    // Listen to token update events from the event emitter
    this.eventEmitter.on('token:update', (data) => {
      this.broadcastTokenUpdate(data);
    });

    this.eventEmitter.on('token:price-change', (data) => {
      this.broadcastToRoom(`token:${data.tokenAddress}`, 'price:update', data);
    });

    this.eventEmitter.on('token:volume-spike', (data) => {
      this.broadcastToRoom('tokens:all', 'volume:spike', data);
    });
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any): void {
    this.io.emit(event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  // Broadcast to a specific room
  broadcastToRoom(room: string, event: string, data: any): void {
    this.io.to(room).emit(event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  // Broadcast token update with filtering
  private broadcastTokenUpdate(data: any): void {
    const { token, chain } = data;

    // Broadcast to all subscribers
    this.io.to('tokens:all').emit('token:update', {
      token,
      timestamp: new Date().toISOString(),
    });

    // Broadcast to chain-specific subscribers
    if (chain) {
      this.io.to(`chain:${chain}`).emit('token:update', {
        token,
        timestamp: new Date().toISOString(),
      });
    }

    // Broadcast to specific token subscribers
    if (token.address) {
      this.io.to(`token:${token.address}`).emit('token:update', {
        token,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Send update to specific client
  sendToClient(clientId: string, event: string, data: any): void {
    this.io.to(clientId).emit(event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  // Get connection stats
  getStats(): { totalConnections: number; rooms: string[] } {
    return {
      totalConnections: this.connectionManager.getConnectionCount(),
      rooms: Array.from(this.io.sockets.adapter.rooms.keys()),
    };
  }

  // Graceful shutdown
  close(): Promise<void> {
    return new Promise((resolve) => {
      this.io.close(() => {
        console.log('WebSocket server closed');
        resolve();
      });
    });
  }

  // Get event emitter for external use
  getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }
}
