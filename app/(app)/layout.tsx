import Appbar from "@/components/Appbar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Appbar />   
        {children}
      </section>
    )
  }