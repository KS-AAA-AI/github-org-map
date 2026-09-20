declare module 'sharp' {
  export interface OutputInfo {
    format: string;
    size: number;
    width: number;
    height: number;
    channels: number;
    premultiplied: boolean;
    cropOffsetLeft?: number;
    cropOffsetTop?: number;
  }

  export interface SharpInstance {
    ensureAlpha(): SharpInstance;
    raw(): SharpInstance;
    toBuffer(options?: { resolveWithObject?: boolean }): Promise<{ data: Buffer; info: OutputInfo }>;
    png(): SharpInstance;
  }

  export default function sharp(input?: any, options?: any): SharpInstance;
}
