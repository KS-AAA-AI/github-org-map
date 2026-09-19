/**
 * Apex Repository Cartography Engine - Main Pipeline Controller
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { RepositoryCollector } from './core/collector.js';
import { VaultObfuscator } from './core/obfuscator.js';
import { MatrixAggregator } from './core/matrix.js';
import { VectorCanvasRenderer } from './render/vector-canvas.js';
import { MotionEncoder } from './render/motion-encoder.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function runPipeline() {
  console.log('=== [Apex Cartography Engine v3.0 // Autonomous Pipeline] ===');

  const configPath = path.join(ROOT, 'config', 'topology.config.json');
  const rawConfig = await readFile(configPath, 'utf-8');
  const config = JSON.parse(rawConfig);

  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
  const salt = process.env.MASK_SALT || 'apex-vibe-default-salt-seed-2026';

  console.log(`[Target Owner]  : ${config.targetOwner}`);
  console.log(`[Vault Prefix]  : ${config.privacy.vaultPrefix}`);

  // 1. Harvest repositories
  const collector = new RepositoryCollector(token);
  console.log('[Collector] Harvesting repositories from GitHub API...');
  const rawRepos = await collector.harvest(config.targetOwner, config.aggregation);
  console.log(`[Collector] Successfully harvested ${rawRepos.length} repositories.`);

  // 2. Obfuscate vaults
  const obfuscator = new VaultObfuscator(salt, config.privacy.vaultPrefix);
  const nodes = rawRepos.map((r) => obfuscator.process(r));

  // 3. Compile matrix summary
  const summary = MatrixAggregator.compile(config.targetOwner, nodes);
  console.log(`[Matrix] Total: ${summary.totalNodes} | Public: ${summary.publicCount} | Vaults: ${summary.vaultCount}`);

  // 4. Ensure artifact directories
  const artifactsDir = path.join(ROOT, 'artifacts');
  const historyDir = path.join(ROOT, 'artifacts', 'history');
  await mkdir(artifactsDir, { recursive: true });
  await mkdir(historyDir, { recursive: true });

  // 5. Render Vector SVG
  console.log('[Renderer] Generating Vector Canvas SVG...');
  const svgOutput = VectorCanvasRenderer.render(summary, nodes);
  const svgPath = path.join(ROOT, config.output.vectorPath);
  await writeFile(svgPath, svgOutput, 'utf-8');
  await writeFile(path.join(ROOT, 'org-map.svg'), svgOutput, 'utf-8');

  // 6. Record dated history
  const today = new Date().toISOString().split('T')[0];
  const historyPath = path.join(historyDir, `${today}.svg`);
  await writeFile(historyPath, svgOutput, 'utf-8');

  // 7. Render Motion Radar GIF
  console.log('[Encoder] Compiling Motion Radar GIF...');
  const gifBuffer = MotionEncoder.createTopologyGif(summary);
  const gifPath = path.join(ROOT, config.output.motionPath);
  await writeFile(gifPath, gifBuffer);
  await writeFile(path.join(ROOT, 'org-map.gif'), gifBuffer);

  console.log('✔ [Pipeline Complete] Artifacts successfully emitted:');
  console.log(` - Vector : ${svgPath}`);
  console.log(` - Motion : ${gifPath}`);
  console.log(` - History: ${historyPath}`);
}

runPipeline().catch((err) => {
  console.error('[Pipeline Error]', err);
  process.exit(1);
});
