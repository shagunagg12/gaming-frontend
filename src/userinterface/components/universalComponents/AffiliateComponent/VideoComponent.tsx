import { useEffect, useRef, useState } from "react";
import { FiSettings } from 'react-icons/fi';
import { FaShare } from "react-icons/fa6";
const AddVideo = () => {
    const [volume, setVolume] = useState(1);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const handleSpeedChange = (speed: number) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMD, setIsMD] = useState(false);
    useEffect(() => {
        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 720);
            setIsMD(window.innerWidth <= 1074) // Adjust for `sm` and `md` breakpoints
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const togglePictureInPicture = async () => {
        if (videoRef.current) {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await videoRef.current.requestPictureInPicture();
            }
        }
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="relative flex flex-col gap-4 bg-slate-900 rounded-lg font-sans">
            <div className="absolute top-4 right-4 z-10 flex gap-3 items-center justify-center">
                <button
                    className={`p-${isSmallScreen ? '1' : isMD ? '2' : '3'} bg-black/50 rounded-full text-white hover:bg-black/70 h-${isSmallScreen ? '6' : isMD ? '8' : '10'} w-${isSmallScreen ? '6' : isMD ? '8' : '10'}`}
                >
                    <div className="flex items-center justify-center h-full w-full">
                        <FaShare size={isSmallScreen ? 10 : isMD ? 15 : 20} />
                    </div>
                </button>
                <button
                    className={`p-${isSmallScreen ? '1' : isMD ? '2' : '3'} bg-black/50 rounded-full text-white hover:bg-black/70 h-${isSmallScreen ? '6' : isMD ? '8' : '10'} w-${isSmallScreen ? '6' : isMD ? '8' : '10'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="flex items-center justify-center h-full w-full">
                        <FiSettings size={isSmallScreen ? 10 : isMD ? 15 : 20} />
                    </div>
                </button>
            </div>

            {isMenuOpen && (
            <div className="absolute right-4 top-16 w-64 backdrop-blur-lg bg-gray-800/30 rounded-lg shadow-xl z-20 border border-gray-500/20">
                <div className="p-2 space-y-2">
                <div className="p-2 text-gray-200">
                    <label className="font-medium mb-1 block">Quality:</label>
                    <div className="flex gap-2">
                    {['Auto', '720p', '1080p'].map((quality) => (
                        <button
                        key={quality}
                        className="px-2 py-1 rounded-md bg-gray-600/30 hover:bg-gray-500/40 backdrop-blur-md"
                        >
                        {quality}
                        </button>
                    ))}
                    </div>
                </div>
                <div className="p-2 text-gray-200">
                    <label className="font-medium mb-1 block">Speed:</label>
                    <div className="flex gap-2">
                    {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 rounded-md transition-colors backdrop-blur-md ${playbackSpeed === speed ? 'bg-blue-500/50' : 'bg-gray-600/30 hover:bg-gray-500/40'
                                }`}
                        >
                            {speed}x
                        </button>
                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`transition-all duration-300 ${isZoomed ? 'scale-125' : 'scale-100'} flex items-center justify-center`}>
                <video ref={videoRef} className="h-full w-full rounded-lg" controls>
                    <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

    );
};

export default AddVideo;