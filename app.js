import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, collection, onSnapshot, addDoc, doc, setDoc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const translations = {
    hy: {
        tagline: "Պետական Բնական Արգելոցներ",
        sync_status: "Ավտոմատ Սինխրոնացված է",
        hero_badge: "Հայաստանի Անխաթար Բնությունը",
        hero_title: "Հայաստանի Պետական Բնական Արգելոցներ",
        hero_subtitle: "Բացահայտեք դարավոր անտառները, դարեդար պահպանված արգելոցները, լեռնային վճիտ լճերը և շառաչուն ջրվեժները:",
        btn_explore: "Ուսումնասիրել Արգելոցները",
        btn_gallery: "Դիտել Պորտֆոլիոն",
        stat_reserves: "Պետական Արգելոց",
        stat_species: "Կարմիր Գրքի Տեսակներ",
        stat_waterfalls: "Ջրվեժներ & Լճեր",
        stat_history: "Պատմական Ժառանգություն",
        reserves_badge: "Պահպանվող Տարածքներ",
        reserves_title: "Հայաստանի Պետական Բնական Արգելոցները",
        reserves_desc: "Կարող եք ավելացնել ձեր նկարը, խմբագրել տվյալները կամ ավելացնել նոր արգելոցի քարտեր:",
        portfolio_badge: "Ինտերակտիվ Պորտֆոլիո",
        portfolio_title: "Լուսանկարների Պորտֆոլիո",
        portfolio_desc: "Կիսվեք ձեր լուսանկարներով կամ դիտեք համայնքի կողմից ավելացված նկարները:",
        btn_add_media: "Ավելացնել Ֆայլ (Upload)",
        btn_add_reserve: "Ավելացնել Արգելոց",
        export_data: "Export (JSON)",
        import_data: "Import (JSON)",
        btn_edit: "Խմբագրել",
        btn_delete: "Ջնջել",
        btn_cancel: "Չեղարկել",
        btn_confirm: "Հաստատել",
        confirm_title: "Հաստատում",
        confirm_delete_reserve: "Վստա՞հ եք, որ ցանկանում եք ջնջել այս արգելոցի քարտը:",
        official_source: "Պաշտոնական Աղբյուր",
        ph_search_reserves: "Փնտրել արգելոց...",
        footer_about: "Նվիրված է Հայաստանի պետական բնական արգելոցների, դրանց հարակից պատմական և բնական հուշարձանների հանրայնացմանն ու պահպանմանը:",
        footer_links_title: "Օգտակար Հղումներ",
        footer_pledge_title: "Բնապահպանական Կոչ",
        footer_pledge_text: "«Պահպանենք բնությունը միասին: Այցելելով արգելոցներ՝ հարգեք տեղի կենսաբազմազանությունը, մի աղտոտեք շրջակայքը և թողեք միայն ոտնահետքեր»:",
        footer_rights: "Բոլոր իրավունքները պաշտպանված են:"
    },
    en: {
        tagline: "State Nature Reserves",
        sync_status: "Auto-synced",
        hero_badge: "Pristine Nature of Armenia",
        hero_title: "State Nature Reserves of Armenia",
        hero_subtitle: "Explore ancient forests, strictly protected reserves, pristine mountain lakes, and roaring waterfalls.",
        btn_explore: "Explore Reserves",
        btn_gallery: "View Portfolio",
        stat_reserves: "State Reserves",
        stat_species: "Red Book Species",
        stat_waterfalls: "Waterfalls & Lakes",
        stat_history: "Historical Heritage",
        reserves_badge: "Protected Areas",
        reserves_title: "State Nature Reserves of Armenia",
        reserves_desc: "You can upload your own image, edit details, or create new reserve cards.",
        portfolio_badge: "Interactive Portfolio",
        portfolio_title: "Photo Gallery",
        portfolio_desc: "Share your photos or explore photos added by the community.",
        btn_add_media: "Upload File",
        btn_add_reserve: "Add Reserve",
        export_data: "Export (JSON)",
        import_data: "Import (JSON)",
        btn_edit: "Edit",
        btn_delete: "Delete",
        btn_cancel: "Cancel",
        btn_confirm: "Confirm",
        confirm_title: "Confirmation",
        confirm_delete_reserve: "Are you sure you want to delete this reserve card?",
        official_source: "Official Source",
        ph_search_reserves: "Search reserve...",
        footer_about: "Dedicated to promoting and protecting Armenia's state nature reserves and adjacent monuments.",
        footer_links_title: "Useful Links",
        footer_pledge_title: "Eco Pledge",
        footer_pledge_text: "“Let's protect nature together. When visiting reserves, respect biodiversity and leave only footprints.”",
        footer_rights: "All rights reserved."
    }
};

