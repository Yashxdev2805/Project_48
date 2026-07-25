export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface HeroData {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  bullets: string[];
  ctaText: string;
  secondaryCtaText: string;
}

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
}

export interface EdgePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
}

export interface DomainCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  icon: string;
  popular?: boolean;
}

export interface SegmentationCategory {
  id: string;
  title: string;
  items: string[];
}

export interface AudiencePersona {
  id: string;
  title: string;
  role: string;
  description: string;
  keyBenefits: string[];
  icon: string;
}

export interface CATPhase {
  step: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  id: string;
  category: "About Course" | "Delivery & Format" | "Enterprise & Pricing";
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  avatarInitials: string;
  rating: number;
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
  responsePromise: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  designation?: string;
  teamSize?: string;
  message?: string;
}

export interface EnterpriseData {
  navLinks: NavLink[];
  hero: HeroData;
  stats: StatItem[];
  clients: ClientLogo[];
  edge: EdgePillar[];
  domains: DomainCard[];
  segmentation: SegmentationCategory[];
  audience: AudiencePersona[];
  catFramework: CATPhase[];
  howItWorks: HowItWorksStep[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}
