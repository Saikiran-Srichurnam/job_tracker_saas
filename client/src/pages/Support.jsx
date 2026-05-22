import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Support() {
  const form = useRef();
  const navigate = useNavigate();
  const handleCloseBtn = () => {
    navigate("/dashboard");
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tx6ba6r",
        "template_a8u2o5d",
        form.current,
        "XlKpY6oPiDUUgqO4H",
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        () => {
          toast.error("Something went wrong!");
        },
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] px-6 py-12">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-white/10">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-3">
          Support Center
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Need help with JobTrack Pro? Send us your query and we’ll get back to
          you soon.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="user_name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="user_email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              required
              placeholder="Enter subject"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Message
            </label>

            <textarea
              name="message"
              rows="6"
              required
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p>Email: support@jobtrackpro.com</p>
          <p className="mt-1">Usually responds within 24 hours</p>
        </div>
        <div className="space-y-3 pt-6 border-t border-white/10">
          <button
            onClick={() => handleCloseBtn()}
            className="w-full bg-red-500/20 hover:bg-red-500/80 text-red-600 dark:text-white transition-all duration-300 py-3 rounded-xl font-medium hover:scale-[1.02]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Support;
