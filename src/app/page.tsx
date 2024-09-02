import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { auth, signIn } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <p>{session?.user?.name}</p>
        <Button type="submit">{session ? "Sign Out" : "Sign In"}</Button>
      </form>
    </main>
  );
}
