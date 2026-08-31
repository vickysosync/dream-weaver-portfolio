import heroEvent from "@/assets/hero-event.jpg";
import serviceSocial from "@/assets/service-social.jpg";
import serviceRetail from "@/assets/service-retail.jpg";
import serviceVenue from "@/assets/service-venue.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import showcaseEngagement from "@/assets/showcase-engagement.jpg";
import showcaseLaunch from "@/assets/showcase-launch.jpg";
import showcaseFestive from "@/assets/showcase-festive.jpg";
import ctaEvent from "@/assets/cta-event.jpg";
import aboutTeam from "@/assets/about-team.jpg";

export const images = {
  heroEvent,
  serviceSocial,
  serviceRetail,
  serviceVenue,
  serviceCorporate,
  showcaseEngagement,
  showcaseLaunch,
  showcaseFestive,
  ctaEvent,
  aboutTeam,
};

export type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  services: string[];
  featured: boolean;
};

export type Service = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  visible: boolean;
};

export type Testimonial = {
  id: number;
  name: string;
  eventType: string;
  quote: string;
  rating: number;
  visible: boolean;
};

export type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  venue: string;
  budget: string;
  message: string;
  status: "New" | "Contacted" | "Completed";
  createdAt: string;
};

export type Hero = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
};

export type About = {
  label: string;
  heading: string;
  description: string;
  image: string;
  highlights: { title: string; text: string }[];
  stats: { label: string; value: number; suffix: string }[];
};

export type Settings = {
  businessName: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
};

export const categories = [
  "Birthdays",
  "Engagements",
  "Weddings",
  "Corporate",
  "Retail Launches",
  "Festive Decor",
  "Mall Installations",
  "Product Launches",
];

