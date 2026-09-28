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

    // 5. 스크롤 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.solution-card, .portfolio-card, .timeline-item, .client-logo').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});