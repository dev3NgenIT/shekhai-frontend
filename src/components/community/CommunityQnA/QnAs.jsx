"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ThumbsUp, Eye, CheckCircle, FileText, RefreshCw, X, Send, User, Mail, ChevronDown, ChevronUp } from "lucide-react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from 'react-hot-toast';

// API base URL
const API_BASE_URL ="https://shekhai-server.onrender.com/api/v1";

// Safe function to get user initials
const getUserInitials = (name) => {
  if (!name || typeof name !== 'string') return '??';
  
  return name
    .trim()
    .split(' ')
    .map((n) => n[0] || '')
    .filter((char) => char)
    .join('')
    .toUpperCase()
    .substring(0, 2) || '??';
};

// View More Answers Modal Component
const ViewMoreAnswersModal = ({ isOpen, onClose, questionId, questionTitle, answers, totalAnswers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-3xl max-h-[80vh] rounded-lg bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Answers</h2>
            <p className="text-sm text-gray-600 mt-1">{questionTitle}</p>
            <p className="text-sm text-gray-500 mt-1">{totalAnswers} answers total</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Answers List */}
        <div className="flex-1 overflow-y-auto p-6">
          {answers.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">No answers yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {answers.map((answer, index) => (
                <div key={answer._id || index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#234A96] text-white">
                        {getUserInitials(answer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{answer.name || 'Anonymous'}</span>
                          {answer.isAccepted && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              ✓ Solution
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(answer.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
                      {answer.attachment && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                          <FileText className="h-4 w-4" />
                          <span>Attachment included</span>
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{answer.likes || 0} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Answer Modal Component (keep your existing one, but updated)
const AnswerModal = ({ isOpen, onClose, questionId, questionTitle, onAnswerPosted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    attachment: null,
  });
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      // Check file type
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload only images (JPEG, PNG, GIF, WEBP), PDF, or Word documents');
        return;
      }

      setFormData(prev => ({ ...prev, attachment: file }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({ ...prev, attachment: null }));
    setAttachmentPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.content.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('content', formData.content.trim());
      
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      const response = await fetch(`${API_BASE_URL}/community/questions/${questionId}/answers`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Answer posted successfully!');
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          content: "",
          attachment: null,
        });
        setAttachmentPreview(null);
        
        // Close modal and refresh questions
        onClose();
        if (onAnswerPosted) onAnswerPosted();
      } else {
        throw new Error(result.message || 'Failed to post answer');
      }
    } catch (error) {
      console.error('Error posting answer:', error);
      toast.error(error.message || 'Failed to post answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Answer</h2>
            <p className="text-sm text-gray-600 mt-1">Question: {questionTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                Your Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
                className="h-11"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4" />
                Your Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className="h-11"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Answer Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Answer *
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your detailed answer here..."
              className="min-h-[150px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Attachment (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className={`flex cursor-pointer items-center gap-2 rounded-lg border border-dashed ${isSubmitting ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white hover:bg-gray-50'} px-4 py-3 transition-colors`}>
                <FileText className={`h-4 w-4 ${isSubmitting ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isSubmitting ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isSubmitting ? 'Uploading...' : 'Upload file'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAttachmentChange}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx"
                  disabled={isSubmitting}
                />
              </label>
              <span className="text-sm text-gray-500">
                Max 5MB (Images, PDF, Word)
              </span>
            </div>
            
            {/* Attachment Preview */}
            {attachmentPreview && (
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                <img 
                  src={attachmentPreview} 
                  alt="Preview" 
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {formData.attachment?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(formData.attachment?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.content.trim()}
              className="bg-[#234A96] text-white hover:bg-[#234A96]/80"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Posting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Post Answer
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function CommunityQnA() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState({
    search: "",
    sort: "newest",
    resolved: "all"
  });
  
  // Track liked answers and questions
  const [likedAnswers, setLikedAnswers] = useState(new Set());
  const [likedQuestions, setLikedQuestions] = useState(new Set());
  
  // Answer modal state
  const [answerModal, setAnswerModal] = useState({
    isOpen: false,
    questionId: null,
    questionTitle: "",
  });
  
  // View more answers modal state
  const [viewAnswersModal, setViewAnswersModal] = useState({
    isOpen: false,
    questionId: null,
    questionTitle: "",
    answers: [],
    totalAnswers: 0
  });

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';
      
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) {
        return `${diffMins} min ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else if (diffDays < 30) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      return 'Recently';
    }
  };

  // Fetch questions from API
  const fetchQuestions = async (page = 1, limit = 6, search = "", sort = "newest", resolved = "all") => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(sort && { sort }),
        ...(resolved !== "all" && { resolved })
      });

      const response = await fetch(`${API_BASE_URL}/community/questions?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      if (result.success) {
        setQuestions(Array.isArray(result.data) ? result.data : []);
        setPagination(result.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0
        });
      } else {
        throw new Error(result.message || 'Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error.message || 'Failed to load questions. Please try again.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch community stats
  const [stats, setStats] = useState(null);
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/community/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchQuestions();
    fetchStats();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    fetchQuestions(1, pagination.limit, newFilters.search, newFilters.sort, newFilters.resolved);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchQuestions(newPage, pagination.limit, filters.search, filters.sort, filters.resolved);
    }
  };

  // Handle like answer
  const handleLikeAnswer = async (answerId, questionId, answerAuthorName) => {
    if (!answerId || likedAnswers.has(answerId)) return;
    
    const loadingToast = toast.loading('Liking answer...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/community/answers/${answerId}/like`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Mark this answer as liked locally
        setLikedAnswers(prev => new Set(prev).add(answerId));
        
        // Update the question locally for immediate UI feedback
        setQuestions(prevQuestions => 
          prevQuestions.map(question => {
            if (question._id === questionId) {
              const updatedAnswers = question.answers?.map(answer => {
                if (answer._id === answerId) {
                  return {
                    ...answer,
                    likes: (answer.likes || 0) + 1
                  };
                }
                return answer;
              });
              
              return {
                ...question,
                answers: updatedAnswers
              };
            }
            return question;
          })
        );
        
        toast.success(`Liked ${answerAuthorName}'s answer!`, { id: loadingToast });
      } else {
        throw new Error(result.message || 'Failed to like answer');
      }
    } catch (error) {
      console.error('Error liking answer:', error);
      toast.error(error.message || 'Failed to like answer. Please try again.', { id: loadingToast });
    }
  };

  // Handle like question
  const handleLikeQuestion = async (questionId, questionTitle) => {
    if (!questionId || likedQuestions.has(questionId)) return;
    
    const loadingToast = toast.loading('Liking question...');
    
    try {
      // Since your API doesn't have question liking yet, we'll simulate it locally
      // When you add question liking API, replace this with actual API call
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mark this question as liked locally
      setLikedQuestions(prev => new Set(prev).add(questionId));
      
      // Update the question locally for immediate UI feedback
      setQuestions(prevQuestions => 
        prevQuestions.map(question => {
          if (question._id === questionId) {
            return {
              ...question,
              likes: (question.likes || 0) + 1
            };
          }
          return question;
        })
      );
      
      toast.success(`Liked "${questionTitle}"!`, { id: loadingToast });
      
      // TODO: When you add question liking API, replace with:
      /*
      const response = await fetch(`${API_BASE_URL}/community/questions/${questionId}/like`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setLikedQuestions(prev => new Set(prev).add(questionId));
        toast.success(`Liked "${questionTitle}"!`, { id: loadingToast });
      } else {
        throw new Error(result.message || 'Failed to like question');
      }
      */
      
    } catch (error) {
      console.error('Error liking question:', error);
      toast.error(error.message || 'Failed to like question. Please try again.', { id: loadingToast });
    }
  };

  // Handle accept answer
  const handleAcceptAnswer = async (answerId, questionId, answerAuthorName) => {
    if (!answerId) return;
    
    const loadingToast = toast.loading('Marking as solution...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/community/answers/${answerId}/accept`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh the questions to show updated status
        await fetchQuestions(pagination.page, pagination.limit, filters.search, filters.sort, filters.resolved);
        toast.success(`Marked ${answerAuthorName}'s answer as solution!`, { id: loadingToast });
      } else {
        throw new Error(result.message || 'Failed to accept answer');
      }
    } catch (error) {
      console.error('Error accepting answer:', error);
      toast.error(error.message || 'Failed to accept answer. Please try again.', { id: loadingToast });
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    toast.loading('Refreshing questions...', { duration: 1000 });
    fetchQuestions(pagination.page, pagination.limit, filters.search, filters.sort, filters.resolved);
    fetchStats();
  };

  // Open answer modal
  const openAnswerModal = (questionId, questionTitle) => {
    setAnswerModal({
      isOpen: true,
      questionId,
      questionTitle,
    });
  };

  // Close answer modal
  const closeAnswerModal = () => {
    setAnswerModal({
      isOpen: false,
      questionId: null,
      questionTitle: "",
    });
  };

  // Open view more answers modal
  const openViewMoreAnswers = (questionId, questionTitle, answers, totalAnswers) => {
    setViewAnswersModal({
      isOpen: true,
      questionId,
      questionTitle,
      answers,
      totalAnswers
    });
  };

  // Close view more answers modal
  const closeViewMoreAnswers = () => {
    setViewAnswersModal({
      isOpen: false,
      questionId: null,
      questionTitle: "",
      answers: [],
      totalAnswers: 0
    });
  };

  // Handle answer posted successfully
  const handleAnswerPosted = () => {
    fetchQuestions(pagination.page, pagination.limit, filters.search, filters.sort, filters.resolved);
    fetchStats();
  };

  // Calculate remaining answers to show
  const getRemainingAnswers = (question) => {
    const total = question.answersCount || 0;
    const shown = question.answers?.length || 0;
    const remaining = Math.max(0, total - shown);
    return remaining;
  };

  // Loading skeleton
  if (loading && questions.length === 0) {
    return (
      <section className="mt-[3.75rem] rounded-2xl bg-[#F4F7FD] px-5 py-10">
        <Header />
        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-lg border-0 bg-white p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center justify-between pt-3">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
          loading: {
            duration: 2000,
          },
        }}
      />
      
      <AnswerModal
        isOpen={answerModal.isOpen}
        onClose={closeAnswerModal}
        questionId={answerModal.questionId}
        questionTitle={answerModal.questionTitle}
        onAnswerPosted={handleAnswerPosted}
      />

      <ViewMoreAnswersModal
        isOpen={viewAnswersModal.isOpen}
        onClose={closeViewMoreAnswers}
        questionId={viewAnswersModal.questionId}
        questionTitle={viewAnswersModal.questionTitle}
        answers={viewAnswersModal.answers}
        totalAnswers={viewAnswersModal.totalAnswers}
      />

      <section className="mt-[3.75rem] rounded-2xl bg-[#F4F7FD] px-5 py-10">
        <Header />
        
        {/* Stats Bar */}
        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="rounded-lg border-0 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions || 0}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card className="rounded-lg border-0 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Answers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAnswers || 0}</p>
                </div>
                <div className="rounded-full bg-green-100 p-2">
                  <ThumbsUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>
            
            <Card className="rounded-lg border-0 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.resolvedQuestions || 0}</p>
                </div>
                <div className="rounded-full bg-purple-100 p-2">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>
            
            <Card className="rounded-lg border-0 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.resolutionRate || 0}%</p>
                </div>
                <div className="rounded-full bg-orange-100 p-2">
                  <Eye className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters Bar */}
        <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.resolved === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("resolved", "all")}
              className="bg-[#234A96] text-white hover:bg-[#234A96]/80"
            >
              All Questions
            </Button>
            <Button
              variant={filters.resolved === "unresolved" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("resolved", "unresolved")}
            >
              Unresolved
            </Button>
            <Button
              variant={filters.resolved === "resolved" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("resolved", "resolved")}
            >
              Resolved
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#234A96] focus:outline-none focus:ring-1 focus:ring-[#234A96]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="most-answered">Most Answered</option>
            </select>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm focus:border-[#234A96] focus:outline-none focus:ring-1 focus:ring-[#234A96]"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Grid */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {questions.length === 0 && !loading ? (
            <div className="col-span-2 py-12 text-center">
              <div className="mx-auto max-w-md">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No questions yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Be the first to ask a question and start the discussion!
                </p>
              </div>
            </div>
          ) : (
            questions.map((question) => {
              const remainingAnswers = getRemainingAnswers(question);
              const allAnswers = question.answers || [];
              
              return (
                <Card
                  key={question._id || Math.random()}
                  className="rounded-lg border-0 bg-white p-6 transition-all hover:shadow-md"
                >
                  <CardContent className="space-y-4 p-0">
                    {/* Question Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-[#234A96] text-white">
                            {getUserInitials(question.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{question.name || 'Anonymous User'}</span>
                            {question.isResolved && (
                              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(question.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div>
                      <h3 
                        className="mb-2 text-lg font-semibold text-gray-900 hover:text-[#234A96] cursor-pointer"
                      >
                        {question.title || 'Untitled Question'}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {question.question || 'No description provided.'}
                      </p>
                    </div>

                    {/* Tags */}
                    {question.tags && Array.isArray(question.tags) && question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {question.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                            #{tag}
                          </Badge>
                        ))}
                        {question.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                            +{question.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Answers Preview */}
                    {allAnswers.length > 0 && (
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Recent Answers</span>
                          <Badge variant="outline" className="text-xs">
                            {question.answersCount || allAnswers.length} answers
                          </Badge>
                        </div>
                        
                        {/* Show first 2 answers */}
                        {allAnswers.slice(0, 2).map((answer) => (
                          <div key={answer._id || Math.random()} className="mb-3 last:mb-0">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-gray-300 text-xs">
                                  {getUserInitials(answer.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-700">{answer.name || 'Anonymous'}</span>
                                    {answer.isAccepted && (
                                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-1 py-0">
                                        ✓ Solution
                                      </Badge>
                                    )}
                                  </div>
                                  {!answer.isAccepted && (
                                    <button
                                      onClick={() => handleAcceptAnswer(answer._id, question._id, answer.name)}
                                      className="cursor-pointer text-xs text-green-600 hover:text-green-800 hover:underline"
                                    >
                                      Mark as solution
                                    </button>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{answer.content || ''}</p>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => handleLikeAnswer(answer._id, question._id, answer.name)}
                                    disabled={likedAnswers.has(answer._id)}
                                    className={`cursor-pointer flex items-center gap-1 text-xs ${likedAnswers.has(answer._id) ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-blue-600'}`}
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{answer.likes || 0}</span>
                                    {likedAnswers.has(answer._id) && <span className="ml-1">✓</span>}
                                  </button>
                                  <button
                                    onClick={() => openAnswerModal(question._id, question.title)}
                                    className="cursor-pointer text-xs text-gray-500 hover:text-green-600 hover:underline"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* View More Answers Button */}
                        {remainingAnswers > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <button
                              onClick={() => openViewMoreAnswers(
                                question._id,
                                question.title,
                                allAnswers,
                                question.answersCount || allAnswers.length
                              )}
                              className="w-full cursor-pointer flex items-center justify-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <ChevronDown className="h-3 w-3" />
                              View {remainingAnswers} more answer{remainingAnswers > 1 ? 's' : ''}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-4">
                        {/* Question Like Button - NOW WORKING */}
                        <button
                          onClick={() => handleLikeQuestion(question._id, question.title)}
                          disabled={likedQuestions.has(question._id)}
                          className={`cursor-pointer flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 ${likedQuestions.has(question._id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{question.likes || 0}</span>
                          {likedQuestions.has(question._id) && <span className="ml-1">✓</span>}
                        </button>
                        
                        {/* Comments Button */}
                        <button
                          onClick={() => openAnswerModal(question._id, question.title)}
                          className="cursor-pointer flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-green-600"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>{question.answersCount || 0}</span>
                        </button>
                      </div>
                      
                      {/* Add Answer Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAnswerModal(question._id, question.title)}
                        className="border-[#234A96] text-[#234A96] hover:bg-[#234A96] hover:text-white"
                      >
                        Add Answer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </section>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={pagination.page === pageNum ? "bg-[#234A96] text-white" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
            
            <span className="ml-4 text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </span>
          </div>
        )}
      </section>
    </>
  );
}