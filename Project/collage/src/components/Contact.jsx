import React from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div>
          <motion.p 
            className="font-medium text-orange-500 dark:text-orange-400"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Contact us
          </motion.p>

          <motion.h1 
            className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white"
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Get in touch
          </motion.h1>

          <motion.p 
            className="mt-3 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Connect with us and be a part of BB College
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block p-3 text-orange-500 rounded-full bg-orange-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly Administration is here to help.</p>
              <p className="mt-2 text-sm text-orange-500 dark:text-orange-400">bbcollege1944@gmail.com</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block p-3 text-orange-500 rounded-full bg-orange-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Come say hello at our office</p>
              <p className="mt-2 text-sm text-orange-500 dark:text-orange-400">GT Rd, Ushagram, Asansol, West Bengal India,</p>
              <p className="mt-2 text-sm text-orange-500 dark:text-orange-400">Pin- 713303,</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block p-3 text-orange-500 rounded-full bg-orange-100/80 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 4pm.</p>
              <p className="mt-2 text-sm text-orange-500 dark:text-orange-400">0341-2274842, 2275414</p>
              <p className="mt-2 text-sm text-orange-500 dark:text-orange-400">0341-2274529</p>
            </motion.div>
          </div>

          <motion.div 
            className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14615.83054781841!2d86.96467901264568!3d23.67747291100271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71ee555555555%3A0xed1b371b2dd1ddfb!2sB.B.College!5e0!3m2!1sen!2sin!4v1733077045464!5m2!1sen!2sin"
            />h
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;