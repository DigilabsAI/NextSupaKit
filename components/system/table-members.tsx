"use client";

import { useTransition } from "react";
import {
  Ellipsis,
  Mail,
  Shield,
  User,
  UserPlus,
} from "lucide-react";

import { toast } from "sonner";
import { changeUserRole } from "@/lib/actions/admin";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  members: {
    id: string;
    fullname: string | null;
    gender: string | null;
    mobile_number: string | null;
    avatar_url: string | null;
    email: string;
    role: "user" | "admin";
    created_at: string;
  }[];
};

export function TableMembersShowcasePage({ members }: Props) {
  const [isPending, startTransition] = useTransition();

  const updateRole = (id: string, role: "user" | "admin") => {
    startTransition(async () => {
      const res = await changeUserRole(id, role);

      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mr-auto w-full max-w-6xl space-y-6">

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold">App Users</h1>
            <p className="text-sm text-muted-foreground">
              {members.length} people
            </p>
          </div>

          <Button size="sm" disabled>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((m) => {
                const initials =
                  m.fullname?.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase() || "U";

                return (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-border border">
                          <AvatarImage src={m.avatar_url ?? ""} className="object-cover" />
                          <AvatarFallback>
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium">
                            {m.fullname || "Unnamed User"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {m.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{m.mobile_number || "N/A"}</TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {m.gender || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="gap-1 w-fit">
                        {m.role === "admin" ? (
                          <Shield className="h-3.5 w-3.5" />
                        ) : (
                          <User className="h-3.5 w-3.5" />
                        )}
                        {m.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(m.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Ellipsis className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem disabled>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>

                          {m.role === "admin" ? (
                            <DropdownMenuItem
                              disabled={isPending}
                              onClick={() => updateRole(m.id, "user")}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Set to user
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              disabled={isPending}
                              onClick={() => updateRole(m.id, "admin")}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Set to admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}