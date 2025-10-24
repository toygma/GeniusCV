import { useState, useEffect } from "react";
import { FileText, Sparkles, Briefcase, Award, User } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { Icon: FileText, label: "Preparing" },
    { Icon: User, label: "Loading Profile" },
    { Icon: Briefcase, label: "Experiences" },
    { Icon: Award, label: "Talents" },
    { Icon: Sparkles, label: "AI Optimization" },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(iconInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
          100% { transform: scale(0.95); opacity: 1; }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand Area */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <FileText className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            AI Resume Builder
          </h1>
          <p className="text-purple-200 text-lg">
            We prepare your professional CV{" "}
          </p>
        </div>

        {/* Animated Icon Circle */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-4 border-purple-400/30"
              style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
            ></div>

            {/* Middle ring */}
            <div
              className="absolute inset-2 rounded-full border-4 border-indigo-400/30"
              style={{ animation: "pulse-ring 2s ease-in-out infinite 0.3s" }}
            ></div>

            {/* Inner circle with icon */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              {icons.map(({ Icon }, index) => {
                const IconComponent = Icon;
                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ${
                      currentIcon === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
                    }`}
                  >
                    <IconComponent
                      className="w-12 h-12 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                );
              })}
            </div>

            {/* Rotating gradient border */}
            <div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-50 blur-md"
              style={{ animation: "spin-slow 3s linear infinite" }}
            ></div>
          </div>

          {/* Current status text */}
          <div className="mt-6 h-8">
            <p className="text-white/80 text-sm font-medium transition-all duration-300">
              {icons[currentIcon].label}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/20 shadow-lg">
            <div
              className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-white/90 font-semibold text-lg">
              {progress}%
            </span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-200/80 max-w-lg mx-auto">
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            AI Powered
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <FileText className="w-3.5 h-3.5" />
            Multiple Template
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <Award className="w-3.5 h-3.5" />
            Professional
          </span>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
