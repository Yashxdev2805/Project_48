"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { enterpriseData } from "@/lib/data/enterprise";
import { useComingSoon } from "@/components/ui/ComingSoonModal";

export const Footer = memo(() => {
  const { contact } = enterpriseData;
  const { triggerComingSoon } = useComingSoon();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center font-extrabold text-2xl text-white">
              <span className="text-blue-500">Accredian</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 rounded-md">
                Enterprise
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering organizations to build future-ready workforces with customized
              learning programs in Product Management, Generative AI, Data Science, and Executive Leadership.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 items-center">
              <button
                type="button"
                onClick={() =>
                  triggerComingSoon(
                    "Enterprise Single Sign-On (SSO / SAML)",
                    "Okta, Microsoft Entra ID, and Google Workspace SAML 2.0 integration requires production deployment credentials."
                  )
                }
                className="px-2.5 py-1 text-[11px] font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 transition-colors flex items-center gap-1.5"
              >
                <span>🔑 SSO Login</span>
                <span className="text-[9px] text-amber-400 font-bold">Soon</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerComingSoon(
                    "SOC-2 & ISO 27001 Security Audit",
                    "Security compliance documentation & SOC-2 Type II audit packages will be accessible in the production enterprise portal."
                  )
                }
                className="px-2.5 py-1 text-[11px] font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 transition-colors flex items-center gap-1.5"
              >
                <span>🛡️ Security Audit</span>
                <span className="text-[9px] text-amber-400 font-bold">Soon</span>
              </button>
            </div>
            <div className="pt-2 text-xs text-gray-500">
              © {currentYear} Accredian Enterprise. All rights reserved.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {enterpriseData.navLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Domain Programs */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Key Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {enterpriseData.domains.slice(0, 5).map((domain) => (
                <li key={domain.id}>
                  <a
                    href="#domains"
                    className="text-gray-400 hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {domain.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Enterprise Team
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-semibold">Email:</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-semibold">Phone:</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="text-xs text-gray-500 leading-normal pt-1">
                {contact.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            Designed with precision for Accredian Enterprise Upskilling.
          </div>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#home" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-gray-400 transition-colors">
              Enquire
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
});

Footer.displayName = "Footer";
