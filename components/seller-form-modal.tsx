"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { postSellerWaitlist } from "@/lib/api"

interface SellerFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function SellerFormModal({ open, onOpenChange, onSuccess }: SellerFormModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobileNumber: "",
    categories: [] as string[],
    otherCategoryName: "",
    openToVideoCalls: "",
  })

  const categories = [
    "Clothing / Boutique",
    "Footwear",
    "Jewellery",
    "Furniture / Home decor",
    "Beauty / Accessories",
    "Electronics / Mobiles",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = {
      shopName: formData.shopName,
      ownerName: formData.ownerName,
      mobileNumber: formData.mobileNumber,
      categories: formData.categories,
      openToVideoCalls: formData.openToVideoCalls as "yes" | "no",
      ...(formData.otherCategoryName?.trim() && { otherCategoryName: formData.otherCategoryName.trim() }),
    }

    try {
      const result = await postSellerWaitlist(payload)
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
      setFormData({
        shopName: "",
        ownerName: "",
        mobileNumber: "",
        categories: [],
        otherCategoryName: "",
        openToVideoCalls: "",
      })
    }, 300)
  }

  const clearError = () => setError(null)

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto dark:hidden" />
            <Image src="/logo-dark.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto hidden dark:block" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Thank You!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-[#DA0350]/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-[#DA0350]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-muted-foreground">
              We will contact you within <strong>48 hours</strong>!
            </p>
            <Button onClick={handleClose} className="w-full bg-[#DA0350] hover:bg-[#DA0350]/90">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto dark:hidden" />
          <Image src="/logo-dark.png" alt="Bazaario" width={160} height={50} className="h-11 w-auto hidden dark:block" />
        </div>

        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">Become a Founding Shop Partner</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Sell to customers via live video calls. Show products in real time. Get genuine buyers. Zero commission
            during the pilot phase. Limited founding partner slots.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {/* Section 1: Basic Info */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="shopName" className="text-sm font-medium">
                Shop Name *
              </Label>
              <Input
                id="shopName"
                required
                value={formData.shopName}
                onChange={(e) => {
                  clearError()
                  setFormData({ ...formData, shopName: e.target.value })
                }}
                placeholder="Enter your shop name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName" className="text-sm font-medium">
                Owner/Manager Name *
              </Label>
              <Input
                id="ownerName"
                required
                value={formData.ownerName}
                onChange={(e) => {
                  clearError()
                  setFormData({ ...formData, ownerName: e.target.value })
                }}
                placeholder="Enter your name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="text-sm font-medium">
                Mobile Number (WhatsApp preferred) *
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => {
                  clearError()
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }}
                placeholder="Enter your mobile number"
                className="h-11"
              />
            </div>
          </div>

          {/* Section 2: Categories */}
          <div className="space-y-5 pt-6 border-t">
            <h3 className="font-semibold text-lg">Shop Category & Products</h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium">What do you sell? *</Label>
              <div className="space-y-3 mt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {formData.categories.includes("Other") && (
                <div className="space-y-2 pt-2 pl-6">
                  <Label htmlFor="otherCategoryName" className="text-sm font-medium">
                    Please specify the category name
                  </Label>
                  <Input
                    id="otherCategoryName"
                    value={formData.otherCategoryName}
                    onChange={(e) => setFormData({ ...formData, otherCategoryName: e.target.value })}
                    placeholder="Type your category (e.g. Handicrafts, Art)"
                    className="h-11 max-w-sm"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Are you open to showing products on live video calls? *</Label>
              <RadioGroup
                value={formData.openToVideoCalls}
                onValueChange={(value) => setFormData({ ...formData, openToVideoCalls: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal cursor-pointer text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-[#DA0350] hover:bg-[#DA0350]/90"
            disabled={loading || !formData.openToVideoCalls || formData.categories.length === 0}
          >
            {loading ? <Spinner className="mr-2" /> : null}
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
