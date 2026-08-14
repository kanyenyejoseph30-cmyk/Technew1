import { Product, Order, StoreSettings, DeliveryDriver } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  merchantPhone: '0991018186',
  merchantName: 'Blanche Élégance SARL',
  currency: 'USD',
  exchangeRateCDF: 2850,
  exchangeRateEUR: 0.92,
  freeShippingThreshold: 200,
  standardShippingFee: 10,
  expressShippingFee: 20,
  storeAddress: '34 Avenue de la Paix, Quartier Gombe',
  storeCity: 'Kinshasa, RDC',
  supportPhone: '+243 99 101 8186',
  supportEmail: 'contact@blanche-elegance.com',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Robe Fourreau en Soie Ivoire & Or',
    category: 'Robes & Soirée',
    price: 185,
    originalPrice: 220,
    description: 'Une pièce maîtresse de la maison Blanche Élégance. Confectionnée en pure crêpe de soie italienne ivoire avec finitions liserées de fils d’or 24 carats. Coupe près du corps sublimant la silhouette.',
    details: [
      '100% Soie de mûrier naturelle',
      'Doublure en satin de soie respirant',
      'Fermeture éclair invisible au dos',
      'Nettoyage à sec spécialisé uniquement',
      'Fabriqué artisanalement en atelier de haute couture'
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc Pur / Ivoire', hex: '#FDFBF7' },
      { name: 'Doré Champagne', hex: '#E5C483' },
      { name: 'Noir Impérial', hex: '#1A1A1A' }
    ],
    stockPerSize: {
      'XS': 3,
      'S': 5,
      'M': 8,
      'L': 4,
      'XL': 2
    },
    totalStock: 22,
    isFeatured: true,
    isNew: true,
    material: 'Pure Soie & Satin',
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-2',
    name: 'Tailleur Pantalon Royal Blanc Nacre',
    category: 'Tailleurs & Ensembles',
    price: 240,
    originalPrice: 280,
    description: 'L’élégance intemporelle pour la femme d’influence. Veste cintrée avec revers satiné et pantalon palazzo taille haute à pinces parfaites.',
    details: [
      'Mélange Laine vierge et Cachemire léger',
      'Boutons dorés gravés de l’emblème Blanche Élégance',
      'Poches intérieures doublées',
      'Longueur pantalon ajustable sur demande'
    ],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc Nacre', hex: '#F4F1EA' },
      { name: 'Crème Vanille', hex: '#EFE6DD' },
      { name: 'Bleu Minuit', hex: '#0F1E36' }
    ],
    stockPerSize: {
      'S': 4,
      'M': 6,
      'L': 3,
      'XL': 1
    },
    totalStock: 14,
    isFeatured: true,
    isNew: true,
    material: 'Laine Vierge & Cachemire',
    rating: 5.0,
    reviewCount: 28,
    createdAt: '2026-08-03'
  },
  {
    id: 'prod-3',
    name: 'Chemisier en Mousseline de Soie avec Lavallière',
    category: 'Chemisiers & Soie',
    price: 115,
    originalPrice: 135,
    description: 'Fluide, aérien et d’un chic absolu. Le col lavallière se noue en boucle romantique ou se laisse tomber librement avec panache.',
    details: [
      'Mousseline de soie 100% vaporeuse',
      'Poignets mousquetaires à boutons de nacre véritable',
      'Semi-transparent avec caraco soyeux inclus'
    ],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanc Neige', hex: '#FFFFFF' },
      { name: 'Rose Poudré', hex: '#F3DCD4' },
      { name: 'Sable Doré', hex: '#D2B48C' }
    ],
    stockPerSize: {
      'XS': 6,
      'S': 9,
      'M': 7,
      'L': 2
    },
    totalStock: 24,
    isFeatured: false,
    isNew: true,
    material: 'Mousseline de Soie',
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2026-08-05'
  },
  {
    id: 'prod-4',
    name: 'Manteau Long en Cachemire Blanc d’Hiver',
    category: 'Manteaux & Vestes',
    price: 320,
    originalPrice: 380,
    description: 'Une somptuosité thermique et stylistique. Col châle généreux, ceinture à nouer sous passants discrets et tombé sculptural.',
    details: [
      '80% Cachemire Mongolie, 20% Soie',
      'Coupe peignoir ultra-confortable',
      'Poches passepoilées généreuses'
    ],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blanc Hiver', hex: '#F7F7F7' },
      { name: 'Camel Doux', hex: '#C19A6B' }
    ],
    stockPerSize: {
      'S': 2,
      'M': 4,
      'L': 1
    },
    totalStock: 7,
    isFeatured: true,
    isNew: false,
    material: 'Cachemire & Soie',
    rating: 4.9,
    reviewCount: 35,
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-5',
    name: 'Robe de Bal Sculpturale Sirène Broderie Perles',
    category: 'Robes & Soirée',
    price: 390,
    originalPrice: 450,
    description: 'Robe d’apparat magistrale pour les grands galas. Bustier baleiné brodé à la main de perles de verre nacrées, traîne fluide.',
    details: [
      'Bustier sculpté avec maintien optimal',
      'Broderies de perles fines et cristaux',
      'Traîne amovible discrète de 50 cm'
    ],
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivoire & Or Rose', hex: '#FFF5EE' },
      { name: 'Argent Lunaire', hex: '#E0E5E5' }
    ],
    stockPerSize: {
      'XS': 1,
      'S': 2,
      'M': 3,
      'L': 1
    },
    totalStock: 7,
    isFeatured: true,
    isNew: true,
    material: 'Dentelle de Calais & Satin Duchesse',
    rating: 5.0,
    reviewCount: 16,
    createdAt: '2026-08-08'
  },
  {
    id: 'prod-6',
    name: 'Sac à Main Cuir Grainé "Le Blanche Élégance"',
    category: 'Chaussures & Maroquinerie',
    price: 195,
    originalPrice: 230,
    description: 'Le sac iconique au fermoir monogrammé doré. Cuir de veau pleine fleur grainé avec bandoulière amovible en chaîne bijou.',
    details: [
      'Cuir de veau d’Italie pleine fleur',
      'Finitions métalliques dorées galvanisées',
      'Compartiment zippé et porte-cartes intégrés',
      'Dimensions: 26 x 18 x 9 cm'
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Unique'],
    colors: [
      { name: 'Blanc Craie', hex: '#FAF9F6' },
      { name: 'Noir Intense', hex: '#111111' },
      { name: 'Cognac Doré', hex: '#9E5B32' }
    ],
    stockPerSize: {
      'Unique': 9
    },
    totalStock: 9,
    isFeatured: false,
    isNew: false,
    material: 'Cuir Pleine Fleur',
    rating: 4.9,
    reviewCount: 51,
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-7',
    name: 'Escarpins en Cuir Verni Blanc & Talon Bijou',
    category: 'Chaussures & Maroquinerie',
    price: 160,
    originalPrice: 190,
    description: 'Une cambrure parfaite avec un talon géométrique rehaussé d’un cerclage doré. Confort d’assise grâce à la semelle en mousse mémoire.',
    details: [
      'Hauteur de talon: 8.5 cm',
      'Tige en cuir verni miroir souple',
      'Semelle intérieure en cuir d’agneau matelassé'
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Blanc Verni', hex: '#FFFFFF' },
      { name: 'Nude Doré', hex: '#E3C6B6' }
    ],
    stockPerSize: {
      '36': 2,
      '37': 4,
      '38': 6,
      '39': 5,
      '40': 3,
      '41': 1
    },
    totalStock: 21,
    isFeatured: false,
    isNew: true,
    material: 'Cuir Verni & Métal Doré',
    rating: 4.7,
    reviewCount: 22,
    createdAt: '2026-08-04'
  },
  {
    id: 'prod-8',
    name: 'Parure Ceinture & Bijou de Taille Chaîne d’Or',
    category: 'Accessoires de Luxe',
    price: 75,
    originalPrice: 95,
    description: 'Pour ceinturer vos robes blanches ou tailleurs d’une touche éclatante. Maillons raffinés ajustables et pendentif médaillon.',
    details: [
      'Laiton plaqué or 18k anti-oxydation',
      'Longueur réglable de 65 à 105 cm',
      'Livré dans son écrin velours blanc'
    ],
    images: [
      'https://images.unsplash.com/photo-1611591477281-4de04f18a48b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Taille Unique Réglable'],
    colors: [
      { name: 'Or Jaune 18K', hex: '#D4AF37' },
      { name: 'Or Blanc / Platine', hex: '#E5E4E2' }
    ],
    stockPerSize: {
      'Taille Unique Réglable': 15
    },
    totalStock: 15,
    isFeatured: false,
    isNew: false,
    material: 'Plaqué Or 18K',
    rating: 4.8,
    reviewCount: 37,
    createdAt: '2026-07-15'
  }
];

