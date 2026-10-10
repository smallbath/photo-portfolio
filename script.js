gsap.registerPlugin(ScrollTrigger);

const projectSlideshows = new Map();

function initSlideshows() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach((project, projectIndex) => {
        const images = project.querySelectorAll('.slideshow-image');
        if (images.length <= 1) return;
        
        const slideshowData = {
            images: images,
            currentSlide: 0,
            intervalId: null,
            isHovering: false
        };
        
        projectSlideshows.set(project, slideshowData);
        
        project.addEventListener('mouseenter', () => {
            slideshowData.isHovering = true;
            startSlideshow(slideshowData);
        });
        
        project.addEventListener('mouseleave', () => {
            slideshowData.isHovering = false;
            stopSlideshow(slideshowData);
            resetToFirstSlide(slideshowData);
        });
    });
}

function startSlideshow(slideshowData) {
    if (slideshowData.intervalId) return;
    
    slideshowData.intervalId = setInterval(() => {
        if (!slideshowData.isHovering) {
            stopSlideshow(slideshowData);
            return;
        }
        
        slideshowData.images[slideshowData.currentSlide].classList.remove('active');
        
        slideshowData.currentSlide = (slideshowData.currentSlide + 1) % slideshowData.images.length;
        
        slideshowData.images[slideshowData.currentSlide].classList.add('active');
    }, 800);
}

function stopSlideshow(slideshowData) {
    if (slideshowData.intervalId) {
        clearInterval(slideshowData.intervalId);
        slideshowData.intervalId = null;
    }
}

function resetToFirstSlide(slideshowData) {
    slideshowData.images[slideshowData.currentSlide].classList.remove('active');
    slideshowData.currentSlide = 0;
    slideshowData.images[0].classList.add('active');
}

function initAnimations() {
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
    });

    gsap.to('.hero-image', {
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.to('.hero-image img', {
        scale: 1,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out'
    });

    
    }

function initGalleryScroll() {
    const wrapper = document.querySelector('.projects-wrapper');
    const gallery = document.querySelector('.gallery');
    if (!wrapper || !gallery) return;

    const distance = () => Math.max(0, wrapper.scrollWidth - window.innerWidth + 120);

    gsap.to(wrapper, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
            trigger: gallery,
            start: 'top top+=80',
            end: () => '+=' + distance(),
            scrub: 1,
            pin: gallery,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => {
                document.body.classList.toggle('gallery-pinned', self.isActive);
            }
        }
    });

    const currentEl = document.querySelector('.project-counter .current');
    const totalEl = document.querySelector('.project-counter .total');
    const projects = document.querySelectorAll('.project');

    if (totalEl) totalEl.textContent = String(projects.length).padStart(2, '0');

    ScrollTrigger.create({
        trigger: gallery,
        start: 'top top+=80',
        end: () => '+=' + distance(),
        scrub: 1,
        onUpdate: (self) => {
            if (!currentEl) return;
            const idx = Math.min(Math.floor(self.progress * projects.length) + 1, projects.length);
            currentEl.textContent = String(idx).padStart(2, '0');
        }
    });
}

function updateProjectCounter() {
    const projects = document.querySelectorAll('.project');
    const currentSpan = document.querySelector('.project-counter .current');
    const totalSpan = document.querySelector('.project-counter .total');
    
    totalSpan.textContent = projects.length.toString().padStart(2, '0');

    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top top',
        end: () => `+=${document.querySelector('.projects-wrapper').scrollWidth}`,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.min(
                Math.floor(progress * projects.length) + 1,
                projects.length
            );
            currentSpan.textContent = currentIndex.toString().padStart(2, '0');
        }
    });
}

