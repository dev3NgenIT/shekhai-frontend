// app/webinar-room/[id]/page.jsx
// app/webinar-room/[id]/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import { 
  LuAlarmClock, 
  LuUsers, 
  LuCalendar,
  LuMapPin,
  LuChevronLeft,
  LuUser,
  LuTag,
  LuExternalLink,
} from "react-icons/lu";
import { LucideCheckCircle, LucideCheckCircle2 } from 'lucide-react';

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

export default function WebinarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const webinarId = params.id;

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    organization: '',
    receiveSMS: false,
    receiveEmailUpdates: true
  });
  const [registering, setRegistering] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

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

  // Check if user is already registered
  const checkRegistration = async (email) => {
    if (!email || !webinarId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/webinars/${webinarId}/check-registration/${email}`);
      const result = await response.json();
      
      if (result.success && result.registered) {
        setAlreadyRegistered(true);
        return true;
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
    return false;
  };

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setRegistering(true);
    setError(null);

    const loadingToast = toast.loading('Processing registration...');

    try {
      // Validate form
      if (!registrationForm.name.trim() || !registrationForm.email.trim()) {
        throw new Error('Please fill all required fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registrationForm.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if already registered
      const isRegistered = await checkRegistration(registrationForm.email);
      if (isRegistered) {
        toast.dismiss(loadingToast);
        toast.error("You are already registered for this webinar!");
        return;
      }

      const registrationData = {
        name: registrationForm.name,
        email: registrationForm.email,
        phone: registrationForm.phone || "",
        role: registrationForm.role,
        organization: registrationForm.organization || "",
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
        
        // Reset form
        setRegistrationForm({
          name: '',
          email: '',
          phone: '',
          role: 'student',
          organization: '',
          receiveSMS: false,
          receiveEmailUpdates: true
        });

        // Show success message with details
        if (result.data) {
          setTimeout(() => {
            toast(
              `Registration ID: ${result.data.registrationId}`,
              { 
                icon: '📧',
                duration: 6000 
              }
            );
          }, 1000);
        }

      } else {
        toast.dismiss(loadingToast);
        if (result.errors) {
          const errorMessages = result.errors.join(', ');
          throw new Error(`Registration Error: ${errorMessages}`);
        }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading webinar details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6"
          >
            <LuChevronLeft className="mr-2" />
            Back to Webinars
          </Button>
          
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold text-red-600">Error Loading Webinar</h2>
              <p className="mt-2 text-gray-600">{error || "Webinar not found"}</p>
              <Button
                onClick={() => router.push('/webinar-room')}
                className="mt-6"
              >
                View All Webinars
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${webinar.bannerImage || '/assets/webinar-banner.png'})`
        }}
      >
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="absolute left-4 top-4 text-white hover:bg-white/10"
          >
            <LuChevronLeft className="mr-2" />
            Back
          </Button>
          
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-500 text-white">
                {webinar.badge || "Webinar"}
              </Badge>
              {webinar.isFeatured && (
                <Badge className="bg-yellow-500 text-white">Featured</Badge>
              )}
              {webinar.isFree && (
                <Badge className="bg-green-500 text-white">FREE</Badge>
              )}
              {/* <span className={`text-sm ${webinar.status === 'live' ? 'text-red-400' : 'text-gray-300'}`}>
                {webinar.status === 'live' ? '• Live Now' : webinar.status}
              </span> */}
            </div>
            
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {webinar.title}
            </h1>
            
            <p className="text-xl text-gray-200">
              {webinar.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LucideCheckCircle className="text-blue-600" />
                  About This Webinar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700">
                    {webinar.longDescription || webinar.shortDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Key insights about {webinar.title}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Practical applications and real-world examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Q&A session with the instructor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>Networking opportunities with other participants</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            {webinar.tags && webinar.tags.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LuTag className="text-blue-600" />
                    Topics Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {webinar.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Card */}
            <Card className="sticky top-8 mb-6">
              <CardHeader>
                <CardTitle className="text-center">Register Now</CardTitle>
              </CardHeader>
              <CardContent>
                {alreadyRegistered ? (
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <LucideCheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Already Registered!</h3>
                    <p className="mb-4 text-gray-600">
                      You're all set for this webinar. Check your email for confirmation details.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.success("Registration confirmed!")}
                    >
                      View Registration Details
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleRegistration}>
                    {error && (
                      <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          required
                          disabled={registering}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          required
                          disabled={registering}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={registrationForm.phone}
                          onChange={handleInputChange}
                          disabled={registering}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <select
                          name="role"
                          value={registrationForm.role}
                          onChange={handleInputChange}
                          disabled={registering}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="student">Student</option>
                          <option value="professional">Professional</option>
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="educator">Educator</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Organization/Company
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={registrationForm.organization}
                          onChange={handleInputChange}
                          disabled={registering}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter your organization"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="receiveSMS"
                            checked={registrationForm.receiveSMS}
                            onChange={handleInputChange}
                            disabled={registering}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Receive SMS alerts before the event
                          </span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="receiveEmailUpdates"
                            checked={registrationForm.receiveEmailUpdates}
                            onChange={handleInputChange}
                            disabled={registering}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Receive email updates about similar events
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={registering}
                        className="w-full"
                      >
                        {registering ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                            Registering...
                          </span>
                        ) : (
                          `Register Now - ${webinar.isFree ? 'FREE' : `$${webinar.price}`}`
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Event Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <LuCalendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(webinar.startTime)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <LuAlarmClock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">
                      {formatTime(webinar.startTime)} - {formatTime(webinar.endTime)}
                    </p>
                    <p className="text-sm text-gray-600">Duration: {getDuration()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <LuMapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">Online (Zoom)</p>
                    <p className="text-sm text-gray-600">
                      Link will be emailed after registration
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <LuUsers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-medium">
                      {webinar.currentParticipants || 0} / {webinar.maxParticipants || "∞"} registered
                    </p>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-full bg-green-500"
                        style={{
                          width: `${Math.min(100, ((webinar.currentParticipants || 0) / (webinar.maxParticipants || 1)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LuUser className="text-blue-600" />
                  Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    {webinar.instructor?.avatar ? (
                      <img
                        src={webinar.instructor.avatar}
                        alt={webinar.instructor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-500 text-white text-xl">
                        {webinar.instructor?.name?.charAt(0) || 'E'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {webinar.instructor?.name || "Expert Instructor"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {webinar.instructor?.title || "Industry Expert"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Join This Webinar?</h2>
          <p className="mb-8 text-xl">
            Don't miss this opportunity to learn from industry experts
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                const registrationCard = document.querySelector('form');
                if (registrationCard) {
                  registrationCard.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10"
              onClick={() => router.push('/webinar-room')}
            >
              <LuExternalLink className="mr-2" />
              View All Webinars
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}