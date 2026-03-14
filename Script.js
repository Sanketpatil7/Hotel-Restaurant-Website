/* ================================================================
   script.js  —  SpiceRoute
   Requires: foodData.js loaded BEFORE this file.

   FIXED:
   - Default theme is now LIGHT; user can switch to dark via button
   - Search is GLOBAL across all foodData (ignores active category)
   - Customizations have prices { name, price }; total updates live
   ================================================================ */

/* ── STATIC DATA ─────────────────────────────────────────────── */
const OFFERS = [
  { icon:"🎉", title:"10% Off on ₹500+",      desc:"Order above ₹500 and enjoy a flat 10% discount on your entire order. Valid all day!",  code:"SPICE10"   },
  { icon:"🎂", title:"Free Dessert on ₹1000+", desc:"Treat yourself — order above ₹1000 and get a complimentary Gulab Jamun dessert.",       code:"SWEET1000" },
  { icon:"🚀", title:"Free Delivery Today",    desc:"Enjoy free delivery on all orders today. Valid from 12PM–3PM and 7PM–10PM.",            code:"FREEDEL"   },
  { icon:"👑", title:"Buy 2 Get 1 Free",       desc:"Order any 3 items from our Indian menu and the cheapest one is absolutely FREE.",       code:"B2G1"      },
];

const REVIEWS_DATA = [
  { name:"Rahul Mehta",  init:"R", rating:5, date:"2 days ago",  text:"Absolutely stunning biryani! The layers of flavor are unreal. Felt like eating in a 5-star hotel.",        food:"Chicken Biryani"        },
  { name:"Priya Sharma", init:"P", rating:5, date:"5 days ago",  text:"The Paneer Tikka was smoky perfection. And the presentation is just gorgeous. Will come back every week!", food:"Paneer Tikka"           },
  { name:"Amit Patel",   init:"A", rating:4, date:"1 week ago",  text:"Butter chicken with garlic naan — unbeatable combo. Service was excellent and the ambiance is wonderful.",  food:"Butter Chicken"         },
  { name:"Sneha Kapoor", init:"S", rating:5, date:"1 week ago",  text:"Pani Puri was the best I've ever had outside Mumbai streets. Mango lassi is a must-have. 10/10!",          food:"Pani Puri"              },
  { name:"Vikram Nair",  init:"V", rating:5, date:"2 weeks ago", text:"Hyderabadi Dum Biryani was tender, aromatic, and rich. The chef really knows their craft.",                 food:"Hyderabadi Dum Biryani" },
  { name:"Ananya Roy",   init:"A", rating:4, date:"3 weeks ago", text:"Momos were absolutely amazing — best I've had! The chili sauce was the perfect heat level.",                food:"Veg Momos"              },
];

/* ── CATEGORIES derived from foodData ───────────────────────── */
const CATEGORIES = ["All"].concat(
  foodData
    .map(function(i){ return i.category; })
    .filter(function(v,i,a){ return a.indexOf(v) === i; })
);
const CAT_ICONS = { All:"🍽️", Indian:"🍛", "Fast Food":"🍔", Chinese:"🥟", Desserts:"🍮", Beverages:"🥤", "Street Food":"🌮" };

/* ── STATE ───────────────────────────────────────────────────── */
let cart      = JSON.parse(localStorage.getItem("cart"))       || [];
let favorites = JSON.parse(localStorage.getItem("sr_favs"))    || [];
let reviews   = JSON.parse(localStorage.getItem("sr_reviews")) || null;
if (!reviews) reviews = REVIEWS_DATA;

let activeCategory = "All";
let vegFilter      = "all";
let activeFilters  = [];
let searchQuery    = "";
let cartOpen       = false;
let currentItem    = null;
let modalQty       = 1;
let modalCustom    = [];   /* array of customization names (strings) currently selected */
let selectedStar   = 0;
let specialTab     = "trending";

