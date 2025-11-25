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

    // 6. Populate Modal with Product Data
    function populateModal(product) {
        const modalContent = document.getElementById('modal-content');
        
        // Generate gallery images HTML
        const galleryHtml = product.gallery && product.gallery.length > 0 
            ? product.gallery.map((img, idx) => `
                <div class="gallery-item ${idx === 0 ? 'active' : ''} cursor-pointer" data-index="${idx}">
                    <img src="${img}" alt="Product gallery ${idx + 1}" class="w-full h-full object-contain">
                </div>
            `).join('')
            : `<div class="gallery-item active"><img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain"></div>`;

        // Generate gallery thumbnails
        const thumbnailsHtml = product.gallery && product.gallery.length > 0
            ? product.gallery.map((img, idx) => `
                <button class="gallery-thumb ${idx === 0 ? 'active' : ''} w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-gold-hour transition-all" data-index="${idx}" title="View image ${idx + 1}">
                    <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover">
                </button>
            `).join('')
            : `<button class="gallery-thumb active w-16 h-16 rounded-lg overflow-hidden border-2 border-gold-hour"><img src="${product.image}" alt="Main image" class="w-full h-full object-cover"></button>`;

        // Generate purchase links
        const linksHtml = product.links && product.links.length > 0
            ? product.links.map(link => {
                const flagCode = link.flag ? link.flag.toLowerCase() : 'us';
                return `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                       class="group flex items-center gap-3 px-4 py-2 bg-gold-hour/20 hover:bg-gold-hour/40 border border-gold-hour/50 rounded-lg transition-all duration-300 hover:scale-105">
                        <img src="https://flagcdn.com/24x18/${flagCode}.png" alt="${link.country}" class="h-4">
                        <span class="text-sm font-sans text-luxury-charcoal">Shop in ${link.country}</span>
                    </a>
                `;
            }).join('')
            : '<p class="text-marine-depths/60 italic">No purchase links available</p>';

        modalContent.innerHTML = `
            <div class="modal-content-wrapper grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Gallery Section -->
                <div class="gallery-section space-y-4">
                    <div class="relative w-full aspect-square bg-[#FFF9F2] rounded-xl overflow-hidden shadow-lg">
                        <div class="gallery-container relative w-full h-full">
                            ${galleryHtml}
                        </div>
                    </div>
                    
                    <!-- Thumbnails -->
                    ${product.gallery && product.gallery.length > 1 ? `
                        <div class="flex gap-2 overflow-x-auto pb-2">
                            ${thumbnailsHtml}
                        </div>
                    ` : ''}
                </div>

                <!-- Content Section -->
                <div class="space-y-4 flex flex-col pb-24 md:pb-0">
                    <!-- Header -->
                    <div>
                        <span class="inline-block text-xs font-sans text-marine-depths/70 tracking-widest uppercase mb-2 px-3 py-1 bg-marine-depths/10 rounded-full">
                            ${product.category ? product.category.replace(/[^\w\s]/gi, '') : 'Skincare'}
                        </span>
                        <h2 class="font-serif text-3xl text-luxury-charcoal font-medium leading-tight">
                            ${product.name}
                        </h2>
                    </div>

                    <!-- Description -->
                    <div class="space-y-4 flex-grow">
                        <div>
                            <h3 class="font-serif text-lg text-marine-depths mb-2">Product Overview</h3>
                            <p class="font-sans text-sm text-luxury-charcoal leading-relaxed">
                                ${product.longDescription || product.description}
                            </p>
                        </div>

                        ${product.howToUse ? `
                            <div>
                                <h3 class="font-serif text-lg text-marine-depths mb-2">How to Use</h3>
                                <p class="font-sans text-sm text-luxury-charcoal leading-relaxed whitespace-pre-wrap">
                                    ${product.howToUse}
                                </p>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Purchase Links - Fixed on Mobile -->
                    <div class="purchase-links-container space-y-3 md:space-y-3 md:mt-auto md:pt-6 md:border-t md:border-white/20">
                        <p class="text-xs font-sans text-marine-depths/70 tracking-widest uppercase">Shop Now</p>
                        <div class="flex flex-wrap gap-2 md:gap-2">
                            ${linksHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for gallery
        const galleryItems = modalContent.querySelectorAll('.gallery-item');
        const galleryThumbs = modalContent.querySelectorAll('.gallery-thumb');

        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = thumb.getAttribute('data-index');
                galleryItems.forEach((item, idx) => {
                    item.classList.toggle('active', idx === parseInt(index));
                });
                galleryThumbs.forEach((t, idx) => {
                    t.classList.toggle('active', idx === parseInt(index));
                });
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
                    product.links.forEach(link => {
                        const flagCode = link.flag ? link.flag.toLowerCase() : 'us';
                        linkButtonsHtml += `
                            <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                               onclick="event.stopPropagation();"
                               title="Shop in ${link.country}" 
                               class="flex items-center justify-center bg-white/40 hover:bg-gold-hour/20 border border-white/20 p-2 rounded-md transition-all duration-300 hover:scale-110">
                                <img src="https://flagcdn.com/24x18/${flagCode}.png" alt="${link.country}" loading="lazy" class="h-4 shadow-sm">
                                <span class="sr-only">Buy in ${link.country}</span>
                            </a>
                        `;
                    });
                }

                card.innerHTML = `
                    <div class="product-image-container relative overflow-hidden rounded-lg mb-4 shadow-inner bg-[#FFF9F2]">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                        <img src="${product.image}" alt="${product.name}" loading="lazy"
                             onerror="this.src='https://placehold.co/400x400?text=No+Image'"
                             class="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out opacity-95">
                    </div>
                    
                    <div class="flex-grow">
                        <span class="block text-xs font-sans text-marine-depths/70 tracking-widest uppercase mb-2">
                            ${product.category ? product.category.replace(/[^\w\s]/gi, '') : 'Skincare'}
                        </span>
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

});