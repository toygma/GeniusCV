const Title = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center mb-16 px-4">
      {/* Üst dekoratif çizgi */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>
      
      {/* Başlık */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
        {title}
      </h2>
      
      <p className="text-lg text-slate-600 max-w-7xl mx-auto leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center justify-center mt-6 gap-2">
        <div className="h-1 w-1 rounded-full bg-blue-500"></div>
        <div className="h-1 w-8 rounded-full bg-blue-500"></div>
        <div className="h-1 w-1 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
};

export default Title;