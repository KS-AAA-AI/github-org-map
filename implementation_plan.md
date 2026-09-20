# [Windows Performance & GitHub Multi-Account] Integrated Implementation Plan (current: v7)

## 📜 Version Changelog & Diffs
- **v1**: 1차 시스템 정밀 진단 결과 분석 및 카테고리별 성능 최적화 실행 계획 수립 (+120, -0)
- **v2**: 사용자 정렬 완료 - 서비스 비활성화(SysMain/DiagTrack/WSearch), Edge 백그라운드 튜닝, OSLink 유지, SSD TRIM, Defender I/O 제외, 시각 효과 최적화 확정 (+85, -0)
- **v3**: 타 PC 벤치마크 비교 완료 - DoSvc 비활성화, 3대 반응성 레지스트리(MenuShowDelay, SystemResponsiveness, NetworkThrottlingIndex), 1.32GB 업데이트 캐시 청소 통합 (+95, -0)
- **v4**: 바이브 코딩(Vibe Coding) 특화 워크스테이션 튜닝 - SystemResponsiveness(0->10), 백그라운드 PowerThrottling 차단, Win32PrioritySeparation(38=Long Fixed Quanta) 적용 (+75, -0)
- **v5**: 창 최소화/최대화 시각 애니메이션 복원 - MinAnimate(0->1) 및 시스템 브로드캐스트 적용 (+25, -0)
- **v6**: 다중 GitHub 계정 환경 및 전역 바이브 코딩(Vibe Coding) 연동 체계 구축 (+65, -0)
- **v7**: github-org-map 10개국어 다국어화 및 언어별 SVG/GIF 독립 에셋 파이프라인 구축 (+140, -0)
- **v8**: KS-AAA-AI/github-org-map-private 비공개(Private) 레포지토리 구축, 독립 로컬 워크스페이스 분리, 이중 보안 암호화 마스킹 유지, 내부 전용 자동화 동기화 액션 워크플로 구성 (+120, -0)

---
## 🏛️ [v1 Specification] 1차 시스템 진단 및 최적화 후보군 설계

### 1. 시스템 현황 정밀 진단 요약
- **운영체제**: Microsoft Windows 10 IoT Enterprise LTSC (Build 19044, 64-bit)
  - 특징: 불필요한 기본 번들 앱(Bloatware)이 거의 없는 경량 LTSC 버전.
- **하드웨어 사양**:
  - CPU: 12th Gen Intel Core i3-1220P (8코어 8스레드)
  - RAM: 16 GB (여유: 약 12 GB, 사용률 약 27%로 메모리 병목 없음)
  - 스토리지: QEMU 가상 SSD 95.7 GB (여유: 64.4 GB / 67.2% 잔여)
  - 전원 관리 옵션: `Ultimate Performance` (최고의 성능) 기적용 상태.
- **리소스 점유 상위 항목**:
  - `MsMpEng` (Windows Defender 실시간 보호): 메모리 약 460 MB 점유, CPU 누적 시간 820초 이상.
  - `ldremote.exe` (OSLink / LDPlayer 원격 백그라운드): 메모리 162.7 MB 상시 점유.
  - `SearchApp.exe` / `WSearch` (Windows Search 인덱싱): 메모리 170 MB 점유 중 (현재 초고속 검색 도구인 Everything이 이미 설치되어 있어 중복 리소스 소모).
  - `SysMain` (구 Superfetch): SSD 환경에서 불필요한 캐싱 I/O 발생.
  - `DiagTrack` (텔레메트리/원격 측정 데이터 수집): 백그라운드 자동 실행 중.

---

### 2. 성능 최적화 추천 패키지 (분야별 세부 계획)

#### [Area 1] 불필요한 백그라운드 서비스 최적화 (I/O 및 CPU 부하 경감)
- **SysMain (Superfetch) 비활성화**: SSD에서는 메모리/디스크 I/O 낭비 방지를 위해 중지 및 사용 안 함 처리.
- **DiagTrack (연결된 사용자 환경 및 원격 분석)**: 마이크로소프트 텔레메트리 데이터 수집 서비스 중지 및 비활성화로 네트워크/CPU 자원 보존.
- **Windows Search (WSearch) 조정**: Everything이 설치되어 있으므로, 백그라운드 지속 인덱싱을 비활성화하거나 수동 전환하여 디스크 수명 및 백그라운드 I/O 대폭 절감.

