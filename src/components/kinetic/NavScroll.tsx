"use client";
import { useEffect } from "react";
export default function NavScroll() {
  useEffect(() => {
    const nav = document.querySelector(".knav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
