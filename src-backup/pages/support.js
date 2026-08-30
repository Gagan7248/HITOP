import React from 'react';
import Layout from '@theme/Layout';
import {Headphones, Mail, Phone} from 'lucide-react';

export default function Support() {
  return (
    <Layout title="Support" description="HITOP Support">
      <main className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-md w-full p-10 text-center">
          <div className="flex justify-center mb-4">
            <Headphones size={48} className="text-blue-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6 tracking-wide">
            SUPPORT
          </h1>
          <hr className="border-gray-200 mb-6" />

          <h2 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h2>
          <p className="text-gray-500 mb-6">
            Can't find what you're looking for? Contact the IT Support Team.
          </p>
          <hr className="border-gray-200 mb-6" />

          <div className="flex items-center gap-4 mb-6 text-left">
            <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
              <Mail className="text-blue-600" size={22} />
            </div>
            <div>
              <div className="font-bold text-gray-900">Email</div>
              <a href="mailto:it.support@hotel.com" className="text-blue-600 no-underline">it.support@hotel.com</a>
            </div>
          </div>
          <hr className="border-gray-200 mb-6" />

          <div className="flex items-center gap-4 text-left">
            <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
              <Phone className="text-green-600" size={22} />
            </div>
            <div>
              <div className="font-bold text-gray-900">Phone</div>
              <span className="text-gray-900">+91 12345 67890</span>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}