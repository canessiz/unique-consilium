"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, TextInput, PasswordInput, Button } from '@carbon/react';

export default function ManufacturerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    console.log({ email, password, role: 'manufacturer' });
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <main id="main-content" className="cds--grid uc-page">
      {/* Breadcrumb */}
      <div className="cds--row">
        <div className="cds--col">
          <Breadcrumb noTrailingSlash aria-label="Breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>Manufacturer Login</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Heading + Intro */}
      <div className="cds--row">
        <div className="cds--col">
          <h1 className="cds--expressive-heading-05">Manufacturer Login</h1>
          <p className="cds--body-long-01">Sign in to access manufacturer resources and manage your projects.</p>
        </div>
      </div>

      {/* Form centered on large screens */}
      <div className="cds--row">
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-8">
          <form onSubmit={onSubmit} className="uc-stack-06" noValidate aria-busy={submitting}>
            <TextInput
              id="email"
              type="email"
              labelText="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={submitting}
              required
            />

            <PasswordInput
              id="password"
              labelText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={submitting}
              required
            />

            <div>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </div>

            <p className="cds--body-short-01">
              Need help? <Link className="cds--link" href="/contact">Contact us</Link>
            </p>
          </form>
        </div>
        <div className="cds--col cds--col-lg-4" aria-hidden="true" />
      </div>
  </main>
  );
}
