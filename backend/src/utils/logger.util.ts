// Logger utility
export class Logger {
  static info(message: string, meta?: any): void {
    console.log(`[INFO] ${message}`, meta || '');
  }

  static error(message: string, error?: any): void {
    console.error(`[ERROR] ${message}`, error || '');
  }

  static warn(message: string, meta?: any): void {
    console.warn(`[WARN] ${message}`, meta || '');
  }

  static debug(message: string, meta?: any): void {
    console.debug(`[DEBUG] ${message}`, meta || '');
  }
}
