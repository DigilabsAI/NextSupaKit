import { DashboardContent } from "@/components/dashboard-content";


export default function DashboardPage() {
  return (
   
        <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full bg-background">
          <DashboardContent />
        </div>
      </div> 
      
  )
}