#### [Area 2] 시작 프로그램 및 백그라운드 앱 슬림화
- **OSLink (ldremote.exe)**: LDPlayer 원격 앱을 사용하지 않을 때 시작 시 자동 실행되지 않도록 레지스트리 시작 항목 해제 (필요할 때만 수동 실행).
- **Microsoft Edge 백그라운드 실행/부스트 비활성화**: 시스템 부팅 시 Edge 프리로딩 및 백그라운드 확장프로그램 실행 차단.

#### [Area 3] 디스크 및 스토리지 최적화
- **SSD TRIM 실행**: `Optimize-Volume -DriveLetter C -ReTrim` 수행으로 SSD 블록 정리 및 쓰기 속도 향상.
- **Windows Update 클린업 및 시스템 파일 무결성 검사**: `Dism.exe` 컴포넌트 정리 및 `sfc /scannow` 검사로 손상 파일 복구 및 스토리지 확보.

#### [Area 4] 개발 및 파일 I/O 반응 속도 개선 (Defender 예외 설정)
- **Windows Defender 개발 폴더 제외**: 대규모 I/O가 발생하는 작업 디렉터리(`C:\Users\Administrator\Desktop\New_work` 등)를 Defender 실시간 검사 제외 항목에 등록하여 빌드/파일 입출력 지연 제거.

#### [Area 5] 윈도우 시각 효과 및 반응성 미세 조정
- **시각 효과 조정**: 윈도우 창 애니메이션, 작업 표시줄 애니메이션 등 불필요한 딜레이 요소를 끄고, 폰트 가독성(ClearType)과 아이콘 썸네일만 남겨 UI 반응 속도 즉각 향상.

---

### 3. 신규 커스텀 스킬 제안 (Self-Evolution 규격)
- **스킬명**: `windows-system-performance-optimizer`
- **설명**: 윈도우 OS 시스템 리소스(CPU/RAM/SSD) 정밀 진단, 불필요 서비스(SysMain, DiagTrack, WSearch) 튜닝, 시작프로그램 정리, Defender 개발 디렉터리 I/O 최적화, 시각효과 경량화 자동화 가이드
- **자율성 범위 결정 필요**: 에이전트가 단독으로 스킬 파일 생성/검증까지 수행할지, 사용자 검토를 거쳐 단계별로 진행할지 여부.

---

## 🚀 [v2 Specification] 2차 사용자 피드백 반영 및 최종 확정 실행안

사용자 선택 및 정렬 결과에 따라 다음 5개 핵심 최적화 작업을 확정하여 실행합니다:

### 1. 백그라운드 서비스 최적화 (I/O 및 RAM 절약)
- `SysMain`: 서비스 중지 및 `StartupType = Disabled` (SSD 환경 불필요 I/O 제거)
- `DiagTrack`: 서비스 중지 및 `StartupType = Disabled` (텔레메트리 백그라운드 통신 차단)
- `WSearch`: 서비스 중지 및 `StartupType = Disabled` (Everything 검색기 사용에 따른 중복 인덱싱 제거)

### 2. 시작 프로그램 및 백그라운드 브라우저 부스트 조정
- `OSLink (ldremote.exe)`: 사용자 결정에 따라 **현행 유지 (변경 없음)**
- `Microsoft Edge`: 
  - `HKLM\SOFTWARE\Policies\Microsoft\Edge` 정책 추가:
    - `StartupBoostEnabled = 0` (백그라운드 사전 기동 해제)
    - `BackgroundModeEnabled = 0` (브라우저 종료 후 백그라운드 앱 계속 실행 해제)
  - `MicrosoftEdgeAutoLaunch` 시작프로그램 등록 해제

### 3. 디스크 및 스토리지 최적화
- `C:` 드라이브(SSD)에 대해 TRIM 최적화 수행 (`Optimize-Volume -DriveLetter C -ReTrim -Verbose`)
- 잔여 임시 파일(Temp) 안전 정리

### 4. 개발 환경 I/O 지연 제거 (Windows Defender 예외 등록)
- PowerShell `Add-MpPreference -ExclusionPath "C:\Users\Administrator\Desktop"` 실행
- 데스크톱 작업 디렉터리 내 빌드, 패키지 설치, 스크립트 실행 시 MsMpEng 실시간 감시 병목 해소