/* ── DEFAULT THEME = LIGHT ───────────────────────────────────── */
/* Changed: website now opens in light mode by default.           */
/* isDark tracks current state; starts false (= light).          */
let isDark = false;
document.documentElement.setAttribute("data-theme", "light");

/* ── NAV ─────────────────────────────────────────────────────── */
window.addEventListener("scroll", function(){
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 30);
});

function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var navH = document.getElementById("navbar").offsetHeight;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - navH, behavior: "smooth" });
}

function toggleMobile() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

/* ── THEME TOGGLE ────────────────────────────────────────────── */
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  document.getElementById("themeBtn").textContent = isDark ? "🌙" : "☀️";
}

/* ── PARTICLES ───────────────────────────────────────────────── */
function initParticles() {
  var c = document.getElementById("particles");
  for (var i = 0; i < 20; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = "left:" + (Math.random()*100) + "%;animation-duration:" + (8+Math.random()*12) + "s;animation-delay:" + (Math.random()*10) + "s;width:" + (2+Math.random()*4) + "px;height:" + (2+Math.random()*4) + "px;opacity:" + (.1+Math.random()*.3);
    c.appendChild(p);
  }
}

/* ── OFFER MARQUEE ───────────────────────────────────────────── */
function initMarquee() {
  var items = ["🎉 10% off above ₹500 — Use SPICE10","🚀 Free delivery today!","🎂 Free dessert on ₹1000+","⭐ Rated #1 Indian Restaurant 2024","👑 Buy 2 Get 1 Free on Indian food"];
  var html  = items.map(function(i){ return "<div class=\"offer-item\">" + i + "</div>"; }).join("");
  document.getElementById("offerTrack").innerHTML  = html;
  document.getElementById("offerTrack2").innerHTML = html;
}

/* ── CATEGORIES ──────────────────────────────────────────────── */
function renderCats() {
  document.getElementById("catGrid").innerHTML = CATEGORIES.map(function(c){
    return "<button class=\"cat-btn " + (activeCategory === c ? "active" : "") + "\" onclick=\"setCategory('" + c + "')\">" +
           "<span class=\"cat-icon\">" + (CAT_ICONS[c] || "🍴") + "</span>" + c + "</button>";
  }).join("");
}

function setCategory(c) {
  activeCategory = c;
  renderCats();
  renderFood();
}

/* ── FILTERS ─────────────────────────────────────────────────── */
function renderFilters() {
  var chips = ["⭐ Top Rated","🔥 Popular","🍃 Under ₹150"];
  document.getElementById("filterRow").innerHTML =
    "<button class=\"filter-btn " + (vegFilter==="all"    ? "active" : "") + "\" onclick=\"setVegFilter('all')\">🍽️ All</button>" +
    "<button class=\"filter-btn " + (vegFilter==="veg"    ? "active" : "") + "\" onclick=\"setVegFilter('veg')\">🥦 Veg</button>" +
    "<button class=\"filter-btn " + (vegFilter==="nonveg" ? "active" : "") + "\" onclick=\"setVegFilter('nonveg')\">🍗 Non-Veg</button>" +
    "<span style=\"width:8px;display:inline-block\"></span>" +
    chips.map(function(f){
      return "<button class=\"filter-btn " + (activeFilters.indexOf(f) > -1 ? "active" : "") + "\" onclick=\"toggleFilter('" + f + "')\">" + f + "</button>";
    }).join("");
}

function setVegFilter(val) {
  vegFilter = val;
  renderFilters();
  renderFood();
}

function toggleFilter(f) {
  activeFilters = activeFilters.indexOf(f) > -1
    ? activeFilters.filter(function(x){ return x !== f; })
    : activeFilters.concat([f]);
  renderFilters();
  renderFood();
}

/* ── FOOD GRID ───────────────────────────────────────────────── */