export const initialPortfolio: Project[] = [
  {
    id: 1,
    title: "Royal Birthday Extravaganza",
    category: "Birthdays",
    location: "Koregaon Park, Pune",
    date: "2026-05-12",
    shortDescription: "A regal balloon-and-floral fantasy built around a royal purple palette.",
    description:
      "A milestone birthday reimagined as a royal court. We fabricated a custom throne backdrop, layered organic balloon clouds in gold and magenta, and lit the hall with warm pin-spots so every photograph felt cinematic. The team handled styling, fabrication, entertainment curation and full event-day coordination.",
    coverImage: serviceSocial,
    galleryImages: [serviceSocial, heroEvent, ctaEvent],
    services: ["Theme Fabrication", "Balloon Decor", "Floral Styling", "Lighting Design"],
    featured: true,
  },
  {
    id: 2,
    title: "Grand Showroom Launch",
    category: "Retail Launches",
    location: "Kharadi, Pune",
    date: "2026-03-02",
    shortDescription: "A golden entrance arch and red-carpet reveal for a flagship showroom.",
    description:
      "For this flagship opening we designed a golden balloon colonnade, a branded ribbon-cutting stage and a guided customer walkthrough. Vendor coordination, hospitality desks and the anchor's run-of-show were all managed in-house.",
    coverImage: serviceRetail,
    galleryImages: [serviceRetail, showcaseLaunch, serviceCorporate],
    services: ["Entrance Fabrication", "Brand Activation", "Vendor Coordination"],
    featured: true,
  },
  {
    id: 3,
    title: "Corporate Annual Celebration",
    category: "Corporate",
    location: "Hinjawadi, Pune",
    date: "2026-01-24",
    shortDescription: "A conference-grade stage with LED backdrop and violet wash lighting.",
    description:
      "An annual day for 900 employees: main stage design, LED content wall, award ceremony production, artist management and complete backstage coordination across a nine-hour run-of-show.",
    coverImage: serviceCorporate,
    galleryImages: [serviceCorporate, ctaEvent, showcaseLaunch],
    services: ["Stage Production", "AV & Lighting", "Entertainment Curation"],
    featured: true,
  },
  {
    id: 4,
    title: "Candlelit Engagement Evening",
    category: "Engagements",
    location: "Mundhwa, Pune",
    date: "2025-12-08",
    shortDescription: "Blush drapes, fresh roses and candlelight for an intimate proposal setup.",
    description:
      "An outdoor engagement mandap dressed in blush drapes and fresh imported roses, framed by brass candle stands and a beaded chandelier centrepiece for a warm, romantic evening.",
    coverImage: showcaseEngagement,
    galleryImages: [showcaseEngagement, heroEvent, serviceSocial],
    services: ["Floral Installation", "Draping", "Candle & Mood Lighting"],
    featured: false,
  },
  {
    id: 5,
    title: "Wisteria Wedding Reception",
    category: "Weddings",
    location: "Yerawada, Pune",
    date: "2025-11-19",
    shortDescription: "A cascading floral stage under crystal chandeliers.",
    description:
      "A grand reception stage with cascading wisteria and orchid curtains, mirrored risers, three crystal chandeliers and a full ballroom lighting plot designed around the couple's palette.",
    coverImage: heroEvent,
    galleryImages: [heroEvent, ctaEvent, showcaseEngagement],
    services: ["Stage Fabrication", "Floral Design", "Chandelier Rigging"],
    featured: true,
  },
  {
    id: 6,
    title: "Festival of Lights Installation",
    category: "Festive Decor",
    location: "Kalyani Nagar, Pune",
    date: "2025-10-16",
    shortDescription: "Marigold canopies and lanterns for a festive community celebration.",
    description:
      "Over 12,000 marigolds, hand-strung torans and 60 hanging lanterns transformed a banquet lawn into a traditional festive courtyard, complete with rangoli flooring and a performance stage.",
    coverImage: showcaseFestive,
    galleryImages: [showcaseFestive, serviceSocial, serviceVenue],
    services: ["Festive Fabrication", "Floral Canopies", "Rangoli & Flooring"],
    featured: false,
  },
  {
    id: 7,
    title: "Atrium Winter Spectacle",
    category: "Mall Installations",
    location: "Viman Nagar, Pune",
    date: "2025-12-20",
    shortDescription: "A 30-foot illuminated centrepiece for a mall atrium.",
    description:
      "A large-format experiential installation: a 30-foot illuminated tree sculpture, suspended light rain across the atrium void and photo-moment zones across three retail levels.",
    coverImage: serviceVenue,
    galleryImages: [serviceVenue, showcaseFestive, ctaEvent],
    services: ["Large-Format Fabrication", "Structural Rigging", "Experiential Design"],
    featured: false,
  },
  {
    id: 8,
    title: "Midnight Product Reveal",
    category: "Product Launches",
    location: "Baner, Pune",
    date: "2026-02-14",
    shortDescription: "Haze, spotlights and a dramatic unveil moment.",
    description:
      "A theatrical product reveal built around a single spotlight moment — automated reveal rig, haze-filled stage, violet wash lighting and a synchronised sound cue for the brand film.",
    coverImage: showcaseLaunch,
    galleryImages: [showcaseLaunch, serviceCorporate, serviceRetail],
    services: ["Reveal Mechanism", "Stage Lighting", "Brand Activation"],
    featured: false,
  },
  {
    id: 9,
    title: "School Reopening Welcome",
    category: "Retail Launches",
    location: "Wagholi, Pune",
    date: "2025-06-10",
    shortDescription: "A cheerful welcome arch and campus styling for reopening day.",
    description:
      "A vibrant reopening celebration with a welcome balloon arch, themed corridor styling, photo booths and stage decor for the morning assembly.",
    coverImage: serviceSocial,
    galleryImages: [serviceSocial, serviceRetail, showcaseFestive],
    services: ["Balloon Decor", "Campus Styling", "Photo Moments"],
    featured: false,
  },
  {
    id: 10,
    title: "Exhibition Pavilion Build",
    category: "Corporate",
    location: "Shivajinagar, Pune",
    date: "2025-09-05",
    shortDescription: "A modular exhibition pavilion with branded lighting.",
    description:
      "A modular exhibition pavilion designed for fast build-out: branded fascia, backlit product niches, meeting pods and a compact demo stage.",
    coverImage: serviceCorporate,
    galleryImages: [serviceCorporate, showcaseLaunch, serviceVenue],
    services: ["Exhibition Fabrication", "Branding", "Lighting Design"],
    featured: false,
  },
];

