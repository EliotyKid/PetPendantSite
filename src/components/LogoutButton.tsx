import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <Button asChild variant="destructive" className="w-full h-full">
      <a href="/api/auth/logout">Logout</a>
    </Button>
  );
}

export default LogoutButton;
