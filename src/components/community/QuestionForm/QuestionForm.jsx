"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ProgressSteps from "./ProgressSteps";
import { Upload, X } from "lucide-react";

// API base URL - change this based on your environment
const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

export default function QuestionForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    title: "",
    question: "",
    attachment: null,
  });

  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    // Prepare form data for POST request
    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('title', data.title.trim());
    formData.append('question', data.question.trim());
    
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    try {
      // Make POST request to your API endpoint
      const response = await fetch(`${API_BASE_URL}/community/questions`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header for FormData - browser will set it automatically
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        
        // Reset form after successful submission
        setData({
          name: "",
          email: "",
          title: "",
          question: "",
          attachment: null,
        });
        setAttachmentPreview(null);
        
        // Show success message
        setSuccess(result.message || 'Your question has been posted successfully!');
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000);
      } else {
        // Handle API error response
        throw new Error(result.message || 'Failed to post question');
      }
    } catch (error) {
      console.error('Error posting question:', error);
      setError(error.message || 'Failed to post question. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setTimeout(() => setError(""), 5000);
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
        setError('Please upload only images (JPEG, PNG, GIF, WEBP), PDF, or Word documents');
        setTimeout(() => setError(""), 5000);
        return;
      }

      setData({ ...data, attachment: file });
      setError("");
      
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
    setData({ ...data, attachment: null });
    setAttachmentPreview(null);
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const isFormValid = 
    data.name.trim() && 
    data.email.trim() && 
    data.title.trim() && 
    data.question.trim();

  // Calculate current step based on form completion
  const currentStep = data.title && data.question ? 3 : data.name && data.email ? 2 : 1;

  return (
    <Card className="mt-5 mx-auto w-full max-w-4xl rounded-sm border-0 bg-[#F4F7FD] md:mt-[5.125rem]">
      <CardHeader className="pt-8 pb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Ask the community and get answers fast.
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Get help from experienced developers and share your knowledge
        </p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <ProgressSteps currentStep={currentStep} />

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
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

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Sender Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Your Name *
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="h-12 w-full border-gray-200 bg-white focus:border-[#234A96] focus:ring-[#234A96]"
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Your Email *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 w-full border-gray-200 bg-white focus:border-[#234A96] focus:ring-[#234A96]"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Question Title *
            </label>
            <Input
              id="title"
              placeholder="Enter a clear and concise title for your question"
              className="h-12 w-full border-gray-200 bg-white focus:border-[#234A96] focus:ring-[#234A96]"
              value={data.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Question Details */}
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium text-gray-700">
              Your Question *
            </label>
            <Textarea
              id="question"
              placeholder="Write your question here. Be as detailed as possible to get better answers..."
              className="min-h-[150px] resize-none border-gray-200 bg-white focus:border-[#234A96] focus:ring-[#234A96]"
              value={data.question}
              onChange={(e) => handleInputChange('question', e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Attachment */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Attachment (Optional)
            </label>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={`flex cursor-pointer items-center gap-2 rounded-lg border border-dashed ${isSubmitting ? 'border-gray-200 bg-gray-50' : 'border-gray-300 bg-white hover:bg-gray-50'} px-4 py-3 transition-colors`}>
                <Upload className={`h-4 w-4 ${isSubmitting ? 'text-gray-400' : 'text-gray-500'}`} />
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
                Supports: JPG, PNG, GIF, WEBP, PDF, DOC (Max 5MB)
              </span>
            </div>
            
            {attachmentPreview && (
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                <img 
                  src={attachmentPreview} 
                  alt="Preview" 
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {data.attachment?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(data.attachment?.size / 1024 / 1024).toFixed(2)} MB
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
            
            {data.attachment && !attachmentPreview && (
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100">
                  <span className="text-xs font-medium text-gray-600">
                    {data.attachment.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {data.attachment.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(data.attachment.size / 1024 / 1024).toFixed(2)} MB
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
          </div> */}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <div className="text-sm text-gray-500">
              <p>Your question will be visible to the community</p>
              <p>You'll receive email notifications for answers</p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="bg-[#234A96] px-8 py-2 font-medium text-white hover:bg-[#234A96]/80 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </div>
              ) : "Ask Question"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}