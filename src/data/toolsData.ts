import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'background-remover',
    slug: '/background-remover',
    title: 'Background Remover',
    titleHindi: 'Remove or Change Photo Background',
    category: 'photo',
    badge: 'Popular',
    iconName: 'ImageOff',
    description: 'Remove image background instantly or replace with official white or passport blue background for Sarkari exam forms.',
    shortDesc: 'Change passport photo background to official white or blue in 1-click for exam forms.',
    features: ['100% Free & Unlimited', 'Official Passport Blue / White BG', 'Download in High Quality PNG/JPG']
  },
  {
    id: 'hd-enhancer',
    slug: '/hd-enhancer',
    title: 'HD Photo Enhancer',
    titleHindi: 'Enhance Photo & Signature Clarity',
    category: 'photo',
    badge: 'AI Powered',
    iconName: 'Sparkles',
    description: 'Sharpen blurry photos and faint signatures to clear, crisp HD quality suitable for online form verification.',
    shortDesc: 'Make blurry passport photos and signatures crystal clear so forms never get rejected.',
    features: ['Ultra Sharp Signature Enhance', 'Face Clarity Boost', 'Zero Pixel Distortion']
  },
  {
    id: 'photo-resizer',
    slug: '/photo-resizer',
    title: 'Sarkari Photo Resizer',
    titleHindi: 'Resize Photo & Signature to 20KB - 50KB',
    category: 'photo',
    badge: 'Must Have',
    iconName: 'Crop',
    description: 'Resize photo and signature to exact 20KB - 50KB, 3.5cm x 4.5cm, 200 DPI for SSC, UPSC, Railway, Police & State exams.',
    shortDesc: 'Create exact 20KB to 50KB photo and signature for SSC, UPSC, Railway, and Police forms.',
    features: ['Pre-set Presets for SSC, UPSC, IBPS', 'Custom KB & Pixel Control', 'Date & Name on Photo Support']
  },
  {
    id: 'pdf-to-jpg',
    slug: '/pdf-to-jpg',
    title: 'PDF to JPG Converter',
    titleHindi: 'Convert PDF Pages to JPG Images',
    category: 'pdf',
    badge: 'Fast',
    iconName: 'FileImage',
    description: 'Extract every page of your PDF into high-resolution JPG images with original formatting intact.',
    shortDesc: 'Convert any PDF document pages easily into high-definition JPG images.',
    features: ['High DPI Render', 'Batch Page Export', 'Instant Browser Processing']
  },
  {
    id: 'pdf-to-png',
    slug: '/pdf-to-png',
    title: 'PDF to PNG Converter',
    titleHindi: 'Convert PDF to Transparent PNG',
    category: 'pdf',
    badge: 'Lossless',
    iconName: 'Image',
    description: 'Convert PDF pages into transparent and lossless PNG images for crystal-clear document printing.',
    shortDesc: 'Convert PDF files into lossless, high quality PNG format without losing resolution.',
    features: ['Lossless Quality', 'Transparent Background Ready', 'Fast Extraction']
  },
  {
    id: 'pdf-to-word',
    slug: '/pdf-to-word',
    title: 'PDF to Word Converter',
    titleHindi: 'Convert PDF to Editable Word (.docx)',
    category: 'pdf',
    badge: 'Smart OCR',
    iconName: 'FileType2',
    description: 'Convert read-only PDF files into fully editable Microsoft Word (.doc / .docx) documents easily.',
    shortDesc: 'Convert scanned PDF or e-books into editable MS Word documents without layout breaking.',
    features: ['Retains Text Layout', 'Editable Document Format', 'Safe & Secure Processing']
  },
  {
    id: 'pdf-to-excel',
    slug: '/pdf-to-excel',
    title: 'PDF to Excel Converter',
    titleHindi: 'Extract PDF Tables to Excel (.xlsx)',
    category: 'pdf',
    badge: 'Table Extract',
    iconName: 'Sheet',
    description: 'Extract tables, marks sheets, and financial numbers from PDF straight into Excel (.xlsx / .csv) spreadsheets.',
    shortDesc: 'Extract marksheets, bank statements, and salary slips directly into Excel spreadsheets.',
    features: ['Auto Table Detection', 'Clean Column & Rows', 'Instant CSV/XLS Export']
  },
  {
    id: 'pdf-editable',
    slug: '/pdf-editable',
    title: 'PDF Editor & Signer',
    titleHindi: 'Edit & Add Signature to PDF Online',
    category: 'pdf',
    badge: 'Editor',
    iconName: 'FilePenLine',
    description: 'Add text, insert signature, annotate, highlight, or redact information on any PDF without installing software.',
    shortDesc: 'Add your name, date, and digital signature to any PDF online without extra software.',
    features: ['E-Signature Tool', 'Text Insert & Highlighting', 'Rotate & Stamp Pages']
  },
  {
    id: 'pdf-merge',
    slug: '/pdf-merge',
    title: 'Merge Multiple PDFs',
    titleHindi: 'Combine Multiple PDF Files into One',
    category: 'pdf',
    badge: 'Essential',
    iconName: 'Combine',
    description: 'Combine multiple PDF documents, certificates, and marksheets into a single organized PDF file.',
    shortDesc: 'Merge 10th/12th marksheets, Aadhaar card, and certificates into a single organized PDF.',
    features: ['Reorder Pages with Drag & Drop', 'Unlimited File Merging', '100% Client-Side Privacy']
  },
  {
    id: 'pdf-compress',
    slug: '/pdf-compress',
    title: 'Compress PDF Online',
    titleHindi: 'Reduce PDF File Size under 100KB/200KB',
    category: 'pdf',
    badge: 'Under 100KB',
    iconName: 'Minimize2',
    description: 'Compress PDF file size to under 100KB, 200KB, or 500KB while maintaining clear readable text quality for online portal uploads.',
    shortDesc: 'Compress PDF file size under 100KB or 200KB for government job portal uploads.',
    features: ['Specific Target Size in KB', 'Maintains Text Sharpness', 'High Compression Ratio']
  }
];