export const INITIAL_DRIVERS: DeliveryDriver[] = [
  {
    id: 'drv-1',
    name: 'Junior Kalala',
    phone: '0812345678',
    pinCode: '7788',
    vehicle: 'Scooter Express Yamaha NMAX',
    zone: 'Gombe - Lingwala - Barumbu',
    activeOrdersCount: 2,
    rating: 4.95,
    status: 'active',
    createdAt: '2026-08-01'
  },
  {
    id: 'drv-2',
    name: 'Christian Mwamba',
    phone: '0978765432',
    pinCode: '4420',
    vehicle: 'Fourgonnette Blanche Élégance VIP',
    zone: 'Ngaliema - Mont Fleury - Kintambo',
    activeOrdersCount: 1,
    rating: 4.90,
    status: 'active',
    createdAt: '2026-08-03'
  },
  {
    id: 'drv-3',
    name: 'Patrick Ilunga',
    phone: '0895554321',
    pinCode: '9910',
    vehicle: 'Moto Express Honda 150',
    zone: 'Limete - Bandalungwa - Lemba',
    activeOrdersCount: 3,
    rating: 4.88,
    status: 'active',
    createdAt: '2026-08-05'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-be-101',
    orderNumber: 'BE-2026-8891',
    createdAt: '2026-08-13T18:20:00Z',
    updatedAt: '2026-08-13T22:45:00Z',
    customer: {
      name: 'Mireille Kankolongo',
      phone: '0812345678',
      email: 'mireille.kanko@gmail.com',
      address: '22 Avenue des Aviateurs, Résidence Horizon Apt 4B',
      city: 'Kinshasa - Gombe',
      notes: 'Sonner à l’interphone Kankolongo ou appeler à l’arrivée'
    },
    items: [
      {
        id: 'prod-1-M-#FDFBF7',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1
      },
      {
        id: 'prod-6-Unique-#FAF9F6',
        product: INITIAL_PRODUCTS[5],
        selectedSize: 'Unique',
        selectedColor: INITIAL_PRODUCTS[5].colors[0],
        quantity: 1
      }
    ],
    subtotal: 380,
    shippingFee: 0,
    discount: 0,
    totalAmount: 380,
    paymentMethod: 'mpesa',
    paymentStatus: 'verified',
    paymentReference: 'MP-89421094-CD',
    deliveryType: 'delivery',
    status: 'in_transit',
    qrCodeString: 'BLANCHE-ELEGANCE-ORDER:BE-2026-8891:PIN:7729',
    securityPin: '7729',
    assignedCourierName: 'Junior Kalala',
    courierPhone: '+243 81 234 5678',
    driverNotes: 'En cours d’acheminement vers Avenue des Aviateurs (ETA: 15 min)',
    trackingSteps: [
      {
        id: 'step-1',
        status: 'pending_payment',
        title: 'Commande Passée',
        description: 'Commande enregistrée sur Blanche Élégance',
        timestamp: '13 Août 2026, 18:20',
        location: 'Kinshasa',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-2',
        status: 'payment_confirmed',
        title: 'Paiement M-Pesa Validé',
        description: 'Transfert de 380 $ confirmé sur le 0991018186 (Réf: MP-89421094-CD)',
        timestamp: '13 Août 2026, 18:24',
        location: 'Système eMoney',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-3',
        status: 'in_preparation',
        title: 'Préparation & Contrôle Qualité',
        description: 'Vêtements délicatement emballés dans le coffret signature Blanche Élégance',
        timestamp: '13 Août 2026, 19:10',
        location: 'Atelier Central Gombe',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-4',
        status: 'in_transit',
        title: 'Colis Pris en Charge par le Livreur',
        description: 'Livreur Express Junior Kalala en route vers votre adresse',
        timestamp: '13 Août 2026, 22:30',
        location: 'En circulation - Boulevard du 30 Juin',
        isCompleted: false,
        isCurrent: true
      },
      {
        id: 'step-5',
        status: 'delivered',
        title: 'Livraison Finale & Remise',
        description: 'Scan du QR Code client et remise en main propre sécurisée',
        timestamp: 'En attente',
        location: 'Destination client',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    id: 'ord-be-102',
    orderNumber: 'BE-2026-8890',
    createdAt: '2026-08-13T14:10:00Z',
    updatedAt: '2026-08-13T16:30:00Z',
    customer: {
      name: 'Grace Mutombo',
      phone: '0995544332',
      email: 'grace.mutombo@yahoo.fr',
      address: 'Boutique Blanche Élégance Gombe (Click & Collect)',
      city: 'Kinshasa',
      notes: 'Retrait en boutique prévu samedi matin'
    },
    items: [
      {
        id: 'prod-2-S-#F4F1EA',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 'S',
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        quantity: 1
      }
    ],
    subtotal: 240,
    shippingFee: 0,
    discount: 0,
    totalAmount: 240,
    paymentMethod: 'orange_money',
    paymentStatus: 'verified',
    paymentReference: 'OM-33290124',
    deliveryType: 'pickup',
    status: 'ready_for_pickup',
    qrCodeString: 'BLANCHE-ELEGANCE-ORDER:BE-2026-8890:PIN:4491',
    securityPin: '4491',
    trackingSteps: [
      {
        id: 'step-1',
        status: 'pending_payment',
        title: 'Commande Passée',
        description: 'Option Retrait en Boutique sélectionnée',
        timestamp: '13 Août 2026, 14:10',
        location: 'Kinshasa',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-2',
        status: 'payment_confirmed',
        title: 'Paiement Orange Money Validé',
        description: 'Paiement de 240 $ validé sur le 0991018186',
        timestamp: '13 Août 2026, 14:15',
        location: 'Orange Money RDC',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-3',
        status: 'ready_for_pickup',
        title: 'Prêt pour Retrait en Boutique',
        description: 'Votre colis vous attend au 34 Avenue de la Paix, Gombe. Présentez votre QR code.',
        timestamp: '13 Août 2026, 16:30',
        location: 'Boutique Blanche Élégance',
        isCompleted: false,
        isCurrent: true
      },
      {
        id: 'step-4',
        status: 'delivered',
        title: 'Retiré par le Client',
        description: 'Scan du QR code en boutique effectué',
        timestamp: 'En attente',
        location: 'Boutique Blanche Élégance',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    id: 'ord-be-103',
    orderNumber: 'BE-2026-8889',
    createdAt: '2026-08-12T11:00:00Z',
    updatedAt: '2026-08-12T15:40:00Z',
    customer: {
      name: 'Nathalie Tshisekedi',
      phone: '0821199223',
      email: 'nathalie.t@gmail.com',
      address: '14 Avenue Colonel Mondjiba, Ngaliema',
      city: 'Kinshasa',
      notes: ''
    },
    items: [
      {
        id: 'prod-4-M-#F7F7F7',
        product: INITIAL_PRODUCTS[3],
        selectedSize: 'M',
        selectedColor: INITIAL_PRODUCTS[3].colors[0],
        quantity: 1
      },
      {
        id: 'prod-8-Taille Unique Réglable-#D4AF37',
        product: INITIAL_PRODUCTS[7],
        selectedSize: 'Taille Unique Réglable',
        selectedColor: INITIAL_PRODUCTS[7].colors[0],
        quantity: 1
      }
    ],
    subtotal: 395,
    shippingFee: 0,
    discount: 20,
    totalAmount: 375,
    paymentMethod: 'airtel_money',
    paymentStatus: 'verified',
    paymentReference: 'AIR-99217843',
    deliveryType: 'delivery',
    status: 'delivered',
    qrCodeString: 'BLANCHE-ELEGANCE-ORDER:BE-2026-8889:PIN:1834',
    securityPin: '1834',
    assignedCourierName: 'Christian Mwamba',
    deliveredAt: '12 Août 2026, 15:40',
    deliverySignature: 'N. Tshisekedi',
    trackingSteps: [
      {
        id: 'step-1',
        status: 'pending_payment',
        title: 'Commande Passée',
        description: 'Commande enregistrée',
        timestamp: '12 Août 2026, 11:00',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-2',
        status: 'payment_confirmed',
        title: 'Paiement Airtel Money Validé',
        description: 'Montant de 375 $ reçu sur le 0991018186',
        timestamp: '12 Août 2026, 11:05',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-3',
        status: 'in_transit',
        title: 'En Cours de Livraison',
        description: 'Colis acheminé par Christian Mwamba',
        timestamp: '12 Août 2026, 14:10',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'step-4',
        status: 'delivered',
        title: 'Colis Livré & Scanné avec Succès',
        description: 'QR Code validé et colis remis en mains propres.',
        timestamp: '12 Août 2026, 15:40',
        isCompleted: true,
        isCurrent: false
      }
    ]
  }
];
