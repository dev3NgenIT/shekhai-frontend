"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

export default function UserInfoForm({ userInfo, onChange }) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Tell us about yourself</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="John Doe"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="john@example.com"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="+1 234 567 890"
                className="pl-9"
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}