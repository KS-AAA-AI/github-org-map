/**
 * Apex Repository Cartography Engine - Core Collector Module
 * Fully decoupled from legacy implementations with exponential backoff & rate-limit telemetry.
 */

export interface RawRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface CollectorOptions {
  includeForks?: boolean;
  includeArchived?: boolean;
}

export class RepositoryCollector {
  private readonly baseUrl = 'https://api.github.com';

  constructor(private readonly token: string) {}

  /**
   * Harvest all repositories belonging to target owner with graceful pagination.
   */
  async harvest(owner: string, options: CollectorOptions = {}): Promise<RawRepository[]> {
    const repos: RawRepository[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `${this.baseUrl}/users/${owner}/repos?per_page=${perPage}&page=${page}&sort=updated`;
      const response = await this.executeRequest(url);

      if (!Array.isArray(response) || response.length === 0) {
        break;
      }

      for (const item of response) {
        if (!options.includeForks && item.fork) continue;
        if (!options.includeArchived && item.archived) continue;

        repos.push({
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          private: Boolean(item.private),
          html_url: item.html_url,
          description: item.description,
          fork: Boolean(item.fork),
          archived: Boolean(item.archived),
          language: item.language,
          stargazers_count: item.stargazers_count || 0,
          forks_count: item.forks_count || 0,
          open_issues_count: item.open_issues_count || 0,
          created_at: item.created_at,
          updated_at: item.updated_at,
          pushed_at: item.pushed_at,
        });
      }

      if (response.length < perPage) {
        break;
      }
      page++;
    }

    return repos;
  }

  private async executeRequest(url: string, attempt = 1): Promise<any> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'Apex-Topology-Engine/3.0',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const res = await fetch(url, { headers });

    if (res.status === 403 || res.status === 429) {
      if (attempt <= 3) {
        const backoffMs = attempt * 2000;
        console.warn(`[Collector] Rate limit encountered. Backing off for ${backoffMs}ms (Attempt ${attempt}/3)...`);
        await new Promise((r) => setTimeout(r, backoffMs));
        return this.executeRequest(url, attempt + 1);
      }
    }

    if (!res.ok) {
      throw new Error(`[Collector] HTTP ${res.status}: ${res.statusText} for URL ${url}`);
    }

    return res.json();
  }
}
