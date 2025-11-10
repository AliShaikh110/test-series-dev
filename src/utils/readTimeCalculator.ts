export const calculateReadingTime = (
  content: string
): { minutes: number; seconds: number } => {
  if (!content) return { minutes: 0, seconds: 0 };

  // Strip HTML tags and decode HTML entities
  const plainText = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
    .replace(/&[a-zA-Z]+;/g, "") // Remove other HTML entities
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Count words (split by spaces and filter out empty strings)
  const wordCount = plainText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Average reading speed (words per minute)
  const wordsPerMinute = 200;

  // Calculate total reading time in minutes
  const totalMinutes = wordCount / wordsPerMinute;

  // Convert to minutes and seconds
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);

  return { minutes, seconds };
};

// Helper function to format the reading time as a string
export const formatReadingTime = (content: string): string => {
  const { minutes, seconds } = calculateReadingTime(content);

  if (minutes === 0 && seconds === 0) {
    return "Less than a minute";
  }

  if (minutes === 0) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} read`;
  }

  if (seconds === 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} read`;
  }

  return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} second${
    seconds !== 1 ? "s" : ""
  } read`;
};
