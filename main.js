 document.addEventListener('DOMContentLoaded', function () {
            // Initialize AOS
            AOS.init({
                duration: 800,
                once: true,
                offset: 50,
            });

            // --- Navbar Logic ---
            const navbar = document.getElementById('navbar');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            // Sticky navbar on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-sticky');
                } else {
                    navbar.classList.remove('navbar-sticky');
                }
            });

            // Mobile menu toggle
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu on link click
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // --- GSAP Parallax Hero ---
            gsap.registerPlugin(ScrollTrigger);
            gsap.to("#hero-parallax-bg", {
                y: 100,
                ease: "none",
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
            });

            // --- Music Section Filter Logic ---
            const filterButtons = document.querySelectorAll('.filter-btn');
            const bhajanCards = document.querySelectorAll("#bhajan-card");

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active button style
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active', 'bg-pink-500', 'text-white');
                        btn.classList.add('bg-white', 'text-gray-700');
                    });

                    button.classList.remove('bg-white', 'text-gray-700');
                    button.classList.add('active', 'bg-pink-500', 'text-white');

                    const filter = button.textContent.trim().toLowerCase().replace(' ', '-');

                    bhajanCards.forEach(card => {
                        const category = card.dataset.category.toLowerCase().replace(' ', '-');
                        if (filter === 'all' || filter === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // --- Blog Modal Logic ---
            const blogCards = document.querySelectorAll('.blog-card');
            const blogReader = document.getElementById('blog-reader');
            const closeBlogButton = document.getElementById('close-blog');
            const blogTitle = document.getElementById('blog-title');
            const blogContent = document.getElementById('blog-content');

            blogCards.forEach(card => {
                card.addEventListener('click', () => {
                    const title = card.dataset.title;
                    const content = card.dataset.content;

                    blogTitle.textContent = title;

                    // Add animated dividers
                    const formattedContent = content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('');
                    blogContent.innerHTML = formattedContent.replace(/\./g, '.<div class="divider-icon text-2xl">🪷</div>');

                    blogReader.classList.add('open');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                });
            });

            const closeBlog = () => {
                blogReader.classList.remove('open');
                document.body.style.overflow = '';
            };

            closeBlogButton.addEventListener('click', closeBlog);

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && blogReader.classList.contains('open')) {
                    closeBlog();
                }
            });
        });