export const initialServices: Service[] = [
  {
    id: 1,
    title: "Social & Private Celebrations",
    category: "Celebrations",
    description:
      "Birthday parties, engagements, theme parties, balloon decor, floral setups and customized celebrations.",
    image: serviceSocial,
    visible: true,
  },
  {
    id: 2,
    title: "Commercial & Retail Launches",
    category: "Brand Openings",
    description:
      "Shop openings, showroom launches, product launches and school reopening events.",
    image: serviceRetail,
    visible: true,
  },
  {
    id: 3,
    title: "Large-Scale Venue Decor",
    category: "Experiential",
    description:
      "Mall installations, festive decor, experiential environments and large-format setups.",
    image: serviceVenue,
    visible: true,
  },
  {
    id: 4,
    title: "Corporate Events",
    category: "Corporate",
    description:
      "Conferences, exhibitions, anniversaries and employee engagement experiences.",
    image: serviceCorporate,
    visible: true,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    eventType: "Birthday Celebration",
    quote:
      "Dream Factory transformed our celebration into something beyond what we imagined. Every detail was handled beautifully.",
    rating: 5,
    visible: true,
  },
  {
    id: 2,
    name: "Amit Kulkarni",
    eventType: "Showroom Launch",
    quote:
      "From the concept to the final setup, the team handled everything professionally. Our launch day ran without a single hiccup.",
    rating: 5,
    visible: true,
  },
  {
    id: 3,
    name: "Sneha Deshpande",
    eventType: "Corporate Annual Day",
    quote:
      "The stage design genuinely surprised our leadership team. Coordination on event day was calm and completely reliable.",
    rating: 5,
    visible: true,
  },
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    name: "Rohit Patil",
    phone: "+91 98220 11223",
    email: "rohit.patil@example.com",
    eventType: "Birthday Party",
    eventDate: "2026-09-14",
    venue: "Kharadi, Pune",
    budget: "₹1,00,000 - ₹2,50,000",
    message: "Looking for a themed 5th birthday setup for around 80 guests.",
    status: "New",
    createdAt: "2026-08-20",
  },
  {
    id: 2,
    name: "Meera Joshi",
    phone: "+91 99700 45612",
    email: "meera.joshi@example.com",
    eventType: "Engagement",
    eventDate: "2026-11-02",
    venue: "Baner, Pune",
    budget: "₹2,50,000 - ₹5,00,000",
    message: "Floral mandap with candlelight, roughly 200 guests.",
    status: "Contacted",
    createdAt: "2026-08-17",
  },
  {
    id: 3,
    name: "Nikhil Rane",
    phone: "+91 90045 78899",
    email: "nikhil.rane@example.com",
    eventType: "Corporate Event",
    eventDate: "2026-10-08",
    venue: "Hinjawadi, Pune",
    budget: "₹5,00,000+",
    message: "Annual day for 600 employees, need stage and AV production.",
    status: "Completed",
    createdAt: "2026-07-29",
  },
  {
    id: 4,
    name: "Anjali Mehta",
    phone: "+91 88881 23344",
    email: "anjali.mehta@example.com",
    eventType: "Retail Launch",
    eventDate: "2026-09-30",
    venue: "Viman Nagar, Pune",
    budget: "₹1,00,000 - ₹2,50,000",
    message: "Boutique opening, want a premium entrance and photo wall.",
    status: "New",
    createdAt: "2026-08-24",
  },
];

export const initialHero: Hero = {
  eyebrow: "We create moments that people remember",
  title: "Where Every Event Becomes a",
  highlight: "Dream.",
  description:
    "From intimate celebrations to large-scale experiential events, Dream Factory Events brings creative concepts, flawless execution and unforgettable experiences together under one roof.",
  primaryCta: "Explore Our Work",
  secondaryCta: "Plan Your Event",
  image: heroEvent,
};

export const initialAbout: About = {
  label: "The Dream Factory Experience",
  heading: "We Don't Just Plan Events. We Build Experiences.",
  description:
    "Dream Factory Events is a Pune-based event management and decor studio. We handle creative concepts, themed fabrication, styling, entertainment curation, vendor coordination and on-ground execution — so a single team carries your event from the first sketch to the final curtain call.",
  image: aboutTeam,
  highlights: [
    { title: "Creative Concepts", text: "Original themes designed around your occasion." },
    { title: "Complete Execution", text: "From fabrication to final setup, everything coordinated." },
    { title: "Experience Design", text: "Spaces designed to create memorable moments." },
    { title: "Seamless Coordination", text: "Reliable vendor and event-day management." },
  ],
  stats: [
    { label: "Events Executed", value: 150, suffix: "+" },
    { label: "Creative Themes", value: 50, suffix: "+" },
    { label: "Brand Experiences", value: 25, suffix: "+" },
    { label: "Commitment", value: 100, suffix: "%" },
  ],
};

export const initialSettings: Settings = {
  businessName: "Dream Factory Events",
  phone1: "+91 84466 11477",
  phone2: "+91 90350 92985",
  email: "info@dreamfactoryevents.co",
  address:
    "Office No. 4, Shree Krishna Complex, S. No. 38/4, Mundhwa-Kharadi Road, Yashwant Nagar, Kharadi, Pune, Maharashtra 411014",
  whatsapp: "918446611477",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const processSteps = [
  { no: "01", title: "Understand", text: "We listen to your occasion, guest profile, venue and budget." },
  { no: "02", title: "Imagine", text: "Themes, moodboards and concept directions built for your story." },
  { no: "03", title: "Design", text: "Layouts, renders and material choices finalised in detail." },
  { no: "04", title: "Create", text: "In-house fabrication, floral work, lighting and printing." },
  { no: "05", title: "Execute", text: "Install, coordinate vendors and run the day flawlessly." },
];

export const whyPoints = [
  "Creative event concepts",
  "Customized themes",
  "Professional fabrication",
  "Reliable vendor coordination",
  "End-to-end execution",
  "Attention to detail",
  "Scalable event production",
  "Pune-based event expertise",
];
