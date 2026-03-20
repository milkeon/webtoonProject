# 웹툰 만들기 (Webtoon Project) 🎨

인터랙티브 요소를 가미한 웹툰 프로젝트입니다. 사용자의 스크롤에 따라 변하는 역동적인 연출과 다양한 멀티 엔딩을 제공합니다.

## 🚀 주요 기능

- **인터랙티브 스크롤 연출**: `happy_ending.html`에서 구현된 지수적 확대 및 화이트아웃 효과.
- **다양한 결말**: 선택과 상황에 따라 달라지는 해피 엔딩, 배드 엔딩, 그리고 숨겨진 "구조 후일담".
- **현대적인 UI/UX**: Noto Sans KR 폰트와 부드러운 애니메이션, 세련된 버튼 스타일 적용.

## ✨ 핵심 CSS 기술 (Tech Stack & Techniques)

이 프로젝트는 자바스크립트 의존도를 낮추고 **순수 CSS**를 활용해 고도의 인터랙티브 연출을 구현하는 데 중점을 두었습니다.

- **Radio Button Hack (Carousel)**: 씬 3의 리볼버 약실 회전은 자바스크립트 없이 `input[type="radio"]`와 `~` (인접 형제 선택자)만을 사용하여 6단계 회전 및 상태 전환을 구현했습니다.
- **Parallax Scrolling**: 여러 겹의 `scene-bg-layer`와 `transform` 속성을 활용하여 깊이감 있는 공간 연출을 제공합니다.
- **Glassmorphism & Shimmer**: `radial-gradient`와 `@keyframes` 애니메이션을 조합해 몽환적이고 일렁이는 배경(`shimmer-bg`)을 연출했습니다.
- **Sticky Sequence**: `position: sticky`와 스크롤 위치 감지를 조합해 이미지가 화면에 고정된 채 확대되거나 변하는 시네마틱 연출을 구현했습니다.

## 🛠️ 개발 환경 및 실행 방법

### 요구 사항

### 실행 방법
1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/milkeon/webtoonProject.git
   ```
2. **방법 1 (직접 실행)**: `HtmlProj/index.html` 파일을 웹 브라우저로 엽니다.
3. **방법 2 (개발 서버)**: 루트 디렉토리에서 `npm run dev` 명령어를 통해 로컬 서버를 구동할 수도 있습니다. (선택 사항)

## 📂 프로젝트 구조

- `HtmlProj/`: 주요 소스 코드 (HTML, CSS, JS) 및 자산(Assets) 폴더.
- `package.json`: 프로젝트 스크립트 및 정보 관리.
- `.gitignore`: 불필요한 파일(node_modules 등) 제외 설정.

## 📝 최근 업데이트 사항
- **엔딩 연출 고도화**: 희망의 서광 시퀀스에서 지수 함수 기반의 급격한 확대 연출 적용.
- **Git 저장소 통합**: 전체 프로젝트 파일을 `main` 브랜치 단일 저장소로 통합 및 호스트 이전.
- **이스터 에그 가시성 확보**: 화이트아웃 이후에도 "구조 후일담" 버튼이 선명하게 보이도록 레이어 우선순위 조정.

