// All company facts below are taken from https://www.jsktm.com/
export const BASE = 'https://www.jsktm.com'
export const img = (p) => `${BASE}/${p}`

export const company = {
  name: 'JSK Tex Mech Pvt. Ltd.',
  short: 'JSK Tex Mech',
  tagline: 'Trusted Winding Partner',
  since: 2012,
  phones: ['+91 96627 54500', '+91 99988 39216'],
  email: 'info.jsktm@gmail.com',
  addresses: [
    { label: 'Works', text: 'Zak-GIDC, Village Zak, Dist. Gandhinagar, Gujarat, India' },
    { label: 'Ahmedabad', text: 'Near Kathwada GIDC – 382415, Ahmedabad, Gujarat, India' },
  ],
  social: {
    facebook: 'https://www.facebook.com/JSKTexMech',
    instagram: 'https://www.instagram.com/jsktexmech/',
    youtube: 'https://www.youtube.com/@jsktexmechpvt.ltd.6299',
  },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.791620663913!2d72.6754510301478!3d23.034861709147773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e870c9b9d2cfb%3A0xc4c3c23026c883af!2sKathwada%20GIDC%2C%20Odhav%20Industrial%20Estate%2C%20Odhav%2C%20Ahmedabad%2C%20Gujarat%20380038!5e0!3m2!1sen!2sin!4v1595781716104!5m2!1sen!2sin',
}

export const assets = {
  logo: img('img/logo.png'),
  logoMobile: '/mobilelogo.png', // your local logo (public/mobilelogo.png)
  banner: img('img/banner12.jpg'),
  thread: '/thread.jpg', // local (public/thread.jpg)
  vab: '/vab.jpg', // local (public/vab.jpg)
  bg: img('images/background/bg5.jpg'),
  certs: [
    { name: 'MSME', src: img('img/certi/msme.png') },
    { name: 'Startup / SB', src: img('img/certi/sb.png') },
    { name: 'Make in India', src: img('img/certi/makeindia.png') },
    { name: 'ISO', src: img('img/certi/iso.png') },
    { name: 'IAF', src: img('img/certi/iaf.png') },
  ],
}

export const stats = [
  { value: 752, suffix: '+', label: 'Happy customers' },
  { value: 362, suffix: '+', label: 'Installations' },
  { value: 78, suffix: '+', label: 'Domestic markets' },
  { value: company.since, suffix: '', label: 'Building machines since', plain: true },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
]

export const products = [
  {
    slug: 'assembly-cheese-winding-machine',
    kind: 'assembly',
    heads: 4,
    name: 'Assembly / Cheese Winding Machine',
    short: 'Assembly / Cheese',
    category: 'Assembly winding',
    stage: 'doubling',
    blurb:
      'A parallel / cheese winder that gives every yarn equal tension through individual yarn-detecting sensors — cutting single-ply wind-ups and producing packages ready for further processing.',
    images: ['/Assembly-Winding-3ply.jpg', '/Assembly-Winding-1.jpg'], // local files in /public
    depth3d: ['/3d/hero', '/3d/assembly', '/3d/assembly3'], // cut-out + depth map → real-photo 3D
    features: [
      'Random / drum winding',
      'Hard-anodized, long-life metallic drum',
      'Cylindrical tube take-up, as required',
      'AC co-axial individual motor per head',
      'Individual spindle length counting',
      'Optical yarn sensor per head for each ply',
      'Electrical, display-programmable ribbon braking',
      'Electrical centralized yarn cutter per head',
    ],
    bestFor: ['Doubling & plying prep', 'Multi-ply yarns', 'Technical yarns'],
  },
  {
    slug: 'rewinding-cone-winding-machine',
    kind: 'cone',
    heads: 4,
    name: 'Rewinding / Cone Winding Machine',
    short: 'Rewinding / Cone',
    category: 'Cone winding',
    stage: 'final',
    blurb:
      'Designed to produce uniform, hard-wound final packages from staple spun yarns made of natural and man-made fibres.',
    images: ['/Cone-Winding-1.jpg'],
    depth3d: ['/3d/cone'],
    features: [
      'Long-life metallic drum',
      'Individual spindle length counting',
      'AC co-axial individual motor per head',
      'Cylindrical tube or cone take-up, as required',
      'Electrical, display-programmable ribbon braking',
      'Optical yarn sensor per head',
      'Handles staple spun yarns — natural & man-made fibres',
    ],
    bestFor: ['Final packages', 'Weaving & knitting feed', 'Staple spun yarns'],
  },
  {
    slug: 'soft-dye-package-winding-machine',
    kind: 'soft',
    heads: 4,
    name: 'Soft Dye Package Winding Machine',
    short: 'Soft Dye Package',
    category: 'Dye packages',
    stage: 'dyeing',
    blurb:
      'Built to produce soft dye packages that meet yarn-dyeing industry requirements, with uniform density on perforated dye tubes or dye springs.',
    images: ['/Soft-Winding-1.jpg'], // add public/Soft-Winding-1.jpg ; falls back to jsktm.com
    remoteImages: [img('img/newdesign/Soft-Winding-1.jpg')],
    features: [
      'Random / drum winding',
      'Hard-anodized, long-life metallic drum',
      'AC co-axial individual motor per head',
      'Electrical, display-programmable ribbon braking',
      'Optical yarn sensor per head',
      'Precise length counting for each spindle',
    ],
    bestFor: ['Yarn dyeing houses', 'Perforated dye tubes', 'Dye springs'],
  },
  {
    slug: 'pre-application-winding-machine',
    kind: 'preapp',
    heads: 4,
    name: 'Pre-Application Winding Machine',
    short: 'Pre-Application',
    category: 'Specialty winding',
    stage: 'doubling',
    blurb:
      'Part of the JSK yarn winding range. Specifications are shared on request — talk to our team and we will configure it to your yarn and process.',
    images: [],
    features: ['Configured to your yarn & process', 'Full specification shared on request'],
    bestFor: ['Custom requirements'],
    onRequest: true,
  },
  {
    slug: 'jumbo-package-winding-machine',
    kind: 'jumbo',
    heads: 2,
    name: 'Jumbo Package Winding Machine',
    short: 'Jumbo Package',
    category: 'Specialty winding',
    stage: 'final',
    blurb:
      'Part of the JSK yarn winding range. Specifications are shared on request — talk to our team and we will configure it to your yarn and process.',
    images: [],
    features: ['Configured to your yarn & process', 'Full specification shared on request'],
    bestFor: ['Custom requirements'],
    onRequest: true,
  },
]

