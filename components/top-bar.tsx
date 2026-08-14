"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClassName = (path: string) =>
    cn("link-nav", pathname === path && "link-nav-active");

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex justify-between items-center relative">
      <motion.h1
        className="text-neutral-50 text-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/">Cristian Ariza</Link>
      </motion.h1>
      {/* Desktop Navigation */}
      <div className="hidden min-[350px]:flex items-center gap-6 text-neutral-300">
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <Link href="/about" className={linkClassName("/about")}>
            About
          </Link>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <Link href="/blog" className={linkClassName("/blog")}>
            Blog
          </Link>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          <Link
            target="_blank"
            href="/resume"
            className={linkClassName("/resume")}
          >
            Resume
          </Link>
        </motion.div>
      </div>
      {/* Hamburger Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="min-[350px]:hidden flex flex-col gap-1.5 text-neutral-300 rounded-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="block h-0.5 w-6 bg-current"
          animate={{
            rotate: isMenuOpen ? 45 : 0,
            y: isMenuOpen ? 6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-current"
          animate={{
            opacity: isMenuOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-current"
          animate={{
            rotate: isMenuOpen ? -45 : 0,
            y: isMenuOpen ? -6 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full right-0 mt-4 min-[350px]:hidden bg-surface-raised border border-line-muted rounded-surface shadow-elevated py-2 min-w-[150px] z-50"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                onClick={toggleMenu}
                className={`block px-4 py-2 text-neutral-300 ${linkClassName(
                  "/about"
                )}`}
              >
                About
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/blog"
                onClick={toggleMenu}
                className={`block px-4 py-2 text-neutral-300 ${linkClassName(
                  "/blog"
                )}`}
              >
                Blog
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                target="_blank"
                href="/resume"
                onClick={toggleMenu}
                className={`block px-4 py-2 text-neutral-300 ${linkClassName(
                  "/resume"
                )}`}
              >
                Resume
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
