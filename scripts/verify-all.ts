import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const LOCALES = ['en', 'ko', 'zh-CN', 'es', 'hi', 'ar', 'pt-BR', 'ru', 'fr', 'id'];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function verify(): Promise<void> {
  console.log('🔍 Starting Comprehensive Verification Suite (TypeScript)...\n');
  let errors = 0;
  let checks = 0;

  // 1. Verify Assets
  console.log('--- 1. Asset Files Existence Check ---');
  for (const lang of LOCALES) {
    const baseDir = path.join(ROOT, 'assets', 'locales', lang);
    const files = [
      'org-map.svg',
      'org-map.gif',
      'architecture.svg',
      'badges/badge-workflow.svg',
      'badges/badge-license.svg',
      'badges/badge-stack.svg',
      'badges/badge-security.svg',
    ];

    for (const f of files) {
      checks++;
      const fullPath = path.join(baseDir, f);
      const exists = await fileExists(fullPath);
      if (!exists) {
        console.error(`❌ Missing asset: assets/locales/${lang}/${f}`);
        errors++;
      }
    }
  }

  // Root files
  for (const f of ['org-map.svg', 'org-map.gif']) {
    checks++;
    if (!await fileExists(path.join(ROOT, f))) {
      console.error(`❌ Missing root asset: ${f}`);
      errors++;
    }
  }
  console.log(`✔ Assets check completed. (${checks} assets verified)\n`);

  // 2. Verify Markdown Documents & Links
  console.log('--- 2. Markdown Documents & Link Validity Check ---');
  const docPaths = [
    { lang: 'en', path: 'README.md' },
    ...LOCALES.filter(l => l !== 'en').map(l => ({ lang: l, path: `locales/${l}.md` }))
  ];

  for (const doc of docPaths) {
    const fullDocPath = path.join(ROOT, doc.path);
    const docDir = path.dirname(fullDocPath);
    checks++;

    if (!await fileExists(fullDocPath)) {
      console.error(`❌ Missing document: ${doc.path}`);
      errors++;
      continue;
    }

    const content = await readFile(fullDocPath, 'utf-8');

    // Check href links
    const hrefMatches = [...content.matchAll(/href="([^"#]+)"/g)];
    for (const match of hrefMatches) {
      checks++;
      const linkTarget = match[1];
      if (linkTarget.startsWith('http')) continue;
      const resolved = path.resolve(docDir, linkTarget);
      const exists = await fileExists(resolved);
      if (!exists) {
        console.error(`❌ Dead link in ${doc.path}: href="${linkTarget}" -> ${resolved}`);
        errors++;
      }
    }

    // Check src images
    const srcMatches = [...content.matchAll(/src="([^"#]+)"/g)];
    for (const match of srcMatches) {
      checks++;
      const imgSrc = match[1];
      if (imgSrc.startsWith('http')) continue;
      const resolved = path.resolve(docDir, imgSrc);
      const exists = await fileExists(resolved);
      if (!exists) {
        console.error(`❌ Broken image in ${doc.path}: src="${imgSrc}" -> ${resolved}`);
        errors++;
      }
    }

    // Check srcset
    const srcsetMatches = [...content.matchAll(/srcset="([^"#]+)"/g)];
    for (const match of srcsetMatches) {
      checks++;
      const srcSet = match[1];
      if (srcSet.startsWith('http')) continue;
      const resolved = path.resolve(docDir, srcSet);
      const exists = await fileExists(resolved);
      if (!exists) {
        console.error(`❌ Broken srcset in ${doc.path}: srcset="${srcSet}" -> ${resolved}`);
        errors++;
      }
    }
  }

  // 3. GIF Loop Header Check
  console.log('\n--- 3. GIF Loop Specification Verification ---');
  for (const lang of LOCALES) {
    checks++;
    const gifPath = path.join(ROOT, 'assets', 'locales', lang, 'org-map.gif');
    const buf = await readFile(gifPath);
    const str = buf.toString('binary');
    if (!str.includes('NETSCAPE2.0')) {
      console.error(`❌ GIF in ${lang} lacks NETSCAPE2.0 loop extension`);
      errors++;
    }
  }

  console.log(`\n========================================`);
  if (errors === 0) {
    console.log(`🎉 ALL ${checks} CHECKS PASSED WITH 0 ERRORS!`);
  } else {
    console.error(`❌ Verification failed with ${errors} errors.`);
    process.exit(1);
  }
}

verify().catch(console.error);