const defaultReservesData = [
    {
        title: { hy: "«Խոսրովի Անտառ» Պետական Արգելոց", en: "Khosrov Forest State Reserve" },
        location: { hy: "Արարատի մարզ", en: "Ararat Province" },
        area: "23,888 ha",
        established: "330-338 AD / 1958",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        officialLink: "http://khosrovreserve.am",
        officialName: "khosrovreserve.am",
        description: {
            hy: "Հիմնադրվել է 4-րդ դարում Խոսրով Գ Կոտակ թագավորի կողմից: Աշխարհի հնագույն պահպանվող տարածքներից է, հարուստ է կովկասյան հովազով, բեզոարյան այծերով և հազվագյուտ կաղնու անտառներով:",
            en: "Founded in the 4th century by King Khosrov III. One of the world's oldest protected areas, home to the Caucasian leopard, bezoar goats, and rare juniper-oak woodlands."
        },
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop",
                caption: { hy: "Առավոտյան լույսը Խոսրովի արգելոցի լեռներում", en: "Morning light over Khosrov mountains" }
            }
        ]
    },
    {
        title: { hy: "«Շիկահողի» Պետական Արգելոց", en: "Shikahogh State Reserve" },
        location: { hy: "Սյունիքի մարզ", en: "Syunik Province" },
        area: "12,137 ha",
        established: "1958",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
        officialLink: "http://mnp.am",
        officialName: "mnp.am (ՀՀ ՇՄՆ)",
        description: {
            hy: "Հայաստանի երկրորդ խոշոր արգելոցն է, որը պահպանում է Կապանի հարուստ թավուտ անտառները, եզակի պլատանային պուրակները և հարյուրավոր հազվագյուտ բույսեր:",
            en: "Armenia's second-largest state reserve, safeguarding Syunik's lush virgin forests, rare oriental plane groves, and diverse wildlife."
        },
        gallery: []
    }
];

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOtLg07jKOOkeQVbODNak3XiOcd4exQ-E",
    authDomain: "armenian-natural-reservies-c2c.firebaseapp.com",
    projectId: "armenian-natural-reservies-c2c",
    storageBucket: "armenian-natural-reservies-c2c.firebasestorage.app",
    messagingSenderId: "1017585179307",
    appId: "1:1017585179307:web:0be9811fa9296ee52c35ee",
    measurementId: "G-SB5X8CQ8KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reservesCollection = collection(db, "reserves");

let currentLang = 'hy';
let searchQuery = "";
let activeGalleryImages = [];
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let currentReserveTitle = "";
let reservesData = [];

// Real-Time Database sync (onSnapshot)
onSnapshot(reservesCollection, (snapshot) => {
    if (snapshot.empty) {
        // Seeding database if empty
        defaultReservesData.forEach(async (res) => {
            await addDoc(reservesCollection, res);
        });
    } else {
        reservesData = [];
        snapshot.forEach((doc) => {
            reservesData.push({ id: doc.id, ...doc.data() });
        });
        renderReserves();
        notifySyncSuccess();
        updateHeroStats();
    }
});

function notifySyncSuccess() {
    const badge = document.getElementById('syncStatusBadge');
    const text = document.getElementById('syncStatusText');
    if (badge && text) {
        badge.classList.remove('hidden');
        text.textContent = (translations[currentLang] && translations[currentLang].sync_status) || "Սինխրոնացված է";
    }
}

function updateHeroStats() {
    const resCountEl = document.getElementById('statReservesCount');
    if (resCountEl) resCountEl.textContent = reservesData.length;
}

