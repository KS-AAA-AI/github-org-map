/**
 * Apex Repository Cartography Engine - Metrics & Matrix Aggregator
 */

import type { TopologyNode } from './obfuscator.js';

export interface TopologySummary {
  owner: string;
  totalNodes: number;
  publicCount: number;
  vaultCount: number;
  languageDistribution: Record<string, number>;
  generatedAt: string;
}

export class MatrixAggregator {
  static compile(owner: string, nodes: TopologyNode[]): TopologySummary {
    let publicCount = 0;
    let vaultCount = 0;
    const languages: Record<string, number> = {};

    for (const node of nodes) {
      if (node.isPrivate) {
        vaultCount++;
      } else {
        publicCount++;
      }

      const lang = node.primaryLanguage;
      languages[lang] = (languages[lang] || 0) + 1;
    }

    return {
      owner,
      totalNodes: nodes.length,
      publicCount,
      vaultCount,
      languageDistribution: languages,
      generatedAt: new Date().toISOString(),
    };
  }
}
