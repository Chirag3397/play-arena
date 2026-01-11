import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen pt-20 bg-background">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
}
