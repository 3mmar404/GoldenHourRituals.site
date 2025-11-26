document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Element Selectors
    const grid = document.getElementById('product-grid');
    const noResults = document.getElementById('no-results');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    
    // Modal selectors
    const productModal = document.getElementById('product-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal');

    // 2. Initialize: Render all products
    renderProducts(products);

    // 3. Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active-filter', '!bg-marine-depths', '!text-white');
                b.classList.add('glass-card', 'text-luxury-charcoal'); 
            });
            
            btn.classList.remove('glass-card', 'text-luxury-charcoal');
            btn.classList.add('active-filter', '!bg-marine-depths', '!text-white');

            const category = btn.getAttribute('data-filter');

            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });

    // 4. Menu Toggle Logic (Mobile)
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('-translate-y-[150%]');
        if (isHidden) {
            mobileMenu.classList.remove('-translate-y-[150%]');
        } else {
            mobileMenu.classList.add('-translate-y-[150%]');
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-[150%]');
        });
    });

    // 5. Modal Control Functions
    function openProductModal(product) {
        populateModal(product);
        productModal.classList.add('show-modal');
        modalBackdrop.classList.add('show-modal');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeProductModal() {
        productModal.classList.remove('show-modal');
        modalBackdrop.classList.remove('show-modal');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // 6. Populate Modal - Buttons Inside Content
    function populateModal(product) {
        const modalContent = document.getElementById('modal-content');
        
        // Gallery Setup
        const galleryHtml = product.gallery && product.gallery.length > 0 
            ? product.gallery.map((img, idx) => `
                <div class="gallery-item ${idx === 0 ? 'active' : ''} cursor-pointer transition-opacity duration-300" data-index="${idx}">
                    <img src="${img}" alt="Product gallery" class="w-full h-full object-contain drop-shadow-xl">
                </div>`).join('')
            : `<div class="gallery-item active"><img src="${product.image}" class="w-full h-full object-contain"></div>`;

        const thumbnailsHtml = product.gallery && product.gallery.length > 0
            ? product.gallery.map((img, idx) => `
                <button class="gallery-thumb ${idx === 0 ? 'active' : ''} w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border border-rose-quartz/50 hover:border-gold-hour transition-all shadow-sm" data-index="${idx}">
                    <img src="${img}" class="w-full h-full object-cover">
                </button>`).join('') : '';

        // Setup Purchase Links
        const linksHtml = product.links && product.links.length > 0
            ? product.links.map(link => `
                <a href="${link.url}" target="_blank" class="flex items-center justify-center gap-2 px-4 py-3 bg-marine-depths text-[#F2E8DC] rounded-lg shadow-md hover:bg-[#1a4c6b] transition-all duration-300 active:scale-95 w-full group">
                    <img src="https://flagcdn.com/24x18/${link.flag ? link.flag.toLowerCase() : 'us'}.png" class="h-3 w-5 object-cover rounded-[2px]">
                    <span class="font-sans font-bold tracking-wide uppercase text-xs md:text-sm">Shop in ${link.country}</span>
                </a>`).join('')
            : '<button disabled class="w-full py-4 bg-gray-200 text-gray-500 rounded-xl">Out of Stock</button>';

        // Build Modal Structure
        modalContent.innerHTML = `
            <div class="modal-content-wrapper grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative">
                
                <div class="gallery-section space-y-4">
                    <div class="relative w-full aspect-square bg-gradient-to-b from-white to-skin-glow rounded-2xl overflow-hidden shadow-inner border border-white/60">
                        <div class="gallery-container relative w-full h-full p-6">${galleryHtml}</div>
                    </div>
                    ${thumbnailsHtml ? `<div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-center md:justify-start">${thumbnailsHtml}</div>` : ''}
                </div>

                <div class="flex flex-col h-full">
                    <div class="mb-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-hour/10 text-marine-depths text-[10px] font-bold uppercase mb-3">
                            ${product.category ? product.category.replace(/[^\w\s]/gi, '') : 'Ritual'}
                        </span>
                        <h2 class="font-serif text-3xl md:text-4xl text-marine-depths leading-tight">${product.name}</h2>
                    </div>

                    <div class="bg-white/60 p-5 rounded-xl border border-rose-quartz/30 mb-6 relative">
                        <div id="desc-container" class="relative overflow-hidden transition-all duration-500 ease-in-out" style="max-height: 120px;">
                            <p class="font-sans text-luxury-charcoal/90 text-sm md:text-base text-justify">
                                ${product.longDescription || product.description}
                            </p>
                            <div id="desc-fade" class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>
                        <button id="read-more-btn" class="mt-3 text-xs font-bold text-gold-hour uppercase flex items-center gap-1">Read More <i class="ph-bold ph-caret-down"></i></button>
                    </div>

                    ${product.howToUse ? `
                        <div class="space-y-3 mb-6">
                            <h3 class="font-serif text-xl text-marine-depths mb-2 px-1">The Ritual</h3>
                            ${Array.isArray(product.howToUse) ? product.howToUse.map((step, idx) => `
                                <div class="flex gap-4 p-4 bg-skin-glow/80 rounded-xl border border-gold-hour/10">
                                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-marine-depths !text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-md font-sans">${idx + 1}</span>
                                    <p class="font-sans text-sm text-luxury-charcoal leading-relaxed">${step}</p>
                                </div>`).join('') : ''}
                        </div>` : ''}

                    <div class="purchase-sticky-container mt-auto pt-4 sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-marine-depths/10 -mx-4 px-4 pb-4 md:static md:bg-transparent md:border-0 md:p-0 md:mx-0">
                        <div class="grid ${product.links && product.links.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3 w-full">
                            ${linksHtml}
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Initialize Read More Button
        const descContainer = modalContent.querySelector('#desc-container');
        const readMoreBtn = modalContent.querySelector('#read-more-btn');
        const descFade = modalContent.querySelector('#desc-fade');
        let isExpanded = false;

        if(readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                if (!isExpanded) {
                    descContainer.style.maxHeight = descContainer.scrollHeight + "px";
                    descFade.style.opacity = '0';
                    readMoreBtn.innerHTML = 'Read Less <i class="ph-bold ph-caret-up"></i>';
                } else {
                    descContainer.style.maxHeight = '120px';
                    descFade.style.opacity = '1';
                    readMoreBtn.innerHTML = 'Read More <i class="ph-bold ph-caret-down"></i>';
                }
                isExpanded = !isExpanded;
            });
        }

        // Initialize Gallery Navigation
        const galleryItems = modalContent.querySelectorAll('.gallery-item');
        const galleryThumbs = modalContent.querySelectorAll('.gallery-thumb');
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = thumb.getAttribute('data-index');
                galleryItems.forEach((item, idx) => item.classList.toggle('active', idx == index));
                galleryThumbs.forEach((t, idx) => t.classList.toggle('active', idx == index));
            });
        });
    }

    // 7. Modal Event Listeners
    closeModalBtn.addEventListener('click', closeProductModal);
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeProductModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('show-modal')) {
            closeProductModal();
        }
    });

    /**
     * Core Render Function
     * @param {Array} items - Product array
     */
    function renderProducts(items) {
        try {
            grid.innerHTML = '';

            if (!items || items.length === 0) {
                noResults.classList.remove('hidden');
                return;
            }

            noResults.classList.add('hidden');

            items.forEach(product => {
                const card = document.createElement('article');
                card.className = 'glass-card flex flex-col h-full animate-fade-in-up cursor-pointer group';
                
                // Create purchase buttons
                let linkButtonsHtml = '';
                if (product.links) {
                    product.links.forEach((link, idx) => {
                        const flagCode = link.flag ? link.flag.toLowerCase() : 'us';
                        const isPrimary = idx === 0 ? 'shop-btn-primary' : '';
                        linkButtonsHtml += `
                            <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                               onclick="event.stopPropagation();"
                               title="Shop in ${link.country}" 
                               class="flex items-center justify-center bg-white/40 hover:bg-gold-hour/20 border border-white/20 p-2 rounded-md transition-all duration-300 hover:scale-110 ${isPrimary}">
                                <img src="https://flagcdn.com/24x18/${flagCode}.png" alt="${link.country}" loading="lazy" class="h-4 shadow-sm">
                                <span class="sr-only">Buy in ${link.country}</span>
                            </a>
                        `;
                    });
                }

                card.innerHTML = `
                    <div class="product-image-container relative overflow-hidden rounded-lg mb-4 shadow-inner bg-[#FFF9F2] flex items-center justify-center">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                        <i class="ph ph-spinner animate-spin absolute text-gold-hour/30 text-3xl"></i>
                        <img src="${product.image}" alt="${product.name}" loading="lazy"
                             onerror="this.src='https://placehold.co/400x400?text=No+Image'"
                             onload="this.previousElementSibling.remove()"
                             class="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out opacity-95 relative z-10">
                    </div>
                    
                    <div class="flex-grow">
                        <span class="block text-xs font-sans text-marine-depths/70 tracking-widest uppercase mb-2">
                            ${product.category ? product.category.replace(/[^\w\s]/gi, '') : 'Skincare'}
                        </span>
                        
                        <!-- Star Rating -->
                        ${(() => {
                            const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
                            const reviewCount = Math.floor(Math.random() * (5000 - 100) + 100);
                            return `
                                <div class="flex items-center gap-1 mb-2">
                                    <div class="flex text-yellow-500 text-xs">
                                        <i class="ph-fill ph-star"></i>
                                        <i class="ph-fill ph-star"></i>
                                        <i class="ph-fill ph-star"></i>
                                        <i class="ph-fill ph-star"></i>
                                        <i class="ph-fill ph-star-half"></i>
                                    </div>
                                    <span class="text-[10px] text-marine-depths/60 font-sans">(${rating}) • ${reviewCount} reviews</span>
                                </div>
                            `;
                        })()}
                        
                        <h3 class="font-serif text-xl text-luxury-charcoal font-medium leading-tight mb-3 group-hover:text-gold-hour transition-colors">
                            ${product.name}
                        </h3>
                        <p class="font-sans text-sm text-luxury-charcoal font-light mb-6 leading-relaxed line-clamp-2">
                            ${product.description}
                        </p>
                    </div>

                    <div class="pt-4 mt-auto border-t border-white/10 flex flex-wrap gap-2">
                        ${linkButtonsHtml}
                    </div>
                `;
                
                // Add click event to open modal (but not on link clicks)
                card.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                        openProductModal(product);
                    }
                });

                grid.appendChild(card);
            });
        } catch (error) {
            console.error("Error rendering products:", error);
            noResults.classList.remove('hidden');
            noResults.innerHTML = '<p class="text-red-500">Something went wrong loading the rituals.</p>';
        }
    }

    // Default: Highlight 'All' button on load
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.remove('glass-card', 'text-luxury-charcoal');
        allBtn.classList.add('!bg-marine-depths', '!text-white');
    }

    // 8. Smart Header: Hide on scroll down, show on scroll up
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('-translate-y-full');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('-translate-y-full')) {
            // Scrolling down -> hide header
            header.classList.add('-translate-y-full', 'transition-transform', 'duration-300');
        } else if (currentScroll < lastScroll && header.classList.contains('-translate-y-full')) {
            // Scrolling up -> show header
            header.classList.remove('-translate-y-full');
        }
        lastScroll = currentScroll;
    });

});