function initParallax() {
    gsap.to('.hero-image img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

function handleNavScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function init() {
    initAnimations();
    handleNavScroll();
    initSlideshows();
    
    ScrollTrigger.refresh();
    
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        initGalleryScroll();
        initParallax();
    });
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

/* Project modal */
const projectData = [
    {
        key: 'branding',
        title: 'Branding',
        subtitle: 'Logos, marks, and identity',
        images: [
            'images/project-1-1.jpg',
            'images/project-1-2.jpg',
            'images/project-1-3.jpg',
            'images/project-1-4.jpg',
            'images/project-1-5.jpg'
        ]
    },
    {
        key: 'illustration',
        title: 'Illustration',
        subtitle: 'Digital drawing and art',
        images: [
            'images/project-2-1.jpg',
            'images/project-2-2.jpg',
            'images/project-2-3.jpg',
            'images/project-2-4.jpg',
            'images/project-2-5.jpg'
        ]
    },
    {
        key: 'web-design',
        title: 'Web Design',
        subtitle: 'Sites and small apps',
        images: [
            'images/project-3-1.jpg',
            'images/project-3-2.jpg',
            'images/project-3-3.jpg',
            'images/project-3-4.jpg',
            'images/project-3-5.jpg'
        ]
    },
    {
        key: 'social-media',
        title: 'Social Media',
        subtitle: 'Post and story graphics',
        images: [
            'images/project-4-1.jpg',
            'images/project-4-2.jpg',
            'images/project-4-3.jpg',
            'images/project-4-4.jpg',
            'images/project-4-5.jpg'
        ]
    },
    {
        key: 'print',
        title: 'Print',
        subtitle: 'Posters, cards, zines',
        images: [
            'images/project-5-1.jpg',
            'images/project-5-2.jpg',
            'images/project-5-3.jpg',
            'images/project-5-4.jpg',
            'images/project-5-5.jpg'
        ]
    },
    {
        key: 'animation',
        title: 'Animation',
        subtitle: 'Short motion work',
        images: [
            'images/project-6-1.jpg',
            'images/project-6-2.jpg',
            'images/project-6-3.jpg',
            'images/project-6-4.jpg',
            'images/project-6-5.jpg'
        ]
    },
    {
        key: 'posters',
        title: 'Posters',
        subtitle: 'Design for walls',
        images: [
            'images/project-7-1.jpg',
            'images/project-7-2.jpg',
            'images/project-7-3.jpg',
            'images/project-7-4.jpg',
            'images/project-7-5.jpg'
        ]
    },
    {
        key: 'typography',
        title: 'Typography',
        subtitle: 'Type experiments',
        images: [
            'images/project-8-1.jpg',
            'images/project-8-2.jpg',
            'images/project-8-3.jpg',
            'images/project-8-4.jpg',
            'images/project-8-5.jpg'
        ]
    }
];

const modal = document.getElementById('projectModal');
const modalTitle = modal ? modal.querySelector('.modal-title') : null;
const modalSubtitle = modal ? modal.querySelector('.modal-subtitle') : null;
const modalGrid = modal ? modal.querySelector('.modal-grid') : null;
const modalClose = modal ? modal.querySelector('.modal-close') : null;
const modalPrev = modal ? modal.querySelector('.modal-prev') : null;
const modalNext = modal ? modal.querySelector('.modal-next') : null;
const modalIndex = modal ? modal.querySelector('.modal-index') : null;
const modalTotal = modal ? modal.querySelector('.modal-total') : null;

let activeIndex = 0;

function renderModal(index) {
    if (!modal) return;
    activeIndex = ((index % projectData.length) + projectData.length) % projectData.length;
    const data = projectData[activeIndex];

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    if (modalIndex) modalIndex.textContent = String(activeIndex + 1).padStart(2, '0');
    if (modalTotal) modalTotal.textContent = String(projectData.length).padStart(2, '0');

    modalGrid.innerHTML = '';
    data.images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = data.title;
        img.addEventListener('click', () => openLightbox(src, data.title));
        modalGrid.appendChild(img);
    });
}

function openModal(index) {
    renderModal(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project').forEach((el, i) => {
    el.addEventListener('click', () => openModal(i));
});

if (modal) {
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => renderModal(activeIndex - 1));
    modalNext.addEventListener('click', () => renderModal(activeIndex + 1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    modalGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    modalGrid.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) renderModal(activeIndex + 1);
            else renderModal(activeIndex - 1);
        }
    }, { passive: true });
}

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
}

if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        return;
    }
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowRight') renderModal(activeIndex + 1);
        else if (e.key === 'ArrowLeft') renderModal(activeIndex - 1);
    }
});
