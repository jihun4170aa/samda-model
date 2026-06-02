# 사이버 모델하우스 프로젝트

## 📋 프로젝트 정보
- **프로젝트명**: 토지임대부 분양주택 사이버 모델하우스
- **파일**: index.html (메인), about.html (사업개요)
- **메인 컬러**: 파란색 #6B4E50
- **폰트**: Noto Sans KR (300, 400, 500, 700, 900)

---

## 🎯 헤더 표준 (모든 HTML 파일 공통)

**중요: 새로운 HTML 파일 생성 시 반드시 index.html의 헤더 구조를 기준으로 작성**

### HTML 구조
```html
<header class="headerWrap">
    <div class="header">
        <div class="logo">
            <a href="index.html">
                <img src="Asset/공사 한글로고(개정)-좌우조합.png" alt="제주특별자치도개발공사">
            </a>
        </div>
        <nav>
            <ul id="gnb">
                <!-- GNB 메뉴 -->
                <div class="submenu-area">
                    <div class="submenu-container">
                        <!-- 서브메뉴 -->
                    </div>
                </div>
            </ul>
        </nav>
    </div>
</header>
```

### CSS 설정
```css
.headerWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header {
    max-width: 1900px;
    margin: 0 auto;
    padding: 20px 80px 20px 40px;
    display: grid;
    grid-template-columns: 500px 1fr 150px;
    gap: 40px;
    align-items: center;
}

.logo {
    height: 50px;
    width: 200px;
    padding-right: 500px;
    z-index: 10;
}

.logo img {
    height: 100%;
    padding: 0px;
}

#gnb > li > a {
    display: block;
    padding: 10px 0;
    text-align: center;
}

.submenu-container {
    max-width: 1900px;
    margin: 0 auto;
    padding: 40px 80px 40px 40px;
    display: grid;
    grid-template-columns: 500px 1fr 150px;
    gap: 40px;
}
```

---

## 🎨 디자인 수정 이력

### Version 2.0.0 (2026-05-30)
**[fullPage.js 2.9.7 구현 - 전체 페이지 스크롤 시스템 적용]**
- fullPage.js 2.9.7 (jQuery 기반) 로컬 라이브러리 적용
- 좌측 네비게이션 도트 추가 (툴팁: 메인, 단지정보, VR, 로케이션, Footer)
- 섹션별 앵커 설정: home, unit, vr, location, footer
- AOS 애니메이션 비활성화 (fullPage.js와 충돌로 인해)
- 푸터를 fullPage 컨테이너 내부로 이동 (fp-auto-height 적용)
- 모바일(768px 이하)에서 자동으로 일반 스크롤로 전환

**영향 범위:**
- index.html - 전체 구조 변경

**HTML 구조 변경:**
```html
<div id="fullpage">
    <div class="section main_visual" id="section1">...</div>
    <div class="section unit-section" id="section2">...</div>
    <div class="section vr-section" id="section3">...</div>
    <div class="section location-section" id="section4">...</div>
    <div class="section fp-auto-height" id="section5">
        <footer>...</footer>
    </div>
</div>
```

**CSS 변경:**
- `.section`: position: relative만 유지 (fullPage.js가 높이 관리)
- `.section-inner`: 메인 비주얼에만 사용, flex 중앙정렬
- `.unit_wrap`, `.vr-content`, `.inner_location`: 각각 flex + min-height: 100vh로 중앙정렬

**JavaScript 설정:**
```javascript
$('#fullpage').fullpage({
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['메인', '단지정보', 'VR', '로케이션', 'Footer'],
    anchors: ['home', 'unit', 'vr', 'location', 'footer'],
    scrollingSpeed: 700,
    responsiveWidth: 768
});
```

**주의사항:**
- ⚠️ AOS 애니메이션 비활성화됨 (`disable: true`)
- ⚠️ scrollOverflow 플러그인 로드되지만 비활성화 (버전 호환 문제)
- ⚠️ 섹션 id와 anchor 이름 다름 (충돌 방지)
- ⚠️ 푸터 위치 변경으로 기존 CSS 스타일 영향 없음

**백업 파일:**
- `index_v2.0.0_fullpage_20260530_171126.html`

---