/*
  ISSUE 1 FIX — Global search:
  When searchQuery is non-empty, filter the ENTIRE foodData array
  regardless of activeCategory.  Category + veg + chip filters still
  apply when there is NO search text.
*/
function getFilteredFood() {
  var items;

  if (searchQuery.trim() !== "") {
    /* GLOBAL search — ignore activeCategory, search everything */
    var q = searchQuery.toLowerCase();
    items = foodData.filter(function(i){
      return i.name.toLowerCase().indexOf(q) > -1 ||
             i.description.toLowerCase().indexOf(q) > -1 ||
             i.category.toLowerCase().indexOf(q) > -1;
    });
  } else {
    /* Normal mode — category + veg/nonveg + chips */
    items = foodData.slice();
    if (activeCategory !== "All")
      items = items.filter(function(i){ return i.category === activeCategory; });
  }

  /* Veg / Non-Veg always applied even during search */
  if (vegFilter === "veg")    items = items.filter(function(i){ return i.type === "veg"; });
  if (vegFilter === "nonveg") items = items.filter(function(i){ return i.type === "nonveg"; });

  /* Chip filters always applied */
  if (activeFilters.indexOf("⭐ Top Rated")   > -1) items = items.filter(function(i){ return i.rating >= 4.7; });
  if (activeFilters.indexOf("🔥 Popular")     > -1) items = items.filter(function(i){ return i.tags.indexOf("popular") > -1; });
  if (activeFilters.indexOf("🍃 Under ₹150")  > -1) items = items.filter(function(i){ return i.price < 150; });

  return items;
}

function renderFood() {
  var items = getFilteredFood();
  var grid  = document.getElementById("foodGrid");
  if (!items.length) {
    grid.innerHTML = "<div style=\"grid-column:1/-1;text-align:center;padding:3rem;color:var(--text3);\"><div style=\"font-size:3rem;margin-bottom:1rem;\">🍽️</div><p>No dishes found. Try a different search.</p></div>";
    return;
  }
  grid.innerHTML = items.map(function(item){ return foodCardHTML(item); }).join("");
}

