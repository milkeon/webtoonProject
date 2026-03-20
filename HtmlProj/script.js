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
            const speed = parseFloat(el.dataset.speed) || 0.1;
            const rect = el.getBoundingClientRect();
            const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }

    /* ── Intersection Observer: 스크롤 시 텍스트 슬라이드 업 ── */
    const fadeEls = document.querySelectorAll('.slide-up');
    const observerOptions = {
        threshold: 0.1, // 10% 노출되었을 때 시작
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

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

    /* ── 씬 4 흡혈귀 스케일 애니메이션 (확 다가오는 느낌) ── */
    const vampireBg = document.querySelector('.vampire-bg');
    const scene4 = document.querySelector('.scene4');
    const endLink = document.querySelector('.end-link');

    function updateVampireZoom() {
        if (!vampireBg || !scene4) return;

        const rect = scene4.getBoundingClientRect();
        const viewH = window.innerHeight;

        if (rect.top < viewH && rect.bottom > 0) {
            // 0 → 1 진행도: scene4가 화면에 들어올 때부터 끝날 때까지
            const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
            // 0.15 이후부터 급격히 커지는 이징
            const eased = Math.max(0, (progress - 0.15) / 0.85);
            const scale = 0.08 + Math.pow(eased, 2.2) * 14;
            const opacity = Math.min(eased * 2, 1);

            vampireBg.style.transform = `translateX(-50%) scale(${scale})`;
            vampireBg.style.opacity = opacity;

            // 버튼: scene4 중반부(progress > 0.3)부터 표시
            if (endLink) {
                if (progress > 0.3) {
                    endLink.classList.add('visible');
                } else {
                    endLink.classList.remove('visible');
                }
            }
        } else if (rect.top >= viewH) {
            // scene4 아직 안 나타남 → 숨김
            vampireBg.style.transform = 'translateX(-50%) scale(0.08)';
            vampireBg.style.opacity = 0;
            if (endLink) endLink.classList.remove('visible');
        } else {
            // scene4 완전히 지나감
            if (endLink) endLink.classList.remove('visible');
        }
    }

    /* ── 스크롤 이벤트 (RAF 최적화) ── */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                updateParallax();
                updateVampireZoom();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* 초기 1회 실행 */
    updateProgress();
    updateParallax();
});