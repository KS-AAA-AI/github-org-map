# 🛰️ Apex 토폴로지 엔진 아키텍처 명세서 (한국어)

## 1. 시스템 설계 목적
**Apex Cartography Engine**은 KS-AAA-AI 생태계의 모든 리포지토리를 자율적으로 탐색하고, 비공개 프로젝트의 보안을 완벽히 수호하면서 공개 대시보드에 살아있는 토폴로지 맵을 제공하는 차세대 텔레메트리 파이프라인입니다.

---

## 2. 3대 핵심 모듈 설계

### 1) Repository Collector (`src/core/collector.ts`)
- GitHub REST API v3 기반의 지능형 페이징 수집기.
- 지수 백오프(Exponential Backoff) 알고리즘을 내장하여 API 속도 제한(429/403) 발생 시 자동 재시도 및 대기.

### 2) Vault Obfuscator (`src/core/obfuscator.ts`)
- HMAC-SHA256 암호화 알고리즘 기반의 프라이빗 저장소 식별자 마스킹.
- 솔트(Salt) 키를 조합하여 동일 저장소에 대해 항상 일관된 `APEX-VAULT-XXXXXXXX` 고유 해시 라벨을 부여.
- 비공개 코드베이스의 명칭, 설명, 토픽 정보의 외부 노출을 원천 차단.

### 3) Dual Visual Renderer (`src/render/`)
- **VectorCanvasRenderer**: 네온 사이버펑크 HUD 테마의 초고해상도 반응형 SVG 렌더러.
- **MotionEncoder**: 생태계 활성화를 시각화하는 16프레임 레이더 스캔 애니메이션 GIF 인코더.

---

## 3. GitHub Actions 자동화 파이프라인
매일 한국 시간 00:00(15:00 UTC)에 GitHub Actions 러너가 깨어나 최신 저장소 상태를 읽고 토폴로지 맵과 히스토리를 갱신하여 자동 커밋합니다.
