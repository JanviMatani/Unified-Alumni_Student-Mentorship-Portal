const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:flex relative">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Alumni Mentorship Portal
          </h1>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