function toggleDarkMode() {
    const htmlEl = document.documentElement;
    const iconEl = document.getElementById('darkModeIcon');
    if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        iconEl.className = "fa-solid fa-moon text-emerald-600 text-sm";
    } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        iconEl.className = "fa-solid fa-sun text-amber-400 text-sm";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const iconEl = document.getElementById('darkModeIcon');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (iconEl) iconEl.className = "fa-solid fa-sun text-amber-400 text-sm";
    } else {
        document.documentElement.classList.remove('dark');
        if (iconEl) iconEl.className = "fa-solid fa-moon text-emerald-600 text-sm";
    }
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function getText(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.hy || '';
}

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
    });

    const langLabel = document.getElementById('currentLangLabel');
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    renderReserves();
}

function renderReserves() {
    const container = document.getElementById('reservesGrid');
    const countBadge = document.getElementById('reserveCountBadge');
    if (!container) return;

    const filtered = reservesData.filter(res => {
        const title = getText(res.title);
        const loc = getText(res.location);
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || loc.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (countBadge) countBadge.textContent = `${filtered.length} ${translations[currentLang].stat_reserves}`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <i class="fa-solid fa-folder-open text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i>
                <p class="text-slate-500 dark:text-slate-400 font-medium">Ոչինչ չի գտնվել:</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map((res) => {
        const titleText = getText(res.title);
        const locationText = getText(res.location);
        const descText = getText(res.description);
        const totalPhotosCount = (res.gallery ? res.gallery.length : 0) + 1;

        return `
        <div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group relative">
            <div class="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button onclick="openEditReserveModal('${res.id}', event)" class="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-110" title="Խմբագրել">
                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                </button>
                <button onclick="deleteReserveCard('${res.id}', event)" class="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-white backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-110" title="Ջնջել">
                    <i class="fa-solid fa-trash text-xs"></i>
                </button>
            </div>

            <div onclick="openReserveGalleryModal('${res.id}')" class="relative h-64 overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-900">
                <img src="${res.image}" alt="${escapeHTML(titleText)}" onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                
                <div class="absolute top-4 left-4 flex gap-2">
                    <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-md">${res.area || '10,000 ha'}</span>
                    <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 text-slate-200 backdrop-blur-md">${res.established || '1958'}</span>
                </div>

                <div class="absolute bottom-4 left-4 right-4 text-white">
                    <div class="text-xs text-emerald-400 font-semibold flex items-center gap-1 mb-1">
                        <i class="fa-solid fa-location-dot"></i> ${escapeHTML(locationText)}
                    </div>
                    <h3 class="text-xl font-bold leading-tight group-hover:text-emerald-300 transition-colors">${escapeHTML(titleText)}</h3>
                </div>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">${escapeHTML(descText)}</p>

                ${res.gallery && res.gallery.length > 0 ? `
                <div class="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                    ${res.gallery.map(g => `
                        <img src="${g.url}" onclick="openReserveGalleryModal('${res.id}')" class="w-12 h-12 rounded-lg object-cover cursor-pointer border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform shrink-0">
                    `).join('')}
                </div>
                ` : ''}

                <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                    <button onclick="openReserveGalleryModal('${res.id}')" class="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors">
                        <i class="fa-solid fa-images"></i> <span>Դիտել (${totalPhotosCount})</span>
                    </button>
                    <a href="${res.officialLink || '#'}" target="_blank" rel="noopener" class="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1">
                        <span>${res.officialName || 'mnp.am'}</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                </div>
            </div>
        </div>
    `}).join('');
}

function handleReserveSearch(event) {
    searchQuery = event.target.value;
    renderReserves();
}

function handleReserveImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('resImage').value = e.target.result;
        updateImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function handleGalleryFilesUpload(event) {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            activeGalleryImages.push({ url: e.target.result, caption: { hy: file.name } });
            renderGalleryThumbnailsModal();
        };
        reader.readAsDataURL(file);
    });
}

function renderGalleryThumbnailsModal() {
    const grid = document.getElementById('galleryThumbnailsGrid');
    if (!grid) return;

    grid.className = "flex flex-col gap-3 pt-2 max-h-64 overflow-y-auto custom-scrollbar";

    if (activeGalleryImages.length === 0) {
        grid.innerHTML = `<div class="w-full text-xs text-slate-400 italic text-center py-4">Նկարներ ավելացված չեն</div>`;
        return;
    }

    grid.innerHTML = activeGalleryImages.map((img, idx) => `
        <div class="flex items-start gap-3 bg-slate-900 p-3 rounded-xl border border-slate-700 relative group">
            <div class="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-black border border-slate-600">
                <img src="${img.url}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 flex flex-col gap-2">
                <label class="text-[10px] text-teal-400 font-bold uppercase">Նկարի նկարագրություն</label>
                <textarea 
                    oninput="updateGalleryCaption(${idx}, this.value)" 
                    placeholder="Գրեք նկարի մասին այստեղ..."
                    class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:outline-none focus:border-teal-500 resize-none h-16 custom-scrollbar"
                >${img.caption && img.caption.hy ? escapeHTML(img.caption.hy) : ''}</textarea>
            </div>
            <button type="button" onclick="removeGalleryImage(${idx})" class="w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center text-xs shrink-0 transition-colors shadow-md">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateGalleryCaption(index, value) {
    if (activeGalleryImages[index]) {
        activeGalleryImages[index].caption = { hy: value, en: value };
    }
}

function removeGalleryImage(index) {
    activeGalleryImages.splice(index, 1);
    renderGalleryThumbnailsModal();
}

function updateImagePreview(url) {
    const previewImg = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('imagePreviewContainer');
    if (url && url.trim().length > 0) {
        previewImg.src = url;
        previewContainer.classList.remove('hidden');
    } else {
        previewContainer.classList.add('hidden');
    }
}

function openAddReserveModal() {
    document.getElementById('editReserveId').value = '';
    document.getElementById('reserveForm').reset();
    activeGalleryImages = [];
    renderGalleryThumbnailsModal();
    document.getElementById('imagePreviewContainer').classList.add('hidden');
    document.getElementById('reserveEditModal').classList.remove('hidden');
}

function openEditReserveModal(id, event) {
    if (event) event.stopPropagation();
    const reserve = reservesData.find(r => r.id === id);
    if (!reserve) return;

    document.getElementById('editReserveId').value = reserve.id;
    document.getElementById('reserveModalTitle').textContent = 'Խմբագրել Արգելոցը';
    document.getElementById('resTitleHy').value = getText(reserve.title);
    document.getElementById('resTitleEn').value = reserve.title.en || getText(reserve.title);
    document.getElementById('resLocation').value = getText(reserve.location);
    document.getElementById('resArea').value = reserve.area || '';
    document.getElementById('resEstablished').value = reserve.established || '';
    document.getElementById('resImage').value = reserve.image || '';
    document.getElementById('resDescHy').value = getText(reserve.description);
    document.getElementById('resOfficialLink').value = reserve.officialLink || '';
    document.getElementById('resOfficialName').value = reserve.officialName || '';

    activeGalleryImages = JSON.parse(JSON.stringify(reserve.gallery || []));
    renderGalleryThumbnailsModal();
    updateImagePreview(reserve.image);
    document.getElementById('reserveEditModal').classList.remove('hidden');
}

function closeReserveModal() {
    document.getElementById('reserveEditModal').classList.add('hidden');
}

// Save directly to Firestore
async function handleReserveFormSubmit(event) {
    event.preventDefault();
    const editId = document.getElementById('editReserveId').value;
    const titleHy = document.getElementById('resTitleHy').value;
    const titleEn = document.getElementById('resTitleEn').value;
    const location = document.getElementById('resLocation').value;

    const reservePayload = {
        title: { hy: titleHy, en: titleEn },
        location: { hy: location, en: location },
        area: document.getElementById('resArea').value || '10,000 ha',
        established: document.getElementById('resEstablished').value || '1958',
        image: document.getElementById('resImage').value || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        description: { hy: document.getElementById('resDescHy').value, en: document.getElementById('resDescHy').value },
        officialLink: document.getElementById('resOfficialLink').value || 'http://mnp.am',
        officialName: document.getElementById('resOfficialName').value || 'mnp.am',
        gallery: activeGalleryImages
    };

    try {
        if (editId) {
            await setDoc(doc(db, "reserves", editId), reservePayload);
        } else {
            await addDoc(reservesCollection, reservePayload);
        }
        closeReserveModal();
    } catch (err) {
        console.error("Firestore Save Error: ", err);
    }
}

// Delete directly from Firestore
async function deleteReserveCard(id, event) {
    if (event) event.stopPropagation();
    if (confirm("Վստա՞հ եք, որ ցանկանում եք ջնջել այս արգելոցի քարտը:")) {
        try {
            await deleteDoc(doc(db, "reserves", id));
        } catch (err) {
            console.error("Firestore Delete Error: ", err);
        }
    }
}

function exportReservesData() {
    const blob = new Blob([JSON.stringify({ reserves: reservesData }, null, 2)], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `armenian_reserves_backup.json`;
    link.click();
}

function importReservesData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function (e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.reserves) {
                for (const res of imported.reserves) {
                    delete res.id;
                    await addDoc(reservesCollection, res);
                }
            }
        } catch (err) { console.error("Import Error: ", err); }
    };
    reader.readAsText(file);
}

function openReserveGalleryModal(reserveId) {
    const reserve = reservesData.find(r => r.id === reserveId);
    if (!reserve) return;

    currentReserveTitle = getText(reserve.title);
    currentGalleryImages = [{ url: reserve.image, caption: reserve.description }, ...(reserve.gallery || [])];
    currentGalleryIndex = 0;

    document.getElementById('modalCategory').textContent = 'ԱՐԳԵԼՈՑ';
    document.getElementById('modalSourceLink').innerHTML = `<a href="${reserve.officialLink || '#'}" target="_blank" class="text-emerald-400 hover:underline flex items-center gap-1">${reserve.officialName || 'mnp.am'} <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>`;

    updateGalleryView();
    document.getElementById('mediaModal').classList.remove('hidden');
}

function updateGalleryView() {
    if (currentGalleryImages.length === 0) return;
    const imgObj = currentGalleryImages[currentGalleryIndex];
    document.getElementById('modalMediaContainer').innerHTML = `<img src="${imgObj.url}" class="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300">`;
    document.getElementById('modalTitle').textContent = currentReserveTitle;
    document.getElementById('modalCaption').textContent = getText(imgObj.caption) || 'Նկարագրություն ավելացված չէ:';
    document.getElementById('modalImageCounter').textContent = (currentGalleryIndex + 1) + ' / ' + currentGalleryImages.length;
}

function nextGalleryImage() {
    if (currentGalleryImages.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGalleryView();
}

function prevGalleryImage() {
    if (currentGalleryImages.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGalleryView();
}

function closeMediaModal() {
    document.getElementById('mediaModal').classList.add('hidden');
    currentGalleryImages = [];
}

document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('mediaModal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') nextGalleryImage();
        if (e.key === 'ArrowLeft') prevGalleryImage();
        if (e.key === 'Escape') closeMediaModal();
    }
});

// Expose functions globally for HTML events
window.toggleDarkMode = toggleDarkMode;
window.openAddReserveModal = openAddReserveModal;
window.openEditReserveModal = openEditReserveModal;
window.closeReserveModal = closeReserveModal;
window.handleReserveFormSubmit = handleReserveFormSubmit;
window.deleteReserveCard = deleteReserveCard;
window.exportReservesData = exportReservesData;
window.importReservesData = importReservesData;
window.setLanguage = setLanguage;
window.openReserveGalleryModal = openReserveGalleryModal;
window.nextGalleryImage = nextGalleryImage;
window.prevGalleryImage = prevGalleryImage;
window.closeMediaModal = closeMediaModal;
window.handleReserveSearch = handleReserveSearch;
window.handleReserveImageUpload = handleReserveImageUpload;
window.handleGalleryFilesUpload = handleGalleryFilesUpload;
window.removeGalleryImage = removeGalleryImage;
window.updateGalleryCaption = updateGalleryCaption;

initTheme();
setLanguage('hy');
document.getElementById('year').textContent = new Date().getFullYear();
