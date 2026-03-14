/* =============================================================
   foodData.js  —  SpiceRoute Product Database
   Customizations now include { name, price } objects.
   FALLBACK_IMG shown when any product image fails to load.
   ============================================================= */

const FALLBACK_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";

const foodData = [

  /* ── INDIAN ─────────────────────────────────────────────── */
  {
    id: 1, name: "Chicken Biryani", price: 299, type: "nonveg", category: "Indian",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96f?w=500&q=80",
    description: "Fragrant basmati rice slow-cooked with tender chicken, whole spices, and caramelized onions.",
    rating: 4.9, reviews: 243, tags: ["popular", "trending"],
    customizations: [
      { name: "Extra Masala",  price: 20 },
      { name: "Boiled Egg",    price: 25 },
      { name: "Raita",         price: 30 },
      { name: "Extra Rice",    price: 40 }
    ]
  },
  {
    id: 2, name: "Butter Chicken", price: 280, type: "nonveg", category: "Indian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
    description: "Velvety tomato-cream gravy with perfectly spiced chicken. India's most beloved curry.",
    rating: 4.8, reviews: 312, tags: ["popular", "chef-special"],
    customizations: [
      { name: "Extra Gravy",  price: 30 },
      { name: "Less Spicy",   price: 0  },
      { name: "Extra Spicy",  price: 0  },
      { name: "No Cream",     price: 0  }
    ]
  },
  {
    id: 3, name: "Paneer Tikka", price: 240, type: "veg", category: "Indian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
    description: "Chunks of cottage cheese marinated in yogurt and spices, charred to perfection in a tandoor.",
    rating: 4.7, reviews: 198, tags: ["popular"],
    customizations: [
      { name: "Extra Cheese",     price: 30 },
      { name: "Extra Spicy",      price: 0  },
      { name: "Less Spicy",       price: 0  },
      { name: "No Onion/Garlic",  price: 0  }
    ]
  },
  {
    id: 4, name: "Masala Dosa", price: 160, type: "veg", category: "Indian",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&q=80",
    description: "Crispy golden crepe filled with spiced potato filling. Served with coconut chutney and sambar.",
    rating: 4.6, reviews: 178, tags: ["popular"],
    customizations: [
      { name: "Extra Chutney", price: 15 },
      { name: "Extra Sambar",  price: 20 },
      { name: "No Onion",      price: 0  },
      { name: "Crispy",        price: 0  }
    ]
  },
  {
    id: 5, name: "Dal Makhani", price: 220, type: "veg", category: "Indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80",
    description: "Black lentils slow-simmered overnight with butter, cream, and a symphony of spices.",
    rating: 4.8, reviews: 234, tags: ["chef-special"],
    customizations: [
      { name: "Extra Butter", price: 20 },
      { name: "Extra Cream",  price: 25 },
      { name: "Less Spicy",   price: 0  },
      { name: "No Garlic",    price: 0  }
    ]
  },
  {
    id: 6, name: "Chole Bhature", price: 180, type: "veg", category: "Indian",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80",
    description: "Fluffy deep-fried bread with spiced chickpea curry. A Punjabi classic.",
    rating: 4.7, reviews: 156, tags: ["popular"],
    customizations: [
      { name: "Extra Chole",   price: 30 },
      { name: "Extra Bhature", price: 25 },
      { name: "Extra Spicy",   price: 0  },
      { name: "Onion Side",    price: 10 }
    ]
  },
  {
    id: 7, name: "Hyderabadi Dum Biryani", price: 320, type: "nonveg", category: "Indian",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=500&q=80",
    description: "Authentic dum-cooked biryani with saffron-infused rice and marinated meat.",
    rating: 4.9, reviews: 289, tags: ["trending", "popular"],
    customizations: [
      { name: "Extra Masala", price: 20 },
      { name: "Boiled Egg",   price: 25 },
      { name: "Raita",        price: 30 },
      { name: "Salan",        price: 35 }
    ]
  },
  {
    id: 8, name: "Chicken 65", price: 260, type: "nonveg", category: "Indian",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80",
    description: "Deep-fried chicken marinated in yogurt, red chillies, and curry leaves.",
    rating: 4.8, reviews: 312, tags: ["popular", "trending"],
    customizations: [
      { name: "Extra Spicy",  price: 0  },
      { name: "Less Spicy",   price: 0  },
      { name: "Extra Sauce",  price: 20 },
      { name: "Lime",         price: 10 }
    ]
  },

  /* ── FAST FOOD ───────────────────────────────────────────── */
  {
    id: 9, name: "Veg Burger", price: 180, type: "veg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    description: "Crispy aloo tikki patty with tangy chutneys, crunchy slaw, and fresh veggies in a brioche bun.",
    rating: 4.5, reviews: 198, tags: ["popular"],
    customizations: [
      { name: "Extra Cheese", price: 20 },
      { name: "Extra Patty",  price: 50 },
      { name: "Mayo",         price: 15 },
      { name: "No Onion",     price: 0  }
    ]
  },
  {
    id: 10, name: "Chicken Burger", price: 220, type: "nonveg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80",
    description: "Juicy grilled chicken with smoky sauce, lettuce, tomato, and pickles in a toasted sesame bun.",
    rating: 4.7, reviews: 245, tags: ["popular", "trending"],
    customizations: [
      { name: "Extra Patty",  price: 50 },
      { name: "Cheese Slice", price: 20 },
      { name: "Mayo",         price: 15 },
      { name: "Spicy Sauce",  price: 10 }
    ]
  },
  {
    id: 11, name: "Margherita Pizza", price: 320, type: "veg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    description: "Classic Neapolitan pizza with San Marzano tomato sauce, fresh mozzarella, and basil.",
    rating: 4.6, reviews: 178, tags: [],
    customizations: [
      { name: "Extra Cheese",   price: 30 },
      { name: "Extra Toppings", price: 40 },
      { name: "Spicy Sauce",    price: 10 },
      { name: "Thin Crust",     price: 0  }
    ]
  },
  {
    id: 12, name: "Pepperoni Pizza", price: 380, type: "nonveg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    description: "Classic pizza loaded with spicy pepperoni slices and stretchy mozzarella on a thin crispy crust.",
    rating: 4.7, reviews: 213, tags: ["popular"],
    customizations: [
      { name: "Extra Cheese",     price: 30 },
      { name: "Extra Pepperoni",  price: 45 },
      { name: "Spicy Sauce",      price: 10 },
      { name: "Stuffed Crust",    price: 50 }
    ]
  },
  {
    id: 13, name: "Pasta Arrabbiata", price: 260, type: "veg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80",
    description: "Al dente penne in a spicy tomato sauce with garlic, red chillies, and fresh basil.",
    rating: 4.5, reviews: 143, tags: [],
    customizations: [
      { name: "Extra Spicy",  price: 0  },
      { name: "Extra Cheese", price: 30 },
      { name: "Garlic Bread", price: 40 },
      { name: "Less Spicy",   price: 0  }
    ]
  },
  {
    id: 14, name: "Chicken Shawarma", price: 240, type: "nonveg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80",
    description: "Juicy rotisserie chicken wrapped in lavash with garlic sauce, pickles, and fresh veggies.",
    rating: 4.7, reviews: 267, tags: ["trending"],
    customizations: [
      { name: "Extra Garlic Sauce", price: 20 },
      { name: "Extra Chicken",      price: 50 },
      { name: "Spicy",              price: 0  },
      { name: "No Pickles",         price: 0  }
    ]
  },
  {
    id: 15, name: "Loaded Fries", price: 160, type: "veg", category: "Fast Food",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
    description: "Crispy golden fries loaded with cheese sauce, jalapeños, and spicy mayo.",
    rating: 4.4, reviews: 312, tags: ["popular"],
    customizations: [
      { name: "Extra Cheese",    price: 25 },
      { name: "Extra Jalapeños", price: 15 },
      { name: "Sour Cream",      price: 20 },
      { name: "BBQ Sauce",       price: 15 }
    ]
  },

  /* ── CHINESE ─────────────────────────────────────────────── */
  {
    id: 16, name: "Veg Momos", price: 150, type: "veg", category: "Chinese",
    image: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?w=500&q=80",
    description: "Steamed Tibetan dumplings filled with spiced vegetables. Served with fiery chili dipping sauce.",
    rating: 4.8, reviews: 456, tags: ["popular", "trending"],
    customizations: [
      { name: "Extra Chili Sauce", price: 15 },
      { name: "Steamed",           price: 0  },
      { name: "Fried",             price: 20 },
      { name: "Pan Fried",         price: 20 }
    ]
  },
  {
    id: 17, name: "Chicken Momos", price: 180, type: "nonveg", category: "Chinese",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
    description: "Juicy steamed dumplings filled with seasoned minced chicken and fresh herbs.",
    rating: 4.8, reviews: 389, tags: ["popular"],
    customizations: [
      { name: "Extra Chili Sauce", price: 15 },
      { name: "Steamed",           price: 0  },
      { name: "Fried",             price: 20 },
      { name: "Extra Filling",     price: 30 }
    ]
  },
  {
    id: 18, name: "Hakka Noodles", price: 200, type: "veg", category: "Chinese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
    description: "Stir-fried noodles tossed with vegetables in a savory Indo-Chinese sauce.",
    rating: 4.5, reviews: 234, tags: ["popular"],
    customizations: [
      { name: "Extra Spicy",  price: 0  },
      { name: "Less Spicy",   price: 0  },
      { name: "Extra Veggies",price: 25 },
      { name: "Soy Sauce",    price: 10 }
    ]
  },
  {
    id: 19, name: "Veg Manchurian", price: 220, type: "veg", category: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
    description: "Crispy vegetable balls in a sweet-spicy Manchurian gravy with spring onions.",
    rating: 4.6, reviews: 213, tags: [],
    customizations: [
      { name: "Dry",         price: 0  },
      { name: "Gravy",       price: 0  },
      { name: "Extra Spicy", price: 0  },
      { name: "Extra Sauce", price: 20 }
    ]
  },

  /* ── STREET FOOD ─────────────────────────────────────────── */
  {
    id: 20, name: "Samosa", price: 60, type: "veg", category: "Street Food",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f7a2d5e7?w=500&q=80",
    description: "Golden crispy pastry filled with spiced potato and peas. The iconic Indian snack.",
    rating: 4.7, reviews: 543, tags: ["popular"],
    customizations: [
      { name: "Extra Chutney",  price: 10 },
      { name: "Extra Tamarind", price: 10 },
      { name: "Masala Top",     price: 10 },
      { name: "Chole Side",     price: 25 }
    ]
  },
  {
    id: 21, name: "Pani Puri", price: 80, type: "veg", category: "Street Food",
    image: "https://images.unsplash.com/photo-1601050690613-35c4e5a50b2a?w=500&q=80",
    description: "Crispy hollow puris filled with spiced potatoes and dunked in tangy mint water.",
    rating: 4.9, reviews: 678, tags: ["popular", "trending"],
    customizations: [
      { name: "Extra Puri",       price: 20 },
      { name: "Extra Spicy Water",price: 0  },
      { name: "Sweet Chutney",    price: 10 },
      { name: "Masala Puri",      price: 10 }
    ]
  },
  {
    id: 22, name: "Vada Pav", price: 70, type: "veg", category: "Street Food",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80",
    description: "Mumbai's iconic street burger — spiced potato fritter in a soft bun with fiery chutneys.",
    rating: 4.8, reviews: 456, tags: ["popular"],
    customizations: [
      { name: "Extra Chutney",    price: 10 },
      { name: "Extra Dry Garlic", price: 10 },
      { name: "Fried Chilli",     price: 5  },
      { name: "Double Vada",      price: 40 }
    ]
  },
  {
    id: 23, name: "Pav Bhaji", price: 130, type: "veg", category: "Street Food",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80",
    description: "Buttery spiced vegetable mash served with soft bread rolls. Mumbai's favourite street classic.",
    rating: 4.8, reviews: 345, tags: ["popular"],
    customizations: [
      { name: "Extra Butter", price: 20 },
      { name: "Extra Pav",    price: 20 },
      { name: "Cheese Top",   price: 30 },
      { name: "Extra Spicy",  price: 0  }
    ]
  },

  /* ── DESSERTS ─────────────────────────────────────────────── */
  {
    id: 24, name: "Gulab Jamun", price: 120, type: "veg", category: "Desserts",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
    description: "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup. India's sweetest guilty pleasure.",
    rating: 4.9, reviews: 567, tags: ["popular", "chef-special"],
    customizations: [
      { name: "Ice Cream Scoop",  price: 50 },
      { name: "Extra Syrup",      price: 15 },
      { name: "Chocolate Syrup",  price: 20 },
      { name: "Warm Serving",     price: 0  }
    ]
  },
  {
    id: 25, name: "Mango Kulfi", price: 100, type: "veg", category: "Desserts",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&q=80",
    description: "Dense, creamy frozen dessert with real Alphonso mango. A summer classic.",
    rating: 4.7, reviews: 298, tags: ["popular"],
    customizations: [
      { name: "Falooda Noodles", price: 25 },
      { name: "Rose Syrup",      price: 15 },
      { name: "Extra Mango",     price: 20 },
      { name: "Pistachio Top",   price: 20 }
    ]
  },
  {
    id: 26, name: "Chocolate Lava Cake", price: 220, type: "veg", category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    description: "Warm dark chocolate cake with molten centre. Served with vanilla bean ice cream.",
    rating: 4.8, reviews: 234, tags: ["trending"],
    customizations: [
      { name: "Ice Cream Scoop", price: 50 },
      { name: "Chocolate Syrup", price: 20 },
      { name: "Whipped Cream",   price: 25 },
      { name: "Extra Warm",      price: 0  }
    ]
  },

  /* ── BEVERAGES ─────────────────────────────────────────────── */
  {
    id: 27, name: "Mango Lassi", price: 120, type: "veg", category: "Beverages",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&q=80",
    description: "Thick chilled yogurt blended with Alphonso mango pulp. Refreshing, creamy, and tropical.",
    rating: 4.8, reviews: 456, tags: ["popular"],
    customizations: [
      { name: "Less Sugar",  price: 0  },
      { name: "Extra Ice",   price: 0  },
      { name: "No Ice",      price: 0  },
      { name: "Extra Thick", price: 15 }
    ]
  },
  {
    id: 28, name: "Cold Coffee", price: 150, type: "veg", category: "Beverages",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
    description: "Thick blended cold coffee with vanilla ice cream. Bold, creamy, and utterly refreshing.",
    rating: 4.6, reviews: 234, tags: ["popular"],
    customizations: [
      { name: "Less Sugar", price: 0  },
      { name: "Extra Ice",  price: 0  },
      { name: "No Ice",     price: 0  },
      { name: "Extra Shot", price: 30 }
    ]
  },
   {
    id: 29, name: "Kullad Mango Lassi", price: 120, type: "veg", category: "Beverages",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&q=80",
    description: "Thick chilled yogurt blended with Alphonso mango pulp. Refreshing, creamy, and tropical.",
    rating: 4.8, reviews: 456, tags: ["popular"],
    customizations: [
      { name: "Less Sugar",  price: 0  },
      { name: "Extra Ice",   price: 0  },
      { name: "No Ice",      price: 0  },
      { name: "Extra Thick", price: 15 }
    ]
  }

];