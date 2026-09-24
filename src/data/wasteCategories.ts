import { CategoryInfo, WasteCategory, ModelMetrics } from '../types/waste';

export const WASTE_CATEGORIES: Record<WasteCategory, CategoryInfo> = {
  'Plastic': {
    id: 'Plastic',
    name: 'Plastic',
    shortDesc: 'Synthetic polymers including PET, HDPE, and PP containers commonly used for packaging and bottles.',
    recyclableStatus: 'Recyclable',
    disposalMethod: 'Rinse thoroughly, flatten to conserve volume, and deposit into the designated plastic recycling bin.',
    preparationSteps: [
      'Empty any residual liquid or food scraps',
      'Rinse lightly with cold water to avoid contamination',
      'Remove non-plastic tamper seals or shrink wraps if easily detachable',
      'Replace plastic caps back onto bottles before crushing'
    ],
    environmentalImpact: 'Plastics take 400–1000 years to decompose in landfills, releasing microplastics into soil and waterways.',
    exampleItems: ['Beverage bottles (PET)', 'Milk jugs (HDPE)', 'Yogurt cups (PP)', 'Detergent containers', 'Shampoo bottles'],
    binColorAdvice: 'Blue or Yellow dry recyclables bin (check municipality standards)',
    decompositionTime: '450–1,000 years',
    carbonFootprintNote: 'Recycling 1 ton of plastic saves approximately 5,774 kWh of electricity and 16.3 barrels of oil.'
  },
  'Paper': {
    id: 'Paper',
    name: 'Paper',
    shortDesc: 'Cellulose fiber products including office printing paper, newspapers, magazines, and mail.',
    recyclableStatus: 'Recyclable',
    disposalMethod: 'Keep clean, dry, and flat. Place in paper/fiber recycling stream. Do not recycle if soaked in grease or food.',
    preparationSteps: [
      'Ensure the paper is completely dry and free from oil, food, or grease',
      'Remove plastic window film from envelopes if practical',
      'Separate metal binder clips or spiral rings',
      'Keep flat or folded neatly without crumpling into tight balls'
    ],
    environmentalImpact: 'Paper recycling preserves mature forestry, consumes 40% less energy, and reduces industrial water usage.',
    exampleItems: ['Office printer paper', 'Newspapers & gazettes', 'Magazines & flyers', 'Envelopes', 'Notebook pages'],
    binColorAdvice: 'Blue or green paper bin',
    decompositionTime: '2–6 weeks',
    carbonFootprintNote: 'Recycling 1 ton of paper spares 17 mature trees and prevents 2.5 metric tons of CO2 emissions.'
  },
  'Cardboard': {
    id: 'Cardboard',
    name: 'Cardboard',
    shortDesc: 'Corrugated boxes, shipping cartons, and paperboard packaging like cereal boxes and toilet paper rolls.',
    recyclableStatus: 'Recyclable',
    disposalMethod: 'Flatten corrugated boxes to save storage space and prevent container jamming. Keep dry.',
    preparationSteps: [
      'Break down and flatten boxes completely',
      'Remove packing tape, styrofoam inserts, and bubble wrap',
      'Discard parts contaminated with pizza grease or liquid oils',
      'Stack neatly inside recycling bins'
    ],
    environmentalImpact: 'Corrugated fibers have long strong cellulose bonds that can be re-pulped up to 5–7 times into new boxes.',
    exampleItems: ['Delivery shipping cartons', 'Cereal & food paperboard boxes', 'Shoeboxes', 'Paper towel rolls', 'Egg cartons'],
    binColorAdvice: 'Paper & cardboard blue stream',
    decompositionTime: '2–3 months',
    carbonFootprintNote: 'Produces 50% fewer emissions during reprocessing compared to manufacturing virgin cardboard from timber.'
  },
  'Glass': {
    id: 'Glass',
    name: 'Glass',
    shortDesc: 'Inorganic silica-based beverage bottles, sauce jars, and containers. 100% infinitely recyclable without quality loss.',
    recyclableStatus: 'Recyclable',
    disposalMethod: 'Rinse cleanly and place in designated glass collection or bottle bank. Never mix window panes or ceramics.',
    preparationSteps: [
      'Empty and rinse contents clean',
      'Remove metal or plastic screw caps and lids (recycle separately)',
      'Labels and adhesive stamps do not need to be scraped off',
      'Never include broken window panes, Pyrex, or porcelain ceramics'
    ],
    environmentalImpact: 'Glass can be recycled indefinitely without degradation. Recycled cullet melts at lower furnace temperatures, saving energy.',
    exampleItems: ['Clear beverage bottles', 'Jam & pickle jars', 'Condiment bottles', 'Cosmetic glass containers', 'Beverage jars'],
    binColorAdvice: 'Green or designated glass bottle bank',
    decompositionTime: 'Over 1,000,000 years',
    carbonFootprintNote: 'Every metric ton of recycled glass saves 1.2 metric tons of raw quarry materials and reduces furnace fuel consumption by 30%.'
  },
  'Metal': {
    id: 'Metal',
    name: 'Metal',
    shortDesc: 'Ferrous and non-ferrous metals such as aluminum beverage cans, tin food cans, foil, and steel lids.',
    recyclableStatus: 'Recyclable',
    disposalMethod: 'Rinse residual food, crush cans if allowed by local collector, and place in dry metal recycling.',
    preparationSteps: [
      'Rinse out food remains from soup or tuna cans',
      'Push clean metal lids inside cans or leave securely attached',
      'Clean aluminum foil can be balled together into a fist-sized ball',
      'Do not include pressurized aerosol cans unless completely empty and depressurized'
    ],
    environmentalImpact: 'Recycling aluminum consumes 95% less energy than mining and refining bauxite ore into new metal.',
    exampleItems: ['Aluminum beverage cans', 'Tinned food cans', 'Clean foil trays', 'Metal bottle caps & lids', 'Empty metal aerosol containers'],
    binColorAdvice: 'Yellow, silver, or dry recyclables co-mingled bin',
    decompositionTime: '80–200 years',
    carbonFootprintNote: 'Recycling a single aluminum beverage can saves sufficient electrical energy to power a television for up to 3 hours.'
  },
  'Organic Waste': {
    id: 'Organic Waste',
    name: 'Organic Waste',
    shortDesc: 'Biodegradable kitchen scraps, vegetable peelings, food leftovers, coffee grounds, and garden yard trimmings.',
    recyclableStatus: 'Compostable',
    disposalMethod: 'Segregate into wet/green organic waste for municipal composting, anaerobic digestion, or home compost bins.',
    preparationSteps: [
      'Never place plastic wrap, fruit sticker labels, or rubber bands in compost',
      'Drain excess liquid slurry into the sink before collecting scraps',
      'Layer dry leaves or cardboard scraps with wet greens for balanced home composting',
      'Avoid placing large meat bones or excessive dairy in basic home composters'
    ],
    environmentalImpact: 'Organic matter trapped in anaerobic landfills generates methane, a greenhouse gas 28x more potent than CO2.',
    exampleItems: ['Fruit & vegetable scraps', 'Coffee grounds & paper filters', 'Tea leaves', 'Eggshells', 'Garden trimmings', 'Bread crusts'],
    binColorAdvice: 'Green wet waste / food composting bin',
    decompositionTime: '2 weeks to 6 months',
    carbonFootprintNote: 'Diverting organic waste to controlled composting generates nutrient-rich soil humus while sequestering carbon.'
  },
  'E-Waste': {
    id: 'E-Waste',
    name: 'E-Waste',
    shortDesc: 'Discarded electronics, computer peripherals, cables, batteries, mobile chargers, circuit boards, and appliances.',
    recyclableStatus: 'Special Handling Required',
    disposalMethod: 'Do NOT place in municipal trash. Take to authorized municipal e-waste drop-off depots, retailer take-back kiosks, or certified recyclers.',
    preparationSteps: [
      'Disconnect and detach power cables and external adapters',
      'Perform factory reset or remove storage media containing personal data',
      'Tape battery terminals with insulating electrical tape to prevent short-circuits',
      'Keep electronics dry and shelter from extreme moisture during transit'
    ],
    environmentalImpact: 'Contains toxic heavy metals (lead, cadmium, mercury) alongside precious recoverable minerals (gold, copper, lithium).',
    exampleItems: ['USB cables & chargers', 'Printed circuit boards (PCBs)', 'Mobile phones & tablets', 'Keyboards & computer mice', 'Rechargeable batteries', 'Power supply units'],
    binColorAdvice: 'Designated e-waste collection depot or retail electronics drop-off box',
    decompositionTime: '1,000+ years (never biodegrades; leaches heavy toxins)',
    carbonFootprintNote: '1 ton of recovered circuit boards contains up to 40–800x more gold than 1 ton of raw natural gold ore.'
  },
  'Other / Unknown': {
    id: 'Other / Unknown',
    name: 'Other / Unknown',
    shortDesc: 'Composite packaging, multilayer laminates, contaminated disposables, ceramics, or unidentified items.',
    recyclableStatus: 'Check Local Rules',
    disposalMethod: 'Consult local municipal sorting guidelines. If unrecyclable, place securely in general residual waste.',
    preparationSteps: [
      'Check package label for circular recycling resin codes or sorting instructions',
      'Separate composite layers (e.g. foil film on paper) if separable',
      'Wrap broken sharp ceramics safely in newspaper before disposal',
      'Avoid contaminating recyclable bins with mixed residual waste'
    ],
    environmentalImpact: 'Non-recyclable residues go to sanitary landfills or waste-to-energy recovery plants.',
    exampleItems: ['Multilayer chip snack bags', 'Disposable coffee cups with plastic linings', 'Broken porcelain & ceramics', 'Worn footwear & composite textiles', 'Contaminated sanitary packaging'],
    binColorAdvice: 'Black or grey general municipal waste bin',
    decompositionTime: 'Variable (50 to 500+ years)',
    carbonFootprintNote: 'Segregating at source prevents cross-contamination of entire truckloads of otherwise clean recyclable items.'
  }
};

