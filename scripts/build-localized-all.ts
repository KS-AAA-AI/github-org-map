import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pkg from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = pkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

export interface LocaleMeta {
  code: string;
  flag: string;
  name: string;
  isRTL: boolean;
  path: string;
  isRoot: boolean;
}

export interface BadgeItem {
  label: string;
  value: string;
}

export interface StepItem {
  title: string;
  desc: string;
}

export interface LocaleI18n {
  title: string;
  subtitle: string;
  hudSub: string;
  hudTitle: string;
  totalNodes: string;
  publicDeployed: string;
  encryptedVaults: string;
  primaryStack: string;
  statusLeft: string;
  statusRight: string;
  publicBadge: string;
  vaultBadge: string;
  radarTitle: string;
  radarStatus: string;
  radarSystem: string;
  radarFreq: string;
  badges: {
    workflow: BadgeItem;
    license: BadgeItem;
    stack: BadgeItem;
    security: BadgeItem;
  };
  architecture: {
    title: string;
    step1: StepItem;
    step2: StepItem;
    step3: StepItem;
    step4: StepItem;
  };
  doc: {
    overviewTitle: string;
    overviewDesc: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    feat4Title: string;
    feat4Desc: string;
    telemetryTitle: string;
    telemetryDesc: string;
    startTitle: string;
    prereq: string;
    quickstart: string;
    securityTitle: string;
    sec1: string;
    sec2: string;
    sec3: string;
    footer: string;
  };
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', flag: '🇺🇸', name: 'English', isRTL: false, path: 'README.md', isRoot: true },
  { code: 'ko', flag: '🇰🇷', name: '한국어', isRTL: false, path: 'locales/ko.md', isRoot: false },
  { code: 'zh-CN', flag: '🇨🇳', name: '中文', isRTL: false, path: 'locales/zh-CN.md', isRoot: false },
  { code: 'es', flag: '🇪🇸', name: 'Español', isRTL: false, path: 'locales/es.md', isRoot: false },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी', isRTL: false, path: 'locales/hi.md', isRoot: false },
  { code: 'ar', flag: '🇸🇦', name: 'العربية', isRTL: true, path: 'locales/ar.md', isRoot: false },
  { code: 'pt-BR', flag: '🇧🇷', name: 'Português', isRTL: false, path: 'locales/pt-BR.md', isRoot: false },
  { code: 'ru', flag: '🇷🇺', name: 'Русский', isRTL: false, path: 'locales/ru.md', isRoot: false },
  { code: 'fr', flag: '🇫🇷', name: 'Français', isRTL: false, path: 'locales/fr.md', isRoot: false },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia', isRTL: false, path: 'locales/id.md', isRoot: false },
];