### 5. UI 반응성 최적화 (시각 효과 조정)
- 창 최소화/최대화 애니메이션, 컨트롤 애니메이션 끄기
- 글꼴 가장자리 다듬기(Smooth Edge of Screen Fonts)는 유지하여 텍스트 가독성 보존

---

## 🚀 [v3 Specification] 타 PC 비교 분석을 통한 5대 추가 성능 튜닝 통합 완료

타 PC 환경의 AI 작업과의 비교를 통해 확인된 5대 보완 항목을 시스템에 즉시 추가 적용 및 검증 완료하였습니다:

### 1. 배달 최적화 서비스 차단 (`DoSvc`)
- 레지스트리 `HKLM:\SYSTEM\CurrentControlSet\Services\DoSvc`의 `Start` 값을 `4 (Disabled)`로 변경 및 서비스 강제 중지 완료.
- 백그라운드 P2P 윈도우 업데이트 대역폭 낭비 및 네트워크 간섭 원천 차단.

### 2. 마우스 우클릭 및 하위 메뉴 지연 단축 (`MenuShowDelay`)
- `HKCU:\Control Panel\Desktop`의 `MenuShowDelay`를 기본값 `400ms`에서 **`10ms`**로 대폭 단축 완료.
- 바탕화면 우클릭, 시작 메뉴 항목 접근 시 체감 지연 시간을 즉각적으로 반응하도록 개선.

### 3. 전면 활성 창에 CPU 자원 100% 집중 (`SystemResponsiveness`)
- `HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile`의 `SystemResponsiveness`를 기본값 `20`에서 **`0`**으로 변경 완료.
- 백그라운드 강제 예약분(20%)을 해제하여 포그라운드 작업(IDE, 브라우저, 게임 등)에 프로세서 자원을 100% 우선 공급.

### 4. 미디어 재생 시 네트워크 스로틀링 완전 해제 (`NetworkThrottlingIndex`)
- 동일 경로 `NetworkThrottlingIndex`를 기본값 `10`에서 **`0xffffffff` (4294967295)**로 변경 완료.
- 미디어(유튜브, 음악 등) 스트리밍 중에도 비멀티미디어 네트워크 패킷 대역폭 제한을 완전히 풀어 핑 튐 및 다운로드 속도 저하 방지.

### 5. Windows Update 대형 다운로드 캐시 1.32GB 안전 소거
- `C:\Windows\SoftwareDistribution\Download` 폴더 내 과거 업데이트 설치 패키지 찌꺼기 **1,320.52 MB 전량 삭제 완료** (잔여 용량: 0.01 MB).

---

## 🚀 [v4 Specification] 바이브 코딩(Vibe Coding) 특화 멀티태스킹 CPU 스케줄링 개선

사용자의 '바이브 코딩' 워크플로우(터미널 AI 에이전트, 백그라운드 개발 서버/와처, 다중 프로세스 병렬 연산) 요구사항에 맞추어 CPU 스케줄링을 재설계하고 적용 완료하였습니다:

### 1. 전면 독점 해제 및 안전 밸런스 조정 (`SystemResponsiveness: 0 ➔ 10`)
- `0`으로 설정 시 사용자가 다른 창을 보거나 타이핑 중일 때 백그라운드의 AI 에이전트나 빌드 서버가 CPU를 할당받지 못해 렉(Starvation)이 발생할 수 있습니다.
- 이를 `10`으로 조정하여, 전면 작업 반응성(90%)을 유지하면서도 백그라운드 AI 에이전트 및 번들러/테스트 서버에 최소 10% 이상의 안정적인 프로세서 연산 파워를 보장했습니다.

### 2. 백그라운드 프로세스 전원 쓰로틀링 완전 해제 (`PowerThrottlingOff = 1`)
- 레지스트리: `HKLM:\SYSTEM\CurrentControlSet\Control\Power\PowerThrottling`
- 키/값: `PowerThrottlingOff = 1` (DWORD)
- 윈도우가 백그라운드로 내려간 터미널, Node.js, Python, 번들러 프로세스를 '유휴 앱'으로 잘못 판단하여 CPU 클럭을 강제로 깎아내리는 전원 조절을 완벽하게 차단했습니다.

