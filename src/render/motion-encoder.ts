/**
 * Apex Repository Cartography Engine - Motion Encoder Module (GIF)
 * Generates dynamic scanning radar and pulsating matrix GIF frames.
 */

import pkg from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = pkg;
import type { TopologySummary } from '../core/matrix.js';

export class MotionEncoder {
  static createTopologyGif(summary: TopologySummary): Buffer {
    const width = 480;
    const height = 240;
    const gif = GIFEncoder();
    const frameCount = 16;

    for (let f = 0; f < frameCount; f++) {
      const rgba = new Uint8ClampedArray(width * height * 4);
      const scanY = (f / frameCount) * height;
      const pulse = Math.sin((f / frameCount) * Math.PI * 2) * 0.5 + 0.5;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          
          // Dark background #0A0F1D
          let r = 10;
          let g = 15;
          let b = 29;

          // Border outline
          if (x < 2 || x >= width - 2 || y < 2 || y >= height - 2) {
            r = 30; g = 41; b = 59;
          }

          // Grid lines
          if (x % 40 === 0 || y % 40 === 0) {
            r = 16; g = 24; b = 44;
          }

          // Scanning beam line
          const distToScan = Math.abs(y - scanY);
          if (distToScan < 12) {
            const intensity = (1 - distToScan / 12) * 90;
            r = Math.min(255, r + 0);
            g = Math.min(255, g + intensity * 1.8);
            b = Math.min(255, b + intensity * 2.2);
          }

          // Center pulse radar node
          const dx = x - width / 2;
          const dy = y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radarRadius = 30 + pulse * 40;
          if (Math.abs(dist - radarRadius) < 2) {
            r = 0; g = 242; b = 254;
          }

          rgba[idx] = r;
          rgba[idx + 1] = g;
          rgba[idx + 2] = b;
          rgba[idx + 3] = 255;
        }
      }

      const palette = quantize(rgba, 128);
      const index = applyPalette(rgba, palette);
      gif.writeFrame(index, width, height, {
        palette,
        delay: 80,
      });
    }

    gif.finish();
    return Buffer.from(gif.bytes());
  }
}
