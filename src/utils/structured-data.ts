/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateStructuredData(data: any) {
  // Basic validation to ensure required fields are present
  const requiredFields = ['@context', '@type', 'name', 'description'];
  const hasAllRequired = requiredFields.every(field => data[field]);

  if (!hasAllRequired) {
    console.warn('Structured data is missing required fields');
    return false;
  }

  return true;
}