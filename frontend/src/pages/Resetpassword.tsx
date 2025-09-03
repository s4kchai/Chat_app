import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

function Resetpassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const sendMailReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    alert(`reset password ${email}`);
  };
  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 pt-3">
          <Button type="submit" className="w-full bg-gray-100 text-black " onClick={gotoLogin}>
            Back
          </Button>
          <Button type="submit" className="w-full mt-3" onClick={sendMailReset}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Resetpassword;
