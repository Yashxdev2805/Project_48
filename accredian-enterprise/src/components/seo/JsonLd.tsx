import React from "react";
import { enterpriseData } from "@/lib/data/enterprise";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://enterprise.accredian.com";

  // 1. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#organization`,
    name: "Accredian Enterprise",
    url: baseUrl,
    logo: `${baseUrl}/images/hero_badge_3d.png`,
    description:
      "Transform your organization with customized learning programs in Product Management, Generative AI, Data Science, and Leadership.",
    sameAs: [
      "https://www.linkedin.com/company/accredian/",
      "https://twitter.com/accredian",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8047189252",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  };

  // 2. FAQPage Schema for Google Rich Search Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: enterpriseData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 3. Educational Programs / Courses Schema
  const coursesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: enterpriseData.domains.map((domain, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: `${domain.title} Enterprise Training`,
        description: domain.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "Accredian Enterprise",
          sameAs: baseUrl,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online / Hybrid Enterprise Cohort",
          instructor: {
            "@type": "Person",
            name: "Top 1% Industry Practitioners",
          },
        },
      },
    })),
  };

  // 4. WebSite & Navigation Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Accredian Enterprise Upskilling",
    description: enterpriseData.hero.subtitle,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
