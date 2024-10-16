// pages/index.js
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaRocket,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";

const HomePage = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll detection
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // User is scrolling down
      setIsNavbarVisible(false);
    } else {
      // User is scrolling up
      setIsNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="bg-white text-gray-900">
      {/* Floating Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 bg-transparent backdrop-blur-md">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">CodeGen</div>

          {/* Navigation Links */}
          {/* <div className="hidden md:flex space-x-6">
            <div className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md animate-fade-up delay-200">
              <Link href="/pricing" legacyBehavior>
                <a className="hover:text-gray-300 transition-all">Pricing</a>
              </Link>

              <Link href="/services" legacyBehavior>
                <a className="hover:text-gray-300 transition-all">Services</a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="hover:text-gray-300 transition-all">Contact</a>
              </Link>
            </div>
          </div> */}
          <Link href="/login" legacyBehavior>
            <a className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all transform hover:scale-105">
              Login
            </a>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white text-center px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 pointer-events-none"></div>
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 h-96 w-96 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 right-1/2 transform translate-x-1/2 h-80 w-80 bg-purple-500 opacity-30 rounded-full blur-2xl"></div>

        {/* Hero Content */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fade-up">
          Welcome to the Future of Web Development
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md animate-fade-up delay-200">
          Modern tools and designs to elevate your online presence.
        </p>
        <div className="flex space-x-4">
          <Link href="/upload" legacyBehavior>
            <a className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all transform hover:scale-105">
              Get Started
            </a>
          </Link>
          <Link href="/learn-more" legacyBehavior>
            <a className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
              Learn More
            </a>
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800 animate-fade-up">
            Our Latest Projects
          </h2>
          <p className="text-lg mb-12 text-gray-600 max-w-xl mx-auto animate-fade-up delay-200">
            Discover the cutting-edge projects we’ve developed recently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Project 1 */}
            <div className="relative p-8 bg-white shadow-2xl rounded-lg overflow-hidden group transition-all transform hover:scale-105 hover:shadow-3xl">
              <img
                src="/images/project1.png"
                alt="Project 1"
                className="mx-auto mb-6 h-40 w-full object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Project One
              </h3>
              <p className="text-gray-600 mb-6">
                A feature-rich e-commerce platform designed for seamless user
                experience.
              </p>
              <a
                href="#"
                className="inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                View Project
              </a>
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-30 transition-all"></div>
            </div>

            {/* Project 2 */}
            <div className="relative p-8 bg-white shadow-2xl rounded-lg overflow-hidden group transition-all transform hover:scale-105 hover:shadow-3xl">
              <img
                src="/images/project2.png"
                alt="Project 2"
                className="mx-auto mb-6 h-40 w-full object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Project Two
              </h3>
              <p className="text-gray-600 mb-6">
                A mobile-first web application built with modern UI frameworks.
              </p>
              <a
                href="#"
                className="inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                View Project
              </a>
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-30 transition-all"></div>
            </div>

            {/* Project 3 */}
            <div className="relative p-8 bg-white shadow-2xl rounded-lg overflow-hidden group transition-all transform hover:scale-105 hover:shadow-3xl">
              <img
                src="/images/project3.png"
                alt="Project 3"
                className="mx-auto mb-6 h-40 w-full object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Project Three
              </h3>
              <p className="text-gray-600 mb-6">
                An AI-powered solution for automating business processes.
              </p>
              <a
                href="#"
                className="inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                View Project
              </a>
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-30 transition-all"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 animate-fade-up">
            Our Core Features
          </h2>
          <p className="text-lg mb-12 text-gray-600 max-w-xl mx-auto animate-fade-up delay-200">
            Everything you need to create the perfect web experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="relative p-8 bg-white shadow-xl rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl group">
              <div className="bg-blue-500 rounded-full w-20 h-20 mx-auto flex justify-center items-center mb-6 transition-transform transform group-hover:rotate-12">
                <FaRocket className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Codebase Display
              </h3>
              <p className="text-gray-600 mb-4">
                Browse the entire project codebase like a code editor, complete
                with an intuitive file structure.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-20 transition-all rounded-lg"></div>
            </div>

            {/* Feature 2 */}
            <div className="relative p-8 bg-white shadow-xl rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl group">
              <div className="bg-green-500 rounded-full w-20 h-20 mx-auto flex justify-center items-center mb-6 transition-transform transform group-hover:rotate-12">
                <FaCogs className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Fully Customizable
              </h3>
              <p className="text-gray-600 mb-4">
                Tailor the platform to meet your specific business needs with
                ease.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-all rounded-lg"></div>
            </div>

            {/* Feature 3 */}
            <div className="relative p-8 bg-white shadow-xl rounded-lg transition-all transform hover:scale-105 hover:shadow-2xl group">
              <div className="bg-red-500 rounded-full w-20 h-20 mx-auto flex justify-center items-center mb-6 transition-transform transform group-hover:rotate-12">
                <FaShieldAlt className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Top-tier Security
              </h3>
              <p className="text-gray-600 mb-4">
                We employ advanced security features to protect your data and
                ensure privacy.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-all rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg mb-12 text-gray-600">
            Choose the plan that’s right for your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Basic Plan */}
            <div className="relative p-8 bg-white shadow-lg rounded-xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
              <p className="text-5xl font-bold mb-6">$9.99</p>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>Basic Features</li>
                <li>Email Support</li>
                <li>5 GB Storage</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                Choose Basic
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative p-8 bg-indigo-600 text-white shadow-lg rounded-xl transform hover:scale-105 transition-all duration-300">
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 bg-yellow-500 text-sm text-white py-1 px-4 rounded-full">
                Most Popular
              </span>
              <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
              <p className="text-5xl font-bold mb-6">$19.99</p>
              <ul className="mb-8 space-y-2">
                <li>All Basic Features</li>
                <li>Priority Support</li>
                <li>50 GB Storage</li>
              </ul>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all">
                Choose Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="relative p-8 bg-white shadow-lg rounded-xl transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">Enterprise Plan</h3>
              <p className="text-5xl font-bold mb-6">$49.99</p>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>All Pro Features</li>
                <li>Dedicated Support</li>
                <li>Unlimited Storage</li>
              </ul>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                Choose Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Branding and Description */}
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-semibold">CodeGen</h2>
            <p className="text-gray-400">
              Building innovative and user-friendly web applications to boost
              your online presence. Stay connected and grow your business with
              us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Subscribe</h3>
            <p className="text-gray-400">
              Join our newsletter to stay updated on the latest news and offers.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 rounded-lg w-full focus:ring focus:ring-indigo-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-700 pt-6 px-6 text-center md:text-left">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Modern Web App. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-10 pointer-events-none"></div>
      </footer>
    </div>
  );
};

export default HomePage;
