// Connection manager for WebSocket clients
import { Socket } from 'socket.io';

interface ClientInfo {
  socket: Socket;
  connectedAt: Date;
  filters?: any;
  subscriptions: Set<string>;
}

export class ConnectionManager {
  private clients: Map<string, ClientInfo> = new Map();

  addConnection(socket: Socket): void {
    this.clients.set(socket.id, {
      socket,
      connectedAt: new Date(),
      subscriptions: new Set(),
    });
  }

  removeConnection(clientId: string): void {
    this.clients.delete(clientId);
  }

  getConnection(clientId: string): ClientInfo | undefined {
    return this.clients.get(clientId);
  }

  getAllConnections(): ClientInfo[] {
    return Array.from(this.clients.values());
  }

  getConnectionCount(): number {
    return this.clients.size;
  }

  setClientFilters(clientId: string, filters: any): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.filters = filters;
    }
  }

  clearClientFilters(clientId: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.filters = undefined;
    }
  }

  getClientFilters(clientId: string): any {
    return this.clients.get(clientId)?.filters;
  }

  addSubscription(clientId: string, subscription: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.subscriptions.add(subscription);
    }
  }

  removeSubscription(clientId: string, subscription: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.subscriptions.delete(subscription);
    }
  }

  getClientsByFilter(filterFn: (client: ClientInfo) => boolean): ClientInfo[] {
    return Array.from(this.clients.values()).filter(filterFn);
  }

  // Get clients subscribed to a specific topic
  getClientsBySubscription(subscription: string): ClientInfo[] {
    return Array.from(this.clients.values()).filter((client) =>
      client.subscriptions.has(subscription)
    );
  }

  // Clean up stale connections (optional)
  cleanupStaleConnections(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    for (const [clientId, client] of this.clients.entries()) {
      if (now - client.connectedAt.getTime() > maxAgeMs) {
        if (!client.socket.connected) {
          this.clients.delete(clientId);
        }
      }
    }
  }
}