export const I18N_DATA: Record<string, LocaleI18n> = {
  'en': {
    title: 'Apex Cartography Engine (v3.0)',
    subtitle: 'Autonomous daily cartography and topology mapping for the KS-AAA-AI ecosystem.',
    hudSub: 'APEX AUTONOMOUS CARTOGRAPHY // V3',
    hudTitle: 'KS-AAA-AI Repository Topology',
    totalNodes: 'TOTAL NODES',
    publicDeployed: 'PUBLIC DEPLOYED',
    encryptedVaults: 'ENCRYPTED VAULTS',
    primaryStack: 'PRIMARY TECH STACK',
    statusLeft: 'HMAC-SHA256 SECURED · ZERO-KNOWLEDGE PUBLIC PROJECTION',
    statusRight: 'AUTONOMOUS ORCHESTRATION ENGINE',
    publicBadge: 'PUBLIC',
    vaultBadge: 'VAULT',
    radarTitle: 'LIVE TELEMETRY & RADAR SCAN',
    radarStatus: 'RADAR ACTIVE // SCANNING MATRIX',
    radarSystem: 'KS-AAA-AI TOPOLOGY RADAR',
    radarFreq: 'FREQ: 2.40 GHz · SYNCED',
    badges: {
      workflow: { label: 'WORKFLOW', value: 'Autonomous Cron' },
      license: { label: 'LICENSE', value: 'MIT License' },
      stack: { label: 'STACK', value: 'TypeScript 5.6' },
      security: { label: 'SECURITY', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'SYSTEM ARCHITECTURE & PIPELINE',
      step1: { title: '1. GitHub Ingestion', desc: 'REST & GraphQL APIs' },
      step2: { title: '2. Vault Obfuscation', desc: 'HMAC-SHA256 Keyed Hash' },
      step3: { title: '3. Matrix Aggregation', desc: 'Clustering & Telemetry' },
      step4: { title: '4. Dual Renderers', desc: 'Vector SVG & Radar GIF' },
    },
    doc: {
      overviewTitle: '🏛️ System Overview & Architecture',
      overviewDesc: '**Apex Cartography Engine** is a modern, high-throughput autonomous telemetry and topology visualization system tailored for the **KS-AAA-AI** GitHub ecosystem. It transforms scattered repository states into a cybernetic matrix HUD with zero-knowledge cryptographic safeguards.',
      feat1Title: 'Zero-Knowledge Privacy Vaulting',
      feat1Desc: 'Private repositories undergo salted HMAC-SHA256 transformation (`APEX-VAULT-XXXXXXXX`), ensuring internal identifiers, descriptions, and proprietary topics are never exposed to public surfaces.',
      feat2Title: 'Deterministic Topology Mapping',
      feat2Desc: 'Identifiers remain stable across generations under the same cryptographic salt.',
      feat3Title: 'Dual Render Pipelines',
      feat3Desc: 'High-density Vector Canvas SVG and scanning radar GIF.',
      feat4Title: 'Self-Healing Automation',
      feat4Desc: 'Scheduled daily GitHub Actions workflow (`00:00 KST`) with exponential backoff against API rate-limiting triggers.',
      telemetryTitle: '📡 Live Telemetry & Radar Scan',
      telemetryDesc: 'Real-time telemetry and sweeping radar visual representation generated deterministically by the Cartography Engine.',
      startTitle: '🛠️ Getting Started & Local Execution',
      prereq: 'Prerequisites',
      quickstart: 'Quickstart',
      securityTitle: '🔒 Security Guardrails & Privacy Guarantee',
      sec1: '**Zero Token Leakage**: Tokens are evaluated strictly in ephemeral memory and never written to disk or artifacts.',
      sec2: '**Fail-Closed Design**: If `MASK_SALT` is compromised or omitted in production runs, the pipeline safely terminates rather than exposing unmasked labels.',
      sec3: '**Local Asset Isolation**: All visual badges and graphics are served directly from the repository tree without third-party tracking CDNs.',
      footer: 'Released under the [MIT License](../LICENSE). Copyright © 2026 KS-AAA-AI.',
    }
  },
  'ko': {
    title: 'Apex 카토그래피 엔진 (v3.0)',
    subtitle: 'KS-AAA-AI 생태계를 위한 자율 일일 카토그래피 및 토폴로지 매핑 시스템.',
    hudSub: 'APEX 자율 토폴로지 매핑 시스템 // V3',
    hudTitle: 'KS-AAA-AI 저장소 토폴로지 지도',
    totalNodes: '전체 노드 수',
    publicDeployed: '공개 배포 완료',
    encryptedVaults: '암호화 금고 (Vault)',
    primaryStack: '핵심 기술 스택',
    statusLeft: 'HMAC-SHA256 보안 · 영지식 공개 프로젝션',
    statusRight: '자율 오케스트레이션 엔진',
    publicBadge: '공개',
    vaultBadge: '금고',
    radarTitle: '실시간 텔레메트리 & 레이더 스캔',
    radarStatus: '레이더 가동 중 // 매트릭스 탐색',
    radarSystem: 'KS-AAA-AI 토폴로지 레이더',
    radarFreq: '주파수: 2.40 GHz · 동기화됨',
    badges: {
      workflow: { label: '워크플로', value: '자율 실행 크론' },
      license: { label: '라이선스', value: 'MIT 라이선스' },
      stack: { label: '기술 스택', value: 'TypeScript 5.6' },
      security: { label: '보안 등급', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: '시스템 아키텍처 & 파이프라인',
      step1: { title: '1. GitHub 원격 수집', desc: 'REST & GraphQL API' },
      step2: { title: '2. 금고 암호 난독화', desc: '솔트 기반 HMAC-SHA256' },
      step3: { title: '3. 매트릭스 집계 분석', desc: '클러스터링 & 텔레메트리' },
      step4: { title: '4. 이중 렌더링 엔진', desc: '벡터 SVG & 레이더 GIF' },
    },
    doc: {
      overviewTitle: '🏛️ 시스템 개요 및 아키텍처',
      overviewDesc: '**Apex 카토그래피 엔진**은 **KS-AAA-AI** GitHub 생태계를 위해 설계된 최신 고처리량 자율 텔레메트리 및 토폴로지 시각화 시스템입니다. 분산된 저장소 상태를 영지식 암호화 보호 기능이 적용된 사이버네틱 매트릭스 HUD로 변환합니다.',
      feat1Title: '영지식 프라이버시 금고화 (Vaulting)',
      feat1Desc: '비공개 저장소는 솔트 기반 HMAC-SHA256 변환(`APEX-VAULT-XXXXXXXX`)을 거쳐 내부 식별자, 설명, 독점 토픽이 외부에 노출되지 않도록 원천 차단합니다.',
      feat2Title: '결정론적 토폴로지 매핑',
      feat2Desc: '동일한 암호화 솔트 환경에서 저장소 식별자의 불변성을 유지합니다.',
      feat3Title: '이중 렌더링 파이프라인',
      feat3Desc: '초고해상도 벡터 캔버스 SVG 및 동적 스캐닝 레이더 GIF를 동시 생성합니다.',
      feat4Title: '자가 복구 자동화',
      feat4Desc: 'API 속도 제한 방지 지수 백오프가 적용된 일일 정기 GitHub Actions 워크플로(`매일 00:00 KST`)를 수행합니다.',
      telemetryTitle: '📡 실시간 텔레메트리 & 레이더 스캔',
      telemetryDesc: '카토그래피 엔진에 의해 결정론적으로 생성되는 실시간 텔레메트리 및 스위핑 레이더 시각화입니다.',
      startTitle: '🛠️ 시작하기 & 로컬 실행',
      prereq: '사전 요구사항',
      quickstart: '빠른 시작',
      securityTitle: '🔒 보안 가드레일 & 프라이버시 보증',
      sec1: '**토큰 유출 제로**: 액세스 토큰은 휘발성 메모리 내에서만 평가되며 디스크나 산출물에 절대 기록되지 않습니다.',
      sec2: '**안전 실패(Fail-Closed) 설계**: 프로덕션 환경에서 `MASK_SALT`가 누락되거나 변조될 경우 파이프라인이 즉시 안전 중단되어 마스킹되지 않은 레이블 노출을 방지합니다.',
      sec3: '**로컬 에셋 격리**: 모든 시각 뱃지 및 그래픽은 제3자 추적 CDN 없이 저장소 트리 내에서 직접 제공됩니다.',
      footer: '[MIT 라이선스](../LICENSE)에 따라 배포됩니다. Copyright © 2026 KS-AAA-AI.',
    }
  },
  'zh-CN': {
    title: 'Apex 拓扑制图引擎 (v3.0)',
    subtitle: '面向 KS-AAA-AI 生态系统的自主日常制图与拓扑映射系统。',
    hudSub: 'APEX 自主拓扑测绘系统 // V3',
    hudTitle: 'KS-AAA-AI 存储库拓扑图',
    totalNodes: '节点总数',
    publicDeployed: '公开部署',
    encryptedVaults: '加密保险库',
    primaryStack: '核心技术栈',
    statusLeft: 'HMAC-SHA256 加密 · 零知识公开映射',
    statusRight: '自主编排引擎',
    publicBadge: '公开',
    vaultBadge: '保险库',
    radarTitle: '实时遥测与雷达扫描',
    radarStatus: '雷达激活 // 系统矩阵扫描',
    radarSystem: 'KS-AAA-AI 拓扑雷达',
    radarFreq: '频率: 2.40 GHz · 已同步',
    badges: {
      workflow: { label: '工作流', value: '自主定时任务' },
      license: { label: '许可证', value: 'MIT 许可证' },
      stack: { label: '技术栈', value: 'TypeScript 5.6' },
      security: { label: '安全', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: '系统架构与流水线',
      step1: { title: '1. GitHub 数据采集', desc: 'REST 与 GraphQL API' },
      step2: { title: '2. 保险库混淆加密', desc: '加盐 HMAC-SHA256 哈希' },
      step3: { title: '3. 矩阵聚合分析', desc: '聚类与遥测分析' },
      step4: { title: '4. 双渲染引擎', desc: '矢量 SVG 与雷达 GIF' },
    },
    doc: {
      overviewTitle: '🏛️ 系统概述与架构',
      overviewDesc: '**Apex 拓扑制图引擎**是专为 **KS-AAA-AI** GitHub 生态系统打造的现代化高通量自主遥测与拓扑可视化系统。它通过零知识密码学保护，将分散的存储库状态转换为赛博矩阵 HUD。',
      feat1Title: '零知识隐私保险库',
      feat1Desc: '私有存储库经过加盐 HMAC-SHA256 转换（`APEX-VAULT-XXXXXXXX`），确保内部标识符、描述和专有主题绝不向公开平台泄露。',
      feat2Title: '确定性拓扑映射',
      feat2Desc: '在相同的密码加盐种子下，存储库标识符在多轮生成中保持稳定。',
      feat3Title: '双渲染流水线',
      feat3Desc: '同时生成高精度矢量画布 SVG 和动态扫描雷达 GIF。',
      feat4Title: '自愈自动化',
      feat4Desc: '具备防 API 速率限制指数退避的每日定时 GitHub Actions 工作流（`00:00 KST`）。',
      telemetryTitle: '📡 实时遥测与雷达扫描',
      telemetryDesc: '由制图引擎确定性生成的实时遥测与雷达扫描动态视觉呈现。',
      startTitle: '🛠️ 快速上手与本地执行',
      prereq: '环境依赖',
      quickstart: '快速开始',
      securityTitle: '🔒 安全准则与隐私保障',
      sec1: '**零令牌泄露**：访问令牌严格在瞬态内存中计算，绝不写入磁盘或构建产物。',
      sec2: '**故障闭锁设计**：在生产环境中若缺失或破坏 `MASK_SALT`，流水线将安全终止，防止未经脱敏的数据暴露。',
      sec3: '**本地资产隔离**：所有徽章与图形均由存储库内部直接提供，不依赖第三方追踪 CDN。',
      footer: '基于 [MIT 许可证](../LICENSE) 发布。版权所有 © 2026 KS-AAA-AI。',
    }
  },
  'es': {
    title: 'Motor de Cartografía Apex (v3.0)',
    subtitle: 'Cartografía autónoma diaria y mapeo de topología para el ecosistema KS-AAA-AI.',
    hudSub: 'CARTOGRAFÍA AUTÓNOMA APEX // V3',
    hudTitle: 'Topología de Repositorios KS-AAA-AI',
    totalNodes: 'NODOS TOTALES',
    publicDeployed: 'DESPLEGADOS PÚBLICOS',
    encryptedVaults: 'BÓVEDAS CIFRADAS',
    primaryStack: 'STACK TECNOLÓGICO',
    statusLeft: 'SEGURIDAD HMAC-SHA256 · PROYECCIÓN PÚBLICA DE CONOCIMIENTO CERO',
    statusRight: 'MOTOR DE ORQUESTACIÓN AUTÓNOMO',
    publicBadge: 'PÚBLICO',
    vaultBadge: 'BÓVEDA',
    radarTitle: 'TELEMETRÍA EN VIVO Y RADAR',
    radarStatus: 'RADAR ACTIVO // ESCANEO MATRIZ',
    radarSystem: 'RADAR TOPOLOGÍA KS-AAA-AI',
    radarFreq: 'FREQ: 2.40 GHz · SINCRONIZADO',
    badges: {
      workflow: { label: 'FLUJO', value: 'Cron Autónomo' },
      license: { label: 'LICENCIA', value: 'Licencia MIT' },
      stack: { label: 'STACK', value: 'TypeScript 5.6' },
      security: { label: 'SEGURIDAD', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'ARQUITECTURA DEL SISTEMA Y PIPELINE',
      step1: { title: '1. Ingestión de GitHub', desc: 'APIs REST y GraphQL' },
      step2: { title: '2. Ofuscación de Bóvedas', desc: 'Hash HMAC-SHA256' },
      step3: { title: '3. Agregación de Matrices', desc: 'Agrupación y Telemetría' },
      step4: { title: '4. Renderizadores Duales', desc: 'SVG Vectorial y Radar GIF' },
    },
    doc: {
      overviewTitle: '🏛️ Descripción General y Arquitectura',
      overviewDesc: '**Apex Cartography Engine** es un sistema moderno de telemetría autónoma y visualización de topología diseñado para el ecosistema GitHub de **KS-AAA-AI**. Transforma repositorios dispersos en un HUD cibernético con garantías criptográficas de conocimiento cero.',
      feat1Title: 'Bóveda de Privacidad de Conocimiento Cero',
      feat1Desc: 'Los repositorios privados se transforman mediante HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`), garantizando que los identificadores internos nunca se expongan al público.',
      feat2Title: 'Mapeo Topológico Determinista',
      feat2Desc: 'Los identificadores permanecen estables a través de las ejecuciones bajo la misma sal criptográfica.',
      feat3Title: 'Pipelines de Renderizado Dual',
      feat3Desc: 'Generación simultánea de Canvas Vectorial SVG de alta resolución y GIF animado de radar.',
      feat4Title: 'Automatización con Autorrecuperación',
      feat4Desc: 'Flujo de trabajo programado diario en GitHub Actions (`00:00 KST`) con retroceso exponencial contra límites de API.',
      telemetryTitle: '📡 Telemetría en Vivo y Escaneo de Radar',
      telemetryDesc: 'Visualización dinámica de radar y telemetría generada de forma determinista por el motor de cartografía.',
      startTitle: '🛠️ Comenzando y Ejecución Local',
      prereq: 'Requisitos Previos',
      quickstart: 'Inicio Rápido',
      securityTitle: '🔒 Barreras de Seguridad y Privacidad',
      sec1: '**Cero Fuga de Tokens**: Los tokens se evalúan en memoria efímera y nunca se escriben en disco ni artefactos.',
      sec2: '**Diseño a Prueba de Fallos**: Si `MASK_SALT` falta o se altera, el pipeline finaliza de forma segura.',
      sec3: '**Aislamiento de Recursos Locales**: Todos los gráficos se sirven directamente desde el árbol del repositorio sin CDNs externas.',
      footer: 'Publicado bajo la [Licencia MIT](../LICENSE). Copyright © 2026 KS-AAA-AI.',
    }
  },
  'hi': {
    title: 'एपेक्स कार्टोग्राफी इंजन (v3.0)',
    subtitle: 'KS-AAA-AI पारिस्थितिकी तंत्र के लिए स्वायत्त दैनिक कार्टोग्राफी और टोपोलॉजी मैपिंग।',
    hudSub: 'एपेक्स स्वायत्त कार्टोग्राफी // V3',
    hudTitle: 'KS-AAA-AI रिपॉजिटरी टोपोलॉजी',
    totalNodes: 'कुल नोड्स',
    publicDeployed: 'सार्वजनिक तैनात',
    encryptedVaults: 'एन्क्रिप्टेड वॉल्ट्स',
    primaryStack: 'प्राथमिक टेक स्टैक',
    statusLeft: 'HMAC-SHA256 सुरक्षित · शून्य-ज्ञान सार्वजनिक प्रक्षेपण',
    statusRight: 'स्वायत्त ऑर्केस्ट्रेशन इंजन',
    publicBadge: 'सार्वजनिक',
    vaultBadge: 'वॉल्ट',
    radarTitle: 'लाइव टेलीमेट्री और रडार स्कैन',
    radarStatus: 'रडार सक्रिय // सिस्टम मैट्रिक्स स्कैनिंग',
    radarSystem: 'KS-AAA-AI टोपोलॉजी रडार',
    radarFreq: 'आवृत्ति: 2.40 GHz · सिंक्रनाइज़',
    badges: {
      workflow: { label: 'वर्कफ़्लो', value: 'स्वायत्त क्रॉन' },
      license: { label: 'लाइसेंस', value: 'MIT लाइसेंस' },
      stack: { label: 'स्टैक', value: 'TypeScript 5.6' },
      security: { label: 'सुरक्षा', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'सिस्टम आर्किटेक्चर और पाइपलाइन',
      step1: { title: '1. गिटहब डेटा अंतर्ग्रहण', desc: 'REST और GraphQL APIs' },
      step2: { title: '2. वॉल्ट अस्पष्टता', desc: 'HMAC-SHA256 हैश' },
      step3: { title: '3. मैट्रिक्स एकत्रीकरण', desc: 'क्लस्टरिंग और टेलीमेट्री' },
      step4: { title: '4. दोहरा रेंडर इंजन', desc: 'वेक्टर SVG और रडार GIF' },
    },
    doc: {
      overviewTitle: '🏛️ सिस्टम अवलोकन और वास्तुकला',
      overviewDesc: '**Apex Cartography Engine** **KS-AAA-AI** गिटहब पारिस्थितिकी तंत्र के लिए एक आधुनिक स्वायत्त टेलीमेट्री और टोपोलॉजी विज़ुअलाइज़ेशन सिस्टम है। यह रिपॉजिटरी स्थिति को शून्य-ज्ञान सुरक्षा के साथ साइबरनेटिक मैट्रिक्स HUD में परिवर्तित करता है।',
      feat1Title: 'शून्य-ज्ञान गोपनीयता वॉल्टिंग',
      feat1Desc: 'निजी रिपॉजिटरी HMAC-SHA256 परिवर्तन (`APEX-VAULT-XXXXXXXX`) से गुजरते हैं, जिससे आंतरिक विवरण कभी भी सार्वजनिक रूप से सामने नहीं आते हैं।',
      feat2Title: 'नियतात्मक टोपोलॉजी मैपिंग',
      feat2Desc: 'पहचानकर्ता समान क्रिप्टोग्राफ़िक साल्ट के तहत स्थिर रहते हैं।',
      feat3Title: 'दोहरी रेंडर पाइपलाइन',
      feat3Desc: 'उच्च घनत्व वेक्टर कैनवास SVG और रडार GIF का एक साथ निर्माण।',
      feat4Title: 'स्व-उपचार स्वचालन',
      feat4Desc: 'API दर-सीमा बैकऑफ़ के साथ दैनिक निर्धारित GitHub Actions वर्कफ़्लो (`00:00 KST`)।',
      telemetryTitle: '📡 लाइव टेलीमेट्री और रडार स्कैन',
      telemetryDesc: 'कार्टोग्राफी इंजन द्वारा नियतात्मक रूप से उत्पन्न रडार दृश्य प्रस्तुति।',
      startTitle: '🛠️ शुरुआत और स्थानीय निष्पादन',
      prereq: 'पूर्वापेक्षाएँ',
      quickstart: 'त्वरित शुरुआत',
      securityTitle: '🔒 सुरक्षा गार्डरेल्स और गोपनीयता गारंटी',
      sec1: '**शून्य टोकन रिसाव**: टोकन का मूल्यांकन केवल मेमोरी में किया जाता है और डिस्क पर कभी नहीं लिखा जाता है।',
      sec2: '**फेल-क्लोज्ड डिज़ाइन**: यदि `MASK_SALT` गायब है, तो पाइपलाइन सुरक्षित रूप से समाप्त हो जाती है।',
      sec3: '**स्थानीय संपत्ति अलगाव**: सभी ग्राफिक्स बिना किसी बाहरी CDN के सीधे रिपॉजिटरी से परोसे जाते हैं।',
      footer: '[MIT लाइसेंस](../LICENSE) के तहत जारी। सर्वाधिकार सुरक्षित © 2026 KS-AAA-AI।',
    }
  },
  'ar': {
    title: 'محرك تخطيط Apex (v3.0)',
    subtitle: 'نظام تخطيط طوبولوجي ذاتي يومي لمنظومة KS-AAA-AI على GitHub.',
    hudSub: 'نظام التخطيط الطوبولوجي الذاتي APEX // V3',
    hudTitle: 'خريطة طوبولوجيا مستودعات KS-AAA-AI',
    totalNodes: 'إجمالي العقد',
    publicDeployed: 'منشور للعامة',
    encryptedVaults: 'خزائن مشفرة',
    primaryStack: 'حزمة التقنيات الرئيسية',
    statusLeft: 'حماية HMAC-SHA256 · إسقاط عام دون كشف البيانات',
    statusRight: 'محرك التنسيق المستقل',
    publicBadge: 'عام',
    vaultBadge: 'خزينة',
    radarTitle: 'القياس الحي والمسح الراداري',
    radarStatus: 'الرادار نشط // فحص مصفوفة النظام',
    radarSystem: 'رادار طوبولوجيا KS-AAA-AI',
    radarFreq: 'التردد: 2.40 جيجاهرتز · متزامن',
    badges: {
      workflow: { label: 'سير العمل', value: 'مهمة مجدولة آلية' },
      license: { label: 'الترخيص', value: 'ترخيص MIT' },
      stack: { label: 'التقنيات', value: 'TypeScript 5.6' },
      security: { label: 'الأمان', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'بنية النظام ومسار المعالجة',
      step1: { title: '1. جلب بيانات GitHub', desc: 'واجهات REST و GraphQL' },
      step2: { title: '2. تعتيم الخزائن المشفرة', desc: 'تجزئة HMAC-SHA256' },
      step3: { title: '3. تجميع المصفوفات', desc: 'التحليل العنقودي والقياس' },
      step4: { title: '4. محرك العرض المزدوج', desc: 'متجه SVG ورادار GIF' },
    },
    doc: {
      overviewTitle: '🏛️ نظرة عامة على النظام والهندسة المعمارية',
      overviewDesc: '**محرك التخطيط Apex** هو نظام متطور وعالي الإنتاجية للقياس عن بُعد ورسم الطوبولوجيا الذاتية لمنظومة **KS-AAA-AI** على GitHub، ويقوم بتحويل بيانات المستودعات إلى شاشة معلومات مصفوفية مع حماية الخصوصية بانعدام المعرفة.',
      feat1Title: 'خزائن الخصوصية بانعدام المعرفة',
      feat1Desc: 'تخضع المستودعات الخاصة لتحويل HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`) لضمان عدم تسريب الأسماء الداخلية والبيانات إطلاقاً.',
      feat2Title: 'تخطيط طوبولوجي حتمي',
      feat2Desc: 'تبقى المعرّفات متسقة ومستقرة عبر أوقات التشغيل المختلفة باستخدام مفتاح التشفير نفسه.',
      feat3Title: 'مسار عرض مزدوج',
      feat3Desc: 'توليد متزامن لرسوم المتجهات عالية الدقة SVG وصور الرادار المتحركة GIF.',
      feat4Title: 'أتمتة المعالجة الذاتية',
      feat4Desc: 'سير عمل GitHub Actions مجدول يومياً (`00:00 بتوقيت كوريا`) مع ميزة التراجع التدريجي لتجنب قيود واجهة برمجة التطبيقات.',
      telemetryTitle: '📡 القياس الحي والمسح الراداري',
      telemetryDesc: 'تمثيل بصري متجدد وديناميكي لحركة الرادار والقياس عن بُعد يتم إنشاؤه بدقة بواسطة المحرك.',
      startTitle: '🛠️ البدء والتشغيل المحلي',
      prereq: 'المتطلبات الأساسية',
      quickstart: 'البدء السريع',
      securityTitle: '🔒 معايير الأمان وضمان الخصوصية',
      sec1: '**صفر تسريب للرموز**: تتم معالجة الرموز في الذاكرة المؤقتة فقط ولا تُكتب أبداً على القرص.',
      sec2: '**تصميم الإغلاق الآمن**: في حال فقدان مفتاح التشفير `MASK_SALT` يتوقف النظام فوراً لحماية البيانات.',
      sec3: '**عزل الموارد المحلية**: تخدم كافة الشارات والرسومات مباشرة من شجرة المستودع دون الاعتماد على شبكات CDN الخارجية.',
      footer: 'مرخص بموجب [ترخيص MIT](../LICENSE). كافة الحقوق محفوظة © 2026 KS-AAA-AI.',
    }
  },
  'pt-BR': {
    title: 'Motor de Cartografia Apex (v3.0)',
    subtitle: 'Cartografia autônoma diária e mapeamento de topologia para o ecossistema KS-AAA-AI.',
    hudSub: 'CARTOGRAFIA AUTÔNOMA APEX // V3',
    hudTitle: 'Topologia de Repositórios KS-AAA-AI',
    totalNodes: 'TOTAL DE NODOS',
    publicDeployed: 'PÚBLICOS IMPLANTADOS',
    encryptedVaults: 'COFRES CRIPTOGRAFADOS',
    primaryStack: 'STACK TECNOLÓGICA',
    statusLeft: 'HMAC-SHA256 PROTEGIDO · PROJEÇÃO PÚBLICA ZERO-KNOWLEDGE',
    statusRight: 'MOTOR DE ORQUESTRAÇÃO AUTÔNOMO',
    publicBadge: 'PÚBLICO',
    vaultBadge: 'COFRE',
    radarTitle: 'TELEMETRIA EM TEMPO REAL E RADAR',
    radarStatus: 'RADAR ATIVO // ESCANEANDO MATRIZ',
    radarSystem: 'RADAR DE TOPOLOGIA KS-AAA-AI',
    radarFreq: 'FREQ: 2.40 GHz · SINCRONIZADO',
    badges: {
      workflow: { label: 'FLUXO', value: 'Cron Autônomo' },
      license: { label: 'LICENÇA', value: 'Licença MIT' },
      stack: { label: 'STACK', value: 'TypeScript 5.6' },
      security: { label: 'SEGURANÇA', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'ARQUITETURA DO SISTEMA E PIPELINE',
      step1: { title: '1. Ingestão do GitHub', desc: 'APIs REST e GraphQL' },
      step2: { title: '2. Ofuscação de Cofres', desc: 'Hash HMAC-SHA256' },
      step3: { title: '3. Agregação de Matriz', desc: 'Agrupamento e Telemetria' },
      step4: { title: '4. Motores de Renderização', desc: 'SVG Vetorial e Radar GIF' },
    },
    doc: {
      overviewTitle: '🏛️ Visão Geral do Sistema e Arquitetura',
      overviewDesc: '**Apex Cartography Engine** é um sistema moderno de telemetria autônoma e visualização de topologia desenvolvido para o ecossistema GitHub de **KS-AAA-AI**. Ele transforma repositórios em um HUD cibernético com garantias criptográficas de conhecimento zero.',
      feat1Title: 'Cofres de Privacidade Zero-Knowledge',
      feat1Desc: 'Repositórios privados passam por transformação HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`), garantindo que identificadores internos nunca sejam expostos publicamente.',
      feat2Title: 'Mapeamento Topológico Determinístico',
      feat2Desc: 'Identificadores permanecem estáveis ao longo do tempo sob a mesma chave criptográfica.',
      feat3Title: 'Pipelines de Renderização Dupla',
      feat3Desc: 'Canvas Vetorial SVG de alta resolução e GIF animado de radar de varredura gerados simultaneamente.',
      feat4Title: 'Automação com Autorrecuperação',
      feat4Desc: 'Fluxo agendado diário no GitHub Actions (`00:00 KST`) com backoff exponencial contra limites de API.',
      telemetryTitle: '📡 Telemetria em Tempo Real e Varredura de Radar',
      telemetryDesc: 'Visualização dinâmica de radar gerada deterministicamente pelo motor de cartografia.',
      startTitle: '🛠️ Começando e Execução Local',
      prereq: 'Pré-requisitos',
      quickstart: 'Início Rápido',
      securityTitle: '🔒 Diretrizes de Segurança e Privacidade',
      sec1: '**Vazamento Zero de Tokens**: Os tokens são processados em memória volátil e nunca gravados em disco.',
      sec2: '**Design Fail-Closed**: Se o `MASK_SALT` for omitido, o pipeline encerra com segurança para proteger os dados.',
      sec3: '**Isolamento de Ativos Locais**: Todos os emblemas e gráficos são carregados do repositório sem CDNs externas.',
      footer: 'Lançado sob a [Licença MIT](../LICENSE). Copyright © 2026 KS-AAA-AI.',
    }
  },
  'ru': {
    title: 'Движок картографии Apex (v3.0)',
    subtitle: 'Автономная ежедневная картография и топологическое картирование экосистемы KS-AAA-AI.',
    hudSub: 'АВТОНОМНАЯ КАРТОГРАФИЯ APEX // V3',
    hudTitle: 'Топология репозиториев KS-AAA-AI',
    totalNodes: 'ВСЕГО УЗЛОВ',
    publicDeployed: 'ПУБЛИЧНЫЕ РАЗВЕРНУТЫЕ',
    encryptedVaults: 'ЗАШИФРОВАННЫЕ ХРАНИЛИЩА',
    primaryStack: 'ОСНОВНОЙ СТЕК',
    statusLeft: 'ЗАЩИТА HMAC-SHA256 · ПУБЛИЧНАЯ ПРОЕКЦИЯ С НУЛЕВЫМ РАЗГЛАШЕНИЕМ',
    statusRight: 'АВТОНОМНЫЙ ДВИЖОК ОРКЕСТРАЦИИ',
    publicBadge: 'ПУБЛИЧНЫЙ',
    vaultBadge: 'ХРАНИЛИЩЕ',
    radarTitle: 'ТЕЛЕМЕТРИЯ И РАДАРНОЕ СКАНИРОВАНИЕ',
    radarStatus: 'РАДАР АКТИВЕН // СКАНИРОВАНИЕ МАТРИЦЫ',
    radarSystem: 'ТОПОЛОГИЧЕСКИЙ РАДАР KS-AAA-AI',
    radarFreq: 'ЧАСТОТА: 2.40 ГГц · СИНХРОНИЗИРОВАНО',
    badges: {
      workflow: { label: 'ПРОЦЕСС', value: 'Автономный Cron' },
      license: { label: 'ЛИЦЕНЗИЯ', value: 'Лицензия MIT' },
      stack: { label: 'СТЕК', value: 'TypeScript 5.6' },
      security: { label: 'БЕЗОПАСНОСТЬ', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'АРХИТЕКТУРА СИСТЕМЫ И ПАЙПЛАЙН',
      step1: { title: '1. Сбор данных GitHub', desc: 'REST и GraphQL API' },
      step2: { title: '2. Обфускация хранилищ', desc: 'Хэширование HMAC-SHA256' },
      step3: { title: '3. Агрегация матрицы', desc: 'Кластеризация и телеметрия' },
      step4: { title: '4. Двойной рендеринг', desc: 'Векторный SVG и радарный GIF' },
    },
    doc: {
      overviewTitle: '🏛️ Обзор системы и архитектура',
      overviewDesc: '**Apex Cartography Engine** — это современная высокопроизводительная система автономной телеметрии и визуализации топологии для экосистемы **KS-AAA-AI** на GitHub. Преобразует состояние репозиториев в кибернетический HUD матрицы с криптографической защитой с нулевым разглашением.',
      feat1Title: 'Хранилища приватности с нулевым разглашением',
      feat1Desc: 'Приватные репозитории проходят трансформацию HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`), исключая утечку внутренних данных.',
      feat2Title: 'Детерминированное картирование',
      feat2Desc: 'Идентификаторы остаются стабильными при использовании одной криптографической соли.',
      feat3Title: 'Двойной пайплайн рендеринга',
      feat3Desc: 'Одновременная генерация векторного Canvas SVG и анимированного сканирующего GIF радара.',
      feat4Title: 'Самовосстанавливающаяся автоматизация',
      feat4Desc: 'Ежедневный воркфлоу GitHub Actions (`00:00 KST`) с экспоненциальной задержкой против лимитов API.',
      telemetryTitle: '📡 Телеметрия в реальном времени и радар',
      telemetryDesc: 'Динамическая визуализация сканирования радара, детерминированно созданная движком картографии.',
      startTitle: '🛠️ Начало работы и локальный запуск',
      prereq: 'Требования',
      quickstart: 'Быстрый старт',
      securityTitle: '🔒 Безопасность и гарантии конфиденциальности',
      sec1: '**Нулевая утечка токенов**: Токены обрабатываются исключительно в оперативной памяти и не сохраняются на диск.',
      sec2: '**Отказоустойчивость**: При отсутствии `MASK_SALT` процесс безопасно останавливается для защиты данных.',
      sec3: '**Изоляция локальных ресурсов**: Все графические элементы поставляются напрямую из репозитория без внешних CDN.',
      footer: 'Выпущено под лицензией [MIT License](../LICENSE). Copyright © 2026 KS-AAA-AI.',
    }
  },
  'fr': {
    title: 'Moteur de Cartographie Apex (v3.0)',
    subtitle: 'Cartographie autonome quotidienne et cartographie de topologie pour l’écosystème KS-AAA-AI.',
    hudSub: 'CARTOGRAPHIE AUTONOME APEX // V3',
    hudTitle: 'Topologie des Dépôts KS-AAA-AI',
    totalNodes: 'TOTAL DES NŒUDS',
    publicDeployed: 'DÉPLOYÉS PUBLICS',
    encryptedVaults: 'COFFRES CHIFFRÉS',
    primaryStack: 'STACK TECHNIQUE',
    statusLeft: 'SÉCURISÉ HMAC-SHA256 · PROJECTION PUBLIQUE SANS DIVULGATION',
    statusRight: 'MOTEUR D\'ORCHESTRATION AUTONOME',
    publicBadge: 'PUBLIC',
    vaultBadge: 'COFFRE',
    radarTitle: 'TÉLÉMÉTRIE EN DIRECT ET RADAR',
    radarStatus: 'RADAR ACTIF // BALAYAGE MATRICE',
    radarSystem: 'RADAR DE TOPOLOGIE KS-AAA-AI',
    radarFreq: 'FREQ: 2.40 GHz · SYNCHRONISÉ',
    badges: {
      workflow: { label: 'WORKFLOW', value: 'Cron Autonome' },
      license: { label: 'LICENCE', value: 'Licence MIT' },
      stack: { label: 'STACK', value: 'TypeScript 5.6' },
      security: { label: 'SÉCURITÉ', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'ARCHITECTURE DU SYSTÈME ET PIPELINE',
      step1: { title: '1. Ingestion GitHub', desc: 'APIs REST et GraphQL' },
      step2: { title: '2. Obfuscation des Coffres', desc: 'Hachage HMAC-SHA256' },
      step3: { title: '3. Agrégation de Matrice', desc: 'Clustering et Télémétrie' },
      step4: { title: '4. Moteurs de Rendu Doubles', desc: 'SVG Vectoriel et GIF Radar' },
    },
    doc: {
      overviewTitle: '🏛️ Vue d’Ensemble du Système et Architecture',
      overviewDesc: '**Apex Cartography Engine** est un système moderne de télémétrie autonome et de visualisation topologique conçu pour l’écosystème GitHub de **KS-AAA-AI**. Il transforme les dépôts en un HUD cybernétique protégé par des preuves à divulgation nulle de connaissance.',
      feat1Title: 'Coffres Privés à Preuve Nulle',
      feat1Desc: 'Les dépôts privés subissent une transformation HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`), garantissant l’absence totale de fuite.',
      feat2Title: 'Cartographie Topologique Déterministe',
      feat2Desc: 'Les identifiants restent constants à chaque exécution sous le même sel cryptographique.',
      feat3Title: 'Double Pipeline de Rendu',
      feat3Desc: 'Génération simultanée de SVG vectoriel ultra-précis et de GIF radar animé.',
      feat4Title: 'Automatisation Auto-Cicatrisante',
      feat4Desc: 'Workflow GitHub Actions quotidien (`00:00 KST`) avec repli exponentiel contre les limitations d\'API.',
      telemetryTitle: '📡 Télémétrie en Direct et Balayage Radar',
      telemetryDesc: 'Représentation visuelle animée du balayage radar générée de façon déterministe.',
      startTitle: '🛠️ Prise en Main et Exécution Locale',
      prereq: 'Prérequis',
      quickstart: 'Démarrage Rapide',
      securityTitle: '🔒 Garde-fous de Sécurité et Confidentialité',
      sec1: '**Zéro Fuite de Jeton**: Les jetons sont analysés uniquement en mémoire éphémère et jamais écrits sur disque.',
      sec2: '**Conception Fail-Closed**: En l\'absence de `MASK_SALT`, le pipeline s\'interrompt immédiatement par sécurité.',
      sec3: '**Isolation des Ressources Locales**: Tous les badges et graphiques sont servis directement sans CDN tiers.',
      footer: 'Publié sous la [Licence MIT](../LICENSE). Copyright © 2026 KS-AAA-AI.',
    }
  },
  'id': {
    title: 'Mesin Kartografi Apex (v3.0)',
    subtitle: 'Kartografi otonom harian dan pemetaan topologi untuk ekosistem KS-AAA-AI.',
    hudSub: 'KARTOGRAFI OTONOM APEX // V3',
    hudTitle: 'Topologi Repositori KS-AAA-AI',
    totalNodes: 'TOTAL NODE',
    publicDeployed: 'PUBLIK TERSEBAR',
    encryptedVaults: 'BRANKAS TERENKRIPSI',
    primaryStack: 'STACK TEKNOLOGI',
    statusLeft: 'DIAMANKAN HMAC-SHA256 · PROYEKSI PUBLIK ZERO-KNOWLEDGE',
    statusRight: 'MESIN ORKESTRASI OTONOM',
    publicBadge: 'PUBLIK',
    vaultBadge: 'BRANKAS',
    radarTitle: 'TELEMETRI LANGSUNG & RADAR',
    radarStatus: 'RADAR AKTIF // MEMINDAI MATRIKS',
    radarSystem: 'RADAR TOPOLOGI KS-AAA-AI',
    radarFreq: 'FREQ: 2.40 GHz · TERSINKRONISASI',
    badges: {
      workflow: { label: 'ALUR KERJA', value: 'Cron Otonom' },
      license: { label: 'LISENSI', value: 'Lisensi MIT' },
      stack: { label: 'STACK', value: 'TypeScript 5.6' },
      security: { label: 'KEAMANAN', value: 'HMAC-SHA256' },
    },
    architecture: {
      title: 'ARSITEKTUR SISTEM & ALUR KERJA',
      step1: { title: '1. Pengambilan Data GitHub', desc: 'API REST & GraphQL' },
      step2: { title: '2. Pengaburan Brankas', desc: 'Hash HMAC-SHA256' },
      step3: { title: '3. Agregasi Matriks', desc: 'Pengelompokan & Telemetri' },
      step4: { title: '4. Mesin Render Ganda', desc: 'SVG Vektor & GIF Radar' },
    },
    doc: {
      overviewTitle: '🏛️ Ringkasan Sistem & Arsitektur',
      overviewDesc: '**Apex Cartography Engine** adalah sistem telemetri otonom dan visualisasi topologi modern yang disesuaikan untuk ekosistem GitHub **KS-AAA-AI**. Mengubah repositori menjadi HUD matriks sibernetik dengan perlindungan kriptografi zero-knowledge.',
      feat1Title: 'Brankas Privasi Zero-Knowledge',
      feat1Desc: 'Repositori privat melalui transformasi HMAC-SHA256 (`APEX-VAULT-XXXXXXXX`), memastikan informasi rahasia tidak pernah terekspos ke publik.',
      feat2Title: 'Pemetaan Topologi Deterministik',
      feat2Desc: 'Pengidentifikasi tetap konsisten di setiap generasi di bawah garam kriptografi yang sama.',
      feat3Title: 'Alur Render Ganda',
      feat3Desc: 'Menghasilkan Kanvas Vektor SVG berdensitas tinggi dan GIF animasi radar pemindai secara bersamaan.',
      feat4Title: 'Otomasi Pemulihan Mandiri',
      feat4Desc: 'Alur kerja GitHub Actions harian yang dijadwalkan (`00:00 KST`) dengan backoff eksponensial terhadap batas API.',
      telemetryTitle: '📡 Telemetri Langsung & Pemindaian Radar',
      telemetryDesc: 'Representasi visual radar dan telemetri dinamis yang dihasilkan secara deterministik.',
      startTitle: '🛠️ Memulai & Eksekusi Lokal',
      prereq: 'Prasyarat',
      quickstart: 'Panduan Cepat',
      securityTitle: '🔒 Batasan Keamanan & Privasi',
      sec1: '**Nol Kebocoran Token**: Token hanya dievaluasi dalam memori sementara dan tidak pernah disimpan ke disk.',
      sec2: '**Desain Fail-Closed**: Jika `MASK_SALT` hilang dalam proses produksi, pipeline akan berhenti demi keamanan.',
      sec3: '**Isolasi Aset Lokal**: Semua lencana dan grafik disajikan langsung dari repositori tanpa CDN pelacak eksternal.',
      footer: 'Dirilis di bawah [Lisensi MIT](../LICENSE). Hak Cipta © 2026 KS-AAA-AI.',
    }
  }
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function renderBadgeSvg(label: string, value: string, valueColor = '#00F2FE'): string {
  const lLen = label.length;
  const vLen = value.length;
  const leftWidth = Math.max(75, Math.min(115, Math.round(lLen * 8.5 + 24)));
  const rightWidth = Math.max(95, Math.min(145, Math.round(vLen * 8.5 + 24)));
  const totalWidth = leftWidth + rightWidth;
  const leftMid = Math.round(leftWidth / 2);
  const rightMid = leftWidth + Math.round(rightWidth / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="26" viewBox="0 0 ${totalWidth} 26">
  <rect width="${totalWidth}" height="26" rx="6" fill="#070B12" stroke="#1E293B" stroke-width="1"/>
  <rect x="0" y="0" width="${leftWidth}" height="26" rx="6" fill="#0E1626"/>
  <rect x="${leftWidth - 6}" y="0" width="6" height="26" fill="#0E1626"/>
  <text x="${leftMid}" y="17" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="0.5">${escapeXml(label)}</text>
  <text x="${rightMid}" y="17" fill="${valueColor}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${escapeXml(value)}</text>
</svg>`;
}

export function renderArchitectureSvg(localeCode: string): string {
  const i18n = I18N_DATA[localeCode] || I18N_DATA['en'];
  const arch = i18n.architecture;

  const steps = [
    { num: '01', title: arch.step1.title, desc: arch.step1.desc, col: '#38BDF8', fill: '#0E172A' },
    { num: '02', title: arch.step2.title, desc: arch.step2.desc, col: '#10B981', fill: '#061D1E' },
    { num: '03', title: arch.step3.title, desc: arch.step3.desc, col: '#F59E0B', fill: '#1F1A0A' },
    { num: '04', title: arch.step4.title, desc: arch.step4.desc, col: '#818CF8', fill: '#16132E' },
  ];

  let boxes = '';
  const boxWidth = 190;
  const boxGap = 20;
  const startX = 30;

  steps.forEach((s, idx) => {
    const x = startX + idx * (boxWidth + boxGap);
    boxes += `
    <g transform="translate(${x}, 85)">
      <rect width="${boxWidth}" height="100" rx="10" fill="${s.fill}" stroke="${s.col}" stroke-width="1.5" opacity="0.95"/>
      <rect x="12" y="12" width="28" height="20" rx="4" fill="${s.col}" fill-opacity="0.15"/>
      <text x="26" y="26" fill="${s.col}" font-family="Consolas, monospace" font-size="11" font-weight="800" text-anchor="middle">${s.num}</text>
      <text x="14" y="54" fill="#F8FAFC" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700">${escapeXml(s.title)}</text>
      <text x="14" y="76" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="11">${escapeXml(s.desc)}</text>
    </g>`;

    if (idx < steps.length - 1) {
      const arrowX = x + boxWidth + 4;
      boxes += `
      <g transform="translate(${arrowX}, 130)">
        <line x1="0" y1="0" x2="12" y2="0" stroke="#475569" stroke-width="2"/>
        <polygon points="12,-4 16,0 12,4" fill="#475569"/>
      </g>`;
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 870 215" width="100%" height="100%">
  <defs>
    <linearGradient id="archBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070B12"/>
      <stop offset="100%" stop-color="#0A101D"/>
    </linearGradient>
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F2FE"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>

  <rect width="870" height="215" rx="16" fill="url(#archBg)" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Top Header -->
  <g transform="translate(30, 42)">
    <circle cx="6" cy="0" r="5" fill="#10B981"/>
    <text x="20" y="4" fill="url(#neonCyan)" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">${escapeXml(arch.title)}</text>
    <text x="810" y="4" fill="#475569" font-family="Consolas, monospace" font-size="11" text-anchor="end">4-STAGE PIPELINE</text>
  </g>

  <!-- 4 Step Boxes -->
  ${boxes}
</svg>`;
}

export function renderTopologySvg(localeCode: string, summary: any, nodes: any[]): string {
  const i18n = I18N_DATA[localeCode] || I18N_DATA['en'];
  const width = 1000;
  const height = 480;

  const topLangs = Object.entries(summary.languageDistribution)
    .filter(([lang]) => lang !== 'CLASSIFIED')
    .slice(0, 4)
    .map(([lang, count]) => `${lang} (${count})`)
    .join('  ·  ');

  let rowsSvg = '';
  const startY = 220;

  nodes.slice(0, 10).forEach((node, i) => {
    const y = startY + i * 42;
    const isVault = node.isPrivate;
    const cardBg = isVault ? '#0F172A' : '#111C2E';
    const borderCol = isVault ? '#334155' : '#0284C7';
    const textCol = isVault ? '#94A3B8' : '#38BDF8';
    const badgeCol = isVault ? '#F43F5E' : '#10B981';
    const badgeText = isVault ? i18n.vaultBadge : i18n.publicBadge;

    rowsSvg += `
    <g transform="translate(40, ${y})">
      <rect width="920" height="36" rx="8" fill="${cardBg}" stroke="${borderCol}" stroke-width="1.2" opacity="0.95"/>
      <circle cx="20" cy="18" r="4" fill="${badgeCol}"/>
      <text x="36" y="23" fill="${textCol}" font-family="Consolas, Monaco, monospace" font-size="14" font-weight="600">${escapeXml(node.identifier)}</text>
      <rect x="740" y="8" width="70" height="20" rx="5" fill="#1E293B"/>
      <text x="775" y="22" fill="${badgeCol}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${escapeXml(badgeText)}</text>
      <text x="890" y="23" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="12" text-anchor="end">${escapeXml(node.relativeActivity)}</text>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
  <defs>
    <linearGradient id="apexBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070B12"/>
      <stop offset="60%" stop-color="#0A101D"/>
      <stop offset="100%" stop-color="#05080E"/>
    </linearGradient>
    <linearGradient id="neonAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F2FE"/>
      <stop offset="50%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" rx="24" fill="url(#apexBg)"/>
  <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="22.5" fill="none" stroke="#1E293B" stroke-width="2"/>

  <!-- Top Header HUD -->
  <g transform="translate(40, 45)">
    <text x="0" y="0" fill="url(#neonAccent)" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="2">${escapeXml(i18n.hudSub)}</text>
    <text x="0" y="32" fill="#F8FAFC" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800">${escapeXml(i18n.hudTitle)}</text>
    <text x="${width - 80}" y="20" fill="#64748B" font-family="Consolas, monospace" font-size="12" text-anchor="end">SYNC: ${escapeXml(summary.generatedAt.split('T')[0])}</text>
  </g>

  <!-- Metrics Chips -->
  <g transform="translate(40, 115)">
    <!-- Total Chip -->
    <rect x="0" y="0" width="180" height="68" rx="12" fill="#0F172A" stroke="#1E293B"/>
    <text x="20" y="26" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">${escapeXml(i18n.totalNodes)}</text>
    <text x="20" y="55" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">${summary.totalNodes}</text>

    <!-- Public Chip -->
    <rect x="200" y="0" width="180" height="68" rx="12" fill="#0F172A" stroke="#1E293B"/>
    <text x="220" y="26" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">${escapeXml(i18n.publicDeployed)}</text>
    <text x="220" y="55" fill="#10B981" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">${summary.publicCount}</text>

    <!-- Vault Chip -->
    <rect x="400" y="0" width="180" height="68" rx="12" fill="#0F172A" stroke="#1E293B"/>
    <text x="420" y="26" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">${escapeXml(i18n.encryptedVaults)}</text>
    <text x="420" y="55" fill="#F43F5E" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">${summary.vaultCount}</text>

    <!-- Tech Stack Summary -->
    <rect x="600" y="0" width="320" height="68" rx="12" fill="#0F172A" stroke="#1E293B"/>
    <text x="620" y="26" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">${escapeXml(i18n.primaryStack)}</text>
    <text x="620" y="52" fill="#E2E8F0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">${escapeXml(topLangs || 'TypeScript · Python')}</text>
  </g>

  <!-- Topology Node Rows -->
  ${rowsSvg}

  <!-- Footer Status Bar -->
  <g transform="translate(40, ${height - 25})">
    <line x1="0" y1="0" x2="920" y2="0" stroke="#1E293B" stroke-width="1"/>
    <text x="0" y="16" fill="#475569" font-family="Consolas, monospace" font-size="10">${escapeXml(i18n.statusLeft)}</text>
    <text x="920" y="16" fill="#475569" font-family="system-ui, -apple-system, sans-serif" font-size="10" text-anchor="end">${escapeXml(i18n.statusRight)}</text>
  </g>
</svg>`;
}

export async function generateRadarGif(localeCode: string): Promise<Buffer> {
  const i18n = I18N_DATA[localeCode] || I18N_DATA['en'];
  const width = 480;
  const height = 240;
  const frameCount = 16;
  const gif = GIFEncoder();

  for (let f = 0; f < frameCount; f++) {
    const scanAngle = (f / frameCount) * 360;
    const scanY = (f / frameCount) * height;
    const pulseR = 25 + Math.sin((f / frameCount) * Math.PI * 2) * 20;

    const svgFrame = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#070B14"/>
          <stop offset="100%" stop-color="#0D1527"/>
        </linearGradient>
      </defs>

      <!-- Base Dark Matrix Canvas -->
      <rect width="${width}" height="${height}" rx="12" fill="url(#bgGrad)"/>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="11" fill="none" stroke="#1E293B" stroke-width="1.5"/>

      <!-- Matrix Grid Lines -->
      <g stroke="#162238" stroke-width="1" opacity="0.6">
        <line x1="60" y1="0" x2="60" y2="${height}"/>
        <line x1="120" y1="0" x2="120" y2="${height}"/>
        <line x1="180" y1="0" x2="180" y2="${height}"/>
        <line x1="240" y1="0" x2="240" y2="${height}"/>
        <line x1="300" y1="0" x2="300" y2="${height}"/>
        <line x1="360" y1="0" x2="360" y2="${height}"/>
        <line x1="420" y1="0" x2="420" y2="${height}"/>
        <line x1="0" y1="60" x2="${width}" y2="60"/>
        <line x1="0" y1="120" x2="${width}" y2="120"/>
        <line x1="0" y1="180" x2="${width}" y2="180"/>
      </g>

      <!-- Center Radar Circles -->
      <g transform="translate(240, 120)">
        <circle cx="0" cy="0" r="85" fill="none" stroke="#1E3A5F" stroke-width="1" stroke-dasharray="3,3"/>
        <circle cx="0" cy="0" r="55" fill="none" stroke="#0284C7" stroke-width="1" opacity="0.5"/>
        <circle cx="0" cy="0" r="25" fill="none" stroke="#00F2FE" stroke-width="1.2" opacity="0.8"/>
        <circle cx="0" cy="0" r="${pulseR}" fill="none" stroke="#38BDF8" stroke-width="1" opacity="0.6"/>
        <circle cx="0" cy="0" r="3" fill="#00F2FE"/>

        <!-- Radar Sweep Line -->
        <g transform="rotate(${scanAngle})">
          <line x1="0" y1="0" x2="85" y2="0" stroke="#00F2FE" stroke-width="2"/>
          <polygon points="0,0 85,-15 85,0" fill="#00F2FE" opacity="0.18"/>
        </g>

        <!-- Simulated Active Node Blips -->
        <circle cx="-42" cy="-30" r="2.5" fill="#10B981" opacity="${(f % 4) > 1 ? 0.9 : 0.2}"/>
        <circle cx="38" cy="22" r="2.5" fill="#38BDF8" opacity="${(f % 3) === 0 ? 0.9 : 0.3}"/>
        <circle cx="50" cy="-45" r="2.5" fill="#F43F5E" opacity="${(f % 5) < 3 ? 0.8 : 0.1}"/>
      </g>

      <!-- Horizontal Scan Laser -->
      <line x1="10" y1="${scanY}" x2="${width - 10}" y2="${scanY}" stroke="#38BDF8" stroke-width="1.5" opacity="0.45"/>

      <!-- HUD Top Header -->
      <g transform="translate(20, 26)">
        <circle cx="0" cy="-3" r="3.5" fill="#10B981"/>
        <text x="10" y="0" fill="#F8FAFC" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" letter-spacing="0.8">${escapeXml(i18n.radarSystem)}</text>
        <text x="${width - 40}" y="0" fill="#64748B" font-family="Consolas, monospace" font-size="9" text-anchor="end">${escapeXml(i18n.radarFreq)}</text>
      </g>

      <!-- HUD Bottom Telemetry Banner -->
      <g transform="translate(20, ${height - 16})">
        <rect x="-6" y="-14" width="${width - 28}" height="18" rx="4" fill="#091122" stroke="#1E293B" stroke-width="1"/>
        <text x="6" y="-1" fill="#00F2FE" font-family="Consolas, system-ui, -apple-system, sans-serif" font-size="10" font-weight="700">${escapeXml(i18n.radarStatus)}</text>
        <text x="${width - 46}" y="-1" fill="#10B981" font-family="Consolas, monospace" font-size="9" text-anchor="end">LOC: ${localeCode.toUpperCase()} · F:${f + 1}/16</text>
      </g>
    </svg>`;

    const { data } = await sharp(Buffer.from(svgFrame))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const palette = quantize(data, 128);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, width, height, {
      palette,
      delay: 80,
      repeat: 0,
    });
  }

  gif.finish();
  return Buffer.from(gif.bytes());
}

export function buildNavBar(currentLocaleCode: string): string {
  const isCurrentRoot = currentLocaleCode === 'en';
  const links = LOCALES.map(loc => {
    if (loc.code === currentLocaleCode) {
      return `<strong>${loc.flag} ${loc.name}</strong>`;
    }
    const targetHref = isCurrentRoot
      ? (loc.isRoot ? 'README.md' : loc.path)
      : (loc.isRoot ? '../README.md' : path.basename(loc.path));
    return `<a href="${targetHref}">${loc.flag} ${loc.name}</a>`;
  });

  return `<p align="center">\n  ${links.join(' · \n  ')}\n</p>`;
}

export function renderMarkdownDoc(locale: LocaleMeta): string {
  const i18n = I18N_DATA[locale.code] || I18N_DATA['en'];
  const d = i18n.doc;
  const isRoot = locale.isRoot;
  const assetBase = isRoot ? './assets/locales' : '../assets/locales';
  const langAssetDir = `${assetBase}/${locale.code}`;
  const navBar = buildNavBar(locale.code);
  const rtlWrapperOpen = locale.isRTL ? '<div dir="rtl">\n\n' : '';
  const rtlWrapperClose = locale.isRTL ? '\n\n</div>' : '';

  return `${rtlWrapperOpen}<div align="center">

# 🛰️ ${i18n.title}

<p>
  <strong>${i18n.subtitle}</strong>
</p>

${navBar}

<p align="center">
  <img src="${langAssetDir}/badges/badge-workflow.svg" alt="Workflow" />
  <img src="${langAssetDir}/badges/badge-license.svg" alt="License" />
  <img src="${langAssetDir}/badges/badge-stack.svg" alt="Stack" />
  <img src="${langAssetDir}/badges/badge-security.svg" alt="Security" />
</p>

<p align="center">
  <picture>
    <source srcset="${langAssetDir}/org-map.svg" type="image/svg+xml" />
    <img src="${langAssetDir}/org-map.svg" alt="${i18n.hudTitle}" width="100%" />
  </picture>
</p>

</div>

---

<details>
<summary><h3 style="display:inline-block; margin:0; cursor:pointer;">${d.overviewTitle}</h3></summary>
<br />

${d.overviewDesc}

<p align="center">
  <picture>
    <source srcset="${langAssetDir}/architecture.svg" type="image/svg+xml" />
    <img src="${langAssetDir}/architecture.svg" alt="${i18n.architecture.title}" width="100%" />
  </picture>
</p>

1. **${d.feat1Title}**: ${d.feat1Desc}
2. **${d.feat2Title}**: ${d.feat2Desc}
3. **${d.feat3Title}**: ${d.feat3Desc}
4. **${d.feat4Title}**: ${d.feat4Desc}

</details>

---

<details>
<summary><h3 style="display:inline-block; margin:0; cursor:pointer;">${d.telemetryTitle}</h3></summary>
<br />

${d.telemetryDesc}

<p align="center">
  <picture>
    <source srcset="${langAssetDir}/org-map.gif" type="image/gif" />
    <img src="${langAssetDir}/org-map.gif" alt="${i18n.radarTitle}" width="80%" />
  </picture>
</p>

</details>

---

<details>
<summary><h3 style="display:inline-block; margin:0; cursor:pointer;">${d.startTitle}</h3></summary>
<br />

### ${d.prereq}
- Node.js >= 20
- npm / pnpm / yarn

### ${d.quickstart}
\`\`\`bash
# Clone the repository
git clone https://github.com/KS-AAA-AI/github-org-map.git
cd github-org-map

# Install dependencies
npm install

# Run autonomous pipeline
export GITHUB_TOKEN="your_personal_token"
export MASK_SALT="your_cryptographic_salt"
npm run generate
\`\`\`

</details>

---

<details>
<summary><h3 style="display:inline-block; margin:0; cursor:pointer;">${d.securityTitle}</h3></summary>
<br />

- ${d.sec1}
- ${d.sec2}
- ${d.sec3}

</details>

---

<div align="center">
<sub>${d.footer}</sub>
</div>${rtlWrapperClose}
`;
}

async function main(): Promise<void> {
  console.log('🚀 Starting Multilingual TypeScript Cartography Pipeline...');

  const summary = {
    owner: 'KS-AAA-AI',
    totalNodes: 2,
    publicCount: 2,
    vaultCount: 0,
    languageDistribution: { 'TypeScript': 1, 'Plain': 1 },
    generatedAt: new Date().toISOString()
  };

  const nodes = [
    {
      identifier: 'github-org-map',
      isPrivate: false,
      relativeActivity: new Date().toISOString().split('T')[0]
    },
    {
      identifier: 'KS-AAA-AI',
      isPrivate: false,
      relativeActivity: new Date().toISOString().split('T')[0]
    }
  ];

  await mkdir(path.join(ROOT, 'locales'), { recursive: true });
  await mkdir(path.join(ROOT, 'assets', 'locales'), { recursive: true });

  for (const loc of LOCALES) {
    console.log(`\n▶ Processing [${loc.flag} ${loc.code}] (${loc.name})...`);
    const locAssetDir = path.join(ROOT, 'assets', 'locales', loc.code);
    const badgesDir = path.join(locAssetDir, 'badges');
    await mkdir(locAssetDir, { recursive: true });
    await mkdir(badgesDir, { recursive: true });

    const i18n = I18N_DATA[loc.code];

    const badgeW = renderBadgeSvg(i18n.badges.workflow.label, i18n.badges.workflow.value, '#00F2FE');
    const badgeL = renderBadgeSvg(i18n.badges.license.label, i18n.badges.license.value, '#38BDF8');
    const badgeS = renderBadgeSvg(i18n.badges.stack.label, i18n.badges.stack.value, '#818CF8');
    const badgeSec = renderBadgeSvg(i18n.badges.security.label, i18n.badges.security.value, '#10B981');

    await writeFile(path.join(badgesDir, 'badge-workflow.svg'), badgeW, 'utf-8');
    await writeFile(path.join(badgesDir, 'badge-license.svg'), badgeL, 'utf-8');
    await writeFile(path.join(badgesDir, 'badge-stack.svg'), badgeS, 'utf-8');
    await writeFile(path.join(badgesDir, 'badge-security.svg'), badgeSec, 'utf-8');

    const archSvg = renderArchitectureSvg(loc.code);
    await writeFile(path.join(locAssetDir, 'architecture.svg'), archSvg, 'utf-8');

    const mapSvg = renderTopologySvg(loc.code, summary, nodes);
    await writeFile(path.join(locAssetDir, 'org-map.svg'), mapSvg, 'utf-8');

    console.log(`  └ Compiling animated radar GIF for ${loc.code}...`);
    const radarGif = await generateRadarGif(loc.code);
    await writeFile(path.join(locAssetDir, 'org-map.gif'), radarGif);

    const docContent = renderMarkdownDoc(loc);
    const targetDocPath = path.join(ROOT, loc.path);
    await writeFile(targetDocPath, docContent, 'utf-8');
    console.log(`  ✔ Markdown & Assets emitted: ${loc.path}`);
  }

  const enAssetDir = path.join(ROOT, 'assets', 'locales', 'en');
  const rootSvg = await readFile(path.join(enAssetDir, 'org-map.svg'));
  const rootGif = await readFile(path.join(enAssetDir, 'org-map.gif'));
  await writeFile(path.join(ROOT, 'org-map.svg'), rootSvg);
  await writeFile(path.join(ROOT, 'org-map.gif'), rootGif);

  console.log('\n🎉 [Success] All 10 Locales Generated (100% TypeScript Pipeline)!');
}

main().catch(err => {
  console.error('❌ TypeScript pipeline failed:', err);
  process.exit(1);
});