export const SAMPLE_WASTE_ITEMS = [
  {
    id: 'sample-plastic-bottle',
    name: 'Clear Mineral Water Bottle',
    category: 'Plastic' as WasteCategory,
    confidence: 0.948,
    fileSize: '1.2 MB',
    dimensions: '1920x1080',
    description: 'Polyethylene terephthalate (PET #1) transparent drinking bottle with cap.',
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3ab1218829a0?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'plastic'
  },
  {
    id: 'sample-aluminum-can',
    name: 'Crushed Soda Can',
    category: 'Metal' as WasteCategory,
    confidence: 0.962,
    fileSize: '840 KB',
    dimensions: '1440x960',
    description: 'Clean aluminum soft drink can with standard pull tab.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'metal'
  },
  {
    id: 'sample-cardboard-box',
    name: 'Corrugated Shipping Carton',
    category: 'Cardboard' as WasteCategory,
    confidence: 0.924,
    fileSize: '1.5 MB',
    dimensions: '2048x1536',
    description: 'Unbleached kraft brown shipping delivery box.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'cardboard'
  },
  {
    id: 'sample-glass-jar',
    name: 'Pickle & Preserve Glass Jar',
    category: 'Glass' as WasteCategory,
    confidence: 0.951,
    fileSize: '950 KB',
    dimensions: '1600x1200',
    description: 'Transparent flint glass food storage jar.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'glass'
  },
  {
    id: 'sample-organic-apple',
    name: 'Apple Core & Peelings',
    category: 'Organic Waste' as WasteCategory,
    confidence: 0.937,
    fileSize: '1.1 MB',
    dimensions: '1800x1200',
    description: 'Organic fruit core scraps with natural moisture content.',
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'organic'
  },
  {
    id: 'sample-ewaste-circuit',
    name: 'Printed Circuit Board (PCB)',
    category: 'E-Waste' as WasteCategory,
    confidence: 0.912,
    fileSize: '1.4 MB',
    dimensions: '1920x1080',
    description: 'Electronic board with integrated chips, capacitors, and gold contact pins.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    svgFallback: 'ewaste'
  }
];

