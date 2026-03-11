/* ============================================================
   MELEK CLOTHING — ADMIN DASHBOARD LOGIC
   Accès: admin / Melek2024!
   ============================================================ */

const ADMIN_PASS = 'Melek2024!';
let editingId = null;
let productImageData = null;   // base64 d'une image uploadée pour un produit
let lookMediaData = null;   // { type:'image'|'video', base64:string|null, blob:Blob|null }
let lookVideoObjectURL = null; // URL temporaire pour preview vidéo

// IndexedDB functions moved to products.js

// ── AUTH ──────────────────────────────────────────────────────
function checkAuth() { return sessionStorage.getItem('melek_admin') === 'true'; }

function doLogin() {
  const pw = document.getElementById('login-pw').value;
  if (pw === ADMIN_PASS) {
    sessionStorage.setItem('melek_admin', 'true');
    showDashboard();
  } else {
    document.getElementById('login-error').classList.add('show');
    document.getElementById('login-pw').select();
  }
}

function doLogout() {
  sessionStorage.removeItem('melek_admin');
  document.getElementById('admin-page').classList.remove('show');
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-pw').value = '';
}

function showDashboard() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('admin-page').classList.add('show');
  switchTab('dashboard');
}

// ── TABS ──────────────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tab}`)?.classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById('admin-page-title').textContent = {
    dashboard: 'Tableau de bord', products: 'Gestion des produits', looks: 'Looks / À la Une'
  }[tab] || '';
  if (tab === 'dashboard') loadDashboard();
  if (tab === 'products') loadProductTable();
  if (tab === 'looks') loadLooksAdmin();
}

