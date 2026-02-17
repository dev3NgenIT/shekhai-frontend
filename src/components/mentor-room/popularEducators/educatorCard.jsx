import Image from "next/image";
import Link from "next/link";

export default function EducatorCard({ instructor }) {
  const {
    _id,
    name,
    avatarUrl,
    bio,
    createdAt
  } = instructor;

  const profileImage = avatarUrl || null;
  const displayBio = bio || "Experienced educator passionate about teaching";
  const joinDate = createdAt ? new Date(createdAt).toLocaleDateString() : null;

  // Function to get initials from name (first 2 words)
  const getInitials = (fullName) => {
    if (!fullName) return "ED"; // Default fallback

    const words = fullName.split(" ").filter(word => word.length > 0);

    if (words.length === 0) return "ED";
    if (words.length === 1) return words[0].charAt(0).toUpperCase();

    // Get first letter of first two words
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  // Generate a consistent color based on name for the background
  const getColorFromName = (name) => {
    if (!name) return "#4F46E5"; // Default indigo color

    const colors = [
      "#4F46E5", // Indigo
      "#059669", // Emerald
      "#DC2626", // Red
      "#D97706", // Amber
      "#7C3AED", // Purple
      "#0891B2", // Cyan
      "#C026D3", // Fuchsia
      "#DB2777", // Pink
    ];

    // Simple hash function to get consistent color
    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const bgColor = getColorFromName(name);

  return (
    <Link
      href={`/instructors/${_id}`}
      className="relative h-[189px] w-full overflow-hidden md:w-[282px] group"
    >
      {profileImage ? (
        <Image
          src={profileImage}
          alt={name || "educator image"}
          width={282}
          height={189}
          className="h-[200px] w-full object-cover md:h-[189px] md:w-[282px] group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div
          className="h-[200px] w-full md:h-[189px] md:w-[282px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: bgColor }}
        >
          <span className="text-white text-4xl font-bold">
            {initials}
          </span>
        </div>
      )}

      <div className="absolute right-0 bottom-0 left-0 flex flex-col items-center justify-center bg-[#181818]/90 px-4 py-2 font-bold text-white backdrop-blur-sm">
        <h3 className="text-lg leading-normal">{name || "Instructor Name"}</h3>
        <p className="text-[14px] text-gray-300 line-clamp-1">
          {displayBio}
        </p>
        {joinDate && (
          <p className="text-[10px] text-gray-400 mt-1">
            Joined {joinDate}
          </p>
        )}
      </div>
    </Link>
  );
}