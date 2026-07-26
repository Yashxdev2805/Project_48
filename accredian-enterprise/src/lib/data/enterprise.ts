import { EnterpriseData } from "@/lib/types";

export const enterpriseData: EnterpriseData = {
  navLinks: [
    { id: "home", label: "Home", href: "#home" },
    { id: "stats", label: "Track Record", href: "#stats" },
    { id: "clients", label: "Partners", href: "#clients" },
    { id: "edge", label: "Accredian Edge", href: "#edge" },
    { id: "domains", label: "Domains", href: "#domains" },
    { id: "cat", label: "CAT Framework", href: "#cat" },
    { id: "how-it-works", label: "How It Works", href: "#how-it-works" },
    { id: "faqs", label: "FAQs", href: "#faqs" },
    { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  ],

  hero: {
    badge: "Enterprise Learning & Workforce Upskilling",
    title: "Next-Gen Enterprise Upskilling for",
    titleHighlight: "High-Growth Teams",
    subtitle:
      "Transform your organization with customized learning programs in Product Management, Generative AI, Data Science, and Leadership designed by top industry veterans.",
    bullets: [
      "Customized Curriculum Tailored to Enterprise Goals",
      "Live Practitioner-Led Sessions by Top 1% Industry Experts",
      "Measurable Business ROI & Skill Competency Indexing",
      "Flexible Executive Format & Dedicated Account Management",
    ],
    ctaText: "Enquire Now for Enterprise",
    secondaryCtaText: "Explore Programs",
  },

  stats: [
    {
      id: "learners",
      value: 10000,
      suffix: "+",
      label: "Professionals Trained",
      description: "Upskilled across top Fortune 500 & tech enterprises globally",
    },
    {
      id: "enterprises",
      value: 200,
      suffix: "+",
      label: "Enterprise Partners",
      description: "Corporate partners driving innovation through customized training",
    },
    {
      id: "projects",
      value: 5000,
      suffix: "+",
      label: "Capstone Projects",
      description: "Real-world business solutions delivered during learning cohorts",
    },
    {
      id: "satisfaction",
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Consistently rated 4.9/5 by CXOs and HR Learning Leads",
    },
  ],

  clients: [
    {
      id: "c1",
      name: "Google",
      category: "Technology",
      logoUrl: "/images/logo_google.png",
      officialUrl: process.env.NEXT_PUBLIC_GOOGLE_URL || "https://about.google/",
    },
    {
      id: "c2",
      name: "Microsoft",
      category: "Technology",
      logoUrl: "/images/logo_microsoft.png",
      officialUrl: process.env.NEXT_PUBLIC_MICROSOFT_URL || "https://www.microsoft.com/",
    },
    {
      id: "c3",
      name: "Amazon",
      category: "E-Commerce & Cloud",
      logoUrl: "/images/logo_amazon.png",
      officialUrl: process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.aboutamazon.com/",
    },
    {
      id: "c4",
      name: "Flipkart",
      category: "E-Commerce",
      logoUrl: "/images/logo_flipkart.svg",
      officialUrl: process.env.NEXT_PUBLIC_FLIPKART_URL || "https://www.flipkart.com/",
    },
    {
      id: "c5",
      name: "Paytm",
      category: "Fintech",
      logoUrl: "/images/logo_paytm.svg",
      officialUrl: process.env.NEXT_PUBLIC_PAYTM_URL || "https://paytm.com/",
    },
    {
      id: "c6",
      name: "Swiggy",
      category: "Foodtech",
      logoUrl: "/images/logo_swiggy.svg",
      officialUrl: process.env.NEXT_PUBLIC_SWIGGY_URL || "https://www.swiggy.com/",
    },
    {
      id: "c7",
      name: "Deloitte",
      category: "Consulting",
      logoUrl: "/images/logo_deloitte.png",
      officialUrl: process.env.NEXT_PUBLIC_DELOITTE_URL || "https://www2.deloitte.com/",
    },
    {
      id: "c8",
      name: "Accenture",
      category: "Services",
      logoUrl: "/images/logo_accenture.png",
      officialUrl: process.env.NEXT_PUBLIC_ACCENTURE_URL || "https://www.accenture.com/",
    },
    {
      id: "c9",
      name: "Capgemini",
      category: "Services",
      logoUrl: "/images/logo_capgemini.svg",
      officialUrl: process.env.NEXT_PUBLIC_CAPGEMINI_URL || "https://www.capgemini.com/",
    },
    {
      id: "c10",
      name: "Razorpay",
      category: "Fintech",
      logoUrl: "/images/logo_razorpay.svg",
      officialUrl: process.env.NEXT_PUBLIC_RAZORPAY_URL || "https://razorpay.com/",
    },
  ],

  edge: [
    {
      id: "e1",
      title: "Measurable Business Impact",
      description:
        "Programs engineered around your core KPIs—ensuring direct application of skills to live enterprise projects and products.",
      icon: "TrendingUp",
      metric: "3.4x Average Program ROI",
    },
    {
      id: "e2",
      title: "Expert Guidance & Mentorship",
      description:
        "Instruction delivered exclusively by Senior Directors, VPs, and Industry Practitioners from leading tech powerhouses.",
      icon: "Award",
      metric: "Top 1% Faculty Pool",
    },
    {
      id: "e3",
      title: "Tailored Curriculum Modularization",
      description:
        "Modular course design customized to your stack, domain context, and internal competency benchmarks.",
      icon: "Sliders",
      metric: "100% Customized Content",
    },
    {
      id: "e4",
      title: "Continuous Competency Analytics",
      description:
        "Comprehensive dashboard tracking learner engagement, skill proficiency scores, and post-program application rate.",
      icon: "BarChart3",
      metric: "Real-Time HR Analytics",
    },
  ],

  domains: [
    {
      id: "d1",
      title: "Generative AI & LLMs",
      subtitle: "For Tech & Product Teams",
      description:
        "Master prompt engineering, fine-tuning LLMs, building RAG applications, and deploying enterprise GenAI workflows.",
      skills: ["Prompt Engineering", "RAG Architecture", "LangChain", "Vector Databases", "GenAI Governance"],
      icon: "Cpu",
      popular: true,
    },
    {
      id: "d2",
      title: "Product Management",
      subtitle: "From Zero to One to Scale",
      description:
        "Empower product leaders to drive product strategy, discovery, growth loops, and data-driven product analytics.",
      skills: ["Product Strategy", "User Research", "Agile Roadmap", "Product Analytics", "A/B Testing"],
      icon: "Layers",
      popular: true,
    },
    {
      id: "d3",
      title: "Data Science & AI",
      subtitle: "Advanced Analytics",
      description:
        "Build predictive machine learning models, statistical frameworks, and end-to-end data pipelines for business intelligence.",
      skills: ["Python", "Machine Learning", "Deep Learning", "Predictive Modeling", "Big Data Stack"],
      icon: "Database",
    },
    {
      id: "d4",
      title: "Executive Leadership & Digital Transformation",
      subtitle: "For CXOs & Senior Directors",
      description:
        "Equip senior leaders with the vision to drive AI transformation, organizational agility, and strategic innovation.",
      skills: ["AI Strategy", "Digital Leadership", "Change Management", "Data Governance", "Strategic Execution"],
      icon: "ShieldCheck",
    },
    {
      id: "d5",
      title: "Business Analytics & BI",
      subtitle: "Data-Driven Decision Making",
      description:
        "Transform business managers into data-fluent leaders who can craft dashboards, interpret trends, and optimize operations.",
      skills: ["SQL", "PowerBI / Tableau", "Business Metrics", "Cohort Analysis", "Data Storytelling"],
      icon: "BarChart",
    },
    {
      id: "d6",
      title: "Full-Stack Software Engineering",
      subtitle: "Modern Tech Architectures",
      description:
        "Upskill software engineers in cloud-native microservices, modern frontend frameworks, and DevOps automation.",
      skills: ["React/Next.js", "Node.js Microservices", "AWS Cloud", "Docker & Kubernetes", "System Design"],
      icon: "Code",
    },
    {
      id: "d7",
      title: "Cybersecurity & Risk Management",
      subtitle: "Enterprise Defense",
      description:
        "Proactively protect digital assets with modern threat intelligence, cloud security posture management, and compliance.",
      skills: ["Cloud Security", "Threat Modeling", "DevSecOps", "Zero Trust Architecture", "SOC Analysis"],
      icon: "Lock",
    },
  ],

  segmentation: [
    {
      id: "s1",
      title: "By Program Type",
      items: ["Executive Certification", "Bootcamps & Hackathons", "Micro-Learning Modules", "Leadership Retreats"],
    },
    {
      id: "s2",
      title: "By Industry Sector",
      items: ["Fintech & Banking", "Healthtech & Pharma", "E-Commerce & Retail", "SaaS & Enterprise Tech"],
    },
    {
      id: "s3",
      title: "By Core Topic",
      items: ["Generative AI", "Product Leadership", "Data Engineering", "Cloud Architecture"],
    },
    {
      id: "s4",
      title: "By Proficiency Level",
      items: ["Foundational Awareness", "Intermediate Execution", "Advanced Mastery", "Executive Strategic"],
    },
    {
      id: "s5",
      title: "By Target Cohort",
      items: ["Tech Teams", "Non-Tech Leaders", "Emerging Managers", "CXOs & Vice Presidents"],
    },
  ],

  audience: [
    {
      id: "a1",
      title: "Engineering & Tech Teams",
      role: "Developers, Data Engineers, Architects",
      description:
        "Hands-on technical deep dives into modern AI stacks, cloud infrastructure, and enterprise-grade software architecture.",
      keyBenefits: [
        "Accelerated tech adoption",
        "Higher code quality & velocity",
        "Seamless GenAI integration into workflows",
      ],
      icon: "Terminal",
    },
    {
      id: "a2",
      title: "Product & Growth Leaders",
      role: "Product Managers, Growth Leads, Designers",
      description:
        "Strategic and tactical frameworks to discover user needs, ship impactful features, and leverage product-led growth.",
      keyBenefits: [
        "Faster time-to-market",
        "Data-backed roadmap prioritization",
        "Increased customer retention & NPS",
      ],
      icon: "Compass",
    },
    {
      id: "a3",
      title: "Mid-Level Managers & Directors",
      role: "Engineering Managers, Business Unit Heads",
      description:
        "Bridge the gap between technology and business strategy with cross-functional leadership and data fluency.",
      keyBenefits: [
        "Enhanced cross-functional alignment",
        "Better resource allocation",
        "Agile project management execution",
      ],
      icon: "Users",
    },
    {
      id: "a4",
      title: "C-Suite & Executive VP Leadership",
      role: "CEOs, CTOs, CIOs, Chief People Officers",
      description:
        "Executive briefings and strategic workshops on navigating digital disruption, AI strategy, and workforce transformation.",
      keyBenefits: [
        "Clear AI ROI roadmap",
        "Organization-wide innovation culture",
        "Future-proof talent retention strategy",
      ],
      icon: "Zap",
    },
  ],

  catFramework: [
    {
      step: "Phase 1",
      title: "Competency Mapping & Gap Analysis",
      tagline: "Diagnose Current Capability",
      description:
        "We audit your team's current skill baselines against industry benchmarks and map them directly to organizational goals.",
      outcomes: ["Detailed Skill Matrix", "Customized Learning Taxonomy", "Target KPI Baseline"],
    },
    {
      step: "Phase 2",
      title: "Applied Action Learning & Cohorts",
      tagline: "Build Hands-on Proficiency",
      description:
        "Live interactive masterclasses led by domain leaders, complemented by real-world capstone projects using your enterprise context.",
      outcomes: ["Live Interactive Masterclasses", "Enterprise Capstone Delivery", "Peer Collaboration Labs"],
    },
    {
      step: "Phase 3",
      title: "Transformation & Impact Analytics",
      tagline: "Measure & Scale Growth",
      description:
        "Post-program evaluation and analytics to quantify skill adoption, business impact, and ongoing talent capability.",
      outcomes: ["HR Learning Analytics Report", "Individual Skill Certificates", "Post-Cohort Support & Community"],
    },
  ],

  howItWorks: [
    {
      stepNumber: 1,
      title: "Needs Assessment & Discovery",
      description:
        "Our enterprise learning consultants collaborate with your HR & Leadership teams to understand specific business imperatives and team goals.",
      details: ["Skill Gap Audit", "Role-Based Competency Indexing", "Custom Curriculum Proposal"],
    },
    {
      stepNumber: 2,
      title: "Custom Program Co-Creation",
      description:
        "We tailor the curriculum, select expert instructors, and align project capstones to your proprietary stack and business case studies.",
      details: ["Contextualized Case Studies", "Schedule & Format Selection", "Faculty Matching"],
    },
    {
      stepNumber: 3,
      title: "Cohort Execution & Analytics",
      description:
        "Seamless program delivery supported by a dedicated Learning Manager, real-time attendance, and competency dashboarding.",
      details: ["Dedicated Account Manager", "Live Interactive Masterclasses", "Impact ROI Reporting"],
    },
  ],

  faqs: [
    {
      id: "f1",
      category: "About Course",
      question: "How are Accredian's enterprise programs customized for our company?",
      answer:
        "We conduct a thorough discovery process with your leadership team to understand your domain, tech stack, and internal business objectives. Our curriculum modules are then customized, using your real data and problem statements in capstone projects.",
    },
    {
      id: "f2",
      category: "About Course",
      question: "What domains do Accredian enterprise training programs cover?",
      answer:
        "We specialize in Generative AI & LLMs, Product Management, Data Science & Machine Learning, Executive AI Leadership, Business Analytics, Full-Stack Engineering, and Cybersecurity.",
    },
    {
      id: "f3",
      category: "Delivery & Format",
      question: "What is the delivery format of the training programs?",
      answer:
        "Programs are delivered via live, instructor-led virtual sessions or hybrid formats. We also offer executive retreats and intensive weekend bootcamps depending on your organization's availability.",
    },
    {
      id: "f4",
      category: "Delivery & Format",
      question: "Who conducts the training sessions?",
      answer:
        "Sessions are led exclusively by top 1% industry practitioners—Senior Directors, VPs, and Product/AI Heads from companies like Google, Amazon, Microsoft, and leading unicorns.",
    },
    {
      id: "f5",
      category: "Enterprise & Pricing",
      question: "What is the minimum team size required for enterprise programs?",
      answer:
        "Our customized enterprise cohorts typically start from 15-20 learners up to enterprise-wide rollouts for 500+ employees across multiple locations.",
    },
    {
      id: "f6",
      category: "Enterprise & Pricing",
      question: "How do we track employee progress and program impact?",
      answer:
        "Enterprise partners receive access to a real-time HR Learning Analytics Dashboard tracking attendance, assignment scores, capstone completion, and post-training skill proficiency ratings.",
    },
  ],

  testimonials: [
    {
      id: "t1",
      name: "Rajesh Sharma",
      role: "VP of Engineering",
      company: "Leading Global Tech Firm",
      review:
        "Accredian's GenAI program transformed how our senior software team approaches AI integration. The customized capstone projects saved us months of R&D.",
      avatarInitials: "RS",
      avatarUrl: "/images/avatar_rajesh.png",
      rating: 5,
    },
    {
      id: "t2",
      name: "Priya Nair",
      role: "Head of Learning & People Development",
      company: "Top E-Commerce Enterprise",
      review:
        "The Product Management cohort tailored by Accredian brought unified language and framework consistency across our 40+ product managers. Highly recommended!",
      avatarInitials: "PN",
      avatarUrl: "/images/avatar_priya.png",
      rating: 5,
    },
    {
      id: "t3",
      name: "Amitabh Verma",
      role: "Chief Digital Officer",
      company: "Financial Services Conglomerate",
      review:
        "Accredian delivered an exceptional Executive AI Leadership workshop for our VP cohort. The faculty brought deep domain context and actionable strategic frameworks.",
      avatarInitials: "AV",
      avatarUrl: "/images/avatar_amitabh.png",
      rating: 5,
    },
  ],

  contact: {
    title: "Accelerate Your Team's Growth Today",
    subtitle:
      "Schedule a consultation with our Enterprise Learning Solutions team to co-create a tailored program for your team.",
    email: "enterprise@accredian.com",
    phone: "+91 98765 43210",
    address: "Accredian Enterprise HQ, Sector 44, Gurugram, Haryana, India",
    responsePromise: "We typically respond within 2 business hours.",
  },
};
