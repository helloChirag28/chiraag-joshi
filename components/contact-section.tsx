"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify EmailJS configuration
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    console.log('EmailJS Configuration:');
    console.log('Public Key:', publicKey ? '✓ Set' : '✗ Missing');
    console.log('Service ID:', serviceId ? '✓ Set' : '✗ Missing');
    console.log('Template ID:', templateId ? '✓ Set' : '✗ Missing');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Attempting to send email...');
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          to_email: 'chiraag414@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        }
      );
      console.log('Email sent successfully:', result);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Get in Touch</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Email</h3>
                  <p className="text-sm md:text-base text-muted-foreground">chiraag414@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Let&apos;s Talk</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    I&apos;m always open for new opportunities and interesting projects.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 md:h-11 text-sm md:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[120px] md:min-h-[150px] text-sm md:text-base resize-none"
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-10 md:h-11 text-sm md:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;