export const INITIAL_MODEL_METRICS: ModelMetrics = {
  model_name: "SmartWaste-MobileNetV2-Transfer",
  framework: "TensorFlow 2.16 / Keras 3.x",
  input_shape: "224 × 224 × 3 RGB",
  num_classes: 8,
  classes: [
    'Plastic',
    'Paper',
    'Cardboard',
    'Glass',
    'Metal',
    'Organic Waste',
    'E-Waste',
    'Other / Unknown'
  ],
  dataset_size: 4850,
  training_accuracy: 0.942,
  validation_accuracy: 0.918,
  test_accuracy: 0.907,
  training_loss: 0.174,
  validation_loss: 0.238,
  last_trained: "2026-03-18 14:32:00 UTC",
  epochs_completed: 35,
  batch_size: 32,
  optimizer: "Adam (lr=1e-4, decay=1e-5)",
  confusion_matrix: [
    [118, 4, 3, 2, 3, 0, 1, 3], // Plastic
    [3, 122, 5, 0, 1, 1, 0, 2], // Paper
    [2, 6, 120, 1, 1, 1, 0, 3], // Cardboard
    [2, 0, 1, 124, 4, 0, 0, 3], // Glass
    [3, 1, 1, 3, 123, 0, 1, 2], // Metal
    [0, 2, 1, 0, 0, 131, 0, 0], // Organic Waste
    [1, 0, 0, 1, 2, 0, 128, 2], // E-Waste
    [4, 3, 4, 2, 3, 1, 2, 115]  // Other / Unknown
  ],
  class_precision: {
    'Plastic': 0.887,
    'Paper': 0.884,
    'Cardboard': 0.889,
    'Glass': 0.932,
    'Metal': 0.898,
    'Organic Waste': 0.985,
    'E-Waste': 0.969,
    'Other / Unknown': 0.885
  },
  class_recall: {
    'Plastic': 0.881,
    'Paper': 0.910,
    'Cardboard': 0.896,
    'Glass': 0.925,
    'Metal': 0.918,
    'Organic Waste': 0.978,
    'E-Waste': 0.955,
    'Other / Unknown': 0.858
  },
  class_f1: {
    'Plastic': 0.884,
    'Paper': 0.897,
    'Cardboard': 0.892,
    'Glass': 0.928,
    'Metal': 0.908,
    'Organic Waste': 0.981,
    'E-Waste': 0.962,
    'Other / Unknown': 0.871
  }
};
