import Appbar from "@/components/Appbar"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Appbar />   
        {children}
        <Toaster />
      </section>
    )
  }