### Version 1.2.0 (2026-05-28)
**[평면도 이미지 확대 모달 추가]**
- Unit 섹션의 평면도 이미지 클릭 시 확대 모달 표시
- 모달 닫기 기능: X 버튼, 배경 클릭, ESC 키
- 부드러운 페이드 인/아웃 애니메이션
- 모달 열릴 때 body 스크롤 방지

**영향 범위:**
- index.html - Unit 섹션, 모달 추가

**추가된 요소:**
- `.image-modal` - 모달 오버레이
- `.image-modal-content` - 모달 콘텐츠 컨테이너
- `.image-modal-close` - 닫기 버튼
- `@keyframes zoomIn` - 줌인 애니메이션
- 이미지 클릭 이벤트 리스너

**CSS 변경:**
- `.unit-card img`: `cursor: pointer` 추가, 호버 시 `opacity: 0.8`

---

### Version 1.1.0 (2026-05-28)
**[네이버 지도 API 연동]**
- Location 섹션에 네이버 지도 추가
- 지도에 마커 및 인포윈도우 표시
- "오시는 길" 섹션 추가 (주소, 전화번호)
- 카카오맵 → 네이버 지도로 변경 (비즈앱 등록 이슈)

**영향 범위:**
- index.html - Location 섹션
- 네이버 Maps API SDK 추가 (Client ID: `nticxunj9s`)

**추가된 요소:**
- `.map-section` - 지도 컨테이너
- `.map-info` - 주소/전화번호 정보
- `#map` - 네이버 지도 표시 영역 (300px 높이)
- 마커 위치: 제주시 삼도이동 1244-1 (좌표: 33.5137, 126.5219)
- 줌 컨트롤 추가 (우측 상단)

---

### Version 1.0.0 (2026-05-28)
**초기 버전**
- 메인 비주얼, 평면도, VR, 로케이션, Footer 섹션 구성
- 메인 컬러: 빨간색 → 파란색으로 변경
- GNB 2depth 메뉴 구조 (호버 시 전체 서브메뉴 노출)
- 모바일 햄버거 메뉴 (왼쪽 슬라이드)
- 플로팅 전화 버튼
- 스크롤 스냅 (proximity)

**주요 스타일:**
- 헤더 그리드: `200px 1fr 150px` (로고 | GNB | 전화번호)
- GNB 그리드: `repeat(4, 1fr)` (4칸 균등 배치)
- 서브메뉴 그리드: `200px 1fr 150px` → 중앙 `repeat(4, 1fr)`
- 섹션: `min-height: 100vh` + `scroll-snap-align: start`
- Unit 섹션: 이미지 높이 400px, padding 30px

---

## ⚠️ 디자인 수정 전 체크리스트

디자인 관련 수정 요청 시 **반드시 아래 항목을 확인**하고 수정 전 사용자에게 제안합니다:

### 1. 레이아웃 변경
- [ ] 헤더/푸터 높이 변경
- [ ] 섹션 구조 변경
- [ ] 그리드/플렉스 레이아웃 변경
- [ ] 반응형 브레이크포인트 변경