function foodCardHTML(item) {
  var isFav    = favorites.indexOf(item.id) > -1;
  var badgeCls = item.type === "veg" ? "badge-veg" : "badge-nonveg";
  var badgeLbl = item.type === "veg" ? "🥦 Veg"    : "🍗 Non-Veg";
  return (
    "<div class=\"food-card\" onclick=\"openModal(" + item.id + ")\">" +
      "<div class=\"card-img\">" +
        "<img src=\"" + item.image + "\" alt=\"" + item.name + "\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover;\" onerror=\"this.onerror=null;this.src='" + FALLBACK_IMG + "'\"/>" +
        "<span class=\"card-badge " + badgeCls + "\">" + badgeLbl + "</span>" +
        "<button class=\"card-fav" + (isFav ? " active" : "") + "\" onclick=\"event.stopPropagation();toggleFav(" + item.id + ")\" title=\"Favourite\">" + (isFav ? "❤️" : "🤍") + "</button>" +
      "</div>" +
      "<div class=\"card-body\">" +
        "<div class=\"card-cat\">" + item.category + "</div>" +
        "<div class=\"card-name\">" + item.name + "</div>" +
        "<div class=\"card-desc\">" + item.description + "</div>" +
        "<div class=\"card-meta\">" +
          "<div class=\"card-rating\"><span class=\"star\">⭐</span>" + item.rating + " <span style=\"color:var(--text3)\">(" + item.reviews + ")</span></div>" +
          "<div class=\"card-price\">₹" + item.price + "</div>" +
        "</div>" +
        "<div class=\"card-actions\">" +
          "<button class=\"btn-cart\" onclick=\"event.stopPropagation();quickAddToCart(" + item.id + ")\">+ Add to Cart</button>" +
          "<button class=\"btn-view\" onclick=\"event.stopPropagation();openModal(" + item.id + ")\">Details</button>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function toggleFav(id) {
  favorites = favorites.indexOf(id) > -1
    ? favorites.filter(function(f){ return f !== id; })
    : favorites.concat([id]);
  localStorage.setItem("sr_favs", JSON.stringify(favorites));
  renderFood();
  showToast(favorites.indexOf(id) > -1 ? "❤️ Added to favourites!" : "🤍 Removed from favourites");
}

/* ── MODAL ───────────────────────────────────────────────────── */
function openModal(id) {
  currentItem = null;
  for (var i = 0; i < foodData.length; i++) {
    if (foodData[i].id === id) { currentItem = foodData[i]; break; }
  }
  if (!currentItem) return;
  modalQty    = 1;
  modalCustom = [];   /* reset selected customizations */
  renderModal();
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(e) {
  if (!e || e.target === document.getElementById("modalOverlay")) {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }
}

/*
  ISSUE 2 FIX — Customization pricing:
  Each customization is now { name, price }.
  modalCustom stores selected customization NAMES.
  calcCustomTotal() sums prices of selected customizations.
  Total = (base price × qty) + customization total.
  Renders in real-time on every checkbox toggle or qty change.
*/
function calcCustomTotal() {
  var total = 0;
  var opts  = currentItem ? (currentItem.customizations || []) : [];
  for (var i = 0; i < modalCustom.length; i++) {
    for (var j = 0; j < opts.length; j++) {
      if (opts[j].name === modalCustom[i]) {
        total += opts[j].price;
        break;
      }
    }
  }
  return total;
}

function renderModal() {
  var item        = currentItem;
  var itemRevs    = reviews.filter(function(r){ return r.food === item.name; }).slice(0,3);
  var customOpts  = item.customizations || [];     /* array of { name, price } */
  var customExtra = calcCustomTotal();
  /* ISSUE 2 FIX: total = base × qty + selected customization prices */
  var total       = (item.price * modalQty) + customExtra;

  /* build customization checkboxes */
  var customHTML = customOpts.map(function(opt){
    var selected   = modalCustom.indexOf(opt.name) > -1;
    var priceLabel = opt.price > 0 ? "+₹" + opt.price : "Free";
    return (
      "<div class=\"custom-opt " + (selected ? "selected" : "") + "\" onclick=\"toggleCustom('" + opt.name.replace(/'/g,"\\'") + "')\">" +
        "<input type=\"checkbox\" " + (selected ? "checked" : "") + " onclick=\"event.stopPropagation()\"/>" +
        "<label>" + opt.name + "</label>" +
        "<span class=\"custom-price\">" + priceLabel + "</span>" +
      "</div>"
    );
  }).join("");

  /* build customer review snippets */
  var revHTML = "";
  if (itemRevs.length) {
    revHTML =
      "<div style=\"margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border);\">" +
        "<div style=\"font-size:.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:1rem;\">CUSTOMER REVIEWS</div>" +
        itemRevs.map(function(r){
          var stars = "";
          for (var s = 0; s < r.rating; s++) stars += "⭐";
          return (
            "<div style=\"margin-bottom:.8rem;\">" +
              "<div style=\"display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem;\">" +
                "<div style=\"width:28px;height:28px;background:linear-gradient(135deg,var(--gold),var(--gold2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#000;\">" + (r.init || r.name[0]) + "</div>" +
                "<span style=\"font-size:.85rem;font-weight:600;\">" + r.name + "</span>" +
                "<span style=\"color:#f0c040;font-size:.8rem;\">" + stars + "</span>" +
              "</div>" +
              "<p style=\"font-size:.82rem;color:var(--text2);line-height:1.6;padding-left:36px;\">" + r.text + "</p>" +
            "</div>"
          );
        }).join("") +
      "</div>";
  }

  document.getElementById("modalGrid").innerHTML =
    "<div class=\"modal-img\">" +
      "<img src=\"" + item.image + "\" alt=\"" + item.name + "\" style=\"width:100%;height:100%;object-fit:cover;\" onerror=\"this.onerror=null;this.src='" + FALLBACK_IMG + "'\"/>" +
      "<div class=\"modal-img-overlay\"></div>" +
      "<button class=\"modal-close\" onclick=\"closeModal()\">✕</button>" +
    "</div>" +
    "<div class=\"modal-body\">" +
      "<div class=\"modal-cat\">" + item.category + " · " + (item.type === "veg" ? "🥦 Vegetarian" : "🍗 Non-Vegetarian") + "</div>" +
      "<div class=\"modal-name\">" + item.name + "</div>" +
      "<p class=\"modal-desc\">" + item.description + "</p>" +
      "<div class=\"modal-rating\">" +
        "<span class=\"rating-score\">⭐ " + item.rating + "</span>" +
        "<span style=\"color:var(--text3);font-size:.85rem;\">(" + item.reviews + " reviews)</span>" +
      "</div>" +
      "<div class=\"qty-row\">" +
        "<span class=\"qty-label\">Quantity:</span>" +
        "<div class=\"qty-ctrl\">" +
          "<button onclick=\"changeQty(-1)\">−</button>" +
          "<span class=\"qty-num\" id=\"qtyNum\">" + modalQty + "</span>" +
          "<button onclick=\"changeQty(1)\">+</button>" +
        "</div>" +
      "</div>" +
      "<div class=\"modal-customize\">" +
        "<div class=\"custom-title\">CUSTOMISE</div>" +
        "<div class=\"custom-opts\">" + customHTML + "</div>" +
      "</div>" +
      /* ISSUE 2 FIX: show dynamic total in real time */
      "<div class=\"modal-total\">₹" + total + " <span>total</span></div>" +
      "<div class=\"modal-actions\">" +
        "<button class=\"btn-add-modal\" onclick=\"addToCartFromModal()\">🛒 Add to Cart — ₹" + total + "</button>" +
      "</div>" +
      revHTML +
    "</div>";
}

function changeQty(d) {
  modalQty = Math.max(1, Math.min(10, modalQty + d));
  renderModal();   /* re-renders with updated total */
}

/*
  ISSUE 2 FIX — toggle customization by NAME.
  Adding → price added to total. Removing → price subtracted.
  renderModal() recalculates and updates display instantly.
*/
function toggleCustom(name) {
  modalCustom = modalCustom.indexOf(name) > -1
    ? modalCustom.filter(function(c){ return c !== name; })
    : modalCustom.concat([name]);
  renderModal();   /* live price update */
}

function addToCartFromModal() {
  /* pass selected customization names + prices snapshot to cart */
  var customSnapshot = modalCustom.map(function(name){
    var opts = currentItem.customizations || [];
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].name === name) return { name: name, price: opts[i].price };
    }
    return { name: name, price: 0 };
  });
  addToCart(currentItem.id, modalQty, customSnapshot);
  closeModal();
}

