"use client";

import {
  forwardRef,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { CheckCircle2, ChevronDown, HelpCircle, Mail, Send, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { serviceOptions } from "./data";
import type { FormData, FormErrors } from "./types";

type EnquiryFormProps = {
  formRef: RefObject<HTMLDivElement | null>;
  nameInputRef: RefObject<HTMLInputElement | null>;
  formData: FormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (event: FormEvent) => void;
  onReset: () => void;
};

export function EnquiryForm({
  formRef,
  nameInputRef,
  formData,
  formErrors,
  isSubmitting,
  isSubmitted,
  onChange,
  onSubmit,
  onReset,
}: EnquiryFormProps) {
  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="lg:col-span-5"
    >
      <div className="rounded-[2rem] border border-white/10 bg-white p-4 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-700">
              <Send className="size-3.5" /> Project Enquiry
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">
              Tell us what you need
            </h2>
            <p className="mt-1 text-sm leading-6 text-neutral-500">
              Send the basics and our team will reply with a useful next step.
            </p>
          </div>
          <HelpCircle className="mt-1 size-5 shrink-0 text-neutral-400" />
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  ref={nameInputRef}
                  icon={<User className="size-4" />}
                  label="Full name*"
                  name="name"
                  value={formData.name}
                  error={formErrors.name}
                  placeholder="Enter Name"
                  onChange={onChange}
                />
                <TextField
                  icon={<Mail className="size-4" />}
                  label="Email address*"
                  name="email"
                  type="email"
                  value={formData.email}
                  error={formErrors.email}
                  placeholder="Enter Email"
                  onChange={onChange}
                />
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Subject*
                </span>
                <span className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={onChange}
                    className={`w-full cursor-pointer appearance-none rounded-xl bg-[#f4f4f4] px-4 py-3.5 text-sm text-neutral-900 outline-none transition-all focus:bg-white ${
                      formErrors.subject
                        ? "border border-red-500"
                        : "border border-transparent focus:border-neutral-300"
                    }`}
                  >
                    <option value="">Select One</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                </span>
                {formErrors.subject && <ErrorText>{formErrors.subject}</ErrorText>}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  What We Can Help You
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={4}
                  className={`w-full resize-none rounded-xl bg-[#f4f4f4] px-4 py-3 text-sm text-neutral-900 outline-none transition-all focus:bg-white ${
                    formErrors.message
                      ? "border border-red-500"
                      : "border border-transparent focus:border-neutral-300"
                  }`}
                />
                {formErrors.message && <ErrorText>{formErrors.message}</ErrorText>}
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-4 text-center text-xs font-extrabold uppercase tracking-widest text-black shadow-md transition-all duration-150 hover:bg-[#b0d820] active:scale-[0.98] disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>
            </motion.form>
          ) : (
            <SuccessState formData={formData} onReset={onReset} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

type TextFieldProps = {
  icon: ReactNode;
  label: string;
  name: keyof Pick<FormData, "name" | "email">;
  value: string;
  error?: string;
  type?: string;
  placeholder: string;
  onChange: EnquiryFormProps["onChange"];
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { icon, label, name, value, error, type = "text", placeholder, onChange },
    ref,
  ) => (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
        {label}
      </span>
      <span className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          {icon}
        </span>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl bg-[#f4f4f4] py-3.5 pl-11 pr-4 text-sm text-neutral-900 outline-none transition-all focus:bg-white ${
            error
              ? "border border-red-500"
              : "border border-transparent focus:border-neutral-300"
          }`}
        />
      </span>
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  ),
);
TextField.displayName = "TextField";

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-medium text-red-500">{children}</p>;
}

function SuccessState({
  formData,
  onReset,
}: {
  formData: FormData;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center gap-6 py-10 text-center"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="size-10" />
      </div>
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-neutral-900">
          Enquiry Received!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Thank you for reaching out,{" "}
          <span className="font-bold text-neutral-800">{formData.name}</span>.
          Our dedicated PM will review your inquiry about{" "}
          <span className="font-semibold text-neutral-800">
            {formData.subject}
          </span>{" "}
          and email you at{" "}
          <span className="font-medium text-neutral-800">{formData.email}</span>{" "}
          within 2 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="cursor-pointer rounded-xl bg-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
      >
        Submit another enquiry
      </button>
    </motion.div>
  );
}
