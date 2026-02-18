"use client";

import Link from "next/link";
import { Menu, LogOut, User, FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import ThemeToggle from "./theme-toggle";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/useAuth";

const NAV_LINKS = [
  { name: "Features", href: "/#features" },
  { name: "Stack", href: "/#stack" },
  { name: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const { user } = useAuthStore();
  const logout = useLogout();
  const initials =
    user?.firstName?.[0]?.toUpperCase() ??
    "" + user?.lastName?.[0]?.toUpperCase();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl h-14 flex items-center px-6">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          Leplit
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition"
            >
              {link.name}
            </Link>
          ))}

          <ThemeToggle />

          {/* AUTH (Desktop) */}
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full px-5">Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link href="/projects" className="flex gap-2">
                    <FolderKanban className="h-4 w-4" />
                    Projects
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="ml-auto md:hidden flex items-center gap-2">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 px-5 py-2">
              <div className="mt-8 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 border-t flex flex-col gap-3">
                  {!user ? (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full rounded-full">Sign Up</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 px-2">
                        <Avatar>
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        className="mt-4"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
