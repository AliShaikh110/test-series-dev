// export const ownershipQuery = "/api/ownerships?populate=true";
export const ownershipQuery="/api/universityys?fields[0]=ownership";
export const indianStatesQuery = (stream: string) => {
  let query = `/api/indian-states`;
  if (stream !== "all") {
    query += `?populate[universityys][filters][streams][slug][$eq]=${stream}`;
  }
  return query;
};



export const modeQuery="/api/modes?populate=true"
export const streamsQuery="/api/streams?populate=true"
export const durationQuery="/api/durations?populate=true"
// export const courseQuery="/api/courses?populate=true&fields[0]=slug&fields[1]=title"
export const rankingQuery="/api/rankings?fields[0]=publisherName&fields[1]=slug"
export const streasmQuery = "/api/streams?populate=true"

// export const examsFilterQuery="/api/entrance-exams?fields[0]=slug&fields[1]=title"
export const cityQuery="/api/city?fields[0]=title&fields[1]=slug"



