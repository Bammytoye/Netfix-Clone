import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TvSlider = ({ category }) => {
    const [content, setContent] = useState([]);
    const [showArrow, setShowArrow] = useState(false);
    const scrollRef = useRef(null); // 👈 ref for scrolling

    const formattedCategoryName =
        category.replaceAll("_", " ")[0].toUpperCase() +
        category.replaceAll("_", " ").slice(1);

    useEffect(() => {
        const getContent = async () => {
            try {
                const res = await axios.get(`/api/v1/tv/${category}`);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching TV content:", error);
            }
        };

        getContent();
    }, [category]);

    // 👇 Scroll handler functions
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };


    return (
        <div
            className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
        >
            <h2 className="text-xl font-bold mb-2">
                {formattedCategoryName} TV Shows
            </h2>

            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
            >
                {content.map((item) => (
                    <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt={item.title}
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>
                        <p className="mt-2 text-center line-clamp-1">{item.name}</p>
                    </Link>
                ))}
            </div>

            {showArrow && (
                <>
                    <button
                        onClick={scrollLeft}
                        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default TvSlider;
