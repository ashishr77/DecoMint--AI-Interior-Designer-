import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  ArrowRight, 
  Check, 
  Download,
  Palette,
  Home,
  Camera,
  Wand2,
  Clock,
  Award
} from "lucide-react";

export default function Home1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-3xl md:text-4xl lg:text-5xl dark:text-neutral-200">
              Interior Designer:<br />
              <span className="bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-500 text-transparent">
                An AI Interior Design Platform
              </span>
            </h1>
          </div>
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Effortless Interior Designing at Your Fingertips! Transform Your Space with AI
            </p>
          </div>
          <div className="mt-8 gap-3 flex justify-center">
            <a className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border border-transparent text-white text-xl font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-2.5 px-3 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105"
              href="/dashboard">
              Get started
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Demo Images */}
      <div className="flex items-center justify-center px-4 mb-16">
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl blur-3xl"></div>
          <Image 
            src={'/group.png'} 
            alt="desktopGroup" 
            width={1000} 
            height={600} 
            className='hidden md:block w-full h-auto rounded-2xl shadow-2xl border border-white/20 relative z-10'
          />
          <Image 
            src={'/groupmobile.png'} 
            alt="mobileGroup" 
            width={809} 
            height={1500} 
            className='md:hidden w-full h-auto rounded-2xl shadow-2xl border border-white/20 relative z-10'
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Why Choose Our AI Interior Designer?
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Experience the future of interior design with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                AI-Powered Design
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Transform any space with our advanced AI that understands design principles and personal preferences.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Get professional interior design suggestions in seconds, not days. Upload and transform instantly.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Multiple Styles
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                From modern minimalist to classic elegance, explore various design styles tailored to your taste.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Easy Upload
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Simply upload a photo of your room and let our AI work its magic. No technical skills required.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                High Quality Output
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Download your redesigned space in high resolution, perfect for sharing or implementation.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-700">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-neutral-400">
                Your images and designs are secure. We respect your privacy and never share your data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm md:text-base opacity-90">Rooms Designed</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm md:text-base opacity-90">Happy Users</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-sm md:text-base opacity-90">Satisfaction Rate</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90">AI Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            How It Works
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Transform your space in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6">
              <span className="text-white font-bold text-xl">1</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Camera className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Upload Your Photo
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Take a photo of your room or upload an existing image to get started.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6">
              <span className="text-white font-bold text-xl">2</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              AI Processing
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Our advanced AI analyzes your space and creates stunning design variations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <span className="text-white font-bold text-xl">3</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Download className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Download & Enjoy
            </h3>
            <p className="text-gray-600 dark:text-neutral-400">
              Compare results, download your favorite designs, and transform your space!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of AI interior design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Designing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">Interior Designer</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-neutral-400 mb-4">
              Transform your space with AI-powered interior design
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              © 2024 Interior Designer AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}