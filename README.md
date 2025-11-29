# React Frontend Portfolio 2025

React 18, TypeScript, Emotion을 활용한 현대적인 포트폴리오 웹사이트입니다.  
Framer Motion으로 부드러운 애니메이션을 구현하고, 다크모드, SEO 최적화, PWA 기능을 지원합니다.  
Vite 빌드 시스템으로 빠른 개발 환경을 구축했습니다.

## 🌟 주요 특징

### 사용자 경험 (UX)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스에서 최적화된 레이아웃
- **다크/라이트 모드**: 사용자 선호도에 따라 테마 전환 가능 (로컬 스토리지에 저장)
- **부드러운 애니메이션**: Framer Motion을 활용한 페이지 전환 및 인터랙션 효과
- **인터랙티브 도우미**: 픽셀 아트 캐릭터가 포트폴리오를 안내하며, 드래그 앤 드롭으로 이동 가능

### 기술적 특징
- **TypeScript**: 타입 안정성을 통한 안정적인 코드베이스
- **Emotion (CSS-in-JS)**: 컴포넌트 기반 스타일링으로 유지보수성 향상
- **React Router (HashRouter)**: GitHub Pages 배포를 위한 SPA 라우팅
- **성능 최적화**: React.memo, useMemo, useCallback을 활용한 렌더링 최적화
- **Lazy Loading**: 페이지 및 컴포넌트 단위 코드 스플리팅
- **SEO 최적화**: React Helmet Async를 통한 메타 태그 관리

### 핵심 기능

#### 1. Home 페이지
- 인사말 및 역할 소개
- 핵심 통계 카드 (프로젝트 수, 경력, 언어, 기술 스택)
- 주요 섹션으로 이동하는 CTA 버튼
- 마우스 움직임에 반응하는 플로팅 배경 요소

#### 2. About 페이지
- **프로필 카드**: 아바타, 이름, 직책, 모토, 통계
- **스킬 섹션**: 16개 카테고리별 기술 스택 (Frontend, 3D Graphics, Game Dev, AI & ML 등)
- **학력 및 경력**: 타임라인 형식으로 구조화된 이력
- **GitHub Stats**: GitHub 활동 통계 (API 연동, 에러 핸들링 포함)
- **성취 및 인증**: 주요 성과 및 자격증
- **연락처 및 가용성**: 이메일, 전화, LinkedIn, GitHub 링크

#### 3. Projects 페이지
- **프로젝트 카드**: 18개 이상의 프로젝트를 카드 형식으로 표시
- **카테고리 필터**: Web, AI, Game, Automation 등으로 필터링
- **GitHub 연동**: GitHub 저장소가 있으면 OpenGraph 이미지를 자동으로 썸네일로 사용
- **Tech Stack 뱃지**: 각 프로젝트의 기술 스택을 시각적으로 표시
- **프로젝트 메타 정보**: 기간, 역할, 설명 등 상세 정보 제공
- **데모 링크**: 라이브 데모가 있는 경우 바로 접근 가능

#### 4. Contact 페이지
- **Formspree 연동**: 서버리스 연락 폼 (이메일, 제목, 메시지)
- **연락처 카드**: 6개의 연락처 정보 카드 (이메일, 전화, LinkedIn, GitHub, 위치, 가용성)
- **폼 검증**: 클라이언트 사이드 유효성 검사
- **성공/에러 피드백**: 제출 상태에 따른 사용자 피드백

#### 5. 인터랙티브 도우미 (Interactive Pet)
- **픽셀 아트 캐릭터**: 드래곤, 피닉스, 유니콘, 그리핀 중 랜덤 선택
- **자동 이동**: 화면 가장자리를 따라 자동으로 이동
- **드래그 앤 드롭**: 사용자가 직접 위치 조정 가능
- **말풍선**: 포트폴리오 관련 안내 메시지 표시
- **반응형 위치 조정**: 화면 가장자리에서도 말풍선이 항상 보이도록 자동 조정
- **파티클 효과**: 이동 시 파티클 트레일, 충돌 시 폭발 효과
- **ON/OFF 토글**: 플로팅 버튼으로 도우미 표시/숨김 제어

