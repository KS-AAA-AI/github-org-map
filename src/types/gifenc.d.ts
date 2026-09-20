declare module 'gifenc' {
  export interface GIFEncoderOptions {
    auto?: boolean;
    initialCapacity?: number;
  }

  export interface WriteFrameOptions {
    palette?: number[][] | Uint8Array;
    delay?: number;
    repeat?: number;
    colorDepth?: number;
    dispose?: number;
    transparent?: boolean;
    transparentIndex?: number;
    first?: boolean;
  }

  export interface GIFEncoderInstance {
    reset(): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    buffer: ArrayBuffer;
    stream: any;
    writeHeader(): void;
    writeFrame(index: Uint8Array | number[], width: number, height: number, opts?: WriteFrameOptions): void;
  }

  export function GIFEncoder(opts?: GIFEncoderOptions): GIFEncoderInstance;
  export function quantize(rgba: Uint8Array | Uint8ClampedArray | number[], maxColors?: number, opts?: any): number[][];
  export function applyPalette(rgba: Uint8Array | Uint8ClampedArray | number[], palette: number[][] | Uint8Array): Uint8Array;
  export function nearestColor(color: number[], palette: number[][]): number[];
  export function nearestColorIndex(color: number[], palette: number[][]): number;

  const pkg: {
    GIFEncoder: typeof GIFEncoder;
    quantize: typeof quantize;
    applyPalette: typeof applyPalette;
    nearestColor: typeof nearestColor;
    nearestColorIndex: typeof nearestColorIndex;
  };

  export default pkg;
}
