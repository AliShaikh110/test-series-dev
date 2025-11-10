const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async handleOAuthRedirect(provider: string) {
    try {
      window.location.href = `${baseUrl}/api/connect/${provider}`;
    } catch (error) {
      console.error("OAuth redirect error:", error);
      throw error;
    }
  },

  async validateOAuthCallback(provider: string, access_token: string) {
    try {
      const response = await fetch(
        `${baseUrl}/api/auth/${provider}/callback?access_token=${access_token}`
      );

      if (!response.ok) {
        throw new Error("OAuth validation failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("OAuth callback validation error:", error);
      throw error;
    }
  },
};
