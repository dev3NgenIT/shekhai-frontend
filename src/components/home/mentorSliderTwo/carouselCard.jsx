import Image from "next/image";
import Link from "next/link";

export default function CarouselCard({ item }) {
  // Extract data from your API structure
  const name = item?.name || "Wade Warren";
  const role = item?.role || "Ethical Hacker";
  const avatar = item?.avatar || "/instructor-carousel-image.png";
  const bio = item?.bio || "Expert in their field";
  const profileUrl = `/mentors/${item?._id || item?.id}`;


  return (
    <Link href="/instructors/wade-warren" className="text-lg text-title-one">
      <div className="relative flex h-36 w-[18.375rem] items-center justify-between overflow-hidden rounded-lg bg-text-light">
        <div className="px-4">
         {name}
          <p className="text-gray">{role}</p>
        </div>

        <Image
          src={avatar}
          alt="instructor image"
          width={294}
          height={144}
          className="absolute top-0 right-0"
        />
      </div>
    </Link>
  );
}



// import Image from "next/image";
// import Link from "next/link";

// export default function CarouselCard({ item }) {
//   // Extract data from your API structure
//   const name = item?.name || "Wade Warren";
//   const role = item?.role || "Ethical Hacker";
//   const avatar = item?.avatar || "/instructor-carousel-image.png";
//   const bio = item?.bio || "Expert in their field";
//   const profileUrl = `/mentors/${item?._id || item?.id}`;

//   return (
//     <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white">
//       {/* Top Image Section */}
//       <div className="relative h-48 overflow-hidden rounded-t-xl">
//         <Image
//           src={avatar}
//           alt={name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//         {/* Role Badge */}
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//           <span className="text-sm font-medium text-white">{role}</span>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-1 flex-col p-4">
//         <h3 className="text-lg font-medium text-title-one">{name}</h3>
//         <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
//           {bio}
//         </p>
        
//         {/* Stats Row */}
//         <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
//           <div className="text-center">
//             <div className="text-lg font-semibold text-title-one">0</div>
//             <div className="text-xs text-gray-500">Courses</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold text-title-one">0</div>
//             <div className="text-xs text-gray-500">Students</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold text-title-one">0</div>
//             <div className="text-xs text-gray-500">Reviews</div>
//           </div>
//         </div>

//         {/* View Profile Button */}
//         <Link
//           href={profileUrl}
//           className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-title-two px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-title-two/90"
//         >
//           View Profile
//           <svg 
//             className="h-4 w-4" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M14 5l7 7m0 0l-7 7m7-7H3" 
//             />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// }