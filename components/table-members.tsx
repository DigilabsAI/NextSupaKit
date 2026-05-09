"use client";

import {
  Ellipsis,
  Mail,
  Shield,
  Trash,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Role = "user" | "admin";

const roles = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

const members = [
  {
    name: "Ada Lovelace",
    email: "ada@calculus.dev",
    initials: "AL",
    tone: "bg-rose-500/15 text-rose-600",
    role: "admin",
    team: "Engineering",
    active: "Active now",
    twoFactor: true,
  },
  {
    name: "Grace Hopper",
    email: "grace@cobol.io",
    initials: "GH",
    tone: "bg-amber-500/15 text-amber-600",
    role: "user",
    team: "Engineering",
    active: "2m ago",
    twoFactor: true,
  },
  {
    name: "Alan Turing",
    email: "alan@enigma.uk",
    initials: "AT",
    tone: "bg-sky-500/15 text-sky-600",
    role: "user",
    team: "Research",
    active: "12m ago",
    twoFactor: false,
  },
];

export function TableMembersShowcasePage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold">Members</h1>
            <p className="text-sm text-muted-foreground">
              {members.length} people
            </p>
          </div>

          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>

        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {members.map((m) => (
                <TableRow key={m.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className={`h-8 w-8 ${m.tone}`}>
                        <AvatarFallback className="bg-transparent text-xs font-medium">
                          {m.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {m.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{m.team}</TableCell>

                  <TableCell>
                    {m.role === "owner" ? (
                      <Badge variant="outline" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Owner
                      </Badge>
                    ) : (
                      <Select defaultValue={m.role}>
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {roles.map((r) => (
                            <SelectItem
                              key={r.value}
                              value={r.value}
                            >
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`h-2 w-2 rounded-full ${m.twoFactor
                          ? "bg-emerald-500"
                          : "bg-muted"
                          }`}
                      />
                      {m.twoFactor ? "Enabled" : "Off"}
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {m.active}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Transfer Ownership
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}