/**
 * Setu Architects — Site Configuration
 *
 * Single source of truth for site-wide constants:
 * navigation, contact, social links, and business information.
 * Import from here rather than scattering magic strings.
 */

/* ─── Business Details ───────────────────────────────────────── */
export const SITE_CONFIG = {
  name:        'Setu Architects',
  shortName:   'Setu Architects',
  tagline:     'Structural & MEPF Architectural Solutions',
  description:
    'Setu Architects delivers world-class structural engineering and architectural design solutions — specializing in residential, commercial, industrial, and public structures since 1988.',
  url:         'https://setu-architect.vercel.app',
  email:       'setuarchitect@gmail.com',
  phone:       '+91 9428873366',
  founded:     1988,
  headquarters: 'Ahmedabad, Gujarat, India',
};

/* ─── Navigation Links ───────────────────────────────────────── */
export const NAV_LINKS = [
  {
    label: 'About',
    href:  '/about',
    description: 'Our story, mission, and leadership',
  },
  {
    label: 'Services',
    href:  '/services',
    description: 'Civil, commercial, and industrial expertise',
    children: [
      { label: 'Civil Engineering',        href: '/services/civil-engineering' },
      { label: 'Commercial Construction',  href: '/services/commercial-construction' },
      { label: 'Industrial Projects',      href: '/services/industrial' },
      { label: 'Infrastructure Consulting',href: '/services/consulting' },
    ],
  },
  {
    label: 'Projects',
    href:  '/projects',
    description: 'Portfolio of completed and ongoing projects',
  },
  {
    label: 'Sectors',
    href:  '/sectors',
    description: 'Industries and governments we serve',
  },
  {
    label: 'Sustainability',
    href:  '/sustainability',
    description: 'Our commitment to the environment',
  },
  {
    label: 'Contact',
    href:  '/contact',
    description: 'Get in touch with our team',
  },
];

/* ─── CTA Buttons ────────────────────────────────────────────── */
export const PRIMARY_CTA   = { label: 'Start a Project', href: '/contact' };
export const SECONDARY_CTA = { label: 'View Our Work',   href: '/projects' };

/* ─── Social Links ───────────────────────────────────────────── */
export const SOCIAL_LINKS = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/stratos-infrastructure', label: 'Follow on LinkedIn' },
  { platform: 'Twitter',  href: 'https://twitter.com/StratosBuilds',                  label: 'Follow on Twitter'  },
  { platform: 'YouTube',  href: 'https://youtube.com/@StratosInfrastructure',          label: 'Watch on YouTube'   },
  { platform: 'Instagram',href: 'https://instagram.com/stratosinfrastructure',         label: 'Follow on Instagram'},
];

/* ─── Key Statistics ─────────────────────────────────────────── */
export const KEY_STATS = [
  { value: '850+', label: 'Projects Completed',  description: 'Delivered across 4 continents' },
  { value: '28',   label: 'Years of Experience', description: 'Since 1998' },
  { value: '$12B', label: 'Project Value',        description: 'Combined portfolio value' },
  { value: '4200', label: 'Skilled Workforce',    description: 'Engineers, architects, and builders' },
];

/* ─── Core Services ──────────────────────────────────────────── */
export const CORE_SERVICES = [
  {
    id:          'civil-engineering',
    title:       'Civil Engineering',
    shortTitle:  'Civil',
    description:
      'Large-scale civil infrastructure including bridges, highways, tunnels, dams, and water systems.',
    icon:        'Building2',
    href:        '/services/civil-engineering',
    accentColor: 'primary',
  },
  {
    id:          'commercial-construction',
    title:       'Commercial Construction',
    shortTitle:  'Commercial',
    description:
      'World-class commercial facilities: corporate campuses, mixed-use developments, and retail environments.',
    icon:        'Layers',
    href:        '/services/commercial-construction',
    accentColor: 'accent',
  },
  {
    id:          'industrial',
    title:       'Industrial Projects',
    shortTitle:  'Industrial',
    description:
      'Heavy industrial facilities, manufacturing plants, energy infrastructure, and logistics hubs.',
    icon:        'Factory',
    href:        '/services/industrial',
    accentColor: 'primary',
  },
  {
    id:          'consulting',
    title:       'Infrastructure Consulting',
    shortTitle:  'Consulting',
    description:
      'Strategic advisory, feasibility studies, and project management for complex infrastructure programmes.',
    icon:        'LineChart',
    href:        '/services/consulting',
    accentColor: 'accent',
  },
];

/* ─── Certifications & Partners ──────────────────────────────── */
export const CERTIFICATIONS = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'LEED Gold Certified',
  'OHSAS 18001',
];

/* ─── Footer Columns ─────────────────────────────────────────── */
export const FOOTER_LINKS = [
  {
    heading: 'Services',
    links: [
      { label: 'Civil Engineering',         href: '/services/civil-engineering' },
      { label: 'Commercial Construction',   href: '/services/commercial-construction' },
      { label: 'Industrial Projects',       href: '/services/industrial' },
      { label: 'Infrastructure Consulting', href: '/services/consulting' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',     href: '/about' },
      { label: 'Leadership',   href: '/about#leadership' },
      { label: 'Sustainability',href: '/sustainability' },
      { label: 'Newsroom',     href: '/news' },
      { label: 'Careers',      href: '/careers' },
    ],
  },
  {
    heading: 'Projects',
    links: [
      { label: 'Portfolio',     href: '/projects' },
      { label: 'Case Studies',  href: '/projects/case-studies' },
      { label: 'Sectors',       href: '/sectors' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '/legal/privacy' },
      { label: 'Terms of Service',  href: '/legal/terms' },
      { label: 'Cookie Policy',     href: '/legal/cookies' },
    ],
  },
];
