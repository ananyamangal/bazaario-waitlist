import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo and Description – light in light mode, dark logo in dark mode */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Bazaario"
              width={180}
              height={55}
              className="h-10 sm:h-12 w-auto dark:hidden max-w-[160px]"
            />
            <Image
              src="/logo-dark.png"
              alt="Bazaario"
              width={180}
              height={55}
              className="h-10 sm:h-12 w-auto hidden dark:block max-w-[160px]"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bringing Delhi's local markets to your screen — live. Shop from real stores via video call.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Delhi, India</li>
              <li>
                <a href="mailto:ananyamangal05@gmail.com" className="hover:text-foreground transition-colors">
                  ananyamangal05@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bazaario. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
