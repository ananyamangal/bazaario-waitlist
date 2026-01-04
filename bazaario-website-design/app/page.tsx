"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SellerFormModal } from "@/components/seller-form-modal"
import { BuyerFormModal } from "@/components/buyer-form-modal"
import { AppShowcase } from "@/components/app-showcase"
import { Navbar } from "@/components/navbar"
import { WhyBazaario } from "@/components/why-bazaario"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showSellerForm, setShowSellerForm] = useState(false)
  const [showBuyerForm, setShowBuyerForm] = useState(false)
  const [stats, setStats] = useState({ shops: 112, buyers: 1002131 })

  useEffect(() => {
    // Fetch real-time stats
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err))
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Bring Delhi's local markets to your screen — <span className="text-[#DA0350]">live</span>.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-balance leading-relaxed">
              See products on video call before buying.
              <br />
              Real shops. Real people. Home delivered.
            </p>

            {/* Stats Counter */}
            <div className="flex flex-wrap justify-center gap-8 py-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#DA0350]">{stats.shops.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-2">Shops Applied</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#F18288]">{stats.buyers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-2">Buyers Registered</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg px-8 py-6 bg-[#DA0350] hover:bg-[#DA0350]/90 text-white"
                onClick={() => setShowSellerForm(true)}
              >
                Apply as a Founding Shop
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base md:text-lg px-8 py-6 border-2 border-[#F18288] text-[#F18288] hover:bg-[#F18288] hover:text-white bg-transparent"
                onClick={() => setShowBuyerForm(true)}
              >
                Join Buyer Waitlist
              </Button>
            </div>

            {/* Small Text */}
            <p className="text-sm text-muted-foreground">Access is limited. We're onboarding select stores only.</p>
          </div>
        </section>

        <section id="about">
          <WhyBazaario />
        </section>

        <section id="features">
          <AppShowcase />
        </section>

        {/* Modals */}
        <SellerFormModal open={showSellerForm} onOpenChange={setShowSellerForm} />
        <BuyerFormModal open={showBuyerForm} onOpenChange={setShowBuyerForm} />
      </main>

      <Footer />
    </>
  )
}
