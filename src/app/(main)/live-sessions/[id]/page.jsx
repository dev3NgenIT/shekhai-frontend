"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Calendar, Clock, Users, Zap, Video, ArrowLeft, Globe, Award,
    BookOpen, CheckCircle, Share2, Copy, Check, AlertCircle,
    Timer, MessageSquare, Presentation, BarChart3, Lock, ExternalLink,
    Key, ShieldCheck, Monitor, HelpCircle, Download, Languages,
    Fingerprint, BarChart, Eye, Heart, ListChecks, Radio, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

const LiveSessionDetails = () => {
    const params = useParams();
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/live-sessions/${params.id}`);
                const result = await res.json();
                if (result.success) setSession(result.data);
            } catch (err) {
                toast.error("Failed to sync session data");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [params.id]);

    if (loading) return <LoadingSkeleton />;
    if (!session) return <ErrorState router={router} />;

    const isFree = !session.isPaid;
    const start = new Date(session.schedule?.startTime);
    const formattedDate = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    const regPercent = ((session.totalSlots - session.availableSlots) / session.totalSlots) * 100;

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-blue-100">

            {/* 1. HERO IDENTITY SECTION */}
            <div className="relative bg-[#020617] pt-12 pb-32 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
                <div className="container relative mx-auto px-4">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-8 text-slate-400 hover:text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Button>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Badge className="bg-blue-600 text-white border-none px-3 py-1 uppercase text-[10px] font-bold tracking-widest">{session.category}</Badge>
                                <Badge variant="outline" className="text-blue-400 border-blue-400/30 px-3 py-1 uppercase text-[10px] font-bold">{session.subCategory}</Badge>
                                <Badge className="bg-white/10 text-slate-300 border-none px-3 py-1 text-[10px] tracking-tight italic">Status: {session.status}</Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{session.title}</h1>
                            <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">{session.description}</p>

                            {/* Quick Metadata Row */}
                            <div className="mt-10 flex flex-wrap gap-8">
                                <div className="flex items-center gap-3"><Eye className="h-5 w-5 text-slate-500" /><span className="text-sm font-bold">{session.metadata?.totalViews} Views</span></div>
                                <div className="flex items-center gap-3"><Users className="h-5 w-5 text-slate-500" /><span className="text-sm font-bold">{session.metadata?.totalEnrollments} Students</span></div>
                                <div className="flex items-center gap-3"><Languages className="h-5 w-5 text-slate-500" /><span className="text-sm font-bold">{session.metadata?.language}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Deep Details */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 2. SYLLABUS & OUTCOMES */}
                        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-blue-600" /> Syllabus Overview
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10">{session.longDescription || session.description}</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                                    <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Award className="h-5 w-5" /> Learning Outcomes</h4>
                                    <ul className="space-y-3">
                                        {session.whatYoullGet?.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-emerald-800 font-semibold"><CheckCircle className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><ListChecks className="h-5 w-5 text-blue-600" /> Prerequisites</h4>
                                    <ul className="space-y-3">
                                        {session.prerequisites?.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-slate-700 font-semibold"><div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 3. INTERACTION & LIVE SETTINGS (Full liveDetails mapping) */}
                        <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <Radio className="h-6 w-6 text-red-500" /> Interaction & Live Tools
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FeatureCard icon={<MessageSquare />} label="Live Chat" active={session.liveDetails?.chatEnabled} />
                                <FeatureCard icon={<HelpCircle />} label="Q&A Mode" active={session.liveDetails?.qaEnabled} />
                                <FeatureCard icon={<BarChart3 />} label="Live Polls" active={session.liveDetails?.pollsEnabled} />
                                <FeatureCard icon={<Presentation />} label="Screen Share" active={session.liveDetails?.screenShareEnabled} />
                                <FeatureCard icon={<Zap />} label="Raise Hand" active={session.interactionSettings?.allowRaiseHand} />
                                <FeatureCard icon={<Monitor />} label="Whiteboard" active={session.liveDetails?.whiteboardEnabled} />
                            </div>
                        </section>

                        {/* 4. RECORDING & NOTIFICATIONS (Technical mapping) */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-orange-500">
                                    <Download className="h-5 w-5" /> Recording Policy</h4>
                                <div className="space-y-4 text-black">
                                    <TechRow label="Session Recorded" value={session.recordingSettings?.recordSession ? "Yes" : "No"} />
                                    <TechRow label="Auto-Publish" value={session.recordingSettings?.autoPublishRecording ? "Yes" : "No"} />
                                    <TechRow label="Access Duration" value={`${session.recordingSettings?.recordingAvailableFor} Days`} />
                                    <TechRow label="Downloadable" value={session.recordingSettings?.downloadable ? "Yes" : "No"} />
                                </div>
                            </section>
                            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
                                <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-orange-500">
                                    <Bell className="h-5 w-5" /> Reminders</h4>
                                <div className="space-y-4">
                                    <TechRow label="24h Alert" value={session.notifications?.reminder24h ? "Active" : "Off"} dark />
                                    <TechRow label="1h Alert" value={session.notifications?.reminder1h ? "Active" : "Off"} dark />
                                    <TechRow label="15m Alert" value={session.notifications?.reminder15min ? "Active" : "Off"} dark />
                                    <TechRow label="Recording Alert" value={session.notifications?.recordingAvailable ? "Active" : "Off"} dark />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Action & Metadata */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">

                            {/* ACTION CARD (isPaid detect) */}
                            <Card className="rounded-[2.5rem] border-none shadow-2xl pt-0 shadow-blue-900/10 overflow-hidden">
                                <div className={`${isFree ? 'bg-emerald-600' : 'bg-slate-900'} p-8 text-white`}>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{isFree ? 'Open Session' : 'Premium Booking'}</span>
                                        <Badge className="bg-white/20 text-white border-none">{session.metadata?.level}</Badge>
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-5xl font-black">{isFree ? 'FREE' : `$${session.discountedPrice || session.price}`}</span>
                                        {!isFree && session.discountedPrice && <span className="text-white/40 line-through text-lg">${session.price}</span>}
                                    </div>
                                    <p className="text-white/60 text-xs font-medium">Starting in {session.calculatedStartsIn}</p>
                                </div>

                                <CardContent className="p-8 bg-white space-y-6">
                                    <div className="space-y-3">
                                        <SidebarRow label="Date" value={formattedDate} icon={<Calendar className="h-4 w-4" />} />
                                        <SidebarRow label="Start Time" value={formattedTime} icon={<Clock className="h-4 w-4" />} />
                                        <SidebarRow label="Timezone" value={session.schedule?.timezone} icon={<Globe className="h-4 w-4" />} />
                                    </div>

                                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-2">
                                            <span>Availability</span>
                                            <span>{session.availableSlots} / {session.totalSlots} Seats</span>
                                        </div>
                                        <Progress value={regPercent} className="h-2 bg-slate-200" />
                                    </div>

                                    {isFree ? (
                                        <Button className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-lg font-bold transition-all shadow-xl shadow-emerald-100"
                                            onClick={() => window.open(session.liveDetails?.joinUrl, '_blank')}>
                                            Join Live Workshop
                                        </Button>
                                    ) : (
                                        <Button className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-bold transition-all shadow-xl shadow-blue-100">
                                            Reserve My Seat
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            {/* STATS & IDENTITY (Small technical details) */}
                            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 space-y-4">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Session Identity</h5>
                                <div className="space-y-3">
                                    <TechRow label="ID" value={session._id} dark small />
                                    <TechRow label="Type" value={session.type} dark small />
                                    <TechRow label="Currency" value={session.currency} dark small />
                                    <TechRow label="Waitlist" value={session.waitlistEnabled ? "Enabled" : "Disabled"} dark small />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-components for full coverage ---

const FeatureCard = ({ icon, label, active }) => (
    <div className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${active ? 'bg-blue-50 border-blue-100 text-blue-700 opacity-100' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-40 grayscale'}`}>
        {React.cloneElement(icon, { className: "h-6 w-6 mb-3" })}
        <span className="text-[10px] font-black uppercase tracking-tighter text-center">{label}</span>
    </div>
);

const TechRow = ({ label, value, dark, small }) => (
    <div className="flex justify-between items-center py-1">
        <span className={`text-[10px] font-bold uppercase tracking-tight ${dark ? 'text-slate-400' : 'text-black-200/100'}`}>{label}</span>
        <span className={`font-bold ${small ? 'text-[10px]' : 'text-sm'} ${dark ? 'text-slate-900' : 'text-black-200/100'}`}>{value}</span>
    </div>
);

const SidebarRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
            {icon} <span className="text-xs font-bold uppercase tracking-tighter">{label}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
);

const ErrorState = ({ router }) => (
    <div className="min-h-screen flex items-center justify-center"><Button onClick={() => router.back()}>Session not found</Button></div>
);

const LoadingSkeleton = () => (
    <div className="p-8 space-y-8 animate-pulse"><Skeleton className="h-[40vh] w-full rounded-[3rem]" /></div>
);

export default LiveSessionDetails;