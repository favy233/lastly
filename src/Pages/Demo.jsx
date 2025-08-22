import { useState } from 'react';

const Demo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Using a sample YouTube video ID (replace with your own)
  const videoId = "dQw4w9WgXcQ"; // Example ID
  
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use your router
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">See InventoryFlow in Action</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch how our platform transforms your inventory management in under 3 minutes
        </p>
      </div>
      
      {/* Video Container */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        {isPlaying ? (
          // Actual YouTube video player
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="InventoryFlow Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Video placeholder with play button
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                <svg className="w-12 h-12 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </div>
            </div>
            
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="InventoryFlow Demo Video"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <p className="text-white text-lg font-medium">InventoryFlow Live Demo</p>
              <p className="text-gray-300">2:45 runtime</p>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Real-time Tracking",
            description: "Live updates of stock levels across all locations",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
          },
          {
            title: "Automated Alerts",
            description: "Get notified about low stock and expiring items",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            )
          },
          {
            title: "Smart Reporting",
            description: "Generate insights with powerful analytics",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate('/demo')}
            className="px-8 py-3 bg-white text-blue-600 border border-blue-200 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Request Live Demo
          </button>
        </div>
        <p className="mt-4 text-gray-600">
          No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default Demo;