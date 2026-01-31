"use client"

import { Card } from "@/components/ui/card"

export function AppShowcase() {
  const appScreens = [
    {
      title: "Browse Live Shops",
      image: "/bazaario-browse-live-shops.png",
      description: "Shop from offline stores — popular markets, categories, and top stores",
    },
    {
      title: "Video Call Shopping",
      image: "/bazaario-video-call-shopping.png",
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
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Experience Shopping Like Never Before</h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto px-1">
          Explore our app interface designed for seamless live shopping
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {appScreens.map((screen, index) => (
            <Card key={index} className="w-full overflow-hidden border-2">
              <div className="relative aspect-[3/4] bg-muted">
                <img
                  src={screen.image || "/placeholder.svg"}
                  alt={screen.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1 text-sm sm:text-base">{screen.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{screen.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
