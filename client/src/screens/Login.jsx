import { LoginForm } from "@/components/custom-component/loginForm";

export function Login() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="flex justify-center items-center ">
                <LoginForm />
            </div>
        </div>
    );
}
