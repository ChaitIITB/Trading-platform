// Data refresh scheduler
export class DataRefreshScheduler {
  private intervalId?: NodeJS.Timeout;

  start(intervalMs: number, callback: () => Promise<void>): void {
    this.intervalId = setInterval(async () => {
      try {
        await callback();
      } catch (error) {
        console.error('Scheduler error:', error);
      }
    }, intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
