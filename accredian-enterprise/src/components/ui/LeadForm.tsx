"use client";

import React, { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  teamSize: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  designation: "",
  teamSize: "10-25 learners",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LeadForm = memo(() => {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Valid work email is required";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = "Valid phone number is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setServerError(result.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setServerError("Network error submitting form. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-emerald-200 shadow-xl text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900">
          Enquiry Received!
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Accredian Enterprise. Our Learning Solutions Consultant will contact you within 2 business hours.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSubmitSuccess(false)}
        >
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl space-y-4 text-left"
    >
      <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
        Request Enterprise Consultation
      </h3>

      {serverError && (
        <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
          {serverError}
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name ? "border-red-500 bg-red-50/20" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email ? "border-red-500 bg-red-50/20" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lead-company" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-company"
            type="text"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.company ? "border-red-500 bg-red-50/20" : "border-gray-300"
            }`}
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>
      </div>

      {/* Row 3: Designation & Team Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-designation" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Job Title / Role
          </label>
          <input
            id="lead-designation"
            type="text"
            name="designation"
            autoComplete="organization-title"
            value={formData.designation}
            onChange={handleChange}
            placeholder="VP of Engineering / HR Director"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lead-teamsize" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Expected Cohort Size
          </label>
          <select
            id="lead-teamsize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="5-10 learners">5-10 learners</option>
            <option value="10-25 learners">10-25 learners</option>
            <option value="25-50 learners">25-50 learners</option>
            <option value="50+ enterprise rollout">50+ enterprise rollout</option>
          </select>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label htmlFor="lead-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Learning Goals / Program Requirements
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your team's upskilling goals, specific domain focus (GenAI, Product, Data), or preferred schedule..."
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
});

LeadForm.displayName = "LeadForm";
