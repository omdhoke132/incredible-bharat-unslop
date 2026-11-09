const maharashtra = {
  id: "maharashtra",
  name: "Maharashtra",
  region: "West-Central India",

  description:
    "Maharashtra brings together ancient Buddhist cave heritage, Deccan and Maratha history, coastal traditions, Bhakti pilgrimage, vibrant folk performance, handloom arts and diverse regional cuisine.",

  heritage: [
    {
      id: "ajanta-caves",
      name: "Ajanta Caves",
      location: "Chhatrapati Sambhajinagar",
      period: "2nd century BCE–6th century CE",
      unesco: "World Heritage",
      description: "Rock-cut Buddhist caves celebrated for murals, sculpture, monasteries and chaitya halls.",
      significance: "A major record of ancient Indian Buddhist art and painting."
    },
    {
      id: "ellora-caves",
      name: "Ellora Caves",
      location: "Chhatrapati Sambhajinagar",
      period: "6th–10th century CE",
      unesco: "World Heritage",
      description: "Rock-cut Buddhist, Hindu and Jain monuments including the monumental Kailasa temple.",
      significance: "A remarkable architectural landscape demonstrating religious coexistence and advanced rock-cut engineering."
    },
    {
      id: "elephanta-caves",
      name: "Elephanta Caves",
      location: "Mumbai Harbour",
      period: "5th–8th century CE",
      unesco: "World Heritage",
      description: "Rock-cut temples on Gharapuri island dominated by monumental Shaiva sculpture.",
      significance: "The Trimurti and associated sculptures are highlights of India's ancient rock-cut art."
    },
    {
      id: "csmt",
      name: "Chhatrapati Shivaji Maharaj Terminus",
      location: "Mumbai",
      period: "19th century",
      unesco: "World Heritage",
      description: "Historic railway terminus blending Victorian Gothic architecture with Indian influences.",
      significance: "A landmark of Mumbai's colonial-era urban and railway history."
    },
    {
      id: "victorian-art-deco-mumbai",
      name: "Victorian Gothic and Art Deco Ensembles of Mumbai",
      location: "Mumbai",
      period: "19th–20th century",
      unesco: "World Heritage",
      description: "Historic urban ensemble around the Oval Maidan and Marine Drive.",
      significance: "Shows Mumbai's transition from colonial trading city to modern metropolis."
    },
    {
      id: "maratha-military-landscapes",
      name: "Maratha Military Landscapes of India",
      location: "Maharashtra and Tamil Nadu",
      period: "17th–19th century",
      unesco: "World Heritage",
      description: "Serial World Heritage property of major Maratha fortifications across mountainous and coastal terrain.",
      significance: "Demonstrates the strategic military landscape that supported Maratha political power."
    },
    {
      id: "raigad-fort",
      name: "Raigad Fort",
      location: "Raigad",
      period: "17th century",
      unesco: "World Heritage component",
      description: "Historic hill fort and capital of the early Maratha state under Shivaji Maharaj.",
      significance: "A major symbol of Maratha statecraft and military history."
    },
    {
      id: "sindhudurg-fort",
      name: "Sindhudurg Fort",
      location: "Malvan",
      period: "17th century",
      unesco: "World Heritage component",
      description: "Sea fort built on an island off the Konkan coast.",
      significance: "Represents Maratha coastal defence and maritime strategy."
    },
    {
      id: "shivneri-fort",
      name: "Shivneri Fort",
      location: "Junnar",
      period: "Medieval–early modern",
      unesco: "World Heritage component",
      description: "Historic hill fort associated with the birthplace of Shivaji Maharaj.",
      significance: "Important to Maratha memory, pilgrimage and regional history."
    },
    {
      id: "pratapgad-fort",
      name: "Pratapgad Fort",
      location: "Satara",
      period: "17th century",
      unesco: null,
      description: "Mountain fort strongly associated with the rise of the Maratha state.",
      significance: "Known for its strategic location and Maratha military history."
    },
    {
      id: "panhala-fort",
      name: "Panhala Fort",
      location: "Kolhapur",
      period: "Ancient–Medieval",
      unesco: null,
      description: "Major Deccan hill fort with layers of early and Maratha history.",
      significance: "A key military landscape of the western Deccan."
    },
    {
      id: "daulatabad-fort",
      name: "Daulatabad Fort",
      location: "Chhatrapati Sambhajinagar",
      period: "12th century onward",
      unesco: null,
      description: "Highly fortified hill citadel historically known as Devagiri.",
      significance: "Illustrates sophisticated medieval fortification and Deccan political history."
    }
  ],

  festivals: [
    {
      id: "ganesh-chaturthi",
      name: "Ganesh Chaturthi",
      type: "Festival",
      region: "Across Maharashtra",
      description: "Major public and household celebration centred on Lord Ganesha, music, processions and community art."
    },
    {
      id: "gudi-padwa",
      name: "Gudi Padwa",
      type: "New Year Festival",
      region: "Across Maharashtra",
      description: "Marathi New Year celebrated with decorated gudis, rangoli, festive foods and family rituals."
    },
    {
      id: "pandharpur-wari",
      name: "Pandharpur Wari",
      type: "Pilgrimage Tradition",
      region: "Pune–Pandharpur",
      description: "Annual Varkari pilgrimage carrying the sacred padukas of saints to Pandharpur."
    },
    {
      id: "dahi-handi",
      name: "Dahi Handi",
      type: "Festival",
      region: "Urban Maharashtra",
      description: "Krishna-themed community celebration involving human pyramids and decorated handi pots."
    },
    {
      id: "mangalagaur",
      name: "Mangalagaur",
      type: "Women's Festival",
      region: "Maharashtra",
      description: "Traditional women's observance featuring games, songs, dance and ritual gatherings."
    },
    {
      id: "narali-purnima",
      name: "Narali Purnima",
      type: "Coastal Festival",
      region: "Konkan",
      description: "Coconut-offering festival associated with fishing communities and the coastal monsoon cycle."
    },
    {
      id: "pola",
      name: "Pola",
      type: "Agrarian Festival",
      region: "Vidarbha and rural Maharashtra",
      description: "Bull-worship festival honouring the animals central to traditional agriculture."
    },
    {
      id: "nag-panchami",
      name: "Nag Panchami",
      type: "Religious Festival",
      region: "Across Maharashtra",
      description: "Snake-veneration festival observed with regional rituals and offerings."
    },
    {
      id: "rang-panchami",
      name: "Rang Panchami",
      type: "Festival",
      region: "Maharashtra",
      description: "Colour festival observed several days after Holi in parts of the state."
    },
    {
      id: "ashadhi-ekadashi",
      name: "Ashadhi Ekadashi",
      type: "Pilgrimage Festival",
      region: "Pandharpur",
      description: "Major Varkari devotional observance associated with Vitthal and the Wari tradition."
    },
    {
      id: "diwali",
      name: "Diwali",
      type: "Festival",
      region: "Across Maharashtra",
      description: "Festival season marked by lamps, family rituals, faral and regional traditions."
    },
    {
      id: "hindavi-swarajya-mahotsav",
      name: "Hindavi Swarajya Mahotsav",
      type: "Cultural Festival",
      region: "Maharashtra",
      description: "Cultural programming highlighting Maratha heritage, forts, history and traditional performance."
    }
  ],

  traditions: [
    {
      id: "lavani",
      name: "Lavani",
      category: "Folk Performance",
      description: "High-energy song-and-dance tradition known for rhythm, expressive performance and strong links with Marathi theatre."
    },
    {
      id: "tamasha",
      name: "Tamasha",
      category: "Folk Theatre",
      description: "Popular Marathi performance form combining music, dance, satire and dramatic storytelling."
    },
    {
      id: "powada",
      name: "Powada",
      category: "Ballad Tradition",
      description: "Heroic narrative singing celebrating historical figures, battles and community memory."
    },
    {
      id: "gondhal",
      name: "Gondhal",
      category: "Ritual Performance",
      description: "Devotional ritual performance featuring music, narration and ceremonial storytelling."
    },
    {
      id: "bharud",
      name: "Bharud",
      category: "Devotional Folk Performance",
      description: "Saint-poet tradition using allegory, humour and performance to communicate spiritual ideas."
    },
    {
      id: "lezim",
      name: "Lezim",
      category: "Folk Dance",
      description: "Percussive group dance using the lezim instrument, often performed at processions and celebrations."
    },
    {
      id: "koli-dance",
      name: "Koli Dance",
      category: "Community Dance",
      description: "Dance tradition of coastal fishing communities reflecting maritime life and local identity."
    },
    {
      id: "dhangari-gaja",
      name: "Dhangari Gaja",
      category: "Folk Dance",
      description: "Energetic pastoral community dance associated with the Dhangar tradition."
    },
    {
      id: "fugdi",
      name: "Fugdi",
      category: "Folk Dance",
      description: "Circular women's dance traditionally performed during festivals and community gatherings."
    },
    {
      id: "dashavatara",
      name: "Dashavatara",
      category: "Folk Theatre",
      description: "Traditional theatre of the Konkan region depicting stories of Vishnu's incarnations."
    }
  ],

  music: [
    {
      id: "abhang",
      name: "Abhang",
      category: "Devotional",
      description: "Devotional songs central to the Varkari tradition and worship of Vitthal."
    },
    {
      id: "kirtan",
      name: "Kirtan",
      category: "Devotional",
      description: "Narrative devotional performance combining singing, explanation and spiritual teaching."
    },
    {
      id: "natya-sangeet",
      name: "Natya Sangeet",
      category: "Theatre Music",
      description: "Distinctive Marathi musical-theatre tradition built around songs, drama and classical influences."
    },
    {
      id: "lavani-music",
      name: "Lavani Music",
      category: "Folk",
      description: "Rhythm-driven Marathi folk music supporting Lavani dance and performance."
    },
    {
      id: "bhajan",
      name: "Marathi Bhajan",
      category: "Devotional",
      description: "Devotional singing tradition found across temples, pilgrimage communities and households."
    },
    {
      id: "powada-music",
      name: "Powada Music",
      category: "Folk Ballad",
      description: "Narrative musical style used by Shahirs to perform heroic and historical ballads."
    }
  ],

  instruments: [
    {
      id: "dholki",
      name: "Dholki",
      category: "Percussion",
      description: "Double-headed drum strongly associated with Lavani and folk theatre."
    },
    {
      id: "tuntuna",
      name: "Tuntuna",
      category: "String",
      description: "Simple one-string folk instrument used to accompany narrative singing."
    },
    {
      id: "ektara",
      name: "Ektara",
      category: "String",
      description: "Single-string instrument used in devotional and folk singing traditions."
    },
    {
      id: "lezim-instrument",
      name: "Lezim",
      category: "Percussion",
      description: "Handheld rhythmic instrument that also gives its name to the associated group dance."
    },
    {
      id: "sambal",
      name: "Sambal",
      category: "Percussion",
      description: "Pair of drums used in ceremonial and folk performance traditions."
    }
  ],

  arts: [
    {
      id: "warli-painting",
      name: "Warli Painting",
      category: "Painting",
      description: "Geometric tribal painting tradition portraying village life, farming, animals, rituals and community relationships."
    },
    {
      id: "chitrakathi",
      name: "Chitrakathi",
      category: "Narrative Art",
      description: "Traditional painted storytelling practice using sequential images to narrate epics and devotional tales."
    },
    {
      id: "sawantwadi-lacquer",
      name: "Sawantwadi Lacquer Art",
      category: "Decorative Art",
      description: "Decorative lacquer tradition producing painted wooden objects and traditional toys."
    },
    {
      id: "paithani-design",
      name: "Paithani Design Tradition",
      category: "Textile Art",
      description: "Decorative weaving vocabulary known for silk, zari, peacock motifs and richly patterned pallus."
    },
    {
      id: "mashru-himroo",
      name: "Himroo and Mashru Decorative Weaving",
      category: "Textile Art",
      description: "Historic Deccan weaving traditions associated particularly with the Chhatrapati Sambhajinagar region."
    }
  ],

  crafts: [
    {
      id: "paithani-weaving",
      name: "Paithani Weaving",
      category: "Textile Craft",
      description: "Handwoven silk tradition from Paithan known for zari borders and distinctive motifs."
    },
    {
      id: "kolhapuri-chappal",
      name: "Kolhapuri Chappal",
      category: "Leather Craft",
      description: "Handcrafted leather footwear associated with Kolhapur and traditional artisanal techniques."
    },
    {
      id: "sawantwadi-lacquerware",
      name: "Sawantwadi Lacquerware",
      category: "Wood Craft",
      description: "Lacquered wooden craft including toys, boxes and decorative objects."
    },
    {
      id: "solapur-chaddar",
      name: "Solapur Chaddar",
      category: "Textile",
      description: "Woven cotton coverlet tradition associated with Solapur's textile industry."
    },
    {
      id: "solapur-terry-towel",
      name: "Solapur Terry Towels",
      category: "Textile",
      description: "Traditional textile production associated with Solapur."
    },
    {
      id: "himroo",
      name: "Himroo",
      category: "Weaving",
      description: "Decorative woven textile tradition historically associated with the Deccan and Chhatrapati Sambhajinagar."
    },
    {
      id: "mashru",
      name: "Mashru",
      category: "Weaving",
      description: "Historic mixed-fibre textile tradition with strong Deccan connections."
    }
  ],

  textiles: [
    {
      id: "paithani",
      name: "Paithani",
      category: "Silk Weaving",
      description: "Luxury handwoven silk sari tradition centred on Paithan."
    },
    {
      id: "himroo-textile",
      name: "Himroo",
      category: "Woven Textile",
      description: "Historic patterned textile tradition associated with the Deccan."
    },
    {
      id: "mashru-textile",
      name: "Mashru",
      category: "Woven Textile",
      description: "Traditional textile combining cotton and silk traditions in historic Deccan weaving."
    },
    {
      id: "solapur-textiles",
      name: "Solapur Handloom Textiles",
      category: "Cotton Textile",
      description: "Regional weaving heritage represented by chaddars and other cotton products."
    }
  ],

  cuisine: [
    {
      id: "vada-pav",
      name: "Vada Pav",
      type: "Street Food",
      description: "Spiced potato fritter served in a pav with chutneys; an iconic urban food of Maharashtra."
    },
    {
      id: "misal-pav",
      name: "Misal Pav",
      type: "Street Food",
      description: "Spiced sprout curry served with bread, farsan and regional accompaniments."
    },
    {
      id: "puran-poli",
      name: "Puran Poli",
      type: "Sweet Flatbread",
      description: "Stuffed sweet flatbread made with lentils, jaggery and aromatic spices."
    },
    {
      id: "modak",
      name: "Modak",
      type: "Sweet",
      description: "Traditional sweet strongly associated with Ganesh Chaturthi."
    },
    {
      id: "thalipeeth",
      name: "Thalipeeth",
      type: "Flatbread",
      description: "Multigrain savoury flatbread prepared with regional flour and spices."
    },
    {
      id: "pithla-bhakri",
      name: "Pithla Bhakri",
      type: "Regional Meal",
      description: "Traditional meal of gram-flour preparation with millet bhakri."
    },
    {
      id: "tambda-rassa",
      name: "Tambda Rassa",
      type: "Kolhapuri Cuisine",
      description: "Fiery red Kolhapuri-style curry traditionally paired with meat and breads."
    },
    {
      id: "pandhra-rassa",
      name: "Pandhra Rassa",
      type: "Kolhapuri Cuisine",
      description: "Milder white Kolhapuri curry traditionally served alongside regional meat dishes."
    },
    {
      id: "sol-kadhi",
      name: "Sol Kadhi",
      type: "Konkan Drink",
      description: "Cooling coconut-and-kokum preparation associated with the Konkan coast."
    },
    {
      id: "malvani-cuisine",
      name: "Malvani Cuisine",
      type: "Regional Cuisine",
      description: "Coastal cuisine known for coconut, kokum and seafood preparations."
    },
    {
      id: "saoji-cuisine",
      name: "Saoji Cuisine",
      type: "Regional Cuisine",
      description: "Strongly spiced Vidarbha cuisine with distinctive masala profiles."
    }
  ],

  communities: [
    {
      id: "warli",
      name: "Warli",
      region: "Palghar and surrounding areas",
      description: "Adivasi community known internationally for its distinctive painting tradition and rich oral culture."
    },
    {
      id: "bhil",
      name: "Bhil",
      region: "Northern and western Maharashtra",
      description: "Indigenous community with distinct music, dance, oral traditions and craft practices."
    },
    {
      id: "gond",
      name: "Gond",
      region: "Vidarbha",
      description: "Adivasi community with strong links to oral traditions, performance and visual arts."
    },
    {
      id: "koli",
      name: "Koli",
      region: "Coastal Maharashtra and Mumbai",
      description: "Maritime community with distinctive fishing traditions, festivals, songs and dances."
    },
    {
      id: "dhangar",
      name: "Dhangar",
      region: "Western and central Maharashtra",
      description: "Pastoral community associated with distinctive songs, dances and seasonal traditions."
    },
    {
      id: "katkari",
      name: "Katkari",
      region: "Konkan and adjoining areas",
      description: "Adivasi community with distinctive oral traditions and customary knowledge."
    },
    {
      id: "banjara",
      name: "Banjara",
      region: "Across Maharashtra",
      description: "Community known for colourful embroidery, jewellery and performance traditions."
    }
  ],

  culturalPlaces: [
    {
      id: "mumbai",
      name: "Mumbai",
      type: "Cultural Metropolis",
      description: "Historic port city blending colonial architecture, Marathi culture, cinema, theatre and diverse communities."
    },
    {
      id: "pune",
      name: "Pune",
      type: "Cultural City",
      description: "Major centre of Marathi literature, education, theatre, classical music and Peshwa-era heritage."
    },
    {
      id: "chhatrapati-sambhajinagar",
      name: "Chhatrapati Sambhajinagar",
      type: "Heritage City",
      description: "Gateway to Ajanta, Ellora and major Deccan monuments and craft traditions."
    },
    {
      id: "kolhapur",
      name: "Kolhapur",
      type: "Cultural City",
      description: "Known for temple traditions, Maratha heritage, cuisine and crafts."
    },
    {
      id: "nashik",
      name: "Nashik",
      type: "Pilgrimage City",
      description: "Ancient religious centre associated with the Godavari, Kumbh traditions and temple heritage."
    },
    {
      id: "pandharpur",
      name: "Pandharpur",
      type: "Pilgrimage Centre",
      description: "Heartland of the Varkari tradition and worship of Vitthal-Rukmini."
    },
    {
      id: "konkan",
      name: "Konkan",
      type: "Cultural Region",
      description: "Coastal region with distinctive foodways, fishing communities, forts and performing traditions."
    }
  ],

  institutions: [
    {
      id: "csmvs",
      name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
      city: "Mumbai",
      type: "Museum",
      description: "Major museum of Indian art, archaeology and cultural history."
    },
    {
      id: "bhau-daji-lad",
      name: "Dr. Bhau Daji Lad Mumbai City Museum",
      city: "Mumbai",
      type: "Museum",
      description: "Historic city museum documenting Mumbai's social and material history."
    },
    {
      id: "raja-dinkar-kelkar",
      name: "Raja Dinkar Kelkar Museum",
      city: "Pune",
      type: "Museum",
      description: "Museum of Indian decorative arts and everyday cultural objects."
    },
    {
      id: "mani-bhavan",
      name: "Mani Bhavan Gandhi Sangrahalaya",
      city: "Mumbai",
      type: "Museum",
      description: "Historic centre documenting Gandhi's activities and the freedom movement in Mumbai."
    },
    {
      id: "national-museum-indian-cinema",
      name: "National Museum of Indian Cinema",
      city: "Mumbai",
      type: "Museum",
      description: "Institution dedicated to the history and heritage of Indian cinema."
    }
  ],

  languages: [
    "Marathi",
    "Konkani",
    "Varhadi",
    "Malvani",
    "Ahirani",
    "Gondi",
    "Warli",
    "Hindi"
  ],

  literature: [
    {
      id: "dnyaneshwar",
      name: "Dnyaneshwar",
      description: "Saint-poet whose works are foundational to Marathi Bhakti literature."
    },
    {
      id: "tukaram",
      name: "Tukaram",
      description: "Varkari saint-poet celebrated for devotional Abhangs to Vitthal."
    },
    {
      id: "namdev",
      name: "Namdev",
      description: "Influential Bhakti poet whose devotional legacy extends across regions and traditions."
    },
    {
      id: "eknath",
      name: "Eknath",
      description: "Major Marathi saint-poet and religious thinker connected with Bhakti literature."
    },
    {
      id: "marathi-modern-literature",
      name: "Modern Marathi Literature",
      description: "Rich modern tradition spanning poetry, novels, theatre, criticism and social writing."
    }
  ],

  knowledgeHeritage: [
    {
      id: "varkari-knowledge",
      name: "Varkari Knowledge Tradition",
      description: "Living devotional knowledge transmitted through pilgrimage, Abhang singing, saint literature and community practice."
    },
    {
      id: "maratha-fort-engineering",
      name: "Maratha Fort Engineering",
      description: "Knowledge of hill, sea and plateau fortification adapted to Maharashtra's varied terrain."
    },
    {
      id: "warli-oral-knowledge",
      name: "Warli Oral Knowledge",
      description: "Community memory and ecological knowledge expressed through ritual, oral narratives and visual symbols."
    },
    {
      id: "paithani-weaving-knowledge",
      name: "Paithani Weaving Knowledge",
      description: "Intergenerational expertise in silk preparation, weaving, zari work and motif construction."
    }
  ],

  sources: [
    {
      title: "Maharashtra Tourism – Government of Maharashtra",
      url: "https://maharashtratourism.gov.in/"
    },
    {
      title: "UNESCO – Maratha Military Landscapes of India",
      url: "https://whc.unesco.org/en/list/1739"
    },
    {
      title: "UNESCO – Victorian Gothic and Art Deco Ensembles of Mumbai",
      url: "https://whc.unesco.org/en/list/1480"
    },
    {
      title: "Maharashtra Tourism – Caves",
      url: "https://maharashtratourism.gov.in/tourist-intrests/caves/"
    },
    {
      title: "Maharashtra Tourism – Museums / Palaces",
      url: "https://maharashtratourism.gov.in/tourist-intrests/museum-palaces/"
    }
  ]
};

export default maharashtra;
