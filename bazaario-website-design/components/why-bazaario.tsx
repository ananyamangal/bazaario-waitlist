export function WhyBazaario() {
  const painPoints = [
    {
      title: "Local markets aren't always accessible",
      description:
        "Delhi's best markets aren't designed for frequent visits. Time, distance, and crowds make it hard to go often — even when you want to. Bazaario gives you access to trusted local shops without needing to be there physically.",
    },
    {
      title: "What you see online is often misleading",
      description:
        "Photos don't capture real colors, fabric quality, or finishing. Many buyers realise the mismatch only after delivery. Bazaario lets you see the exact product live before you decide.",
    },
    {
      title: "Returns shouldn't be part of the shopping experience",
      description:
        "Returning products takes time, effort, and patience. Most returns happen because expectations weren't clear in the first place. Seeing the product live reduces wrong purchases before they happen.",
    },
    {
      title: "Shopping has become impersonal",
      description:
        "Most platforms reduce sellers to listings and buyers to order numbers. There's no conversation, no trust, no context. Bazaario brings back human interaction through real conversations with shop owners.",
    },
    {
      title: "Local sellers deserve better visibility",
      description:
        "Great local shops struggle to stand out on large marketplaces. Their products are often mixed with mass listings and price wars. Bazaario highlights real stores and real products, not just algorithms.",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Why Bazaario?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#DA0350]/10 via-[#C94A52]/10 to-background border border-[#DA0350]/20 rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-[#DA0350]/40 transition-all"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-balance leading-snug text-[#DA0350]">{point.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