/* ── CART ────────────────────────────────────────────────────── */
function quickAddToCart(id) { addToCart(id, 1, []); }

function addToCart(id, qty, customizations) {
  var product = null;
  for (var i = 0; i < foodData.length; i++) {
    if (foodData[i].id === id) { product = foodData[i]; break; }
  }
  if (!product) return;

  /* key includes customization names so same item with different add-ons = different entry */
  var custKey  = customizations.map(function(c){ return c.name; }).sort().join(",");
  var key      = String(id) + (custKey ? "_" + custKey : "");
  var existing = null;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].key === key) { existing = cart[j]; break; }
  }

  /* ISSUE 2 FIX: cartItem stores per-unit customization extra so price is accurate */
  var custExtra = customizations.reduce(function(s,c){ return s + (c.price || 0); }, 0);

  if (existing) {
    existing.quantity += qty || 1;
  } else {
    cart.push({
      key:            key,
      id:             product.id,
      name:           product.name,
      price:          product.price,        /* base price per unit */
      custExtra:      custExtra,            /* extra per unit from customizations */
      quantity:       qty || 1,
      image:          product.image,
      customizations: customizations        /* array of { name, price } */
    });
  }

  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🛒 " + product.name + " added to cart!", "cart");
}

function removeFromCart(key) {
  cart = cart.filter(function(c){ return c.key !== key; });
  saveCart(); updateCartCount(); renderCartItems();
}

