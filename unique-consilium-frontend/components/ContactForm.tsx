"use client";

import { useRef, useState } from 'react';
import { Button, Form, Stack, TextArea, TextInput, InlineNotification } from '@carbon/react';
import { contactSchema, type ContactFormInput } from '@/utils/formSchema';

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormInput>({ name: '', email: '', phone: undefined, message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const onChange = (field: keyof ContactFormInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitting(true);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormInput;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);

      const first = Object.keys(fieldErrors)[0] as keyof ContactFormInput | undefined;
      if (first) {
        if (first === 'name') nameRef.current?.focus();
        else if (first === 'email') emailRef.current?.focus();
        else if (first === 'message') messageRef.current?.focus();
      }
      setSubmitting(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
      // move focus to success message for SR announcement
      requestAnimationFrame(() => successRef.current?.focus());
  // optionally clear form
  setValues({ name: '', email: '', phone: undefined, message: '' });
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="uc-stack-06" noValidate aria-busy={submitting}>
      {submitted && (
        <div ref={successRef} role="status" aria-live="polite" tabIndex={-1}>
          <InlineNotification
            kind="success"
            title="Message sent"
            subtitle="We'll get back to you shortly."
            lowContrast
            onCloseButtonClick={() => { setSubmitted(false); requestAnimationFrame(() => nameRef.current?.focus()); }}
          />
        </div>
      )}

      <Stack gap={6}>
        <TextInput
          id="name"
          labelText="Name"
          placeholder="Your full name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={onChange('name')}
          invalid={Boolean(errors.name)}
          invalidText={errors.name}
          ref={nameRef}
          disabled={submitting}
          required
        />

        <TextInput
          id="email"
          labelText="Email"
          type="email"
          placeholder="you@example.com"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange('email')}
          invalid={Boolean(errors.email)}
          invalidText={errors.email}
          ref={emailRef}
          disabled={submitting}
          required
        />

        <TextArea
          id="message"
          labelText="Message"
          placeholder="How can we help?"
          name="message"
          autoComplete="off"
          value={values.message}
          onChange={onChange('message')}
          invalid={Boolean(errors.message)}
          invalidText={errors.message}
          rows={6}
          ref={messageRef}
          disabled={submitting}
          required
        />

        <div>
          <Button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send'}</Button>
        </div>
      </Stack>
    </Form>
  );
}
