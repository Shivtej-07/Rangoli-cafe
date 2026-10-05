export const CAFE_INFO = {
  name: "Rangoli Cafe & Restaurant",
  hindiName: "रंगोली कैफे & रेस्टोरेंट",
  tagline: "Homestyle Delicacies & Mountain Charm in Vashist",
  subtitle: "Women-owned, LGBTQ+ friendly cafe nestled on the peaceful trail to Jogni Waterfalls.",
  description: "Welcome to Rangoli Cafe & Restaurant — a vibrant mountain haven where rich Indian culinary heritage meets warm Himachali hospitality. Founded and run by local women entrepreneurs, we take pride in offering a welcoming, safe space for everyone. Enjoy authentic homestyle meals, hand-brewed chai, and breathtaking panoramic views of snow-capped Himalayan peaks.",
  rating: 4.8,
  reviewCount: 510,
  address: "759P+3V6 On the way, Jogni Waterfall Rd, opposite to Yogashala, Vashist, Bashisht, Himachal Pradesh 175103",
  shortAddress: "Jogni Waterfall Rd, Opp. Yogashala, Vashist, Himachal Pradesh",
  landmarks: "5 min walk from Vashist Temple Hot Springs • Opposite Yogashala",
  phone: "+91 98056 16406",
  phoneRaw: "+919805616406",
  whatsappUrl: "https://wa.me/919805616406?text=Hello%20Rangoli%20Cafe!%20I%20would%20like%20to%20reserve%20a%20table.",
  instagram: "@rangolicafevashist",
  instagramUrl: "https://instagram.com",
  email: "hello@rangolicafevashist.com",
  googleMapsUrl: "https://maps.google.com/?q=759P%2B3V6+Jogni+Waterfall+Rd+Vashist",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.966964177264!2d77.187311!3d32.266200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390487d555555555%3A0x123456789abcdef!2sRangoli%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const BADGES = [
  {
    id: "women-owned",
    title: "Women-Owned",
    hindi: "महिला संचालित",
    description: "Founded and lovingly run by local women entrepreneurs",
    icon: "HeartHandshake"
  },
  {
    id: "lgbtq-friendly",
    title: "LGBTQ+ Friendly",
    hindi: "सबका स्वागत है",
    description: "A safe, warm, and inclusive space for all individuals",
    icon: "Sparkles"
  },
  {
    id: "mountain-views",
    title: "Mountain Views",
    hindi: "हिमालय दृश्य",
    description: "Uninterrupted terrace outlook of Solang peaks & valley",
    icon: "Mountain"
  },
  {
    id: "fresh-local",
    title: "Fresh Local Produce",
    hindi: "ताज़ा एवं शुद्ध",
    description: "Prepared daily with organic Himachali herbs & fresh spices",
    icon: "Leaf"
  },
  {
    id: "pet-friendly",
    title: "Pet Friendly",
    hindi: "पेट फ्रेंडली",
    description: "Your furry family members are always welcome on our deck",
    icon: "Dog"
  }
];

export const ABOUT_DATA = {
  heading: "A Cozy Haven Built with Passion & Warmth",
  hindiHeading: "हमारी कहानी - अपनापन और स्वाद",
  paragraphs: [
    "Rangoli Cafe & Restaurant was born out of a shared dream to create a joyful, nourishing sanctuary in Vashist. Located just off the main path to the famous Jogni Waterfalls and directly opposite Yogashala, our cafe offers a peaceful escape from busy town squares.",
    "As a women-owned business, we believe in hospitality that feels like coming home. Every dish is cooked with love, using traditional family recipes, hand-ground spices, and fresh vegetables sourced daily from mountain farmers.",
    "Whether you're stopping by for a comforting pot of Masala Chai after a long trek, craving a rich Himachali Dham thali, or looking for a cozy nook to read while taking in the Himalayan vista, our doors and hearts are always open."
  ],
  stats: [
    { label: "Google Rating", value: "4.8 ★" },
    { label: "Happy Guests", value: "500+" },
    { label: "Homestyle Dishes", value: "40+" },
    { label: "Love & Inclusivity", value: "100%" }
  ],
  images: [
    {
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      alt: "Cozy cafe interior with warm lighting and mountain views"
    },
    {
      url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
      alt: "Freshly brewed masala chai and snacks"
    }
  ]
};

export const MENU_CATEGORIES = [
  { id: "all", name: "All Items", icon: "Utensils" },
  { id: "breakfast", name: "Breakfast & Chai", icon: "Coffee" },
  { id: "mains", name: "Homestyle Mains", icon: "Flame" },
  { id: "cafe", name: "Cafe & Snacks", icon: "Sandwich" },
  { id: "drinks", name: "Beverages & Desserts", icon: "CupSoda" }
];

export const MENU_ITEMS = [
  // Breakfast
  {
    id: "b1",
    category: "breakfast",
    name: "Rangoli Sunrise Paratha Platter",
    hindiName: "रंगोली स्टफ्ड पराठा प्लाटर",
    price: "₹160",
    description: "Whole wheat stuffed flatbread (Aloo or Paneer) served with home-churned butter, fresh curd & mint chutney.",
    isVeg: true,
    isPopular: true,
    isChefSpecial: true
  },
  {
    id: "b2",
    category: "breakfast",
    name: "Himachali Herbal Masala Chai (Pot)",
    hindiName: "हिमाचली स्पेशल मसाला चाय",
    price: "₹110",
    description: "Slow-brewed Assam tea infused with fresh ginger, cardamom, cinnamon & wild mountain mint.",
    isVeg: true,
    isPopular: true
  },
  {
    id: "b3",
    category: "breakfast",
    name: "Pahadi Cheese Omelette Toast",
    hindiName: "पहाड़ी चीज़ ऑमलेट",
    price: "₹150",
    description: "Two farm eggs cooked with onions, green chilies, coriander & melted cheese with garlic butter toast.",
    isVeg: false,
    isPopular: false
  },
  {
    id: "b4",
    category: "breakfast",
    name: "Mountain Fruit & Granola Bowl",
    hindiName: "फ्रेश फ्रूट & ग्रैनोला बाउल",
    price: "₹190",
    description: "Sliced crisp Manali apples, toasted almonds, chia seeds & local honey served over thick yogurt.",
    isVeg: true,
    isVegan: true
  },

  // Homestyle Mains
  {
    id: "m1",
    category: "mains",
    name: "Himachali Special Thali",
    hindiName: "हिमाचली स्पेशल थाली",
    price: "₹320",
    description: "Traditional regional feast with White Chana Madra, Pahadi Dal, Kadi, Seasonal Subzi, Rice & Ghee Phulkas.",
    isVeg: true,
    isPopular: true,
    isChefSpecial: true
  },
  {
    id: "m2",
    category: "mains",
    name: "Butter Paneer Tikka Masala",
    hindiName: "बटर पनीर टिक्का मसाला",
    price: "₹290",
    description: "Charred cottage cheese cubes cooked in a buttery tomato-cashew reduction enriched with kasuri methi.",
    isVeg: true,
    isPopular: true
  },
  {
    id: "m3",
    category: "mains",
    name: "Homestyle Mountain Chicken Curry",
    hindiName: "होमस्टाइल चिकन करी",
    price: "₹350",
    description: "Tender chicken slow-cooked in traditional stone-ground whole spice gravy, served with basmati rice.",
    isVeg: false,
    isPopular: true
  },
  {
    id: "m4",
    category: "mains",
    name: "Overnight Slow-Cooked Dal Makhani",
    hindiName: "दल मखनी",
    price: "₹240",
    description: "Black lentils simmered overnight on charcoal fire with cream and butter. Rich, velvety, and soul-satisfying.",
    isVeg: true,
    isPopular: false
  },
  {
    id: "m5",
    category: "mains",
    name: "Fresh Beas River Trout Curry",
    hindiName: "ट्रौट फिश करी",
    price: "₹440",
    description: "Catch of the day Himachali trout cooked with mustard seeds, garlic, and fresh tangy gravy.",
    isVeg: false,
    isChefSpecial: true
  },

  // Cafe & Snacks
  {
    id: "c1",
    category: "cafe",
    name: "Handcrafted Steamed Momos (Veg / Paneer)",
    hindiName: "स्टीम्ड मोमोज",
    price: "₹170",
    description: "Delicate dumplings filled with finely chopped cabbage, paneer & herbs, paired with fiery chili chutney.",
    isVeg: true,
    isPopular: true
  },
  {
    id: "c2",
    category: "cafe",
    name: "Pahadi Sesame & Herb Toast",
    hindiName: "तिल & हर्ब टोस्ट",
    price: "₹140",
    description: "Golden toasted sourdough bread coated with roasted sesame seeds, garlic, and green coriander butter.",
    isVeg: true,
    isPopular: false
  },
  {
    id: "c3",
    category: "cafe",
    name: "Fresh Avocado & Feta Sourdough Toast",
    hindiName: "अवोकाडो फेटा टोस्ट",
    price: "₹250",
    description: "Himalayan avocado smash, crumbled feta cheese, cherry tomatoes, and chili flakes on artisanal bread.",
    isVeg: true,
    isPopular: true
  },
  {
    id: "c4",
    category: "cafe",
    name: "Hot Himalayan Thukpa Noodle Soup",
    hindiName: "हिमालयन थुकपा सूप",
    price: "₹190",
    description: "A comforting bowl of handmade egg noodles, seasonal veggies, and fragrant spiced ginger broth.",
    isVeg: true,
    isPopular: false
  },

  // Beverages & Desserts
  {
    id: "d1",
    category: "drinks",
    name: "Wild Seabuckthorn Iced Tea",
    hindiName: "सीबकथॉर्न आइस टी",
    price: "₹140",
    description: "Refreshing tangy Himalayan berry extract rich in Vitamin C blended with mint and cold iced tea.",
    isVeg: true,
    isPopular: true,
    isChefSpecial: true
  },
  {
    id: "d2",
    category: "drinks",
    name: "Fresh Manali Apple Cinnamon Pie",
    hindiName: "एप्पल दालचीनी पाई",
    price: "₹190",
    description: "Warm flaky pastry filled with Manali orchard apples and sweet spices, served with vanilla ice cream.",
    isVeg: true,
    isPopular: true
  },
  {
    id: "d3",
    category: "drinks",
    name: "Artisanal Pour-Over Filter Coffee",
    hindiName: "आर्टिसनल कॉफ़ी",
    price: "₹150",
    description: "Freshly roasted single-origin Arabica beans hand-brewed to perfection.",
    isVeg: true,
    isPopular: false
  },
  {
    id: "d4",
    category: "drinks",
    name: "Belgian Nutella Hot Chocolate",
    hindiName: "हॉट चॉकलेट विद नूटेला",
    price: "₹180",
    description: "Thick velvety hot cocoa infused with hazelnut Nutella and crowned with soft toasted marshmallows.",
    isVeg: true,
    isPopular: true
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Terrace Dining with Himalayan Views",
    category: "Vibe",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    caption: "Soak in sunny mountain afternoons over chai and delicious comfort food."
  },
  {
    id: 2,
    title: "Himachali Thali Feast",
    category: "Food",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
    caption: "Authentic Homestyle Thali made with freshly ground local spices."
  },
  {
    id: 3,
    title: "Fresh Hand-Rolled Stuffed Parathas",
    category: "Food",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    caption: "Crispy piping hot parathas served with fresh white butter and curd."
  },
  {
    id: 4,
    title: "Steamed Mountain Dumplings (Momos)",
    category: "Food",
    url: "https://images.unsplash.com/photo-1625220194771-7eb5a3a5c165?auto=format&fit=crop&w=1000&q=80",
    caption: "Juicy, freshly steamed momos paired with house-made chili sesame chutney."
  },
  {
    id: 5,
    title: "Cozy Indoor Seating & Book Nook",
    category: "Vibe",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    caption: "Warm wooden interiors, fairy lights, and eclectic mountain read corner."
  },
  {
    id: 6,
    title: "Freshly Brewed Masala Chai Pot",
    category: "Drinks",
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80",
    caption: "Aromatic Pahadi Chai infused with cardamom, ginger, and wild mint."
  },
  {
    id: 7,
    title: "Trail to Jogni Waterfalls in Vashist",
    category: "Views",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    caption: "Located directly on the scenic trekking path leading to Jogni Waterfalls."
  },
  {
    id: 8,
    title: "Decadent Manali Apple Pie",
    category: "Drinks",
    url: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1000&q=80",
    caption: "Baked daily using fresh crisp apples harvested from nearby mountain orchards."
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Aanya & Sarah",
    location: "Mumbai & Bristol",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "Rangoli Cafe is pure magic! As queer travelers, finding a place that feels this safe, warm, and genuinely welcoming in Vashist was incredible. The Women-owned vibe shines through in every detail. Don't miss the Himachali Thali and the hot Seabuckthorn tea on the sun deck!"
  },
  {
    id: 2,
    name: "Rohan Verma",
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "1 month ago",
    text: "Literally the best meal we had during our entire 10-day trip to Manali. The Dal Makhani tasted just like a home-cooked feast, and the view of the snow mountains opposite Yogashala is unbeatable. Rated 4.8 for a reason!"
  },
  {
    id: 3,
    name: "Emily Watson",
    location: "Melbourne, Australia",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "3 weeks ago",
    text: "Stopped by after hiking up to Jogni Waterfalls. The hosts were so kind, offering extra ginger tea and blankets on the terrace. The stuffed parathas and garlic naan were perfection. 10/10 recommend!"
  },
  {
    id: 4,
    name: "Dr. Kabir Roy",
    location: "Chandigarh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "2 months ago",
    text: "A hidden gem in Vashist village! Peaceful atmosphere, super fast Wi-Fi for remote work, and incredible homestyle food. The women managing the kitchen are absolute sweethearts."
  }
];

export const HOURS_LIST = [
  { day: "Monday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Tuesday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Wednesday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Thursday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Friday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Saturday", hours: "8:30 AM – 10:30 PM", open: true },
  { day: "Sunday", hours: "8:30 AM – 10:30 PM", open: true }
];

export const FAQ_DATA = [
  {
    question: "Where is Rangoli Cafe located in Vashist?",
    answer: "We are located on Jogni Waterfall Road, directly opposite Yogashala, about a 5-minute gentle walk up from the main Vashist Temple and hot water springs."
  },
  {
    question: "Do you offer vegan and gluten-free options?",
    answer: "Yes! Many of our traditional Himachali vegetable curries, thalis, fresh fruit bowls, and herbal teas are naturally vegan or can be made gluten-free upon request."
  },
  {
    question: "Is there outdoor seating with mountain views?",
    answer: "Absolutely! We have an open-air wooden terrace overlooking the valley and the majestic peaks of the Solang range."
  },
  {
    question: "Can I book a table in advance?",
    answer: "Yes! You can reserve a table directly via our website reservation form or drop us a quick message on WhatsApp (+91 98056 16406)."
  }
];
