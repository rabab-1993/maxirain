"use client";

import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import InputField, { FormFields } from "../../../components/InputField";

export default function ContactPage() {
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors: Partial<FormFields> = {};

    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.message.trim()) newErrors.message = "Required";

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error(data.error);
        }

        setToast(true);
        setForm({ name: "", email: "", phone: "", message: "" });

        setTimeout(() => setToast(false), 3000);
      } catch (error) {
        alert("Failed to send message.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* HERO */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-center">
        <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Get in touch with our team to discuss your project.
        </p>
      </section>
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className=" fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-sm ">
          Message sent successfully.
        </div>
      )}
      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* FORM */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 shadow-sm">
            <h2 className="text-2xl font-semibold mb-8 text-blue-700 dark:text-blue-400">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                name="name"
                label="Full Name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />

              <InputField
                name="email"
                label="Email Address"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />

              <InputField
                name="phone"
                label="Phone (Optional)"
                value={form.phone}
                error={errors.phone}
                onChange={handleChange}
              />

              <InputField
                name="message"
                label="Message"
                textarea
                value={form.message}
                error={errors.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full bg-blue-700 hover:bg-blue-800
                  disabled:opacity-60
                  text-white py-3 rounded-md font-medium
                  transition
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* DETAILS */}
          <div className="space-y-10">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Company Information
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Email: info@maxirain.com
                <br />
                Phone: +000 000 0000
                <br />
                Global Operations
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Location</h3>

              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.38990856914!2d44.023454174800925!3d26.21651757706902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1581e6a0cb904b37%3A0xdb4303ce626f0454!2z2LTYsdmD2Kkg2KfZhNmI2LPYp9im2YQg2KfZhNi12YbYp9i52YrYqdiMINi32LHZitmCINin2YTZgti12YrZhSDYp9mE2YXYr9mK2YbYqSDYp9mE2LPYsdmK2LnYjCDYp9mE2YXZhtiq2LLZhyDYp9mE2KzZhtmI2KjZitiMINio2LHZitiv2KkgNTIzMTU!5e0!3m2!1sar!2ssa!4v1771230329879!5m2!1sar!2ssa"
                loading="lazy"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Social</h3>

              <div className="flex gap-6">
                <Link href="#">
                  <FaLinkedin className="w-8 h-8 text-blue-900 hover:text-blue-500 transition" />
                </Link>

                <Link href="#">
                  <FaSquareXTwitter className="w-8 h-8  hover:text-blue-500 dark:text-slate-400 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