### 2. 색상 변경
- [ ] 메인 컬러 변경 (현재: #3895D3)
- [ ] 배경색 변경
- [ ] 텍스트 색상 변경
- [ ] 호버 효과 색상 변경

### 3. 타이포그래피
- [ ] 폰트 크기 변경
- [ ] 폰트 굵기 변경
- [ ] 행간(line-height) 변경
- [ ] 자간(letter-spacing) 변경

### 4. 간격/여백
- [ ] padding 변경
- [ ] margin 변경
- [ ] gap 변경
- [ ] 섹션 간 여백 변경

### 5. 애니메이션/효과
- [ ] AOS 효과 변경
- [ ] 스크롤 효과 변경
- [ ] 호버 효과 변경
- [ ] 트랜지션 속도 변경

### 6. 컴포넌트
- [ ] 버튼 스타일 변경
- [ ] 카드 디자인 변경
- [ ] 슬라이더 설정 변경
- [ ] 메뉴 구조 변경

---

## 🔧 주요 설정값

### 색상 변수
```css
--primary-color: #3895D3;
--primary-hover: #2a7ab8;
--primary-light: #e3f2fd;
--dark-color: #1a1a1a;
--gray-color: #666;
--light-gray: #f8f9fa;
```

### 헤더 구조
```css
.header {
    grid-template-columns: 200px 1fr 150px;
    gap: 40px;
}

#gnb {
    grid-template-columns: repeat(4, 1fr);
}

.submenu-container {
    grid-template-columns: 200px 1fr 150px;
    gap: 40px;
}
```

### 섹션 설정
```css
section {
    min-height: 100vh;
    scroll-snap-align: start;
}

html {
    scroll-snap-type: y proximity;
}
```

### Unit 섹션
```css
.unit-card img {
    height: 400px;
}

.unit-info {
    padding: 30px;
}

.section-header {
    margin-bottom: 50px;
}
```

---

## 📝 수정 요청 시 응답 형식

디자인 수정 요청을 받으면:

1. **현재 상태 확인**: 해당 부분의 현재 CSS 값 확인
2. **수정안 제시**: 구체적인 변경 내용과 CSS 코드 제시
3. **영향 범위 설명**: 다른 요소에 미칠 영향 설명
4. **사용자 확인**: "이렇게 수정할까요?" 질문 후 승인 받기
5. **수정 실행**: 승인 후 수정 진행
6. **버전 업데이트**: CLAUDE.md에 변경 이력 기록

---

## 📌 중요 규칙

- ✅ **수정 전 반드시 사용자 확인 필수**
- ✅ 모든 디자인 변경은 이 파일에 기록
- ✅ 버전 번호는 Semantic Versioning 사용
  - Major: 큰 구조 변경
  - Minor: 기능 추가/변경
  - Patch: 디자인 미세 조정/버그 수정

---

## 🔄 형상 관리 프로세스

### 1. 태스크 기반 개발
모든 작업은 TODO.md에서 관리합니다:
1. TODO.md에서 작업할 태스크 선정
2. 태스크를 "진행 중"으로 이동
3. 작업 완료 후 "완료"로 이동
4. CLAUDE.md에 변경 이력 기록

### 2. 버전 관리 규칙
**버전 번호**: `Major.Minor.Patch`

- **Major (1.x.x)**:
  - 전체 레이아웃 구조 변경
  - 메뉴 시스템 대폭 수정
  - 섹션 추가/삭제

- **Minor (x.1.x)**:
  - 새로운 기능 추가 (문의하기 폼, 갤러리 등)
  - 애니메이션 효과 추가
  - API 연동

- **Patch (x.x.1)**:
  - 디자인 미세 조정 (색상, 간격, 폰트 크기)
  - 버그 수정
  - 텍스트 수정

### 3. 변경 이력 작성 형식
```markdown
### Version X.X.X (YYYY-MM-DD)
**[태스크명]**
- 변경 내용 1
- 변경 내용 2

**영향 범위:**
- 영향받은 파일/섹션

**CSS 변경:**
- 클래스명: 변경 전 → 변경 후
```

### 4. 디자인 수정 워크플로우
```
사용자 요청
    ↓
CLAUDE.md 현재 설정 확인
    ↓
수정안 제시 + 영향 범위 설명
    ↓
사용자 승인 대기
    ↓
수정 실행
    ↓
TODO.md 업데이트
    ↓
CLAUDE.md 변경 이력 기록
    ↓
버전 번호 업데이트
```

### 5. 백업 규칙
- Major 버전 변경 전: 반드시 index.html 백업
- 백업 파일명: `index_v{버전번호}_backup_{YYYYMMDD}.html`

---

## 🗂️ 파일 구조

```
6조2/
├── index.html                      # 메인 파일
├── CLAUDE.md                       # 프로젝트 설정 및 형상 관리 가이드
├── TODO.md                         # 태스크 관리
├── Asset/
│   ├── 49실내.png
│   ├── 59실내.png
│   ├── 조감도.png
│   └── 공사 한글로고(개정)-좌우조합.png
├── 요구사항_최종수정사항.md
├── 예시 참고 페이지.html
├── 예시 참고 페이지2.html
└── 예시 참고 페이지3.html
```

---

**최종 수정일**: 2026-05-28
**현재 버전**: 1.2.0
