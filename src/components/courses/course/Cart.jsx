"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Cart({ course }) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(course);
  const courseId = params?.slug || params?.id || courseData?._id;

  // If course prop is not provided, fetch it
  useEffect(() => {
    const fetchCourse = async () => {
      if (courseData || !courseId) return;

      try {
        const response = await axios.get(
          `https://shekhai-server.onrender.com/api/v1/courses/${courseId}`,
        );

        if (response.data.success) {
          setCourseData(response.data.course || response.data.data);
        }
      } catch (error) {
        console.error("Error fetching course for cart:", error);
      }
    };

    fetchCourse();
  }, [courseId, courseData]);

  // Handle enroll button click - Redirect to checkout without login
  const handleEnroll = () => {
    if (!courseId) {
      toast.error("Course not found");
      return;
    }

    try {
      setLoading(true);
      
      // Store course data in localStorage for checkout page
      localStorage.setItem('checkoutCourse', JSON.stringify({
        id: courseId,
        title: courseData?.title,
        price: courseData?.price,
        instructor: courseData?.instructor,
        bannerUrl: courseData?.bannerUrl,
        shortDescription: courseData?.shortDescription
      }));
      
      // Redirect to checkout page with course ID
      router.push(`/checkout?course=${courseId}`);
      
    } catch (error) {
      console.error("Error preparing checkout:", error);
      toast.error("Failed to proceed to checkout");
    } finally {
      setLoading(false);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!courseId) {
      toast.error("Course not found");
      return;
    }

    // Add course to cart logic here
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if course is already in cart
      if (cart.some(item => item.id === courseId)) {
        toast.error("Course already in cart");
        return;
      }

      // Add course details to cart
      cart.push({
        id: courseId,
        title: courseData?.title,
        price: courseData?.price,
        bannerUrl: courseData?.bannerUrl,
        addedAt: new Date().toISOString()
      });
      
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Course added to cart");
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  // Format price
  const formatPrice = (price) => {
    if (!price && price !== 0) return "Free";
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate total duration in hours
  const getTotalHours = () => {
    const duration = courseData?.totalDuration || 0;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hours`;
    return `${hours}h ${minutes}m`;
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!courseData?.price) return 0;
    const originalPrice = courseData.price * 1.2; // 20% more as original
    if (originalPrice <= courseData.price) return 0;
    const discount = ((originalPrice - courseData.price) / originalPrice) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscount();

  return (
    <Card className="gap-0 rounded-sm border-0 p-6 shadow-none">
      <h3 className="mb-6 text-xl font-semibold text-base">
        Course Enrollment
      </h3>

      <div className="mb-6 space-y-4">
        <div className="text-start">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl font-bold text-base">
              {formatPrice(courseData?.price || 0)}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice((courseData?.price || 0) * 1.2)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-bold text-red-600">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500">
            One-time payment • Lifetime access
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Access</span>
            <span className="font-medium">Lifetime</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{getTotalHours()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Modules</span>
            <span className="font-medium">
              {courseData?.modules?.length || 0} modules
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Certificate</span>
            <span className="font-medium">Included</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <Button
          className="w-full py-6 text-lg font-medium bg-base hover:bg-base/90"
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Processing..." : "Enroll Now"}
        </Button>

        {/* <Button
          variant="outline"
          className="w-full py-6 text-lg font-medium border-base text-base hover:bg-base/10"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button> */}
      </div>

      <div className="mt-6 space-y-3 text-start text-sm text-gray-500">
        <p>✓ 30-day money-back guarantee</p>
        <p>✓ Full lifetime access</p>
        <p>✓ Certificate of completion</p>
        {courseData?.price === 0 && <p>✓ Free course</p>}
      </div>
    </Card>
  );
}