export const workingSystems = [
  {
    title: 'Hard-anodized grooved drum',
    text: 'Aluminium grooved drum with hard anodizing for excellent package formation and a long service life.',
  },
  {
    title: 'Innovative cone holder',
    text: 'Designed from graded material to improve performance and reduce maintenance.',
  },
  {
    title: 'Engineered yarn path',
    text: 'Carefully designed yarn paths and angles for optimal yarn quality with any staple fibre yarn.',
  },
]

export const pillars = [
  {
    title: 'Quality assurance',
    text:
      'Innovation, engineered solutions and inspection at every stage of production — backed by after-sales support — make us a trusted, preferred machinery manufacturer.',
  },
  {
    title: 'Trust',
    text: 'Dedicated service that earns customer trust and satisfaction, with customers at the centre of our product life cycle.',
  },
  {
    title: 'Infrastructure',
    text: 'Modern manufacturing facilities, standard testing techniques and an experienced, well-trained team.',
  },
]

export const whyUs = [
  'Advanced manufacturing facility',
  'Strong, superior-quality products',
  'Strong brand & market reputation',
  'In-depth industry knowledge',
]

export const vision =
  'To be the best across all verticals by delivering world-class products at competitive prices, providing superior service, developing leading-edge technology and processes, and creating growth opportunities for our people.'

export const process = [
  { n: '01', title: 'Idea', text: 'You tell us the yarn, the count range and the package you need.' },
  { n: '02', title: 'Engineer', text: 'We configure heads, drum, braking and sensors to your process.' },
  { n: '03', title: 'Build & inspect', text: 'Fabricated and inspected at every stage of production.' },
  { n: '04', title: 'Commission', text: 'Installed, tested and handed over with after-sales support.' },
]

/* Scroll-driven "anatomy of a winder" (facts from the product pages) */
export const anatomy = [
  {
    focus: 'sensor',
    title: 'Optical yarn sensor',
    text: 'An optical sensor on every head watches each ply. On assembly winders every yarn gets equal tension, which reduces single-ply wind-ups.',
    pos: [3.4, 3.2, 3.8],
    look: [0, 1.9, -0.2],
  },
  {
    focus: 'panel',
    title: 'Programmable ribbon braking',
    text: 'Electrical, display-programmable ribbon braking, plus an electrical centralised yarn cutter per head on assembly machines.',
    pos: [1.6, 1.3, 4.6],
    look: [0, 0.4, 0.8],
  },
  {
    focus: 'drum',
    title: 'Grooved drum & co-axial motor',
    text: 'A hard-anodized, long-life grooved metallic drum driven by an AC co-axial individual motor per head — for clean package formation.',
    pos: [3.6, 1.2, 3.4],
    look: [0, 0.5, 0.3],
  },
  {
    focus: 'package',
    title: 'Package & length counting',
    text: 'Cylindrical tube or cone take-up as required, with individual spindle length counting and a cone holder in graded material for low maintenance.',
    pos: [-3.4, 2.4, 3.9],
    look: [0, 1.1, 0],
  },
]

export const faqs = [
  {
    q: 'Which machines do you manufacture?',
    a: 'Assembly / cheese winding, rewinding / cone winding, soft dye package winding, pre-application winding and jumbo package winding machines — plus yarn winding spares.',
  },
  {
    q: 'Can a machine be configured for my yarn?',
    a: 'Yes. Tell us your yarn, the package you need (cylindrical tube, cone, perforated dye tube or dye spring) and the number of heads, and we engineer the machine around it.',
  },
  {
    q: 'Do you supply spares?',
    a: 'JSK Tex Mech is a yarn winding machinery and spares manufacturer. Share your machine and the part you need and our team will respond.',
  },
  {
    q: 'Is after-sales support available?',
    a: 'Yes. Inspection at every stage of production and after-sales support are part of our quality commitment.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Use the Get a quote button, call +91 96627 54500 or message us on WhatsApp. Describe your requirement and we will reply with a tailored quotation.',
  },
  {
    q: 'Where are you located?',
    a: 'Our works is at Zak-GIDC, Village Zak, Dist. Gandhinagar, Gujarat, and we are also listed near Kathwada GIDC, Ahmedabad.',
  },
]