export const DATE_CHECKER_TOOLS: ToolItem[] = [
  {
    id: 'sarkari-form-tracker',
    slug: '/sarkari-form-tracker',
    title: 'Sarkari Form Tracker',
    titleHindi: 'Government Job & Exam Last Date Tracker',
    category: 'sarkari',
    badge: 'Live Tracker',
    iconName: 'CalendarCheck2',
    description: 'Real-time countdown tracker for latest Central & State government job application forms, starting dates, and last dates.',
    shortDesc: 'View ongoing forms, deadlines, and live countdown timers for SSC, UPSC, Railway, Police, and Bank jobs.',
    features: ['Live Days Countdown', 'Direct Apply Links', 'Instant Notification Alerts']
  },
  {
    id: 'ignou-date',
    slug: '/ignou-date',
    title: 'IGNOU Exam & Form Dates',
    titleHindi: 'IGNOU TEE Exam, Assignment & Re-Registration Dates',
    category: 'sarkari',
    badge: 'IGNOU Portal',
    iconName: 'GraduationCap',
    description: 'Track IGNOU Term End Exam (TEE) December & June exam form dates, assignment submission deadlines, and re-registration alerts.',
    shortDesc: 'Live countdown timers for IGNOU TEE exam forms, assignment submission deadlines, and re-registration.',
    features: ['TEE Exam Date Sheets', 'Assignment Deadline Tracker', 'Re-Registration Notifications']
  },
  {
    id: 'nios-date',
    slug: '/nios-date',
    title: 'NIOS 10th/12th Dates',
    titleHindi: 'NIOS Secondary & Sr Secondary Timetable',
    category: 'sarkari',
    badge: 'Open School',
    iconName: 'BookOpenCheck',
    description: 'Complete timeline for NIOS Class 10 & 12 public exam fees, TMA online upload, ODE on-demand booking, and result dates.',
    shortDesc: 'Important dates for NIOS 10th and 12th exam fees, TMA online submission, and On-Demand exams.',
    features: ['TMA Upload Alerts', 'Public Exam Fee Schedule', 'Hall Ticket & Result Tracker']
  },
  {
    id: 'ews-admission-date',
    slug: '/ews-admission-date',
    title: 'EWS School Admission Dates',
    titleHindi: 'EWS/DG Free Private School Admission Dates',
    category: 'sarkari',
    badge: 'Free Education',
    iconName: 'School',
    description: 'Free private school 25% RTE and EWS/DG admission dates, computerized lottery draw schedule for Delhi, UP, Maharashtra & Rajasthan.',
    shortDesc: 'Admission dates for 25% free seats under EWS/RTE quota in private schools for Nursery and Class 1.',
    features: ['State-wise RTE Portals', 'Lottery Draw Schedule', 'Eligibility & Income Rules']
  }
];
