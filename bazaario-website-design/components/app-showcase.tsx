"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"

export function AppShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const appScreens = [
    {
      title: "Browse Live Shops",
      image: "/mobile-app-showing-live-video-shopping-feed-with-i.jpg",
      description: "See shops live streaming their products",
    },
    {
      title: "Video Call Shopping",
      image: "/mobile-app-video-call-interface-showing-shop-owner.jpg",
      description: "Connect with sellers in real-time",
    },
    {
      title: "Product Details",
      image: "/mobile-app-product-detail-page-with-buy-button-and.jpg",
      description: "Get all the details before you buy",
    },
    {
      title: "Easy Checkout",
      image: "/mobile-app-checkout-screen-with-delivery-options.jpg",
      description: "Home delivery from local markets",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Experience Shopping Like Never Before</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore our app interface designed for seamless live shopping
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {appScreens.map((screen, index) => (
            <Card key={index} className="flex-shrink-0 w-[280px] md:w-[320px] snap-center overflow-hidden border-2">
              <div className="relative aspect-[9/16] bg-muted">
                <img
                  src={screen.image || "/placeholder.svg"}
                  alt={screen.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{screen.title}</h3>
                <p className="text-sm text-muted-foreground">{screen.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
