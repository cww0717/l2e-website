document.addEventListener('DOMContentLoaded', function() {

    // 1. 초기화: EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("53yXSefbk6l4uHjui"); // 여기에 퍼블릭키 입력
    }

    // 2. 모바일 메뉴 토글
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 3. 헤더 스크롤 효과
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });

    // 4. 문의 폼 제출 처리 (EmailJS)
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // 기본 폼 제출 방지

            // EmailJS로 전송
            emailjs.sendForm('service_0bikcyn', 'template_rk2vzer', this)
                .then(function() {
                    // 성공 시 UI 처리
                    form.style.display = 'none';
                    if(formSuccess) formSuccess.hidden = false;
                }, function(error) {
                    console.error('전송 실패:', error);
                    alert('메일 전송에 실패했습니다. 관리자에게 문의하세요.');
                });
        });
    }

    // 솔루션 카드와 벤더 소개. 제품 이미지는 아래 image 경로의 파일로 교체합니다.
    // 권장 원본: 640 x 400px 이상, 가로형(8:5), 투명 PNG/WebP 또는 흰 배경 JPG.
    // 화면 표시 영역: 데스크톱 약 180 x 112px / 모바일 약 120 x 84px (object-fit: contain).
    // 실물 이미지 사용 시 해당 벤더의 제공 자료와 이용 허용 범위를 확인하세요.
    const solutionData = {
        cctv: [
            { name: 'AXIS', logo: 'images/logo-axis.png', image: 'images/vendor-products/cctv-axis.png', description: '네트워크 카메라와 영상 분석 기술을 바탕으로 현장 환경에 맞는 영상감시 구성을 지원합니다.', url: 'https://www.axis.com/' },
            { name: 'Honeywell', logo: 'images/logo-honeywell.png', image: 'images/vendor-products/cctv-honeywell.png', description: 'IP 카메라와 녹화 장비를 연계하여 시설 규모와 운영 목적에 맞춘 영상 보안 환경을 제공합니다.', url: 'https://honeywellcctv.co.kr/home/home.html' },
            { name: '한화비전', logo: 'images/logo-hanwha.png', image: 'images/vendor-products/cctv-hanwha.png', description: '카메라와 AI 기반 영상 기술을 활용해 다양한 현장의 감시와 운영 효율을 지원합니다.', url: 'https://www.hanwhavision.com/ko/' }
        ],
        vms: [
            { name: 'Genetec', logo: 'images/logo-genetec.png', image: 'images/vendor-products/vms-genetec.png', description: '영상과 보안 시스템을 한 화면에서 관리할 수 있는 통합 관제 환경을 구성합니다.', url: 'https://www.genetec.com/' },
            { name: 'Milestone', logo: 'images/logo-milestone.png', image: 'images/vendor-products/vms-milestone.png', description: '다양한 제조사의 장비를 연동하는 개방형 VMS 기반 영상 관제 환경을 지원합니다.', url: 'https://www.milestonesys.com/' },
            { name: 'Emstone', logo: 'images/logo-emstone.png', image: 'images/vendor-products/vms-emstone.png', description: '국내 현장 운영에 맞는 영상 관제와 저장 시스템 구성을 지원합니다.', url: 'https://www.emstone.com/' }
        ],
        access: [
            { name: 'Genetec', logo: 'images/logo-genetec.png', image: 'images/vendor-products/access-genetec.png', description: '출입 이벤트와 영상 정보를 함께 살펴볼 수 있는 통합 보안 운영 환경을 구성합니다.', url: 'https://www.genetec.com/' },
            { name: 'SALTO', logo: 'images/logo-salto.png', image: 'images/vendor-products/access-salto.png', description: '유·무선 출입통제와 모바일 기반 출입 방식을 공간의 특성에 맞게 적용합니다.', url: 'https://saltosystems.com/ko-ko/' },
            { name: 'LenelS2', logo: 'images/logo-lenel.png', image: 'images/vendor-products/access-lenels2.png', description: '대규모 시설의 출입 권한과 이벤트를 관리하는 엔터프라이즈 보안 환경을 지원합니다.', url: 'https://www.lenels2.com/' }
        ]
    };

    const grid = document.getElementById('solutionsGrid');
    const detail = document.getElementById('solutionDetail');
    const vendors = document.getElementById('solutionVendors');
    const cards = grid ? [...grid.querySelectorAll('[data-solution]')] : [];
    const switchButtons = grid ? [...grid.querySelectorAll('[data-switch-solution]')] : [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeSolution = null;

    function renderVendors(key) {
        vendors.replaceChildren();
        solutionData[key].forEach(vendor => {
            const row = document.createElement('article');
            row.className = 'solution-vendor';

            const brand = document.createElement('div');
            brand.className = 'solution-vendor-brand';
            const logo = document.createElement('img');
            logo.src = vendor.logo;
            logo.alt = vendor.name;
            logo.loading = 'lazy';
            logo.onerror = () => { logo.hidden = true; brand.textContent = vendor.name; };
            brand.append(logo);

            const description = document.createElement('p');
            description.textContent = vendor.description;

            if (vendor.url) {
                const link = document.createElement('a');
                link.href = vendor.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = '웹사이트 방문 ↗';
                description.append(document.createElement('br'), link);
            }

            const imageBox = document.createElement('div');
            imageBox.className = 'solution-product';
            const product = document.createElement('img');
            product.src = vendor.image;
            product.alt = `${vendor.name} 대표 제품 이미지`;
            product.loading = 'lazy';
            product.onerror = () => { imageBox.classList.add('is-empty'); product.hidden = true; };
            const empty = document.createElement('span');
            empty.textContent = '제품 이미지 추가';
            empty.setAttribute('aria-hidden', 'true');
            imageBox.append(product, empty);
            row.append(brand, description, imageBox);
            vendors.append(row);
        });
    }

    function selectSolution(key) {
        if (!solutionData[key] || !grid) return;
        if (activeSolution === key) return;
        const chosen = cards.find(card => card.dataset.solution === key);
        const first = chosen.getBoundingClientRect();
        const fromOverview = !activeSolution;
        activeSolution = key;
        renderVendors(key);
        detail.hidden = false;
        grid.classList.add('is-active');
        cards.forEach(card => {
            const selected = card === chosen;
            card.classList.toggle('is-selected', selected);
            card.setAttribute('aria-expanded', String(selected));
            card.hidden = !selected;
        });
        switchButtons.forEach(button => {
            const selected = button.dataset.switchSolution === key;
            button.classList.toggle('is-current', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        // FLIP: 처음 3장 중 2·3번째를 눌렀을 때 선택 카드가 1번 자리로 이동.
        if (fromOverview && !reduceMotion.matches && window.innerWidth > 900) {
            const last = chosen.getBoundingClientRect();
            chosen.animate([
                { transform: `translate(${first.left - last.left}px, ${first.top - last.top}px)` },
                { transform: 'translate(0, 0)' }
            ], { duration: 460, easing: 'cubic-bezier(.22, 1, .36, 1)' });
        }
        if (!reduceMotion.matches) {
            detail.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
                { duration: 380, easing: 'ease-out' });
        }
    }

    cards.forEach(card => card.addEventListener('click', () => selectSolution(card.dataset.solution)));
    switchButtons.forEach(button => button.addEventListener('click', () => selectSolution(button.dataset.switchSolution)));
    document.getElementById('solutionReset')?.addEventListener('click', () => {
        activeSolution = null;
        grid.classList.remove('is-active');
        detail.hidden = true;
        cards.forEach(card => {
            card.hidden = false;
            card.classList.remove('is-selected');
            card.setAttribute('aria-expanded', 'false');
        });
        switchButtons.forEach(button => {
            button.classList.remove('is-current');
            button.setAttribute('aria-pressed', 'false');
        });
    });

    // 이미지 우클릭 저장 및 드래그 방지 — 다운로드 자체를 차단하지는 못함
    document.addEventListener('contextmenu', event => {
        if (event.target.closest('img')) event.preventDefault();
    });
    
    document.querySelectorAll('img').forEach(img => {
        img.draggable = false;
    });

    // 5. 스크롤 애니메이션 (솔루션 카드는 전환 transform과 충돌하므로 제외)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portfolio-card, .timeline-item, .client-logo').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
