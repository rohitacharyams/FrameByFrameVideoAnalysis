import { React, useEffect } from "react";
import { useAuth } from "../../firebase/authContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Transform Your Dance Skills with Dance.AI
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Join the best online dance training platform with AI-powered
              insights and personalized lessons. Improve your moves, track your
              progress, and become a better dancer.
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="https://via.placeholder.com/500"
              alt="Dance Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Feature 1"
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Personalized Lessons
              </h3>
              <p className="text-gray-600">
                Get lessons tailored to your skill level and dance style.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Feature 2"
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                AI-Powered Feedback
              </h3>
              <p className="text-gray-600">
                Receive real-time feedback on your moves with AI technology.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Feature 3"
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Track Your Progress
              </h3>
              <p className="text-gray-600">
                Monitor your improvement over time with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2024 Dance.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
