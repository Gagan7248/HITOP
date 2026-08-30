import React from 'react';
import Layout from '@theme/Layout';
import {Headphones, Mail, Phone} from 'lucide-react';

export default function Support() {
  return (
    <Layout title="Support" description="HITOP Support">
      <main className="support-page">
        <div className="support-card">

          <div className="support-icon">
            <Headphones size={48} strokeWidth={1.5} />
          </div>

          <h1>SUPPORT</h1>

          <hr />

          <h2>Need Help?</h2>

          <p className="support-description">
            Can't find what you're looking for? Contact the IT Support Team.
          </p>

          <hr />

          <div className="support-contact">
            <div className="support-contact-icon email-icon">
              <Mail size={22} />
            </div>

            <div>
              <div className="support-label">Email</div>
              <a
                href="mailto:it.support@hotel.com"
                className="support-link"
              >
                it.support@hotel.com
              </a>
            </div>
          </div>

          <hr />

          <div className="support-contact">
            <div className="support-contact-icon phone-icon">
              <Phone size={22} />
            </div>

            <div>
              <div className="support-label">Phone</div>
              <span className="support-phone">
                +91 12345 67890
              </span>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}