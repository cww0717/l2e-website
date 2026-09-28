# 엘투이 주식회사 (L2E Co., Ltd.) 공식 홈페이지

## 개요
B2B 물리보안 및 IT 시스템 통합(SI) 기업 공식 웹사이트입니다.  
깔끔하고 현대적인 블루/시안/그레이 톤의 반응형 디자인으로 제작되었습니다.

## 구성
- **회사소개**: 대표이사 인사말, 회사 연혁(타임라인), 주요 고객사, 오시는 길(지도)
- **주요 솔루션**: CCTV/영상감시, VMS/NVR, 출입통제, IBS 시스템 통합
- **사업영역 & 실적**: 데이터센터, 상업용빌딩, 공유오피스, 산업/물류, 특수시설
- **고객지원 & 문의**: 회사소개서 PDF 다운로드, 온라인 문의 폼

## 기술 스택
- HTML5 / CSS3 / Vanilla JavaScript
- 반응형 (PC / Tablet / Mobile)
- Google Fonts (Noto Sans KR)
- SEO 기초 메타태그 적용

## 파일 구조
```
l2e-website/
├── index.html          # 메인 페이지
├── styles.css          # 스타일시트
├── script.js           # 인터랙션 스크립트
├── L2E_Company_Profile.pdf  # 회사 소개서 (지명원)
├── robots.txt
└── README.md
```

## 배포 방법
1. 웹 서버 루트에 전체 폴더 업로드
2. 도메인 연결 후 네이버/구글 서치콘솔에 사이트맵 등록
3. 문의 폼은 실제 운영 시 Formspree, Google Forms, 또는 백엔드 API로 연동 권장

## 문의 폼 연동 예시 (Formspree)
`script.js`의 form submit 부분에 Formspree endpoint를 연결하면 이메일 자동 전송이 가능합니다.

```js
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
})
```

## 제작일
2026년 기준 회사소개서(V1.8) 자료를 바탕으로 제작