### 추가 기능
- **스크롤 진행 표시**: 페이지 상단에 스크롤 진행률 표시
- **맨 위로 이동 버튼**: 빠른 네비게이션
- **Web Vitals 모니터링**: 성능 지표 추적 및 콘솔 로깅
- **에러 바운더리**: 예상치 못한 에러 발생 시 사용자 친화적 에러 페이지
- **SEO 컴포넌트**: 페이지별 메타 태그 및 Open Graph 설정

---

## 설치 및 실행 방법

### 사전 요구사항
- Node.js 18.x 이상
- npm 또는 yarn 또는 pnpm

### 1. 저장소 클론
```bash
git clone https://github.com/H2aler/react-frontend-portfolio-2025.git
cd react-frontend-portfolio-2025
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

개발 서버가 시작되면 브라우저에서 다음 주소로 접속:
- **로컬**: [http://localhost:5173](http://localhost:5173)
- **네트워크**: 터미널에 표시된 네트워크 주소 사용

### 4. 프로덕션 빌드 및 미리보기
```bash
# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist/` 폴더에 생성되며, `npm run preview`로 프로덕션 환경과 유사하게 테스트할 수 있습니다.

---

## 주요 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 로컬에서 미리보기
npm run preview

# 코드 린트 검사
npm run lint

# 코드 포맷팅 (Prettier)
npm run format

# TypeScript 타입 체크 (빌드 없이)
npm run type-check

