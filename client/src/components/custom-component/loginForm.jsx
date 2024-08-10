import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const res = await axios.post('http://localhost:3000/manager/login', {
        "username": username,
        "password": password
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      if (res.status === 200) {
        toast({
          title: "Login Successful",
          description: `You have logged in Successfully`,
        });
        localStorage.setItem('token', res.data.token)
        navigate("/dashboard")
        return;
      } else {
        console.error("Unexpected response status:", res.status);
        return;
      }
    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          toast({
            title: "Login Failed",
            description: `Invalid Username or Password`,
          });
        } else if (error.response.status === 500) {
          toast({
            title: "Login Failed",
            description: `Internal Server Error`,
          });
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your Username and Password below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input onChange={(e) => setUsername(e.target.value)} id="username" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => loginHandler()}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}
