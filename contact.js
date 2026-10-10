gsap.registerPlugin(ScrollTrigger);

function initContactAnimations() {
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.contact-form-section', {
        x: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.contact-info-section', {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.form-group', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const project = document.getElementById('project').value;
        const message = document.getElementById('message').value.trim();

        const subject = encodeURIComponent('Website enquiry: ' + (project || 'general'));
        const body = encodeURIComponent(
            'Name: ' + name + '\nEmail: ' + email + '\nProject: ' + project + '\n\n' + message
        );

        window.location.href = 'mailto:mr.mukkuli@gmail.com?subject=' + subject + '&body=' + body;

        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening your mail app...';

        form.reset();

        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 5000);
    });
}

function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

function initYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}

initContactAnimations();
initContactForm();
initNavScroll();
initYear();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});
