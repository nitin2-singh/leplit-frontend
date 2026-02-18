"use client";

import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const initials =
    user.firstName[0]?.toUpperCase() + user.lastName[0]?.toUpperCase();

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="mt-2">
            <Badge variant="secondary">Active</Badge>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Email address</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