function changeCartQty(key, d) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].key === key) {
      cart[i].quantity = Math.max(0, cart[i].quantity + d);
      if (cart[i].quantity === 0) { removeFromCart(key); return; }
      break;
    }
  }
  saveCart(); updateCartCount(); renderCartItems();
}

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }

function updateCartCount() {
  var total = cart.reduce(function(s,c){ return s + c.quantity; }, 0);
  var badge = document.getElementById("cartCount");
  badge.textContent   = total;
  badge.style.display = total ? "flex" : "none";
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById("cartDrawer").classList.toggle("open", cartOpen);
  document.getElementById("cartOverlay").classList.toggle("open", cartOpen);
  document.body.style.overflow = cartOpen ? "hidden" : "";
  if (cartOpen) renderCartItems();
}

function renderCartItems() {
  var el   = document.getElementById("cartItems");
  var foot = document.getElementById("cartFoot");

  if (!cart.length) {
    el.innerHTML   = "<div class=\"cart-empty\"><div class=\"cart-empty-icon\">🛒</div><p>Your cart is empty</p><p style=\"font-size:.82rem;color:var(--text3)\">Add delicious items from our menu</p></div>";
    foot.innerHTML = "";
    return;
  }

  el.innerHTML = cart.map(function(c){
    /* customization labels for display */
    var mods = (c.customizations || []).map(function(opt){
      return opt.price > 0 ? opt.name + " (+₹" + opt.price + ")" : opt.name;
    }).join(", ");

    /* ISSUE 2 FIX: unit cost = base + custExtra; row total = unit cost × qty */
    var unitCost = c.price + (c.custExtra || 0);
    var rowTotal = unitCost * c.quantity;

    return (
      "<div class=\"cart-item\">" +
        "<div class=\"ci-img\"><img src=\"" + c.image + "\" alt=\"" + c.name + "\" style=\"width:100%;height:100%;object-fit:cover;\" onerror=\"this.onerror=null;this.src='" + FALLBACK_IMG + "'\"/></div>" +
        "<div class=\"ci-info\">" +
          "<div class=\"ci-name\">" + c.name + "</div>" +
          (mods ? "<div class=\"ci-mods\">" + mods + "</div>" : "") +
          "<div class=\"ci-row\">" +
            "<div class=\"ci-price\">₹" + rowTotal + "</div>" +
            "<div class=\"ci-qty\">" +
              "<button onclick=\"changeCartQty('" + c.key + "',-1)\">−</button>" +
              "<span>" + c.quantity + "</span>" +
              "<button onclick=\"changeCartQty('" + c.key + "',1)\">+</button>" +
            "</div>" +
            "<button class=\"ci-remove\" onclick=\"removeFromCart('" + c.key + "')\">🗑️</button>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }).join("");

  /* ISSUE 2 FIX: subtotal includes customization extras */
  var subtotal = cart.reduce(function(s,c){ return s + (c.price + (c.custExtra||0)) * c.quantity; }, 0);
  var delivery = subtotal > 500 ? 0 : 40;
  var discount = subtotal > 500 ? Math.round(subtotal * 0.1) : 0;
  var grand    = subtotal + delivery - discount;

  foot.innerHTML =
    (subtotal >= 500 ? "<div class=\"cart-offer\">🎉 You saved ₹" + discount + " with SPICE10!</div>" : "") +
    "<div class=\"cart-totals\">" +
      "<div class=\"cart-total-row\"><span>Subtotal</span><span>₹" + subtotal + "</span></div>" +
      "<div class=\"cart-total-row\"><span>Delivery</span><span>" + (delivery ? "₹" + delivery : "<span style=\"color:var(--green)\">FREE</span>") + "</span></div>" +
      (discount ? "<div class=\"cart-total-row\" style=\"color:var(--green)\"><span>Discount (10%)</span><span>-₹" + discount + "</span></div>" : "") +
      "<div class=\"cart-total-row grand\"><span>Total</span><span>₹" + grand + "</span></div>" +
    "</div>" +
    "<button class=\"btn-checkout\" onclick=\"checkout()\">Proceed to Checkout →</button>";
}

function checkout() {
  showToast("🎉 Order placed! Estimated delivery: 30 mins", "success");
  cart = [];
  saveCart(); updateCartCount(); renderCartItems();
  setTimeout(toggleCart, 1500);
}

/* ── SPECIALS ────────────────────────────────────────────────── */
var SPEC_TABS = [
  { id:"trending",     label:"🔥 Trending Today"   },
  { id:"chef-special", label:"👨‍🍳 Chef's Special" },
  { id:"recommended",  label:"💡 Recommended"      },
];

function renderSpecials() {
  document.getElementById("specTabs").innerHTML = SPEC_TABS.map(function(t){
    return "<button class=\"spec-tab " + (specialTab === t.id ? "active" : "") + "\" onclick=\"setSpecTab('" + t.id + "')\">" + t.label + "</button>";
  }).join("");

  var items = specialTab === "recommended"
    ? foodData.filter(function(i){ return i.rating >= 4.7; }).slice(0,6)
    : foodData.filter(function(i){ return i.tags.indexOf(specialTab) > -1; }).slice(0,6);

  document.getElementById("specialsGrid").innerHTML = items.map(function(i){
    return (
      "<div class=\"special-card\" onclick=\"openModal(" + i.id + ")\">" +
        "<img src=\"" + i.image + "\" alt=\"" + i.name + "\" loading=\"lazy\" style=\"width:100%;height:100%;object-fit:cover;\" onerror=\"this.onerror=null;this.src='" + FALLBACK_IMG + "'\"/>" +
        "<div class=\"special-overlay\"></div>" +
        "<div class=\"special-body\">" +
          "<div class=\"special-tag\">" + i.category.toUpperCase() + " · ⭐" + i.rating + "</div>" +
          "<div class=\"special-name\">" + i.name + "</div>" +
          "<div class=\"special-price\">₹" + i.price + "</div>" +
        "</div>" +
      "</div>"
    );
  }).join("");
}

function setSpecTab(t) { specialTab = t; renderSpecials(); }

/* ── OFFERS ──────────────────────────────────────────────────── */
function renderOffers() {
  document.getElementById("offersGrid").innerHTML = OFFERS.map(function(o){
    return (
      "<div class=\"offer-card\">" +
        "<div class=\"offer-icon\">" + o.icon + "</div>" +
        "<div class=\"offer-title\">" + o.title + "</div>" +
        "<div class=\"offer-desc\">" + o.desc + "</div>" +
        "<div class=\"offer-code\">" + o.code + "</div>" +
      "</div>"
    );
  }).join("");
}

/* ── REVIEWS ─────────────────────────────────────────────────── */
function renderReviews() {
  var avg    = (reviews.reduce(function(s,r){ return s+r.rating; }, 0) / reviews.length).toFixed(1);
  var counts = [5,4,3,2,1].map(function(n){ return reviews.filter(function(r){ return r.rating===n; }).length; });

  document.getElementById("reviewStats").innerHTML =
    "<div class=\"review-big\">" +
      "<div class=\"review-score\">" + avg + "</div>" +
      "<div class=\"review-stars\">⭐⭐⭐⭐⭐</div>" +
      "<div class=\"review-count\">" + reviews.length + " reviews</div>" +
    "</div>" +
    "<div class=\"rating-bars\">" +
    [5,4,3,2,1].map(function(n,i){
      return "<div class=\"rating-bar-row\"><span class=\"bar-label\">" + n + "</span>" +
        "<div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:" + (reviews.length ? counts[i]/reviews.length*100 : 0) + "%\"></div></div>" +
        "<span class=\"bar-count\">" + counts[i] + "</span></div>";
    }).join("") + "</div>";

  document.getElementById("reviewsGrid").innerHTML = reviews.slice(0,6).map(function(r){
    var stars = "";
    for (var s = 0; s < r.rating; s++) stars += "⭐";
    return (
      "<div class=\"review-card\">" +
        "<div class=\"rc-head\">" +
          "<div class=\"rc-avatar\">" + (r.init || r.name[0]) + "</div>" +
          "<div><div class=\"rc-name\">" + r.name + "</div><div class=\"rc-date\">" + (r.date||"Recently") + "</div></div>" +
          "<div style=\"margin-left:auto;color:#f0c040;font-size:.9rem\">" + stars + "</div>" +
        "</div>" +
        "<div class=\"rc-text\">\"" + r.text + "\"</div>" +
      "</div>"
    );
  }).join("");
}

function selectStar(n) {
  selectedStar = n;
  document.querySelectorAll(".star-select span").forEach(function(s,i){ s.textContent = i<n ? "⭐" : "☆"; });
}

function submitReview() {
  var name = document.getElementById("reviewName").value.trim();
  var text = document.getElementById("reviewText").value.trim();
  if (!name || !text || !selectedStar) { showToast("⚠️ Please fill in all fields and select a rating"); return; }
  reviews.unshift({ name:name, init:name[0].toUpperCase(), rating:selectedStar, date:"Just now", text:text });
  localStorage.setItem("sr_reviews", JSON.stringify(reviews));
  renderReviews();
  document.getElementById("reviewName").value = "";
  document.getElementById("reviewText").value = "";
  selectedStar = 0; selectStar(0);
  showToast("✅ Review submitted! Thank you.", "success");
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function renderContact() {
  document.getElementById("contactInfo").innerHTML = [
    { icon:"📍", label:"Address",   val:"123 Spice Lane, Bandra West, Mumbai 400050" },
    { icon:"📞", label:"Phone",     val:"+91 98765 43210" },
    { icon:"✉️", label:"Email",     val:"hello@spiceroute.in" },
    { icon:"📱", label:"Instagram", val:"@spiceroute.official" },
  ].map(function(c){
    return "<div class=\"contact-item\"><div class=\"c-icon\">" + c.icon + "</div><div><div class=\"c-label\">" + c.label + "</div><div class=\"c-val\">" + c.val + "</div></div></div>";
  }).join("");

  document.getElementById("hoursGrid").innerHTML = [
    { day:"Monday – Friday", time:"11:00 AM – 11:00 PM" },
    { day:"Saturday",        time:"10:00 AM – 11:30 PM" },
    { day:"Sunday",          time:"10:00 AM – 10:00 PM" },
  ].map(function(h){
    return "<div style=\"display:flex;justify-content:space-between;padding:.7rem 0;border-bottom:1px solid var(--border);font-size:.88rem;\"><span style=\"color:var(--text2)\">" + h.day + "</span><span style=\"color:var(--gold);font-weight:600\">" + h.time + "</span></div>";
  }).join("");
}

/* ── TOAST ───────────────────────────────────────────────────── */
function showToast(msg, type) {
  type = type || "";
  var c = document.getElementById("toastContainer");
  var t = document.createElement("div");
  t.className = "toast " + type;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function(){ t.classList.add("out"); setTimeout(function(){ t.remove(); }, 300); }, 2800);
}

/* ── SCROLL REVEAL ───────────────────────────────────────────── */
function initReveal() {
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(function(el){ observer.observe(el); });
}

/* ── INIT ────────────────────────────────────────────────────── */
function init() {
  /* Set theme button icon to match light-mode default */
  document.getElementById("themeBtn").textContent = "☀️";

  initParticles();
  initMarquee();
  renderCats();
  renderFilters();
  renderFood();
  renderSpecials();
  renderOffers();
  renderReviews();
  renderContact();
  updateCartCount();

  /* ISSUE 1 FIX: search input listener — triggers global search */
  document.getElementById("searchInput").addEventListener("input", function(e){
    searchQuery = e.target.value;
    renderFood();
  });

  setTimeout(initReveal, 100);
  setTimeout(initReveal, 500);
}

document.addEventListener("DOMContentLoaded", init);
