// app/webinar-room/[id]/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from 'react-hot-toast';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Tag,
  ChevronLeft,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Award,
  Target,
  FileText,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Sparkles,
  Zap,
  Globe,
  MessageCircle,
  Clock3
} from "lucide-react";
import Image from "next/image";

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

export default function WebinarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const webinarId = params.id;

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    organization: '',
    experience: 'beginner',
    hearAbout: 'social-media',
    receiveSMS: false,
    receiveEmailUpdates: true,
    agreeToTerms: false
  });
  const [registering, setRegistering] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Fetch webinar details
  useEffect(() => {
    const fetchWebinar = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/webinars/${webinarId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setWebinar(result.data);
        } else {
          throw new Error(result.message || "Failed to load webinar");
        }
      } catch (error) {
        console.error("Error fetching webinar:", error);
        setError(error.message);
        toast.error("Failed to load webinar details");
      } finally {
        setLoading(false);
      }
    };

    if (webinarId) {
      fetchWebinar();
    }
  }, [webinarId]);

  const formatDate = (dateString) => {
    if (!dateString) return "To be announced";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getDuration = () => {
    if (!webinar?.startTime || !webinar?.endTime) return "1 hour";
    const start = new Date(webinar.startTime);
    const end = new Date(webinar.endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${minutes}m`;
  };

  const getDaysUntil = () => {
    if (!webinar?.startTime) return null;
    const now = new Date();
    const start = new Date(webinar.startTime);
    const diffTime = start - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name, value) => {
    setRegistrationForm({
      ...registrationForm,
      [name]: value
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!registrationForm.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setRegistering(true);
    setError(null);

    const loadingToast = toast.loading('Processing registration...');

    try {
      if (!registrationForm.name.trim() || !registrationForm.email.trim()) {
        throw new Error('Please fill all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registrationForm.email)) {
        throw new Error('Please enter a valid email address');
      }

      const registrationData = {
        name: registrationForm.name,
        email: registrationForm.email,
        phone: registrationForm.phone || "",
        role: registrationForm.role,
        organization: registrationForm.organization || "",
        experience: registrationForm.experience,
        hearAbout: registrationForm.hearAbout,
        receiveSMS: registrationForm.receiveSMS,
        receiveEmailUpdates: registrationForm.receiveEmailUpdates
      };

      const response = await fetch(`${API_BASE_URL}/webinars/${webinarId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.dismiss(loadingToast);
        toast.success("Successfully registered for the webinar!");
        setAlreadyRegistered(true);

        setRegistrationForm({
          name: '',
          email: '',
          phone: '',
          role: 'student',
          organization: '',
          experience: 'beginner',
          hearAbout: 'social-media',
          receiveSMS: false,
          receiveEmailUpdates: true,
          agreeToTerms: false
        });

      } else {
        toast.dismiss(loadingToast);
        throw new Error(result.message || "Failed to register for webinar");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
      toast.error(error.message || "Failed to register");
    } finally {
      setRegistering(false);
    }
  };

  const nextStep = () => {
    if (formStep === 1) {
      if (!registrationForm.name || !registrationForm.email) {
        toast.error("Please fill in your name and email");
        return;
      }
    }
    setFormStep(2);
  };

  const prevStep = () => setFormStep(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Loading Webinar</h3>
              <p className="mt-2 text-gray-500">Please wait while we prepare the details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 group"
          >
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Webinars
          </Button>

          <Card className="overflow-hidden">
            <div className="relative h-2 bg-gradient-to-r from-red-500 to-pink-500"></div>
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900">Oops! Something went wrong</h2>
              <p className="mb-8 text-gray-600">{error || "Webinar not found"}</p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => router.push('/webinar-room')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Browse Webinars
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const daysUntil = getDaysUntil();
  const registrationPercentage = (webinar.currentParticipants || 0) / (webinar.maxParticipants || 1) * 100;
  const spotsLeft = (webinar.maxParticipants || 0) - (webinar.currentParticipants || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Banner Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {webinar.bannerImage ? (
          <img
            src={webinar.bannerImage}
            alt={webinar.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
            }}
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Default webinar banner"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Title Overlay */}
        <div className="absolute bottom-10 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className="bg-white/20 text-white backdrop-blur-sm border-0 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                {webinar.badge || "Featured Webinar"}
              </Badge>
              {webinar.isFree && (
                <Badge className="bg-green-500 text-white border-0 px-4 py-2">
                  FREE
                </Badge>
              )}
              {daysUntil > 0 && daysUntil <= 7 && (
                <Badge className="bg-yellow-500 text-white border-0 px-4 py-2 animate-pulse">
                  🔥 {daysUntil} {daysUntil === 1 ? 'day' : 'days'} left
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl max-w-4xl">
              {webinar.title}
            </h1>
          </div>
        </div>
      </div>
      {/* Header Actions */}
      <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="group"
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsSaved(!isSaved);
                  toast.success(isSaved ? "Removed from saved" : "Saved to bookmarks");
                }}
                className="relative"
              >
                <Bookmark className={`h-5 w-5 transition-all ${isSaved ? 'fill-blue-600 text-blue-600 scale-110' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.share?.({
                    title: webinar.title,
                    text: webinar.shortDescription,
                    url: window.location.href
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                  });
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-sm">{formatDate(webinar.startTime)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold text-sm">{formatTime(webinar.startTime)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-sm">{getDuration()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Registered</p>
                  <p className="font-semibold text-sm">{webinar.currentParticipants || 0}</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="h-6 w-6 text-blue-600" />
                  About This Webinar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                    {webinar.longDescription || webinar.shortDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-blue-600" />
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Master key concepts and strategies",
                    "Hands-on practical applications",
                    "Real-world case studies",
                    "Industry best practices",
                    "Q&A with experts",
                    "Networking opportunities"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <User className="h-6 w-6 text-blue-600" />
                  Meet Your Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-blue-100 flex-shrink-0">
                    {webinar.instructor?.avatar ? (
                      <img
                        src={webinar.instructor.avatar}
                        alt={webinar.instructor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-4xl font-bold text-white">
                        {webinar.instructor?.name?.charAt(0) || 'E'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">
                      {webinar.instructor?.name || "Expert Instructor"}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {webinar.instructor?.title || "Industry Expert"}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Experienced professional with years of industry expertise.
                      Passionate about sharing knowledge and mentoring the next generation of leaders.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Globe className="mr-2 h-4 w-4" />
                        Website
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {webinar.tags && webinar.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Tag className="h-5 w-5 text-blue-600" />
                    Topics Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {webinar.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Registration & Details (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <Card className="sticky top-24 overflow-hidden border-0 shadow-xl">
              <div className="relative h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

              <CardContent className="p-6">
                {alreadyRegistered ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">You're Registered!</h3>
                    <p className="mb-4 text-gray-600">
                      Check your email for the webinar access link and calendar invitation.
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Confirmation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <h3 className="text-2xl font-bold">Join the Webinar</h3>
                      <p className="text-sm text-gray-500">Fill in your details to register</p>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Registration Progress</span>
                        <span className="text-sm text-gray-500">Step {formStep} of 2</span>
                      </div>
                      <Progress value={formStep === 1 ? 50 : 100} className="h-2" />
                    </div>

                    {formStep === 1 ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              name="name"
                              value={registrationForm.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className="pl-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={registrationForm.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              className="pl-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              value={registrationForm.phone}
                              onChange={handleInputChange}
                              placeholder="+1 234 567 890"
                              className="pl-9"
                            />
                          </div>
                        </div>

                        <Button
                          onClick={nextStep}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                          Continue
                          <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select
                            value={registrationForm.role}
                            onValueChange={(value) => handleSelectChange('role', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                              <SelectItem value="educator">Educator</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Experience Level</Label>
                          <Select
                            value={registrationForm.experience}
                            onValueChange={(value) => handleSelectChange('experience', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>How did you hear about us?</Label>
                          <Select
                            value={registrationForm.hearAbout}
                            onValueChange={(value) => handleSelectChange('hearAbout', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="friend">Friend/Colleague</SelectItem>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="receiveSMS"
                              name="receiveSMS"
                              checked={registrationForm.receiveSMS}
                              onCheckedChange={(checked) =>
                                setRegistrationForm({ ...registrationForm, receiveSMS: checked })
                              }
                            />
                            <Label htmlFor="receiveSMS" className="text-sm">
                              Receive SMS reminders
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="receiveEmailUpdates"
                              name="receiveEmailUpdates"
                              checked={registrationForm.receiveEmailUpdates}
                              onCheckedChange={(checked) =>
                                setRegistrationForm({ ...registrationForm, receiveEmailUpdates: checked })
                              }
                            />
                            <Label htmlFor="receiveEmailUpdates" className="text-sm">
                              Receive email updates about similar events
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="agreeToTerms"
                              name="agreeToTerms"
                              checked={registrationForm.agreeToTerms}
                              onCheckedChange={(checked) =>
                                setRegistrationForm({ ...registrationForm, agreeToTerms: checked })
                              }
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                              I agree to the terms and conditions *
                            </Label>
                          </div>
                        </div>

                        {error && (
                          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                            {error}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={prevStep}
                            className="flex-1"
                          >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          <Button
                            onClick={handleRegistration}
                            disabled={registering}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                          >
                            {registering ? (
                              <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Registering...
                              </span>
                            ) : (
                              <>
                                Register
                                <Zap className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Event Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(webinar.startTime)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{formatTime(webinar.startTime)} - {formatTime(webinar.endTime)}</p>
                    <p className="text-sm text-gray-500">Duration: {getDuration()}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Platform</p>
                    <p className="font-medium">Zoom Webinar</p>
                    <p className="text-sm text-gray-500">Link will be sent after registration</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium">{spotsLeft} spots left</p>
                    <Progress value={registrationPercentage} className="mt-2 h-2" />
                  </div>
                </div>

                {webinar.tags && webinar.tags.length > 0 && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-pink-100 p-2">
                        <Tag className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Topics</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {webinar.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-3">Share this webinar</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Twitter className="mr-2 h-4 w-4" />
                    Tweet
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}