/* ============================================================
   MELEK CLOTHING — PRODUCT DATA STORE
   ============================================================ */

const WHATSAPP_NUMBER = '2290163656925'; // 🔧 Modifier avec votre numéro WhatsApp

const DEFAULT_PRODUCTS = [
  // ── HOMME ─────────────────────────────────────────────────
  {
    id: 1, name: "Veste Vintage Premium", category: "homme", subcategory: "Vestes",
    description: "Veste vintage en excellent état, coupe décontractée, style années 90. Parfait pour un look casual chic.",
    price: 8500, image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&q=80",
    featured: true, badge: "Tendance"
  },
  {
    id: 2, name: "Chemise Oxford Slim", category: "homme", subcategory: "Chemises",
    description: "Chemise Oxford slim fit, tissu premium, légèrement portée. Couleur blanc cassé intemporel.",
    price: 4500, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    featured: false, badge: null
  },
  {
    id: 3, name: "Jean Slim Brut", category: "homme", subcategory: "Jeans",
    description: "Jean slim brut à la coupe parfaite. Denim de qualité supérieure, indigo foncé non lavé.",
    price: 6000, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    featured: true, badge: null
  },
  {
    id: 4, name: "T-Shirt Vintage Logo", category: "homme", subcategory: "T-shirts",
    description: "T-shirt oversize vintage avec imprimé graphique rétro. 100% coton.",
    price: 2500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    featured: false, badge: "Nouveau"
  },
  {
    id: 5, name: "Manteau Laine Camel", category: "homme", subcategory: "Vestes",
    description: "Manteau mi-long en laine camel, style trench coat premium. Coupe élégante et intemporelle.",
    price: 15000, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    featured: true, badge: "Exclusif"
  },
  {
    id: 6, name: "Pantalon Chino Beige", category: "homme", subcategory: "Pantalons",
    description: "Pantalon chino slim en coton stretch, couleur beige sable. Parfait pour toutes occasions.",
    price: 5000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    featured: false, badge: null
  },

  // ── FEMME ─────────────────────────────────────────────────
  {
    id: 7, name: "Robe Maxi Fleurie", category: "femme", subcategory: "Robes",
    description: "Longue robe à fleurs légère, imprimé vintage délicat. Idéale pour les journées ensoleillées.",
    price: 7500, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    featured: true, badge: "Tendance"
  },
  {
    id: 8, name: "Top en Soie Ivoire", category: "femme", subcategory: "Tops",
    description: "Top en soie fluide, coupe droite élégante. Couleur ivoire qui s'adapte à tout.",
    price: 5500, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    featured: false, badge: null
  },
  {
    id: 9, name: "Blazer Carreaux Vintage", category: "femme", subcategory: "Vestes",
    description: "Blazer à carreaux oversize style vintage. Pièce iconique pour un look fashion.",
    price: 9000, image: "https://images.unsplash.com/photo-1548624313-0396c75e4b30?w=600&q=80",
    featured: true, badge: "À la une"
  },
  {
    id: 10, name: "Jupe Midi Plissée", category: "femme", subcategory: "Jupes",
    description: "Jupe midi plissée en satin, longueur parfaite. Couleur nude élégante.",
    price: 6500, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    featured: false, badge: "Nouveau"
  },
  {
    id: 11, name: "Pantalon Palazzo Noir", category: "femme", subcategory: "Pantalons",
    description: "Pantalon palazzo large en crêpe noir. Look bohème chic pour toutes les silhouettes.",
    price: 7000, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    featured: false, badge: null
  },
  {
    id: 12, name: "Robe Bustier Velours", category: "femme", subcategory: "Robes",
    description: "Mini robe bustier en velours bordeaux. Parfaite pour les soirées élégantes.",
    price: 8000, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    featured: true, badge: "Exclusif"
  },

  // ── CHAUSSURES ────────────────────────────────────────────
  {
    id: 13, name: "Sneakers Running Blanc", category: "chaussures", subcategory: "Baskets",
    description: "Sneakers rétro running blanc immaculé. Style minimaliste intemporel, confort absolu.",
    price: 12000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    featured: true, badge: "Top vente"
  },
  {
    id: 14, name: "Boots Chelsea Marron", category: "chaussures", subcategory: "Bottes",
    description: "Boots Chelsea en cuir marron, élastiques latéraux, semelle crantée robuste.",
    price: 18000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    featured: true, badge: "Premium"
  },
  {
    id: 15, name: "Sandales Dorées", category: "chaussures", subcategory: "Sandales",
    description: "Sandales plates minimalistes à brides dorées. Pour un look estival élégant.",
    price: 7000, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
    featured: false, badge: null
  },
  {
    id: 16, name: "Derby Cuir Noir", category: "chaussures", subcategory: "Habillées",
    description: "Chaussures derby en cuir véritable noir, semelle en cuir. Élégance classique.",
    price: 14000, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80",
    featured: false, badge: null
  }
];

