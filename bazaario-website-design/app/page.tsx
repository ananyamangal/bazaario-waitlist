"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { SellerFormModal } from "@/components/seller-form-modal"
import { BuyerFormModal } from "@/components/buyer-form-modal"
import { AppShowcase } from "@/components/app-showcase"
import { Navbar } from "@/components/navbar"
import { WhyBazaario } from "@/components/why-bazaario"
import { Footer } from "@/components/footer"
import { getStats } from "@/lib/api"

export default function Home() {
  const [showSellerForm, setShowSellerForm] = useState(false)
  const [showBuyerForm, setShowBuyerForm] = useState(false)
  const [stats, setStats] = useState({ shops: 112, buyers: 128 })

  const refetchStats = useCallback(() => {
    getStats()
      .then(setStats)
      .catch((err) => console.error("Failed to fetch stats:", err))
  }, [])

  useEffect(() => {
    refetchStats()
  }, [refetchStats])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight px-1">
              Bring Delhi's local markets to your screen — <span className="text-[#DA0350]">live</span>.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-balance leading-relaxed px-1">
              See products on video call before buying.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Real shops. Real people. Home delivered.
            </p>

            {/* Stats Counter */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 py-6 sm:py-8">
              <div className="text-center min-w-[100px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#DA0350]">{stats.shops.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Shops Applied</div>
              </div>
              <div className="text-center min-w-[100px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C94A52]">{stats.buyers.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Buyers Registered</div>
              </div>
            </div>

            {/* CTA Buttons - Join Buyer Waitlist primary */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-[#C94A52] hover:bg-[#B83D45] text-white font-semibold shadow-lg"
                onClick={() => setShowBuyerForm(true)}
              >
                Join Buyer Waitlist
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-[#C94A52] text-[#C94A52] hover:bg-[#C94A52] hover:text-white bg-transparent"
                onClick={() => setShowSellerForm(true)}
              >
                Apply as a Founding Shop
              </Button>
            </div>

            {/* Small Text */}
            <p className="text-xs sm:text-sm text-muted-foreground px-2">Access is limited. We're onboarding select stores only.</p>
          </div>
        </section>

        <section id="about">
          <WhyBazaario />
        </section>

        <section id="features">
          <AppShowcase />
        </section>

        {/* Modals – connected to API; onSuccess refreshes stats */}
        <SellerFormModal open={showSellerForm} onOpenChange={setShowSellerForm} onSuccess={refetchStats} />
        <BuyerFormModal open={showBuyerForm} onOpenChange={setShowBuyerForm} onSuccess={refetchStats} />
      </main>

      <Footer />
    </>
  )
}
