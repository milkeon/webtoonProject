/**
 * 흡혈귀의 추격 - 패럴렉스 + 스크롤 페이드인 + 발사 엔딩 전환 스크립트
 */

/* 항상 최상단에서 시작 */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => window.scrollTo(0, 0));

document.addEventListener('DOMContentLoaded', () => {

    /* ── 진행 표시 바 ── */
    const progressFill = document.getElementById('progressFill');

    function updateProgress() {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        progressFill.style.width = Math.min(pct, 100) + '%';
    }

    /* ── 패럴렉스 아이템 이동 ── */
    const parallaxItems = document.querySelectorAll('.parallax-item[data-speed]');

    function updateParallax() {
        parallaxItems.forEach(el => {
            const speed  = parseFloat(el.dataset.speed) || 0.1;
            const rect   = el.getBoundingClientRect();
            const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }

    /* ── 스크롤 페이드업 ── */
    const fadeEls = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => entry.target.classList.add('in-view'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));

    /* ── 3번째 방아쇠: step4 체크(회전 효과) 후 1초 뒤 happy_ending 이동 ── */
    const btn3 = document.getElementById('btn3');
    if (btn3) {
        btn3.addEventListener('click', () => {
            btn3.style.pointerEvents = 'none'; // 중복 클릭 방지
            // step4 라디오를 체크 → CSS 약실 회전 트리거
            document.getElementById('step4').checked = true;
            setTimeout(() => {
                window.location.href = 'happy_ending.html';
            }, 1000); // 회전 애니메이션 후 이동
        });
    }

    /* ── step6 (은 탄환 발사) 라디오 감지 ── */
    /* 실제 페이지 이동은 a 태그 href="happy_ending.html"로 처리됨 */
    /* step6 체크 시 scene4(사망 힌트)로 스크롤 안내 */
    const step6 = document.getElementById('step6');
    if (step6) {
        step6.addEventListener('change', () => {
            if (step6.checked) {
                const scene4 = document.querySelector('.scene4');
                if (scene4) {
                    setTimeout(() => scene4.scrollIntoView({ behavior: 'smooth' }), 600);
                }
            }
        });
    }

    /* ── 스크롤 이벤트 (RAF 최적화) ── */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* 초기 1회 실행 */
    updateProgress();
    updateParallax();
});
