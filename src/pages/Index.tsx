import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, PlusCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="p-4 sm:p-8 transition-all duration-300">
          <div className="mx-auto max-w-7xl">
            <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-mint-500">Dashboard</span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dental Practice</h1>
              </div>
              <ThemeToggle />
            </header>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="glass animate-fade-in p-4 sm:p-6 transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-mint-100 p-3 dark:bg-mint-900">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    <p className="text-xl sm:text-2xl font-bold">8</p>
                  </div>
                </div>
              </Card>

              <Card className="glass animate-fade-in [animation-delay:100ms] p-4 sm:p-6 transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-mint-100 p-3 dark:bg-mint-900">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-xl sm:text-2xl font-bold">1,234</p>
                  </div>
                </div>
              </Card>

              <Card className="glass animate-fade-in [animation-delay:200ms] p-4 sm:p-6 transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-mint-100 p-3 dark:bg-mint-900">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Wait Time</p>
                    <p className="text-xl sm:text-2xl font-bold">12m</p>
                  </div>
                </div>
              </Card>

              <Card className="glass animate-fade-in [animation-delay:300ms] p-4 sm:p-6 transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-mint-100 p-3 dark:bg-mint-900">
                    <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Progress</p>
                    <p className="text-xl sm:text-2xl font-bold">92%</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <Card className="glass col-span-1 animate-fade-in [animation-delay:400ms] p-4 sm:p-6">
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Upcoming Appointments</h2>
                  <Button 
                    size="sm" 
                    className="w-full sm:w-auto bg-mint-500 hover:bg-mint-600"
                    onClick={() => navigate('/appointments/new')}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4 transition-all hover:bg-accent/50 cursor-pointer"
                      onClick={() => navigate(`/appointments/details/${i}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-mint-100 p-2 dark:bg-mint-900">
                          <Users className="h-4 w-4 text-mint-500" />
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">Dental Cleaning</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-medium">2:30 PM</p>
                        <p className="text-sm text-muted-foreground">Today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass col-span-1 animate-fade-in [animation-delay:500ms] p-4 sm:p-6">
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: PlusCircle, label: "New Patient", path: "/patients" },
                    { icon: Calendar, label: "Schedule", path: "/appointments" },
                    { icon: Clock, label: "Reminders", path: "/settings" },
                    { icon: Activity, label: "Reports", path: "/appointments" },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="flex h-20 sm:h-24 flex-col items-center justify-center gap-2 border-2 transition-all hover:bg-accent/50"
                      onClick={() => navigate(action.path)}
                    >
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-mint-500" />
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;