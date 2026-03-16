"use client"
import Link from "next/link"
import { useState } from "react"
import { Header } from "@/components/shared/header"
import { appConfig } from "@/config/app.config"

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    initials: "AJ",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    initials: "SC",
  },
  {
    name: "Marcus Dubois",
    role: "Lead Engineer",
    initials: "MD",
  },
  {
    name: "Priya Patel",
    role: "Design Director",
    initials: "PP",
  },
]

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-white pb-16 sm:pb-24">
      <Header app={appConfig.app} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 text-center sm:py-24 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Building the future of{" "}
            <span className="from-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
              digital connection.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a passionate team of creators, engineers, and dreamers dedicated to making technology that empowers
            people to do their best work.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto mb-24 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Our goal is simple: eliminate friction in daily tasks. We believe that software should be intuitive, fast,
            and beautiful. Every line of code we write and every pixel we push is aimed at giving you back your most
            valuable resource—time.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mx-auto max-w-7xl rounded-3xl bg-gray-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the Team</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            The talented people behind the scenes making the magic happen.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {team.map((person) => (
            <li key={person.name} className="flex flex-col items-center gap-y-6">
              {/* Minimal Typographic Avatar */}
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-md hover:ring-gray-300">
                <span className="text-2xl font-light tracking-widest text-gray-400">{person.initials}</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg leading-7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-primary text-sm leading-6 font-medium">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mx-auto mt-24 max-w-7xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Want to join us?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
          We are always looking for talented individuals to join our growing team.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/careers"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            View Open Positions
          </Link>
        </div>
      </div>
    </main>
  )
}
