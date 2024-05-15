// AuthService.js
class AuthService {
  static async login(email, password) {
    // Perform login API request
    const response = await fetch("http://localhost:51040/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // Handle response data as needed
    return data;
  }

  static async register(email, password) {
    // Perform registration API request
    const response = await fetch("http://localhost:51040/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // Handle response data as needed
    return data;
  }
}

export default AuthService;

// mBAblsee42w2AR6r