### 3. 프로세서 스케줄링 퀀텀 튜닝 (`Win32PrioritySeparation = 38 (0x26)`)
- 레지스트리: `HKLM:\SYSTEM\CurrentControlSet\Control\PriorityControl`
- 키/값: `Win32PrioritySeparation = 38` (DWORD, 16진수 `0x26`)
- 효과: 고성능 개발 워크스테이션 권장 세팅(Equal, Long Fixed Quanta). 전면과 백그라운드 개발 프로세스 간 잦은 문맥 교환(Context Switching) 오버헤드를 대폭 줄이고, 병렬 빌드 및 다중 에이전트 추론 시의 시스템 전체 처리량(Throughput)을 극대화했습니다.

---

## 🚀 [v5 Specification] 창 최소화 및 최대화 시각 애니메이션 복원

사용자 피드백에 따라 창을 최소화하거나 최대화할 때 부드러운 전환 효과를 느낄 수 있도록 애니메이션을 다시 활성화했습니다:
- **레지스트리**: `HKCU:\Control Panel\Desktop\WindowMetrics`
- **설정값**: `MinAnimate = "1"` (창 최소화/최대화 시각 모션 복원 완료)
- **세션 반영**: `WM_SETTINGCHANGE` 브로드캐스트 전송으로 실시간 반영 완료

---

## 📋 [Integrated Final Spec & Action Plan]

### User Review Required
- 창 최소화/최대화 애니메이션 복원 완료.

### Proposed Changes (최종 완료 목록)
- `Services (4개)`: `SysMain`, `DiagTrack`, `WSearch`, `DoSvc` 중지 및 `Disabled`
- `CPU & Scheduling`: `SystemResponsiveness = 10`, `PowerThrottlingOff = 1`, `Win32PrioritySeparation = 38 (0x26)`
- `UI & Network`: `MenuShowDelay = 10`, `NetworkThrottlingIndex = 0xffffffff`, `MinAnimate = 1` (애니메이션 켬)
- `Storage`: SSD ReTrim 64.35 GB, Update Cache 1.32 GB 소거, Temp 정리
- `Security/Dev`: Edge GPO 차단, Desktop Defender 감시 제외

---

## 🚀 [v6 Specification] 다중 GitHub 계정 환경 및 전역 바이브 코딩(Vibe Coding) 연동 체계

다중 GitHub 계정을 시스템 전역에서 자유롭게 전환하고, `.env` 기반으로 AI 에이전트와 터미널이 호출하여 원격 레포지토리 관리/커밋/푸시를 원활하게 수행할 수 있는 바이브 코딩 통합 인프라를 구축합니다 (+65, -0):

### 1. 전역 권한(Full Scope) 토큰 발급 체계
- **기존 프로필 링크 대체**: 사용자가 공유한 프로필 설정 페이지(`https://github.com/settings/profile`) 대신, 토큰 생성 페이지인 Developer Settings의 Personal Access Tokens (Classic)으로 연동.
- **원클릭 자동 체크 다이렉트 링크**:
  - `https://github.com/settings/tokens/new?description=VibeCoding-FullScope&scopes=repo,workflow,write:packages,delete_repo,admin:org,gist,user`
  - 접속 시 바이브 코딩에 필요한 7대 필수 권한(`repo` 전권, `workflow`, `write:packages`, `delete_repo`, `admin:org`, `gist`, `user`)이 자동 체크되어 원클릭으로 토큰 발급 가능.

### 2. 글로벌 다중 계정 설정 파일 (`.github_env`)
- **저장 위치**: `C:\Users\Administrator\.github_env` (전역 안전 위치)
- **작업 폴더 연동**: `C:\Users\Administrator\Desktop\New_work\github\.env.example` 및 `.gitignore` 구성 (토큰 외부 유출 원천 차단).
- **구성 요소**: 계정별 Alias(main, sub 등), 계정명, 이메일, PAT 토큰, 기본 활성 계정 플래그.

### 3. GitHub CLI (`gh v2.101.0`) 자동 설치 및 PATH 영구 연동
- GitHub 공식 x64 릴리즈 다운로드 및 `C:\Program Files\GitHub CLI\gh.exe` 배치.
- PowerShell 프로필(`$PROFILE`) 및 시스템 PATH에 `Git` 및 `GitHub CLI` 영구 등록.
- 효과: `gh repo create`, `gh repo clone`, `gh issue`, `gh pr` 등 AI 에이전트와 사용자가 터미널에서 레포를 1초 만에 완전 제어.

