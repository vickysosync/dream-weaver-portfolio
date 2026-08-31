import { useState, type FormEvent } from "react";
import { useData } from "@/lib/store";
import { Button, Field, inputClass } from "./ui";
import { Check } from "./icons";

const empty = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  venue: "",
  budget: "",
  message: "",
};

type Values = typeof empty;

const eventTypes = [
  "Birthday Party",
  "Engagement",
  "Wedding",
  "Corporate Event",
  "Retail Launch",
  "Product Launch",
  "Festive Decor",
  "Other",
];

const budgets = [
  "Under ₹1,00,000",
  "₹1,00,000 - ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "₹5,00,000+",
];

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.trim().length > 100) e.name = "Name must be under 100 characters.";
  if (!/^[+\d][\d\s-]{7,17}$/.test(v.phone.trim()))
    e.phone = "Enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.eventType) e.eventType = "Select an event type.";
  if (!v.eventDate) e.eventDate = "Select your event date.";
  if (!v.venue.trim()) e.venue = "Tell us the venue or location.";
  if (v.message.trim().length > 1000) e.message = "Message must be under 1000 characters.";
  return e;
}

export function EnquiryForm() {
  const { addEnquiry } = useData();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addEnquiry(values);
    setValues(empty);
    setSent(true);
    window.setTimeout(() => setSent(false), 8000);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="glass-card rounded-3xl p-7 sm:p-9">
      {sent ? (
        <p
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-foreground"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          Thank you! Your event enquiry has been received. Our team will connect with
          you shortly.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            className={inputClass}
            value={values.name}
            onChange={set("name")}
            maxLength={100}
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={values.phone}
            onChange={set("phone")}
            placeholder="+91 00000 00000"
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={values.email}
            onChange={set("email")}
            maxLength={255}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Event Type" htmlFor="eventType" error={errors.eventType}>
          <select
            id="eventType"
            className={inputClass}
            value={values.eventType}
            onChange={set("eventType")}
          >
            <option value="">Select event type</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event Date" htmlFor="eventDate" error={errors.eventDate}>
          <input
            id="eventDate"
            type="date"
            className={inputClass}
            value={values.eventDate}
            onChange={set("eventDate")}
          />
        </Field>
        <Field label="Venue / Location" htmlFor="venue" error={errors.venue}>
          <input
            id="venue"
            className={inputClass}
            value={values.venue}
            onChange={set("venue")}
            maxLength={150}
            placeholder="Venue or area"
          />
        </Field>
        <Field label="Estimated Budget" htmlFor="budget">
          <select
            id="budget"
            className={inputClass}
            value={values.budget}
            onChange={set("budget")}
          >
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" htmlFor="message" error={errors.message}>
            <textarea
              id="message"
              rows={4}
              className={inputClass}
              value={values.message}
              onChange={set("message")}
              maxLength={1000}
              placeholder="Tell us about your event idea…"
            />
          </Field>
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto">
        Send Event Enquiry
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        Demo website — enquiries are stored locally in your browser only.
      </p>
    </form>
  );
}
