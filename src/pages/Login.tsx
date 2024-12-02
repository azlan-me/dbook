import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Valid credentials
const VALID_CREDENTIALS = [
  {
    email: "demo@example.com",
    password: "password123",
    organizationId: "DEMO123"
  },
  {
    email: "arslan@dental360grp.com",
    password: "Dental360$$",
    organizationId: "Dental360"
  }
];

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [organizationId, setOrganizationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials
    const isValid = VALID_CREDENTIALS.some(
      cred => 
        cred.email === email && 
        cred.password === password && 
        cred.organizationId === organizationId
    );

    if (isValid) {
      localStorage.setItem('auth', 'true');
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 glass rounded-lg animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="organizationId" className="text-sm font-medium">
              Organization ID
            </label>
            <Input
              id="organizationId"
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}