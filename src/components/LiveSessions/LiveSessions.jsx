"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, Zap, Video, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation'; // Changed from 'next/router'

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

const LiveSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('all');
    const router = useRouter(); // Moved inside component

    useEffect(() => {
        fetchSessions();
    }, [currentPage]);

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/live-sessions?page=${currentPage}&limit=6`);
            const result = await response.json();
            if (result.success) {
                setSessions(result.data);
                setTotalPages(result.totalPages || 1);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            setError(error.message);
            toast.error("Failed to load sessions");
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const getStatus = (session) => {
        const now = new Date();
        const start = new Date(session.schedule?.startTime);
        const end = new Date(session.schedule?.endTime);
        if (now < start) return 'upcoming';
        if (now >= start && now <= end) return 'live';
        return 'ended';
    };

    const filteredSessions = sessions.filter(session => {
        if (filter === 'free') return !session.isPaid;
        if (filter === 'paid') return session.isPaid;
        return true;
    });

    const handleReserveClick = (sessionId) => {
        router.push(`/live-sessions/${sessionId}`);
    };

    if (loading) return <LoadingState />;

    // Handle empty state
    if (!filteredSessions || filteredSessions.length === 0) {
        return (
            <div className="min-h-screen bg-[#fcfcfd] text-slate-900">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-[#0f172a] py-24 text-white">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"></div>
                    <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]"></div>

                    <div className="container relative mx-auto px-4 text-center">
                        <Badge className="mb-4 border-white/20 bg-white/10 text-blue-200 backdrop-blur-md px-4 py-1">
                            <Sparkles className="mr-2 h-3 w-3" /> Real-time Learning
                        </Badge>
                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
                            Elevate Your <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Skills Live</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-400">
                            Join interactive masterclasses led by industry titans. No pre-recorded fluff—just raw, real-time knowledge.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="py-16">
                        <div className="bg-slate-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎥</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Live Sessions Found</h3>
                        <p className="text-slate-500">Check back later for upcoming sessions</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfd] text-slate-900">
            {/* Modern Hero Section */}
            <section className="relative overflow-hidden bg-[#0f172a] py-24 text-white">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"></div>
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]"></div>

                <div className="container relative mx-auto px-4 text-center">
                    <Badge className="mb-4 border-white/20 bg-white/10 text-blue-200 backdrop-blur-md px-4 py-1">
                        <Sparkles className="mr-2 h-3 w-3" /> Real-time Learning
                    </Badge>
                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
                        Elevate Your <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Skills Live</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-400">
                        Join interactive masterclasses led by industry titans. No pre-recorded fluff—just raw, real-time knowledge.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Modern Filter Tabs */}
                <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                        {['all', 'free', 'paid'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                        Discovering <span className="text-slate-900">{filteredSessions.length}</span> premium sessions
                    </div>
                </div>

                {/* Improved Sessions Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {filteredSessions.map((session) => {
                        const status = getStatus(session);
                        const start = formatDateTime(session.schedule?.startTime);

                        return (
                            <Card key={session._id} className="group pt-0 relative flex flex-col border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                                {/* Image/Header Area */}
                                <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
                                    <div className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 ${session.isPaid ? 'from-indigo-600 to-purple-700' : 'from-emerald-500 to-teal-600'}`} />

                                    {/* Floating Badges */}
                                    <div className="absolute left-4 top-4 z-20 flex gap-2">
                                        {status === 'live' && (
                                            <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white ring-4 ring-red-500/20 animate-pulse">
                                                <span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
                                            </span>
                                        )}
                                        <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                            {session.category}
                                        </span>
                                    </div>

                                    <div className="absolute right-4 top-4 z-20">
                                        <div className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow-lg">
                                            {session.isPaid ? `$${session.price}` : 'FREE'}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 z-20">
                                        <p className="text-xs font-medium text-blue-200">{session.subCategory}</p>
                                    </div>
                                </div>

                                <CardHeader className="p-6 pb-2">
                                    <h3 className="mb-2 text-xl h-[50px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
                                        {session.title}
                                    </h3>
                                    <p className="line-clamp-2 text-sm h-[40px] leading-relaxed text-slate-500">
                                        {session.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="flex-1 p-6 pt-4">
                                    <div className="mb-6 space-y-3 rounded-2xl bg-slate-50 p-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="h-4 w-4 text-blue-500" />
                                                <span className="font-medium">{start.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock className="h-4 w-4 text-blue-500" />
                                                <span className="font-medium">{start.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Users className="h-4 w-4 text-slate-400" />
                                                <span>{session.availableSlots} Left</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-600">
                                                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                <span>{session.schedule?.duration}m</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instructor Section */}
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-blue-50">
                                            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600">
                                                {session.instructor?.name?.charAt(0) || 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{session.instructor?.name || 'Expert'}</p>
                                            <p className="text-xs text-slate-500">{session.instructor?.title || 'Instructor'}</p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {status === 'live' ? (
                                        <Button
                                            className="w-full bg-red-500 py-6 font-bold text-white hover:bg-red-600 shadow-lg shadow-red-200"
                                            onClick={() => window.open(session.liveDetails?.joinUrl || session.liveDetails?.meetingUrl, '_blank')}
                                        >
                                            <Video className="mr-2 h-4 w-4" /> Join Workshop
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={session.availableSlots === 0}
                                            className="w-full group/btn bg-slate-900 py-6 font-bold text-white hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 hover:shadow-blue-200"
                                            onClick={() => handleReserveClick(session._id)}
                                        >
                                            {session.availableSlots === 0 ? 'Fully Booked' : 'Reserve Spot'}
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Custom Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-3">
                        <Button
                            variant="outline"
                            className="h-12 w-12 rounded-xl border-slate-200"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-600">
                            {currentPage} / {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            className="h-12 w-12 rounded-xl border-slate-200"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const LoadingState = () => (
    <div className="min-h-screen bg-[#fcfcfd]">
        <div className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-52 w-full rounded-xl" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default LiveSessions;