const DEFAULT_LOOKS = [
  {
    id: 1, description: "Look casual chic – veste vintage + jean slim", tags: ["casual", "vintage", "chic"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", date: "2025-03-01"
  },
  {
    id: 2, description: "Tenue soirée – robe bustier velours + sandales", tags: ["soiree", "elegance"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", date: "2025-02-28"
  },
  {
    id: 3, description: "Street style – sneakers + blazer carreaux", tags: ["streetstyle", "urban"],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", date: "2025-02-25"
  },
  {
    id: 4, description: "Look été – robe maxi fleurie + sandales dorées", tags: ["ete", "floral", "femme"],
    image: "https://images.unsplash.com/photo-1520975867987-f4a7a0dc6df8?w=600&q=80", date: "2025-02-20"
  },
  {
    id: 5, description: "Business casual – chino + chemise oxford", tags: ["business", "casual", "homme"],
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80", date: "2025-02-15"
  },
  {
    id: 6, description: "Monochrome noir – palazzo + top soie", tags: ["monochrome", "noir", "femme"],
    image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80", date: "2025-02-10"
  }
];

/* ── CRUD FUNCTIONS (SUPABASE) ─────────────────────────────── */

async function initData() {
  // Optionnel: peut servir à vérifier la connexion ou insérer les defaults si la db est vide
  const { data: pdts } = await supabase.from('products').select('id').limit(1);
  if (!pdts || pdts.length === 0) {
    console.log("Database looks empty. You should insert DEFAULT_PRODUCTS manually or implement seed.");
  }
}

async function getProducts() {
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
  if (error) console.error("Error getProducts:", error);
  return data || [];
}

async function getProductsByCategory(cat) {
  const { data, error } = await supabase.from('products').select('*').eq('category', cat).order('id', { ascending: false });
  if (error) console.error("Error getProductsByCategory:", error);
  return data || [];
}

async function getFeaturedProducts(limit = 4) {
  const { data, error } = await supabase.from('products').select('*').eq('featured', true).order('id', { ascending: false }).limit(limit);
  if (error) console.error("Error getFeaturedProducts:", error);
  return data || [];
}

async function getProductById(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) console.error("Error getProductById:", error);
  return data || null;
}

async function addProduct(data) {
  const { data: inserted, error } = await supabase.from('products').insert([data]).select();
  if (error) { console.error("Error addProduct:", error); return null; }
  return inserted[0]?.id;
}

async function updateProduct(id, data) {
  const { error } = await supabase.from('products').update(data).eq('id', id);
  if (error) { console.error("Error updateProduct:", error); return false; }
  return true;
}

async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error("Error deleteProduct:", error);
}

async function getLooks() {
  const { data, error } = await supabase.from('looks').select('*').order('id', { ascending: false });
  if (error) console.error("Error getLooks:", error);
  return data || [];
}

async function addLook(data) {
  const paylaod = { ...data, date: new Date().toISOString().split('T')[0] };
  const { data: inserted, error } = await supabase.from('looks').insert([paylaod]).select();
  if (error) { console.error("Error addLook:", error); return null; }
  return inserted[0]?.id;
}

async function deleteLook(id) {
  const { error } = await supabase.from('looks').delete().eq('id', id);
  if (error) console.error("Error deleteLook:", error);
}

/* ── WHATSAPP ORDER ─────────────────────────────────────────── */

function openWhatsAppOrder(product, qty) {
  window._pendingOrder = { product, qty };
  const modal = document.getElementById('wa-modal');
  if (!modal) return;

  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-price').textContent = formatPrice(product.price * qty) + ' FCFA';
  document.getElementById('modal-product-img').src = product.image;

  modal.classList.add('open');
  document.body.classList.add('no-scroll');
}

function sendWhatsApp() {
  const order = window._pendingOrder;
  if (!order) return;

  const name = document.getElementById('order-name').value.trim();
  const city = document.getElementById('order-city').value.trim();
  const phone = document.getElementById('order-phone').value.trim();

  if (!name || !city || !phone) {
    showToast('Veuillez remplir tous les champs', 'error');
    return;
  }

  const { product, qty } = order;
  const msg = encodeURIComponent(
    `Bonjour Melek Clothing ! 👋

Je souhaite commander ce produit :

🛍️ *Produit :* ${product.name}
💰 *Prix unitaire :* ${formatPrice(product.price)} FCFA
📦 *Quantité :* ${qty}
💵 *Total :* ${formatPrice(product.price * qty)} FCFA

📷 Photo : ${product.image}

👤 *Nom :* ${name}
🏙️ *Ville :* ${city}
📱 *Téléphone :* ${phone}

Merci !`);

  closeModal();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function closeModal() {
  const modal = document.getElementById('wa-modal');
  if (modal) modal.classList.remove('open');
  document.body.classList.remove('no-scroll');
  window._pendingOrder = null;
}

/* ── HELPERS ────────────────────────────────────────────────── */

function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR').format(n);
}

function showToast(msg, type = 'success') {
  const c = document.querySelector('.toast-container') || (() => {
    const el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function renderProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : '';
  return `
  <div class="product-card reveal" data-id="${product.id}">
    <div class="product-img-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${badgeHTML}
    </div>
    <div class="product-info">
      <div class="product-sub">${product.subcategory}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-price">${formatPrice(product.price)} <small>FCFA</small></div>
      <div class="product-actions">
        <div class="qty-picker">
          <button class="qty-btn" onclick="changeQty(${product.id}, -1)">−</button>
          <input class="qty-val" id="qty-${product.id}" type="number" value="1" min="1" max="20" readonly>
          <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
        </div>
        <button class="btn-order" onclick="orderProduct(${product.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M13 0C5.82 0 0 5.82 0 13s5.82 13 13 13 13-5.82 13-13S20.18 0 13 0zm0 24C6.925 24 2 19.075 2 13S6.925 2 13 2s11 4.925 11 11-4.925 11-11 11z" opacity=".3"/></svg>
          Commander
        </button>
      </div>
    </div>
  </div>`;
}

function changeQty(id, delta) {
  const input = document.getElementById(`qty-${id}`);
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 20) val = 20;
  input.value = val;
}

async function orderProduct(id) {
  const product = await getProductById(id);
  if (!product) return;
  const qty = parseInt(document.getElementById(`qty-${id}`)?.value || 1);
  openWhatsAppOrder(product, qty);
}

initData();
