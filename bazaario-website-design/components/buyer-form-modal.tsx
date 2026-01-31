"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { postBuyerWaitlist } from "@/lib/api"

interface BuyerFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function BuyerFormModal({ open, onOpenChange, onSuccess }: BuyerFormModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await postBuyerWaitlist(formData)
      if (result.success) {
        setStep("success")
        onSuccess?.()
      } else {
        setError(result.error)
      }
    } catch {
      setError("Connection error. Please check your network and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setError(null)
    setTimeout(() => {
      setStep("form")
      setFormData({ email: "", phoneNumber: "" })
    }, 300)
  }

  const clearError = () => setError(null)

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto mx-auto">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto dark:hidden" />
            <Image src="/logo-dark.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto hidden dark:block" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">You're on the list!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-[#C94A52]/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-[#C94A52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-muted-foreground">We will notify you when the product launches!</p>
            <Button onClick={handleClose} className="w-full bg-[#C94A52] hover:bg-[#B83D45] text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto mx-auto">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto dark:hidden" />
          <Image src="/logo-dark.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto hidden dark:block" />
        </div>

        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">Join the Buyer Waitlist</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Be the first to shop from Delhi's local markets via live video. We'll notify you at launch!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                clearError()
                setFormData({ ...formData, email: e.target.value })
              }}
              placeholder="your@email.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => {
                clearError()
                setFormData({ ...formData, phoneNumber: e.target.value })
              }}
              placeholder="Your phone number"
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-[#9B2D35] hover:bg-[#8B1E26] text-white"
            disabled={loading}
          >
            {loading ? <Spinner className="mr-2" /> : null}
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
