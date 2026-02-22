const Background = ({heroCount}) => {
    const backgrounds = [
        {
            gradient: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
            overlay: 'bg-gradient-to-r from-white/70 via-pink-50/50 to-transparent'
        },
        {
            gradient: 'bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
            overlay: 'bg-gradient-to-r from-white/70 via-purple-50/50 to-transparent'
        },
        {
            gradient: 'bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200',
            image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80',
            overlay: 'bg-gradient-to-r from-white/70 via-orange-50/50 to-transparent'
        }
    ];

    const currentBg = backgrounds[heroCount] || backgrounds[0];
    const common = "w-full h-full min-h-[400px] sm:min-h-[500px] md:h-[600px] lg:h-[700px] object-cover bg-center transition-opacity duration-700 ease-in-out";

    return (
        <div className={`relative w-full h-full min-h-[400px] sm:min-h-[500px] md:h-[600px] lg:h-[700px] ${currentBg.gradient}`}>
            {/* Stylish Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    loading="lazy" 
                    alt={`Hero background ${heroCount + 1}`} 
                    className={common}
                    src={currentBg.image}
                    onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.target.style.display = 'none';
                    }}
                />
            </div>
            
            {/* Colorful Overlay */}
            <div className={`absolute inset-0 ${currentBg.overlay}`}></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
}

export default Background;