### 4. 원클릭 계정 스위처 함수 (`gh-switch`, `gh-whoami`) 등록
- PowerShell 프로필에 자동 스위칭 함수 주입:
  - `gh-switch 1` 또는 `gh-switch main`: 해당 계정의 토큰을 세션 환경변수(`$env:GH_TOKEN`)로 로드하고 Git 전역 사용자(`user.name`, `user.email`)를 즉시 동기화.
  - `gh-whoami`: 현재 활성화된 GitHub 사용자명, 이메일, API 토큰 유효성 및 권한 즉시 검증.

---

## 🚀 [v7 Specification] github-org-map 10개국어 다국어화 및 언어별 SVG/GIF 에셋 지원

`https://github.com/KS-AAA-AI/github-org-map` 저장소에 10개국어(English, 한국어, 中文, Español, हिन्दी, العربية, Português, Русский, Français, Bahasa Indonesia) 지원 및 각 언어별 전용 SVG와 GIF 에셋 파이프라인을 구축합니다 (+140, -0):

### 1. 10개국어 문서 체계 (`README.md` 및 `locales/*.md` 9종)
- **메인 진입점**: `README.md` (🇺🇸 English)
- **다국어 문서 (9종)**:
  - `locales/ko.md` (🇰🇷 한국어)
  - `locales/zh-CN.md` (🇨🇳 中文)
  - `locales/es.md` (🇪🇸 Español)
  - `locales/hi.md` (🇮🇳 हिन्दी)
  - `locales/ar.md` (🇸🇦 العربية, RTL 레이아웃 `dir="rtl"` 적용)
  - `locales/pt-BR.md` (🇧🇷 Português)
  - `locales/ru.md` (🇷🇺 Русский)
  - `locales/fr.md` (🇫🇷 Français)
  - `locales/id.md` (🇮🇩 Bahasa Indonesia)
- **상호 네비게이션**:
  - `KS-AAA-AI` 프로필에서 입증된 표준 HTML(`<a>`, `<strong>`) 태그를 적용하여 마크다운 블록 파싱 깨짐 원천 방지.
  - 상대경로(`locales/<lang>.md` ↔ `../README.md`) 연결.

### 2. 언어별 전용 SVG 및 GIF 에셋군 (`assets/locales/<lang>/`)
100% 저장소 내부 호스팅 (외부 CDN 의존성 제로):
- **토폴로지 맵 SVG (`org-map.svg`)**: 
  - 각 언어로 번역된 HUD 헤더, 매트릭스 칩(TOTAL NODES, PUBLIC DEPLOYED, ENCRYPTED VAULTS, PRIMARY TECH STACK), 상태 표시줄 텍스트가 반영된 벡터 지도 (10종).
- **레이더 스캐닝 GIF (`org-map.gif`)**:
  - 각 언어별 텔레메트리 텍스트(예: `[RADAR ACTIVE]`, `[자율 탐색 중]`, `[雷达遥测]`, `[RADAR ACTIF]` 등)와 스캔 빔이 결합된 경량 애니메이션 GIF (`loop=0`, `duration=70ms`, 128색 팔레트, 10종).
- **4대 분야별 뱃지 SVG (`badges/`, 4종 * 10개국어 = 40개)**:
  - `badge-workflow.svg`: 워크플로 / 파이프라인 뱃지
  - `badge-security.svg`: 영지식 암호화 뱃지
  - `badge-stack.svg`: 기술 스택 뱃지
  - `badge-license.svg`: MIT 라이선스 뱃지
- **아키텍처 파이프라인 SVG (`architecture.svg`)**:
  - 4단계 아키텍처(GitHub Ingestion ➔ VaultObfuscator ➔ MatrixAggregator ➔ Dual Renderers) 다이어그램 10개 언어별 벡터 그래픽 (10종).

### 3. 세부 아코디언 UI 및 미디어 래핑
- 모든 상세 섹션(아키텍처 개요, 시작하기, 보안 가드레일, 워크플로 상세 등)은 기본 접힘(`<details><summary>`) 적용.
- 배너 및 메인 미디어는 `<picture>` 태그로 래핑하여 불필요한 링크 생성 방지 및 자동 렌더링 보장.

---

## 📋 [v7 Integrated Action Plan]

### User Review Required
- `github-org-map` 10개국어 문서화 및 언어별 전용 SVG/GIF 에셋 생성 승인 여부.

