import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const subMitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log("Login success:", response.data);
    } catch (err: any) {
      setError(err.response.data.msg);
    }
  };

  const gotoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
          {/* <CardAction>
            <Button variant="link" onClick={gotoRegister}>
              Sign Up
            </Button>
          </CardAction> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={subMitLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="/Resetpassword" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-gray-600">
          <div className="flex items-center">
            <Label htmlFor="password">Dont have an account ?</Label>
            <Button variant="link" onClick={gotoRegister}>
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
