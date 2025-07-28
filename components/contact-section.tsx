"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  MessageSquare,
  Briefcase,
  Star,
  ArrowRight,
  Phone,
  Video,
  Globe,
} from "lucide-react";

export function ContactSection() {
  const [formType, setFormType] = useState<"quick" | "project">("quick");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
    meetingPreference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xvoejvvz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          formType,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
          projectType: "",
          budget: "",
          timeline: "",
          meetingPreference: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormType("quick");
    setFormState({
      name: "",
      email: "",
      company: "",
      message: "",
      projectType: "",
      budget: "",
      timeline: "",
      meetingPreference: "",
    });
    setSubmitStatus("idle");
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechFlow",
      content:
        "Exceptional work and lightning-fast delivery. Highly recommended!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "CEO at InnovateCorp",
      content: "Professional, creative, and delivered beyond our expectations.",
      rating: 5,
    },
  ];

  const responseTime = {
    quick: "Usually within 2-4 hours",
    project: "Within 24 hours with detailed proposal",
  };

  return (
    <section id="contact" className="py-8 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Response Time Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-left md:text-center mb-12 mt-16"
        >
          <h2 className="text-3xl md:text-6xl font-bold font-montserrat mb-4 ">
            Let's Work Together
          </h2>
          <div className="flex items-left md:items-center  justify-left md:justify-center space-x-2 mb-6 mt-6">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">
              {responseTime[formType]}
            </span>
            <Badge
              variant="secondary"
              className="bg-green-500/10 text-green-500"
            >
              Online
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-32">
          {/* Left Column - Contact Info & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-6">
                Whether you have a quick question or a complex project, I'm here
                to help bring your ideas to life.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center group">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <a
                    href="mailto:moh@mohkromah.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    lhkromah@gmail.com
                  </a>
                </div>
              </div>

              {/* Multi-Channel Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <Button
                  variant="outline"
                  className="justify-start h-auto py-3 px-4"
                  onClick={() =>
                    window.open("https://calendly.com/your-link", "_blank")
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Schedule Call</div>
                    <div className="text-xs text-muted-foreground">
                      15-30 min slots
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto py-3 px-4"
                  onClick={() =>
                    window.open("https://meet.google.com/your-link", "_blank")
                  }
                >
                  <Video className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium text-sm">Quick Video Chat</div>
                    <div className="text-xs text-muted-foreground">
                      Available now
                    </div>
                  </div>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                <a
                  href="https://github.com/Eyalhamork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/layee-kromah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Client Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Client Feedback
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4"
                  >
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      "{testimonial.content}"
                    </p>
                    <div className="text-xs">
                      <span className="font-medium">{testimonial.name}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        • {testimonial.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-card/30 backdrop-blur-sm border border-[#1b182d] rounded-xl p-6"
          >
            {/* Form Type Selector */}
            <div className="flex space-x-2 mb-6 p-1 bg-background/50 rounded-lg">
              <button
                onClick={() => setFormType("quick")}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  formType === "quick"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Quick Message
              </button>
              <button
                onClick={() => setFormType("project")}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  formType === "project"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Project Brief
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={formType}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Common Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-background/50 border-[#1b182d]"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-background/50 border-[#1b182d]"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Project Brief Additional Fields */}
                  {formType === "project" && (
                    <>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium mb-1"
                        >
                          Company/Organization
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className="bg-background/50 border-[#1b182d]"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Project Type
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("projectType", value)
                            }
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="bg-background/50 border-[#1b182d]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">
                                Website Development
                              </SelectItem>
                              <SelectItem value="webapp">
                                Web Application
                              </SelectItem>
                              <SelectItem value="mobile">Mobile App</SelectItem>
                              <SelectItem value="ecommerce">
                                E-commerce
                              </SelectItem>
                              <SelectItem value="redesign">
                                Redesign/Optimization
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Budget Range
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("budget", value)
                            }
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="bg-background/50 border-[#1b182d]">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-5k">
                                Under $5,000
                              </SelectItem>
                              <SelectItem value="5k-15k">
                                $5,000 - $15,000
                              </SelectItem>
                              <SelectItem value="15k-30k">
                                $15,000 - $30,000
                              </SelectItem>
                              <SelectItem value="30k-plus">$30,000+</SelectItem>
                              <SelectItem value="discuss">
                                Let's discuss
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Timeline
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("timeline", value)
                            }
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="bg-background/50 border-[#1b182d]">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP (Rush)</SelectItem>
                              <SelectItem value="1-month">
                                Within 1 month
                              </SelectItem>
                              <SelectItem value="2-3-months">
                                2-3 months
                              </SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Preferred Meeting
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("meetingPreference", value)
                            }
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="bg-background/50 border-[#1b182d]">
                              <SelectValue placeholder="How to meet" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video-call">
                                Video Call
                              </SelectItem>
                              <SelectItem value="phone-call">
                                Phone Call
                              </SelectItem>
                              <SelectItem value="email">Email Only</SelectItem>
                              <SelectItem value="in-person">
                                In Person
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={
                        formType === "project"
                          ? "Tell me about your project goals, requirements, and any specific features you need..."
                          : "Your message..."
                      }
                      required
                      className="min-h-[120px] bg-background/50 border-[#1b182d]"
                      disabled={isSubmitting}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between space-x-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">
                        {formType === "project"
                          ? "Project brief received! I'll send a detailed proposal within 24 hours."
                          : "Message sent successfully! I'll get back to you soon."}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetForm}
                      className="text-green-600 hover:text-green-700"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">
                      Failed to send message. Please try again or email me
                      directly.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                    {formType === "project"
                      ? "Send Project Brief"
                      : "Send Message"}
                  </>
                )}
              </Button>

              {formType === "project" && !isSubmitting && (
                <p className="text-xs text-muted-foreground text-center">
                  I'll review your project brief and respond with a detailed
                  proposal including timeline, deliverables, and next steps.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