### Proposed Changes
#### [NEW] `locales/ko.md` ~ `locales/id.md` (9종 다국어 문서)
#### [MODIFY] `README.md` (10개국어 HTML 네비게이션 및 로케일 연동)
#### [NEW] `assets/locales/<lang>/org-map.svg` (10종 언어별 토폴로지 SVG)
#### [NEW] `assets/locales/<lang>/org-map.gif` (10종 언어별 레이더 GIF)
#### [NEW] `assets/locales/<lang>/badges/` (40종 언어별 뱃지 SVG)
#### [NEW] `assets/locales/<lang>/architecture.svg` (10종 언어별 아키텍처 SVG)

### Verification Plan
1. **에셋 생성 및 링크 유효성 전수 검사**: 10개 문서 내 모든 상대경로 이미지 및 SVG/GIF 파일 존재 확인.
2. **내부 네비게이션 링크 검사**: 10개 문서 간 90개 언어 전환 링크 100% 정상 연결 확인.
3. **GIF 애니메이션 규격 검증**: `loop: 0`, `duration: 70ms` 무한 자동 루프 확인.
4. **Git 커밋 및 원격 푸시**: `KS-AAA-AI/github-org-map` 저장소 `main` 브랜치에 배포 완료 검증.

---

## 🚀 [v8 Specification] github-org-map-private 비공개(Private) 레포지토리 구축

사용자 인터랙티브 정렬에 따라 `KS-AAA-AI`의 비공개 토폴로지 관리 레포지토리와 독립 워크스페이스를 구축합니다 (+120, -0):

### 1. 비공개 레포지토리 생성 명세
- **원격 레포지토리명**: `KS-AAA-AI/github-org-map-private`
- **공개 상태**: `Private` (비공개, 오직 인가된 계정/토큰만 접근 가능)
- **설명(Description)**: `Internal & Private repository topology management engine for KS-AAA-AI ecosystem with salted HMAC-SHA256 privacy safeguards.`

### 2. 보안 마스킹 정책 (이중 보안 모드)
- 사용자 결정에 따라 비공개 레포지토리에서도 `HMAC-SHA256` 암호화 마스킹을 동일하게 유지하여, 비인가 코드 열람이나 유출 시에도 민감 저장소의 식별자와 내부 설명이 2차 방어선으로 안전하게 보호되도록 구성.
- `MASK_SALT` 및 토큰 환경변수는 GitHub Actions Secrets 또는 로컬 `.env`에서 안전하게 관리.

### 3. 독립 로컬 워크스페이스 구조
- **경로**: `C:\Users\Administrator\Desktop\New_work\github\github-org-map-private`
- 기존 공개용 워크스페이스(`github-org-map`)와 격리하여 상호 간섭 방지.
- `git clone https://github.com/KS-AAA-AI/github-org-map-private.git` 형태로 독립된 Git 히스토리 및 워킹 트리 유지.

### 4. 내부 전용 자동화 동기화 액션 워크플로 (`.github/workflows/private-sync-cron.yml`)
- 매일 지정된 시각(00:00 KST / 15:00 UTC)에 비공개 레포지토리 내에서 토폴로지를 자동 갱신하고 에셋/문서를 최신화하는 Cron 파이프라인 탑재.
- 지수 백오프 및 Fail-closed 보안 가드레일 적용.

---

## 📋 [v8 Integrated Final Spec & Action Plan]

### User Review Required
- 사용자 응답 완료: `github-org-map-private` (Private) / 이중 보안 마스킹 유지 / 독립 로컬 폴더 분리 / 내부 동기화 Actions 워크플로 포함.

### Proposed Changes
#### [NEW] GitHub Remote Repository: `KS-AAA-AI/github-org-map-private` (Private)
#### [NEW] Local Workspace: `C:\Users\Administrator\Desktop\New_work\github\github-org-map-private`
#### [NEW] `.github/workflows/private-sync-cron.yml` (비공개 전용 자동 갱신 워크플로)
#### [NEW] `config/topology.config.json` (비공개 레포 명세 연동)

### Verification Plan
1. `gh repo view KS-AAA-AI/github-org-map-private`로 원격 비공개(private) 상태 검증.
2. 로컬 디렉토리 `github-org-map-private` 소스 코드 및 Git 리모트 정상 바인딩 검증.
3. `npm run test` / `npm run verify:i18n` 검증 통과 확인.
4. 원격 `main` 브랜치에 초기 커밋 및 푸시 성공 검증.