# GitHub Pages 배포 (빌드 + gh-pages 브랜치에 푸시)
npm run deploy
```

### 명령어 상세 설명

- **`npm run dev`**: Vite 개발 서버 실행 (HMR 지원)
- **`npm run build`**: TypeScript 컴파일 + Vite 프로덕션 빌드 (`dist/` 폴더 생성)
- **`npm run preview`**: 빌드된 결과물을 로컬에서 미리 확인
- **`npm run lint`**: ESLint를 통한 코드 품질 검사
- **`npm run format`**: Prettier를 통한 자동 코드 포맷팅
- **`npm run type-check`**: TypeScript 타입 검사만 수행 (빌드 없음)
- **`npm run deploy`**: `predeploy` (빌드) → `gh-pages`에 배포

---

## 기술 스택

### Core
- **React 18.3.1**: 최신 React 기능 활용 (Hooks, Context API)
- **TypeScript 5.7.2**: 타입 안정성 및 개발자 경험 향상
- **Vite 5.4.19**: 빠른 개발 서버 및 최적화된 프로덕션 빌드

### 스타일링
- **@emotion/react 11.13.5**: CSS-in-JS 라이브러리
- **@emotion/styled 11.13.5**: Styled Components 패턴
- **CSS 변수**: 테마 시스템 (라이트/다크 모드 전환)

### 애니메이션 및 인터랙션
- **framer-motion 11.15.0**: 페이지 전환, 호버 효과, 제스처 처리

### 라우팅
- **react-router-dom 6.30.1**: HashRouter 기반 SPA 라우팅 (GitHub Pages 호환)

### 폼 처리
- **@formspree/react 3.0.0**: 서버리스 연락 폼 처리

### SEO 및 메타데이터
- **react-helmet-async 2.0.5**: 동적 메타 태그 관리

### 성능 모니터링
- **web-vitals 4.2.4**: Core Web Vitals 측정

### 개발 도구
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **TypeScript Compiler**: 타입 체크
- **gh-pages**: GitHub Pages 배포 자동화

---

## 프로젝트 구조

```
react-frontend-portfolio-2025/
├── public/                 # 정적 파일 (favicon, pattern.svg 등)
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── ErrorBoundary.tsx      # 에러 바운더리
│   │   ├── Footer.tsx              # 푸터 네비게이션
│   │   ├── InteractivePet.tsx      # 인터랙티브 도우미 메인 컴포넌트
│   │   ├── Navbar.tsx               # 상단 네비게이션 바
│   │   ├── PetToggle.tsx            # 도우미 ON/OFF 토글 버튼
│   │   ├── PixelDragon.tsx          # 픽셀 아트 캐릭터 렌더링
│   │   ├── ScrollProgress.tsx      # 스크롤 진행률 표시
│   │   ├── ScrollToTop.tsx         # 맨 위로 이동 버튼
│   │   ├── SEO.tsx                  # SEO 메타 태그 관리
│   │   └── ThemeToggle.tsx         # 다크/라이트 모드 토글
│   ├── context/
│   │   └── ThemeContext.tsx         # 테마 상태 관리 (Context API)
│   ├── hooks/
│   │   └── useWebVitals.ts         # Web Vitals 성능 측정 훅
│   ├── pages/
│   │   ├── About.tsx                # 소개 페이지 (학력, 경력, 스킬, GitHub Stats)
│   │   ├── Contact.tsx               # 연락처 페이지 (폼, 연락처 카드)
│   │   ├── Home.tsx                 # 홈 페이지 (인사말, 통계, CTA)
│   │   └── Projects.tsx             # 프로젝트 페이지 (프로젝트 카드, 필터)
│   ├── App.tsx                       # 메인 앱 컴포넌트 (라우팅 설정)
│   ├── main.tsx                      # 앱 진입점 (React 렌더링)
│   ├── index.css                     # 전역 스타일 및 CSS 변수
│   └── env.d.ts                      # 환경 변수 타입 정의
├── .eslintrc.cjs                     # ESLint 설정
├── .gitignore                        # Git 무시 파일
├── index.html                        # HTML 템플릿
├── package.json                      # 프로젝트 의존성 및 스크립트
├── tsconfig.json                     # TypeScript 설정
├── tsconfig.node.json                # Node.js TypeScript 설정
├── vite.config.ts                    # Vite 빌드 설정
└── README.md                         # 프로젝트 문서
```

---

## 협업 및 유지보수 가이드

- **Git 브랜치 전략**
  - `main`: 배포용 안정 브랜치
  - `feature/*`: 신규 기능 개발
  - `fix/*`: 버그 수정

- **커밋 메시지 컨벤션**
  - [Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/) 규칙 권장  
    예: `feat: add interactive assistant`, `fix: adjust pet toggle position`

- **PR / 코드 리뷰**
  - GitHub Pull Request를 통해 변경 사항 공유 및 리뷰

- **이슈 관리**
  - GitHub Issues를 활용해 버그/개선 사항 추적

---

## 배포 가이드

### GitHub Pages (현재 배포 방식)

이 프로젝트는 GitHub Pages에 배포되어 있으며, `gh-pages` 패키지를 사용합니다.

```bash
# 빌드 및 배포 (자동으로 gh-pages 브랜치에 푸시)
npm run deploy
```

**배포 과정:**
1. `npm run predeploy` 실행 (자동): `npm run build`로 프로덕션 빌드
2. `npm run deploy` 실행: `gh-pages`가 `dist/` 폴더를 `gh-pages` 브랜치에 푸시
3. GitHub 저장소 설정에서 Pages 소스를 `gh-pages` 브랜치로 설정

**배포 URL**: <https://h2aler.github.io/react-frontend-portfolio-2025/#/>

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

또는 GitHub 저장소를 Vercel에 연결하면 자동 배포됩니다.

**주의사항**: Vercel에서는 HashRouter 대신 BrowserRouter를 사용할 수 있습니다.
- `src/main.tsx` 또는 `src/App.tsx`에서 `HashRouter` → `BrowserRouter`로 변경

### Netlify 배포

1. Netlify 대시보드에서 "New site from Git" 선택
2. GitHub 저장소 연결
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**주의사항**: Netlify에서도 BrowserRouter 사용 가능 (HashRouter → BrowserRouter 변경)

### 기타 정적 호스팅

- **AWS S3 + CloudFront**: `dist/` 폴더를 S3 버킷에 업로드
- **Firebase Hosting**: `firebase deploy` 명령어 사용
- **사내 서버**: `dist/` 폴더를 웹 서버에 복사

> **라우터 선택 가이드**:
> - GitHub Pages, 정적 호스팅 → **HashRouter** 필수
> - Vercel, Netlify, Firebase → **BrowserRouter** 사용 가능

---

## 내 프로젝트를 GitHub 저장소에 업로드하는 방법

이미 로컬에 프로젝트가 있는 상태에서, 이 저장소와 같은 방식으로 GitHub에 업로드하려면 아래 명령어를 사용할 수 있습니다.

```bash
git init
git remote add origin https://github.com/H2aler/react-frontend-portfolio-2025.git
git add .
git commit -m "최초 커밋"
git branch -M main
git push -u origin main
```

> 기존에 커밋이 있는 저장소라면, push 시 충돌이 날 수 있으니  
> 필요 시 `git push -f origin main`으로 강제 업로드합니다.

- 원격 저장소 주소: <https://github.com/H2aler/react-frontend-portfolio-2025>  
- 자세한 내용은 [GitHub 공식 문서](https://docs.github.com/ko/get-started/quickstart/create-a-repo) 참고

---

## 배포 환경에서의 라우팅 안내

- **개발 서버(localhost)**에서는 `/`, `/about`, `/projects`, `/contact` 와 같이 동작합니다.
- **GitHub Pages** 같은 정적 호스팅 환경에서는 반드시 **HashRouter**(`/#/경로`)를 사용해야 새로고침/직접 접속 시 404가 발생하지 않습니다.
  - 홈: `https://h2aler.github.io/react-frontend-portfolio-2025/#/`
  - 소개: `https://h2aler.github.io/react-frontend-portfolio-2025/#/about`
  - 프로젝트: `https://h2aler.github.io/react-frontend-portfolio-2025/#/projects`
  - 연락처: `https://h2aler.github.io/react-frontend-portfolio-2025/#/contact`
- Footer의 바로가기 메뉴 역시 위와 같은 hash router 주소로 연결되어 있습니다.
- **Vercel / Netlify** 등에서는 HashRouter가 필요 없으며, 일반적인 SPA 라우팅(`/about` 등)으로 동작합니다.

### HashRouter 사용 시 주의사항

- GitHub Pages 등 정적 호스팅에서는 `BrowserRouter` 대신 반드시 `HashRouter`를 사용해야 합니다.
- 라우터 설정은 `src/main.tsx` 또는 `src/App.tsx`에서 확인 및 변경할 수 있습니다.

### Footer 바로가기 메뉴 커스터마이징

- Footer의 바로가기 메뉴 주소를 변경하려면 `src/components/Footer.tsx`의 `links` 배열을 수정합니다.
- GitHub Pages 배포 시에는 반드시 `/react-frontend-portfolio-2025/#/경로` 형태로 작성해야 합니다.

---

## 커스터마이징 가이드

### 프로젝트 정보 수정
- **프로젝트 추가**: `src/pages/Projects.tsx`의 `projects` 배열에 새 프로젝트 객체 추가
  ```typescript
  {
    title: '프로젝트 이름',
    description: '설명',
    tech: ['React', 'TypeScript'],
    github: 'https://github.com/...',
    demo: 'https://...',
    category: 'web' // 'web', 'ai', 'game', 'automation' 등
  }
  ```

### 스킬 정보 수정
- **스킬 카테고리/목록**: `src/pages/About.tsx`의 `skillsData` 및 `skillCategories` 객체 수정

### 연락처 정보 수정
- **연락처 카드**: `src/pages/Contact.tsx`의 `contactInfo` 배열 수정
- **Formspree ID**: `src/pages/Contact.tsx`의 `useForm("YOUR_FORM_ID")` 변경

### 테마 커스터마이징
- **색상 변수**: `src/index.css`의 CSS 변수 수정
  ```css
  :root {
    --accent-color: #60a5fa;
    --primary-color: #3b82f6;
    /* ... */
  }
  ```

### 인터랙티브 도우미 설정
- **메시지 변경**: `src/components/InteractivePet.tsx`의 `messages` 배열 수정
- **이동 속도/빈도**: `moveInterval`, `messageProbability` 등 상수 조정
- **캐릭터 타입**: `src/components/PixelDragon.tsx`에서 SVG 경로 수정

### SEO 설정
- **메타 태그**: `src/components/SEO.tsx`에서 기본 메타 정보 수정
- **페이지별 SEO**: 각 페이지에서 `<SEO>` 컴포넌트 사용

### 환경 변수 및 설정
- **Formspree**: `.env` 파일에 `VITE_FORMSPREE_ID` 설정 (선택사항)
- **Favicon**: `public/` 폴더에서 `favicon.ico` 교체
- **OG 이미지**: `public/` 폴더에 `og-image.png` 추가

---

## 소개

한국에서 중학교를 마친 뒤 **프랑스**로 건너가 고등학교와 대학교를 졸업했습니다.  
다국적 환경에서의 학업과 실무 경험을 바탕으로, **웹·AI·GIS·게임** 등 다양한 도메인에서 프로젝트를 수행해 왔습니다.

현재는 **Frontend / Full‑Stack Developer**로서,

- 안정적인 아키텍처 설계  
- 사용자 경험(UX)을 고려한 인터페이스 구현  
- 실제 서비스에 적용 가능한 AI·데이터 활용

을 목표로 꾸준히 개발하고 있습니다.

---

## 학력

- **라로셸 대학교 공과대학 (Université de La Rochelle, France)**  
  - 전공: 컴퓨터 공학 (Computer Science)  
  - 부전공: 마케팅, 매니지먼트  
  - 기간: 2020 ~ 2023  

- **Fénelon / Vieljeux 고등학교 (La Rochelle, France)**  
  - 전공: 이과 특별전공 – 엔지니어링 (전기, 물리, SolidWorks 등)  
  - 기간: 2017 ~ 2020  

---

## 경력 요약

### 세아상역(주) 인턴십 (6개월)

- **역할**: RPA 기반 사내 업무 자동화 PoC 설계 및 구현  
- **주요 업무**
  - Microsoft Power Automate를 활용한 RPA(로봇 프로세스 자동화) 시나리오 설계·구현
  - 반복 업무 분석, 워크플로우 정의, 예외 처리 로직 설계
- **협업 경험**
  - 애자일(Scrum) 방식으로 스프린트 단위 프로젝트 수행
  - 스탠드업·리뷰 미팅을 통한 요구사항 정제 및 이슈 해결
- **추천서**: 보유 (요청 시 제공 가능)

---

## 웹 개발 실무/외주 경험

한국으로 돌아온 이후, 개인 프로젝트와 외주를 통해 웹 개발 경험을 쌓고 있습니다.

- **소규모 병원 반응형 웹사이트 제작**
  - 모바일/데스크톱 대응 UI 설계 및 구현
  - 일정·공지 등 간단한 콘텐츠 관리 기능 구현

- **한불 언어마을**
  - 프랑스어/한국어 번역 업무
  - 웹사이트 개발 및 유지보수 담당

- **주요 기술 스택**
  - Frontend: HTML5, CSS3, JavaScript(ES202x), React, TypeScript  
  - Styling: Emotion, Styled‑Components, Tailwind CSS  
  - Build/Tooling: Vite, Webpack, GitHub Pages

- **학습 및 태도**
  - 새로운 프레임워크·라이브러리를 실제 프로젝트에 적용하며 검증하는 방식으로 학습합니다.
  - 최신 프론트엔드 및 AI 트렌드를 꾸준히 따라가며, 실험적인 사이드 프로젝트를 통해 검증합니다.

---

## React Native 기반 Android APK 개발

- 기존 React / HTML5 기반 웹 프로젝트를 분석하여 **React Native** 앱으로 이식하고,  
  Android APK 형태로 빌드·배포한 경험이 있습니다.
- 공통 로직과 UI를 재사용하면서, 모바일 환경에 적합한 네이티브 인터랙션을 추가했습니다.

---

## 주요 포트폴리오

- **React 기반 프론트엔드 포트폴리오 2025**  
  이 저장소의 코드이며, 실제 배포 사이트는 아래에서 확인할 수 있습니다.  
  👉 <https://h2aler.github.io/react-frontend-portfolio-2025/#/>

---

## AI · 데이터 관련 프로젝트

### AI 진실성 탐지기 (True_or_false) – 진행 중

- 브라우저 기반 **텍스트 진실성 탐지기** 프로젝트로,  
  모델 고도화 및 기능 확장을 진행 중입니다.

👉 데모: <https://h2aler.github.io/True_or_false/>  
👉 Repository: <https://github.com/H2aler/True_or_false>

---

### WebGIS – OpenLayers 기반 지도 서비스 (Vite, PC/Mobile – 진행 중)

- **OpenLayers 8 + Vite** 기반 실험용 WebGIS 프로젝트
- 거리 계산, 마커 관리, 기초 공간 분석 기능 구현

👉 데모: <https://h2aler.github.io/WebGIS/>  
👉 Repository: <https://github.com/H2aler/WebGIS>

### WebGIS React – React + OpenLayers (진행 중)

- React 컴포넌트 아키텍처로 WebGIS를 재구현한 프로젝트
- 상태 관리와 재사용성을 고려한 구조 설계

👉 데모: <https://h2aler.github.io/WebGIS_React/>  
👉 Repository: <https://github.com/H2aler/WebGIS_React>

---

### AI Vision Advanced – TensorFlow.js 기반 실시간 분석

- **TensorFlow.js**를 활용하여 브라우저에서 동작하는  
  실시간 **객체 인식·AI 비전 분석** 시스템
- 이미지 업로드 및 웹캠 입력을 활용한 실시간 분석 기능 제공

👉 데모: <https://h2aler.github.io/AI_Vision_Advanced/>  
👉 Repository: <https://github.com/H2aler/AI_Vision_Advanced>

---

### Quantum‑Neural Visualization Tool

- **양자 신경망(Quantum Neural Network)** 상태를  
  실시간으로 시각화하는 실험용 웹 애플리케이션

👉 데모: <https://h2aler.github.io/quantum-neural-viz/>

---

## 기타 유틸 · 데모

- **CGV 서버 상태 확인 도구**  
  👉 <https://h2aler.github.io/korean-cgv-web-developer-toolkit/>

- **보안 솔루션 DEMO (Secure Future)**  
  👉 <https://github.com/H2aler/secure-future>

---

## 기타 웹사이트

- 1번째 개인 웹사이트: <https://h2aler.github.io/My_Site/>  
- 2번째 개인 웹사이트: <https://h2aler.github.io/My_Site_Two/>

---

## HTML5 기반 AI/게임 프로젝트

- AI 오목 게임 1: <https://h2aler.github.io/HTML5_AI_GAME_ONE/>  
- AI 오목 모바일: <https://h2aler.github.io/HTML5_AI_GAME_ONE_MOBILE/>  
- AI 오목 모바일 확장 버전: <https://h2aler.github.io/HTML5_AI_GAME_TWO_MOBILE/>

---

## HTML5 기반 주식 시뮬레이션 & 게임

- 주식 게임 1: <https://h2aler.github.io/HTML5_GAME/>  
- 주식 시뮬레이션 2: <https://h2aler.github.io/HTML5_GAME_TWO/>  
- 주식 시뮬레이션 3: <https://h2aler.github.io/HTML5_GAME_THREE/>  
- 주식 시뮬레이션 4: <https://h2aler.github.io/HTML5_GAME_FOUR/>  
- 미사일 크러쉬 서바이벌 게임: <https://h2aler.github.io/HTML5_GAME_FIVE/>

---

## 다짐

**Frontend / Full‑Stack Developer**로서,

- 사용자 관점에서의 명확한 문제 정의와 UI/UX 설계  
- 유지보수가 용이한 구조와 **성능 최적화**를 고려한 구현  
- 팀과 함께 성장하는 **지속 가능한 개발 문화**

를 지향합니다.

프로덕트와 팀에 실질적인 가치를 제공할 수 있는 개발자가 되기 위해  
지속적으로 학습하고, 새로운 아이디어를 실험하며 개선해 나가고 있습니다.

---

## 저작권 안내

모든 자료의 저작권은 **H2aler (김재현, KIM JAEHYUN)** 에게 있습니다.  
허가 없이 **복제, 배포, 전송, 전시** 등의 행위를 금지합니다.

