/**
 * Apex Repository Cartography Engine - Privacy & Obfuscation Engine
 * Employs HMAC-SHA256 keyed digests for zero-knowledge vaulting of private artifacts.
 */

import crypto from 'node:crypto';
import type { RawRepository } from './collector.js';

export interface TopologyNode {
  identifier: string;
  isPrivate: boolean;
  isArchived: boolean;
  primaryLanguage: string;
  stars: number;
  forks: number;
  relativeActivity: string;
  digest: string;
}

export class VaultObfuscator {
  private readonly hmacKey: Buffer;

  constructor(secretSalt: string, private readonly prefix = 'APEX-VAULT') {
    if (!secretSalt || secretSalt.length < 8) {
      throw new Error('[VaultObfuscator] Security violation: Salt must be at least 8 characters.');
    }
    this.hmacKey = crypto.createHash('sha256').update(secretSalt).digest();
  }

  /**
   * Transforms raw GitHub repository into a display-safe TopologyNode.
   */
  process(repo: RawRepository): TopologyNode {
    const rawDigest = crypto
      .createHmac('sha256', this.hmacKey)
      .update(repo.name)
      .digest('hex');

    const shortHash = rawDigest.substring(0, 8).toUpperCase();
    const digest = rawDigest.substring(0, 16);

    const identifier = repo.private
      ? `${this.prefix}-${shortHash}`
      : repo.name;

    const language = repo.private ? 'CLASSIFIED' : (repo.language || 'Plain');

    return {
      identifier,
      isPrivate: repo.private,
      isArchived: repo.archived,
      primaryLanguage: language,
      stars: repo.private ? 0 : repo.stargazers_count,
      forks: repo.private ? 0 : repo.forks_count,
      relativeActivity: repo.pushed_at.split('T')[0] || repo.updated_at.split('T')[0],
      digest,
    };
  }
}