// ── DASHBOARD ─────────────────────────────────────────────────
function loadDashboard() {
  const prods = getProducts();
  document.getElementById('stat-total').textContent = prods.length;
  document.getElementById('stat-homme').textContent = prods.filter(p => p.category === 'homme').length;
  document.getElementById('stat-femme').textContent = prods.filter(p => p.category === 'femme').length;
  document.getElementById('stat-chaussures').textContent = prods.filter(p => p.category === 'chaussures').length;
  const recentList = document.getElementById('recent-products');
  if (!recentList) return;
  recentList.innerHTML = '';
  prods.slice(-5).reverse().forEach(p => {
    const src = p.image.startsWith('idbv:') ? '' : p.image;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img class="thumb" src="${src}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/52x52/1a1a1a/c9a96e?text=IMG'"></td>
      <td class="prod-name">${p.name}</td>
      <td><span class="admin-badge ${p.category}">${p.category}</span></td>
      <td>${formatPrice(p.price)} FCFA</td>
      <td>${p.featured ? '<span class="featured-check">✓</span>' : '—'}</td>`;
    recentList.appendChild(row);
  });
}

// ── PRODUCT TABLE ─────────────────────────────────────────────
function loadProductTable() {
  const tbody = document.getElementById('products-tbody');
  if (!tbody) return;
  const prods = getProducts();
  tbody.innerHTML = '';
  if (prods.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">Aucun produit. Ajoutez-en un !</td></tr>`;
    return;
  }
  prods.forEach(p => {
    const src = (p.image && !p.image.startsWith('idbv:')) ? p.image : '';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img class="thumb" src="${src}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/52x52/1a1a1a/c9a96e?text=IMG'"></td>
      <td class="prod-name">${p.name}</td>
      <td><span class="admin-badge ${p.category}">${p.category}</span></td>
      <td>${p.subcategory}</td>
      <td style="font-family:var(--font-display)">${formatPrice(p.price)} <small>FCFA</small></td>
      <td>${p.featured ? '<span class="featured-check">★ Mis en avant</span>' : '—'}</td>
      <td><div class="table-actions">
        <button class="tbl-btn edit" onclick="openEditProduct(${p.id})" title="Modifier">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
        </button>
        <button class="tbl-btn delete" onclick="confirmDelete(${p.id})" title="Supprimer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div></td>`;
    tbody.appendChild(row);
  });
}

// ── PRODUCT FORM ──────────────────────────────────────────────
function openAddProduct() {
  editingId = null; productImageData = null;
  document.getElementById('fm-title').textContent = 'Ajouter un produit';
  document.getElementById('product-form').reset();
  document.getElementById('fm-img-preview').classList.remove('show');
  document.getElementById('fm-image-file').value = '';
  document.getElementById('file-drop-label').querySelector('strong') && resetDropLabel('file-drop-label');
  switchImgTab('file', document.querySelector('.upload-tab'));
  document.getElementById('form-overlay').classList.add('open');
}

function openEditProduct(id) {
  const p = getProductById(id);
  if (!p) return;
  editingId = id; productImageData = null;
  document.getElementById('fm-title').textContent = 'Modifier le produit';
  document.getElementById('fm-name').value = p.name;
  document.getElementById('fm-category').value = p.category;
  document.getElementById('fm-subcategory').value = p.subcategory;
  document.getElementById('fm-description').value = p.description;
  document.getElementById('fm-price').value = p.price;
  document.getElementById('fm-badge').value = p.badge || '';
  document.getElementById('fm-featured').checked = p.featured;
  // Show current image
  const preview = document.getElementById('fm-img-preview');
  if (p.image && !p.image.startsWith('idbv:')) {
    preview.src = p.image; preview.classList.add('show');
    // Switch to URL tab to show existing URL
    if (p.image.startsWith('http')) {
      switchImgTab('url', document.querySelectorAll('.upload-tab')[1]);
      document.getElementById('fm-image-url').value = p.image;
    }
  } else {
    preview.classList.remove('show');
    switchImgTab('file', document.querySelectorAll('.upload-tab')[0]);
  }
  document.getElementById('form-overlay').classList.add('open');
}

function closeProductForm() {
  document.getElementById('form-overlay').classList.remove('open');
  editingId = null; productImageData = null;
}

// Tab switcher for product image
function switchImgTab(mode, btn) {
  document.querySelectorAll('#form-overlay .upload-tab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
  document.getElementById('img-file-group').style.display = mode === 'file' ? '' : 'none';
  document.getElementById('img-url-group').style.display = mode === 'url' ? '' : 'none';
}

// Handle local file selection for product
function handleProductImageUpload(input) {
  const file = input.files[0]; if (!file) return;
  if (file.size > 2000000) {
    showToast('Image trop grande ! Max recommandé : 2MB', 'error');
    input.value = ''; return;
  }
  const label = document.getElementById('file-drop-label');
  label.querySelector('span').textContent = file.name;
  label.classList.add('has-file');
  const reader = new FileReader();
  reader.onload = e => {
    productImageData = e.target.result;
    const preview = document.getElementById('fm-img-preview');
    preview.src = productImageData; preview.classList.add('show');
  };
  reader.readAsDataURL(file);
}

// Preview image from URL
function previewImage() {
  const url = document.getElementById('fm-image-url').value.trim();
  const preview = document.getElementById('fm-img-preview');
  if (url) { preview.src = url; preview.classList.add('show'); }
  else { preview.classList.remove('show'); }
}

function saveProduct() {
  const name = document.getElementById('fm-name').value.trim();
  const category = document.getElementById('fm-category').value;
  const subcategory = document.getElementById('fm-subcategory').value.trim();
  const description = document.getElementById('fm-description').value.trim();
  const price = parseInt(document.getElementById('fm-price').value);
  const badge = document.getElementById('fm-badge').value.trim() || null;
  const featured = document.getElementById('fm-featured').checked;
  const urlVal = document.getElementById('fm-image-url').value.trim();

  // Determine image source: uploaded file (base64) or URL
  let image = productImageData || urlVal;
  if (!image && editingId) {
    const existing = getProductById(editingId);
    image = existing?.image || '';
  }

  if (!name || !category || !subcategory || !description || !price || !image) {
    showToast('Veuillez remplir tous les champs et ajouter une image', 'error'); return;
  }

  const data = { name, category, subcategory, description, price, image, badge, featured };
  if (editingId) { updateProduct(editingId, data); showToast('Produit modifié ✓'); }
  else { addProduct(data); showToast('Produit ajouté ✓'); }

  closeProductForm(); loadProductTable(); loadDashboard();
}

function confirmDelete(id) {
  const p = getProductById(id); if (!p) return;
  if (confirm(`Supprimer "${p.name}" ? Cette action est irréversible.`)) {
    deleteProduct(id);
    showToast('Produit supprimé', 'error');
    loadProductTable(); loadDashboard();
  }
}

// ── LOOKS ADMIN ───────────────────────────────────────────────
function loadLooksAdmin() {
  const grid = document.getElementById('looks-admin-grid'); if (!grid) return;
  const looks = getLooks();
  if (looks.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">Aucun look. Ajoutez-en un !</div>';
    return;
  }
  grid.innerHTML = looks.map(l => {
    const isVideo = l.media_type === 'video';
    const mediaSrc = (l.image && !l.image.startsWith('idbv:')) ? l.image : '';
    const mediaEl = isVideo
      ? `<video class="look-admin-img" src="${mediaSrc}" ${l.image.startsWith('idbv:') ? `data-idb="${l.image}"` : ''} muted autoplay loop playsinline style="object-fit:cover;width:100%;aspect-ratio:3/4"></video>`
      : `<img class="look-admin-img" src="${mediaSrc}" alt="${l.description}" onerror="this.src='https://via.placeholder.com/200x267/1a1a1a/c9a96e?text=IMG'">`;
    return `
      <div class="look-admin-card">
        ${mediaEl}
        <div class="look-admin-info">
          <p>${l.description}</p>
          <div class="look-admin-tags">${l.tags.map(t => `<span class="look-admin-tag">${t}</span>`).join('')}</div>
          <div style="font-size:.7rem;color:var(--text-muted);margin-bottom:10px">${l.date} ${isVideo ? '🎬' : '📷'}</div>
          <button class="look-admin-del" onclick="confirmDeleteLook(${l.id})">Supprimer</button>
        </div>
      </div>`;
  }).join('');
  // Load IDB videos asynchronously
  loadIDBMedia();
}

// Tab switcher for look media
function switchLookTab(mode, btn) {
  document.querySelectorAll('#look-form-overlay .upload-tab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
  document.getElementById('look-file-group').style.display = mode === 'file' ? '' : 'none';
  document.getElementById('look-url-group').style.display = mode === 'url' ? '' : 'none';
}

function openAddLook() {
  lookMediaData = null;
  if (lookVideoObjectURL) { URL.revokeObjectURL(lookVideoObjectURL); lookVideoObjectURL = null; }
  document.getElementById('look-form').reset();
  document.getElementById('look-img-preview').classList.remove('show');
  document.getElementById('look-video-preview').classList.remove('show');
  document.getElementById('look-video-preview').src = '';
  const dropLabel = document.getElementById('look-drop-label');
  if (dropLabel) { dropLabel.querySelector('span').textContent = 'Photo ou vidéo'; dropLabel.classList.remove('has-file'); }
  switchLookTab('file', document.querySelector('#look-form-overlay .upload-tab'));
  document.getElementById('look-form-overlay').classList.add('open');
}

function closeLookForm() {
  document.getElementById('look-form-overlay').classList.remove('open');
  lookMediaData = null;
  if (lookVideoObjectURL) { URL.revokeObjectURL(lookVideoObjectURL); lookVideoObjectURL = null; }
}

function handleLookMediaUpload(input) {
  const file = input.files[0]; if (!file) return;
  const isVideo = file.type.startsWith('video/');
  const label = document.getElementById('look-drop-label');
  label.querySelector('span').textContent = file.name;
  label.classList.add('has-file');

  const imgPreview = document.getElementById('look-img-preview');
  const videoPreview = document.getElementById('look-video-preview');

  if (isVideo) {
    if (file.size > 200 * 1024 * 1024) { // 200MB max
      showToast('Vidéo trop grande ! Max : 200MB', 'error'); input.value = ''; return;
    }
    lookMediaData = { type: 'video', blob: file, base64: null };
    if (lookVideoObjectURL) URL.revokeObjectURL(lookVideoObjectURL);
    lookVideoObjectURL = URL.createObjectURL(file);
    imgPreview.classList.remove('show');
    videoPreview.src = lookVideoObjectURL; videoPreview.classList.add('show');
  } else {
    if (file.size > 3000000) { showToast('Image trop grande ! Max recommandé : 3MB', 'error'); input.value = ''; return; }
    const reader = new FileReader();
    reader.onload = e => {
      lookMediaData = { type: 'image', base64: e.target.result, blob: null };
      videoPreview.classList.remove('show');
      imgPreview.src = lookMediaData.base64; imgPreview.classList.add('show');
    };
    reader.readAsDataURL(file);
  }
}

function previewLookImage() {
  const url = document.getElementById('lf-image').value.trim();
  const img = document.getElementById('look-img-preview');
  const vid = document.getElementById('look-video-preview');
  if (!url) { img.classList.remove('show'); vid.classList.remove('show'); return; }
  if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
    img.classList.remove('show'); vid.src = url; vid.classList.add('show');
  } else {
    vid.classList.remove('show'); img.src = url; img.classList.add('show');
  }
}

async function saveLook() {
  const description = document.getElementById('lf-description').value.trim();
  const tagsRaw = document.getElementById('lf-tags').value.trim();
  const urlInput = document.getElementById('lf-image')?.value.trim() || '';
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : [];

  if (!description) { showToast('Veuillez remplir la description', 'error'); return; }

  let image, media_type;

  if (lookMediaData) {
    media_type = lookMediaData.type;
    if (lookMediaData.type === 'video') {
      try {
        showToast('Enregistrement de la vidéo…');
        image = await saveVideoBlob(lookMediaData.blob);
      } catch (e) { showToast('Erreur vidéo. Réessayez.', 'error'); return; }
    } else {
      image = lookMediaData.base64;
    }
  } else if (urlInput) {
    image = urlInput;
    media_type = urlInput.match(/\.(mp4|webm|ogg|mov)$/i) ? 'video' : 'image';
  } else {
    showToast('Ajoutez une photo, une vidéo ou une URL', 'error'); return;
  }

  addLook({ image, media_type, description, tags });
  lookMediaData = null;
  showToast('Look publié avec succès ✓');
  closeLookForm();
  loadLooksAdmin();
}

function confirmDeleteLook(id) {
  const looks = getLooks();
  const look = looks.find(l => l.id === id);
  if (confirm('Supprimer ce look ?')) {
    if (look?.image?.startsWith('idbv:')) deleteVideoBlob(look.image);
    deleteLook(id);
    showToast('Look supprimé');
    loadLooksAdmin();
  }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) showDashboard();

  document.getElementById('login-form')?.addEventListener('submit', e => { e.preventDefault(); doLogin(); });

  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => { const tab = item.dataset.tab; if (tab) switchTab(tab); });
  });

  document.getElementById('form-overlay')?.addEventListener('click', e => { if (e.target.id === 'form-overlay') closeProductForm(); });
  document.getElementById('look-form-overlay')?.addEventListener('click', e => { if (e.target.id === 'look-form-overlay') closeLookForm(); });

  // Attach file upload listeners
  document.getElementById('fm-image-file')?.addEventListener('change', function () { handleProductImageUpload(this); });
  document.getElementById('lf-image-file')?.addEventListener('change', function () { handleLookMediaUpload(this); });

  // Mobile sidebar logic
  const sidebar = document.querySelector('.admin-sidebar');
  document.getElementById('admin-menu-btn')?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
  });
  document.getElementById('admin-close-btn')?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
  });
  // Close sidebar when clicking a nav item on mobile
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
});
