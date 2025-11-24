// Event emitter for WebSocket events
import { EventEmitter as NodeEventEmitter } from 'events';

interface TokenUpdateData {
  token: any;
  chain?: string;
  source?: string;
}

interface PriceChangeData {
  tokenAddress: string;
  oldPrice: number;
  newPrice: number;
  changePercent: number;
  chain: string;
}

interface VolumeSpikeData {
  tokenAddress: string;
  tokenName: string;
  oldVolume: number;
  newVolume: number;
  spikePercent: number;
  chain: string;
}

export class EventEmitter extends NodeEventEmitter {
  // Token update events
  emitTokenUpdate(data: TokenUpdateData): void {
    this.emit('token:update', data);
  }

  onTokenUpdate(callback: (data: TokenUpdateData) => void): void {
    this.on('token:update', callback);
  }

  // Price change events
  emitPriceChange(data: PriceChangeData): void {
    this.emit('token:price-change', data);
  }

  onPriceChange(callback: (data: PriceChangeData) => void): void {
    this.on('token:price-change', callback);
  }

  // Volume spike events
  emitVolumeSpike(data: VolumeSpikeData): void {
    this.emit('token:volume-spike', data);
  }

  onVolumeSpike(callback: (data: VolumeSpikeData) => void): void {
    this.on('token:volume-spike', callback);
  }

  // Market cap change events
  emitMarketCapChange(data: any): void {
    this.emit('token:marketcap-change', data);
  }

  onMarketCapChange(callback: (data: any) => void): void {
    this.on('token:marketcap-change', callback);
  }

  // New token listing events
  emitNewToken(data: any): void {
    this.emit('token:new', data);
  }

  onNewToken(callback: (data: any) => void): void {
    this.on('token:new', callback);
  }

  // Batch update events (for efficiency)
  emitBatchUpdate(tokens: any[]): void {
    this.emit('tokens:batch-update', tokens);
  }

  onBatchUpdate(callback: (tokens: any[]) => void): void {
    this.on('tokens:batch-update', callback);
  }

  // Error events
  emitError(error: Error, context?: any): void {
    this.emit('error', { error, context, timestamp: new Date() });
  }

  onError(callback: (data: { error: Error; context?: any; timestamp: Date }) => void): void {
    this.on('error', callback);
  }
}
