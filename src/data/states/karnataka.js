const karnataka = {
  id: "karnataka",
  name: "Karnataka",
  region: "South India",

  description:
    "Karnataka is a major cultural landscape shaped by ancient and medieval dynasties, Vijayanagara heritage, living temple traditions, Carnatic and Haridasa music, powerful folk theatre, distinctive crafts, textiles and diverse regional cuisines.",

  heritage: [
    {
      id: "hampi",
      name: "Group of Monuments at Hampi",
      location: "Vijayanagara district",
      period: "14th–16th century CE",
      unesco: "World Heritage",
      description:
        "Vast archaeological remains of the Vijayanagara capital spread across a dramatic boulder-strewn landscape.",
      significance:
        "Hampi preserves royal, sacred, urban, hydraulic and defensive systems of the Vijayanagara Empire."
    },
    {
      id: "pattadakal",
      name: "Group of Monuments at Pattadakal",
      location: "Bagalkot",
      period: "7th–8th century CE",
      unesco: "World Heritage",
      description:
        "Temple complex demonstrating a synthesis of northern and southern Indian architectural traditions.",
      significance:
        "Represents the high point of Chalukyan temple architecture."
    },
    {
      id: "belur-channakeshava",
      name: "Channakeshava Temple, Belur",
      location: "Hassan",
      period: "12th century CE",
      unesco: "World Heritage",
      description:
        "Monumental Hoysala temple celebrated for detailed sculpture and architectural refinement.",
      significance:
        "One of the three component monuments of the Sacred Ensembles of the Hoysalas."
    },
    {
      id: "halebidu-hoysalesvara",
      name: "Hoysalesvara Temple, Halebidu",
      location: "Hassan",
      period: "12th century CE",
      unesco: "World Heritage",
      description:
        "Highly sculpted Hoysala temple complex with extensive narrative stone carving.",
      significance:
        "One of the three component monuments of the Sacred Ensembles of the Hoysalas."
    },
    {
      id: "somanathapura-keshava",
      name: "Keshava Temple, Somanathapura",
      location: "Mysuru district",
      period: "13th century CE",
      unesco: "World Heritage",
      description:
        "Star-shaped Hoysala temple known for its elaborate sculptural decoration.",
      significance:
        "Third component of the Sacred Ensembles of the Hoysalas."
    },
    {
      id: "mysore-palace",
      name: "Mysuru Palace",
      location: "Mysuru",
      period: "19th–20th century",
      unesco: null,
      description:
        "Grand palace associated with the Wadiyar dynasty and the cultural life of Mysuru.",
      significance:
        "A major symbol of royal, artistic and festival traditions in Karnataka."
    },
    {
      id: "gol-gumbaz",
      name: "Gol Gumbaz",
      location: "Vijayapura",
      period: "17th century",
      unesco: null,
      description:
        "Monumental mausoleum of Muhammad Adil Shah under the Adil Shahi dynasty.",
      significance:
        "Famous for its enormous dome and distinctive Deccan architectural engineering."
    },
    {
      id: "badami-caves",
      name: "Badami Cave Temples",
      location: "Bagalkot",
      period: "6th–8th century CE",
      unesco: null,
      description:
        "Rock-cut cave temples associated with the Early Chalukyas.",
      significance:
        "Important evidence of early Deccan religious architecture and sculpture."
    },
    {
      id: "a-h-le",
      name: "Aihole",
      location: "Bagalkot",
      period: "Ancient–medieval",
      unesco: null,
      description:
        "Historic temple landscape containing numerous experimental forms of early Indian temple architecture.",
      significance:
        "Often described as an important laboratory of early Chalukyan architecture."
    },
    {
      id: "shravanabelagola",
      name: "Shravanabelagola",
      location: "Hassan",
      period: "Ancient–medieval",
      unesco: null,
      description:
        "Major Jain pilgrimage centre dominated by the monumental statue of Bahubali.",
      significance:
        "One of the most important Jain sacred landscapes in southern India."
    },
    {
      id: "bidar-fort",
      name: "Bidar Fort",
      location: "Bidar",
      period: "Medieval",
      unesco: null,
      description:
        "Large fortified complex reflecting Bahmani and later Deccan Sultanate history.",
      significance:
        "Important example of medieval military architecture in northern Karnataka."
    },
    {
      id: "tipu-summer-palace",
      name: "Tipu Sultan's Summer Palace",
      location: "Bengaluru",
      period: "18th century",
      unesco: null,
      description:
        "Wooden palace associated with the late Mysore state and Tipu Sultan.",
      significance:
        "Represents Indo-Islamic court architecture and Mysore's political history."
    },
    {
      id: "srirangapatna",
      name: "Srirangapatna Heritage Landscape",
      location: "Mandya",
      period: "Medieval–18th century",
      unesco: null,
      description:
        "Historic island town associated with the Wadiyars, Hyder Ali and Tipu Sultan.",
      significance:
        "A major landscape of Mysore political, military and religious history."
    },
    {
      id: "chitradurga-fort",
      name: "Chitradurga Fort",
      location: "Chitradurga",
      period: "Medieval–early modern",
      unesco: null,
      description:
        "Massive hill fortification spread across rocky hills.",
      significance:
        "Known for layered defensive walls, gateways and the historical memory of Nayaka rule."
    }
  ],

  festivals: [
    {
      id: "mysuru-dasara",
      name: "Mysuru Dasara",
      type: "Festival",
      region: "Mysuru",
      description:
        "Grand Dasara celebration known for royal processions, music, illumination and cultural performances."
    },
    {
      id: "ugadi-karnataka",
      name: "Ugadi",
      type: "New Year Festival",
      region: "Across Karnataka",
      description:
        "Kannada New Year festival marked by rituals, festive foods and the symbolic neem-jaggery mixture."
    },
    {
      id: "hampi-utsav",
      name: "Hampi Utsav",
      type: "Cultural Festival",
      region: "Hampi",
      description:
        "Festival celebrating Vijayanagara heritage through music, dance, processions and cultural programmes."
    },
    {
      id: "pattadakal-dance-festival",
      name: "Pattadakal Dance Festival",
      type: "Cultural Festival",
      region: "Pattadakal",
      description:
        "Performing arts festival staged in the historic temple landscape of Pattadakal."
    },
    {
      id: "mahamastakabhisheka",
      name: "Mahamastakabhisheka",
      type: "Jain Festival",
      region: "Shravanabelagola",
      description:
        "Major Jain ceremonial observance centred on the monumental Bahubali statue."
    },
    {
      id: "bengaluru-karaga",
      name: "Bengaluru Karaga",
      type: "Ritual Festival",
      region: "Bengaluru",
      description:
        "Historic ritual procession associated with Draupadi worship and the city's traditional religious culture."
    },
    {
      id: "vairamudi",
      name: "Vairamudi Festival",
      type: "Temple Festival",
      region: "Melukote",
      description:
        "Major annual temple celebration associated with the Cheluvanarayana Swamy tradition."
    },
    {
      id: "kambala",
      name: "Kambala",
      type: "Traditional Sport Festival",
      region: "Coastal Karnataka",
      description:
        "Traditional buffalo race deeply connected with agrarian culture and coastal communities."
    },
    {
      id: "nagamandala",
      name: "Nagamandala",
      type: "Ritual Tradition",
      region: "Coastal Karnataka",
      description:
        "Ritual performance and worship tradition dedicated to serpent deities."
    },
    {
      id: "gowri-habba",
      name: "Gowri Habba",
      type: "Festival",
      region: "Across Karnataka",
      description:
        "Women's festival involving worship of Goddess Gowri and household rituals."
    },
    {
      id: "gombe-habba",
      name: "Gombe Habba",
      type: "Festival Tradition",
      region: "Karnataka",
      description:
        "Decorative doll-display tradition associated with Navaratri festivities."
    },
    {
      id: "kailpodh",
      name: "Kailpodh",
      type: "Kodava Festival",
      region: "Kodagu",
      description:
        "Traditional Kodava festival associated with arms, agricultural cycles and community identity."
    },
    {
      id: "kaveri-sankramana",
      name: "Kaveri Sankramana",
      type: "Festival",
      region: "Kodagu",
      description:
        "Festival connected with the sacred river Kaveri and local Kodagu traditions."
    },
    {
      id: "puthari",
      name: "Puthari",
      type: "Harvest Festival",
      region: "Kodagu",
      description:
        "Kodava harvest festival marking the first cutting of the new rice crop."
    }
  ],

  traditions: [
    {
      id: "yakshagana",
      name: "Yakshagana",
      category: "Dance-Drama",
      description:
        "Elaborate coastal performance tradition combining dance, music, song, dialogue, dramatic storytelling and distinctive costumes."
    },
    {
      id: "dollu-kunitha",
      name: "Dollu Kunitha",
      category: "Folk Dance",
      description:
        "Energetic group drum dance associated strongly with the Kuruba community."
    },
    {
      id: "bhoota-kola",
      name: "Bhoota Kola",
      category: "Ritual Performance",
      description:
        "Spirit-worship ritual performance of coastal Karnataka involving dance, music, costume and possession traditions."
    },
    {
      id: "kamsale",
      name: "Kamsale",
      category: "Folk Dance",
      description:
        "Devotional group performance involving rhythmic metal cymbals and coordinated movement."
    },
    {
      id: "veeragase",
      name: "Veeragase",
      category: "Folk Dance",
      description:
        "Energetic Shaiva devotional dance traditionally performed during festivals and processions."
    },
    {
      id: "kolata",
      name: "Kolata",
      category: "Folk Dance",
      description:
        "Group stick dance tradition performed during community and festival occasions."
    },
    {
      id: "kodava-dances",
      name: "Kodava Dance Traditions",
      category: "Community Dance",
      description:
        "Distinctive dances connected with Kodava festivals, weddings, harvests and community ceremonies."
    },
    {
      id: "gombe-aata",
      name: "Gombe Aata",
      category: "Puppetry",
      description:
        "Traditional puppet theatre using large painted puppets to present stories and performances."
    },
    {
      id: "huli-vesha",
      name: "Huli Vesha",
      category: "Folk Performance",
      description:
        "Tiger-costume street performance especially associated with coastal Karnataka festivities."
    }
  ],

  music: [
    {
      id: "carnatic-music",
      name: "Carnatic Music",
      category: "Classical",
      description:
        "South Indian classical music tradition with deep performance, composition and devotional roots in Karnataka."
    },
    {
      id: "haridasa-music",
      name: "Haridasa Music",
      category: "Devotional",
      description:
        "Devotional music tradition associated with the Haridasa saints and Kannada Bhakti literature."
    },
    {
      id: "vachana-singing",
      name: "Vachana Singing",
      category: "Devotional Literature",
      description:
        "Musical and recitation traditions surrounding the Vachana literature of the Lingayat movement."
    },
    {
      id: "gamaka",
      name: "Gamaka",
      category: "Narrative Music",
      description:
        "Karnataka tradition combining musical rendering with explanatory narration of literary works."
    },
    {
      id: "yakshagana-music",
      name: "Yakshagana Music",
      category: "Theatre Music",
      description:
        "Percussive and vocal musical system supporting Yakshagana storytelling and dance-drama."
    }
  ],

  instruments: [
    {
      id: "mridangam",
      name: "Mridangam",
      category: "Percussion",
      description:
        "Principal percussion instrument of Carnatic classical music."
    },
    {
      id: "chande",
      name: "Chande",
      category: "Percussion",
      description:
        "Powerful cylindrical drum central to Yakshagana and related coastal performance traditions."
    },
    {
      id: "maddale",
      name: "Maddale",
      category: "Percussion",
      description:
        "Double-headed drum used as a primary rhythmic instrument in Yakshagana."
    },
    {
      id: "veena",
      name: "Veena",
      category: "String",
      description:
        "Plucked classical string instrument central to South Indian musical traditions."
    },
    {
      id: "flute-karnataka",
      name: "Bansuri / Flute",
      category: "Wind",
      description:
        "Bamboo flute used in folk and classical musical settings."
    }
  ],

  arts: [
    {
      id: "mysore-painting",
      name: "Mysore Painting",
      category: "Painting",
      description:
        "Classical South Indian painting tradition known for fine linework, devotional themes, gold foil and jewel-like detailing."
    },
    {
      id: "kasuti",
      name: "Kasuti Embroidery",
      category: "Textile Art",
      description:
        "Traditional Karnataka embroidery known for geometric and figurative stitched motifs."
    },
    {
      id: "lambani-embroidery",
      name: "Lambani Embroidery",
      category: "Textile Art",
      description:
        "Colourful community textile tradition featuring mirrors, applique and decorative stitching."
    },
    {
      id: "kinhal-art",
      name: "Kinhal Craft",
      category: "Wood / Decorative Art",
      description:
        "Traditional painted wood craft from Koppal region known for figurines, toys and religious forms."
    },
    {
      id: "rosewood-carving",
      name: "Sandalwood and Rosewood Carving",
      category: "Wood Art",
      description:
        "Fine carving tradition associated with Karnataka's furniture, decorative and sculptural heritage."
    }
  ],

  crafts: [
    {
      id: "channapatna-toys",
      name: "Channapatna Toys",
      category: "Wood Craft",
      description:
        "Lacquered wooden toys and objects produced using traditional turning and colouring techniques."
    },
    {
      id: "bidriware",
      name: "Bidriware",
      category: "Metal Craft",
      description:
        "Distinctive inlay craft associated with Bidar, using metal surfaces decorated with contrasting inlay."
    },
    {
      id: "sandalwood-carving",
      name: "Sandalwood Carving",
      category: "Wood Craft",
      description:
        "Fine traditional carving using sandalwood for decorative and religious objects."
    },
    {
      id: "rosewood-inlay",
      name: "Rosewood Inlay",
      category: "Wood Craft",
      description:
        "Decorative inlay tradition producing richly patterned furniture and artistic objects."
    },
    {
      id: "kinhal-toys",
      name: "Kinhal Wooden Craft",
      category: "Wood Craft",
      description:
        "Painted and sculpted traditional wooden objects from the Kinhal craft tradition."
    },
    {
      id: "kasuti-craft",
      name: "Kasuti",
      category: "Embroidery",
      description:
        "Hand embroidery tradition using counted stitches to create intricate regional patterns."
    }
  ],

  textiles: [
    {
      id: "mysore-silk",
      name: "Mysore Silk",
      category: "Silk Textile",
      description:
        "Refined silk weaving tradition associated with Mysuru and known for its smooth fabric and zari work."
    },
    {
      id: "ilkal-saree",
      name: "Ilkal Saree",
      category: "Handloom",
      description:
        "Traditional handloom sari recognised for its distinctive pallu and regional weaving technique."
    },
    {
      id: "molakalmuru",
      name: "Molakalmuru Sarees",
      category: "Handloom",
      description:
        "Traditional silk textile associated with Molakalmuru and known for patterned designs."
    },
    {
      id: "udupi-saree",
      name: "Udupi Handloom",
      category: "Handloom",
      description:
        "Regional cotton handloom tradition from coastal Karnataka."
    },
    {
      id: "lambani-textiles",
      name: "Lambani Textiles",
      category: "Community Textile",
      description:
        "Vibrant embroidered textiles featuring mirrors, applique and colourful motifs."
    }
  ],

  cuisine: [
    {
      id: "mysore-masala-dosa",
      name: "Mysore Masala Dosa",
      type: "Breakfast",
      description:
        "Crisp fermented dosa associated with Mysuru and served with spicy chutney and potato filling."
    },
    {
      id: "mysore-pak",
      name: "Mysore Pak",
      type: "Sweet",
      description:
        "Rich sweet made primarily from gram flour, ghee and sugar."
    },
    {
      id: "ragi-mudde",
      name: "Ragi Mudde",
      type: "Staple Dish",
      description:
        "Traditional finger-millet staple commonly served with gravies and sambar."
    },
    {
      id: "udupi-cuisine",
      name: "Udupi Cuisine",
      type: "Regional Cuisine",
      description:
        "Vegetarian coastal cuisine known for dishes including dosa, idli, sambar and temple-influenced food traditions."
    },
    {
      id: "neer-dosa",
      name: "Neer Dosa",
      type: "Coastal Dish",
      description:
        "Thin rice crepe associated with coastal Karnataka."
    },
    {
      id: "kori-gassi",
      name: "Kori Gassi",
      type: "Coastal Dish",
      description:
        "Traditional Mangalorean chicken curry prepared with coconut and spices."
    },
    {
      id: "pandi-curry",
      name: "Pandi Curry",
      type: "Kodava Cuisine",
      description:
        "Signature Kodava pork curry featuring distinctive sour and spicy flavours."
    },
    {
      id: "kadambuttu",
      name: "Kadambuttu",
      type: "Kodava Cuisine",
      description:
        "Steamed rice dumplings commonly served with Kodava meat dishes."
    },
    {
      id: "jolada-rotti",
      name: "Jolada Rotti",
      type: "North Karnataka Dish",
      description:
        "Traditional sorghum flatbread commonly served with regional vegetable and lentil dishes."
    },
    {
      id: "ennegayi",
      name: "Ennegayi",
      type: "Regional Dish",
      description:
        "Stuffed brinjal preparation characteristic of North Karnataka cuisine."
    },
    {
      id: "dharwad-peda",
      name: "Dharwad Peda",
      type: "Sweet",
      description:
        "Famous milk-based sweet associated with Dharwad."
    }
  ],

  communities: [
    {
      id: "kodava",
      name: "Kodava",
      region: "Kodagu",
      description:
        "Community with distinctive language, martial traditions, dress, cuisine, festivals and ceremonies."
    },
    {
      id: "tulu",
      name: "Tulu Communities",
      region: "Coastal Karnataka",
      description:
        "Communities sustaining Tulu language, ritual performance, coastal cuisine and folk traditions."
    },
    {
      id: "kuruba",
      name: "Kuruba",
      region: "Central and northern Karnataka",
      description:
        "Community strongly associated with pastoral traditions and performances such as Dollu Kunitha."
    },
    {
      id: "lambani",
      name: "Lambani",
      region: "North Karnataka",
      description:
        "Community known for distinctive dress, embroidery, oral traditions and craft practices."
    },
    {
      id: "konkani",
      name: "Konkani Communities",
      region: "Coastal Karnataka",
      description:
        "Linguistically and culturally diverse coastal communities with rich food and religious traditions."
    },
    {
      id: "beary",
      name: "Beary",
      region: "Dakshina Kannada and Udupi",
      description:
        "Coastal Muslim community with distinctive language, food, music and cultural traditions."
    }
  ],

  culturalPlaces: [
    {
      id: "mysuru",
      name: "Mysuru",
      type: "Cultural City",
      description:
        "Royal city known for the Wadiyar legacy, Dasara, palace architecture, music and visual arts."
    },
    {
      id: "hampi-cultural-landscape",
      name: "Hampi",
      type: "Heritage Landscape",
      description:
        "Vijayanagara cultural landscape of temples, bazaars, royal complexes and hydraulic systems."
    },
    {
      id: "udupi",
      name: "Udupi",
      type: "Pilgrimage & Food Culture",
      description:
        "Important temple town and centre of coastal Karnataka's religious and culinary traditions."
    },
    {
      id: "coastal-karnataka",
      name: "Coastal Karnataka",
      type: "Cultural Region",
      description:
        "Region shaped by Yakshagana, Bhoota Kola, Tulu culture, maritime traditions and coastal cuisines."
    },
    {
      id: "kodagu",
      name: "Kodagu",
      type: "Cultural Region",
      description:
        "Homeland of Kodava traditions, coffee culture, forest landscapes and distinctive festivals."
    }
  ],

  institutions: [
    {
      id: "janapada-loka",
      name: "Janapada Loka",
      city: "Ramanagara",
      type: "Folk Culture Centre",
      description:
        "Important centre documenting Karnataka's folk traditions, crafts and performance heritage."
    },
    {
      id: "cava",
      name: "Chitrakala Parishath / Karnataka Chitrakala Parishath",
      city: "Bengaluru",
      type: "Art Institution",
      description:
        "Major institution supporting visual arts, exhibitions and art education in Karnataka."
    },
    {
      id: "karnataka-state-museum",
      name: "Government Museum Bengaluru",
      city: "Bengaluru",
      type: "Museum",
      description:
        "Historic museum holding archaeological, sculptural and cultural collections."
    },
    {
      id: "mysuru-palace-museum",
      name: "Mysuru Palace Museum",
      city: "Mysuru",
      type: "Museum",
      description:
        "Royal museum preserving objects, interiors and material culture associated with the Wadiyar dynasty."
    }
  ],

  languages: [
    "Kannada",
    "Tulu",
    "Kodava",
    "Konkani",
    "Beary",
    "Lambani",
    "Urdu",
    "Sanskrit"
  ],

  literature: [
    {
      id: "vachana-literature",
      name: "Vachana Literature",
      description:
        "Powerful devotional and philosophical literary tradition associated with the Lingayat movement."
    },
    {
      id: "basavanna",
      name: "Basavanna",
      description:
        "Major 12th-century thinker and Vachana poet associated with the Bhakti and social reform tradition."
    },
    {
      id: "akka-mahadevi",
      name: "Akka Mahadevi",
      description:
        "Influential woman saint-poet whose Vachanas are central to Kannada devotional literature."
    },
    {
      id: "allama-prabhu",
      name: "Allama Prabhu",
      description:
        "Major Vachana poet and mystic of the 12th century."
    },
    {
      id: "pampa-ranna",
      name: "Pampa and Ranna",
      description:
        "Foundational figures of classical Kannada literature and the early medieval literary tradition."
    },
    {
      id: "haridasa-literature",
      name: "Haridasa Literature",
      description:
        "Devotional Kannada compositions associated with saints including Purandara Dasa and Kanaka Dasa."
    }
  ],

  knowledgeHeritage: [
    {
      id: "vijayanagara-hydraulic",
      name: "Vijayanagara Water and Urban Engineering",
      description:
        "Sophisticated systems of tanks, channels, aqueducts and water management integrated with Hampi's urban landscape."
    },
    {
      id: "hoysala-stone-carving",
      name: "Hoysala Stone-Carving Knowledge",
      description:
        "Highly refined architectural carving tradition expressed across Belur, Halebidu and Somanathapura."
    },
    {
      id: "yakshagana-oral-knowledge",
      name: "Yakshagana Performance Knowledge",
      description:
        "Intergenerational knowledge of music, dialogue, costume, movement and narrative performance."
    },
    {
      id: "haridasa-musical-knowledge",
      name: "Haridasa Musical Knowledge",
      description:
        "Devotional composition and musical transmission associated with Karnataka's Bhakti traditions."
    },
    {
      id: "channapatna-craft-knowledge",
      name: "Channapatna Craft Knowledge",
      description:
        "Traditional wood-turning, lacquering and colouring techniques passed through artisan communities."
    }
  ],

  sources: [
    {
      title: "UNESCO – Group of Monuments at Hampi",
      url: "https://whc.unesco.org/en/list/241"
    },
    {
      title: "UNESCO – Group of Monuments at Pattadakal",
      url: "https://whc.unesco.org/en/list/239"
    },
    {
      title: "UNESCO – Sacred Ensembles of the Hoysalas",
      url: "https://whc.unesco.org/en/list/1670"
    },
    {
      title: "Karnataka Tourism",
      url: "https://karnatakatourism.org/"
    },
    {
      title: "Karnataka Tourism – Yakshagana",
      url: "https://karnatakatourism.org/en/experiences/yakshagana"
    }
  ]
};

export default karnataka;
