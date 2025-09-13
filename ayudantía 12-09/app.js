// app.js   
const images = [
    "garfil.png",
    "pancham.jpg",
    "tepusistenerviosa.jpg",
    "gatoblyat.jpg",
    "houserat.jpg",
    "sonic duro.jpg"
];

function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    };

    React.useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full overflow-hidden relative">
            <h2 className="text-2xl font-serif font-extrabold text-center py-2">Galería de Imágenes</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", width: "900px", height: "350px" }}>
            <div style={{ display: "flex", position: "relative", width: "900px", height: "350px" }}>
                {images.map((image, index) => {
                    let positionStyle = {
                        width: "200px",
                        height: "150px",
                        transition: "width 0.8s, height 0.8s, left 0.8s, opacity 0.8s, transform 0.8s",
                        opacity: 0.5,
                        position: "absolute",
                        zIndex: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    };

                    if (index === currentIndex) {
                        positionStyle = {
                            ...positionStyle,
                            width: "480px",
                            height: "320px",
                            left: "210px",
                            top: "15px",
                            opacity: 1,
                            zIndex: 3,
                            transform: 'scale(1)',
                        };
                    } else if (index === (currentIndex + 1) % images.length) {
                        positionStyle = {
                            ...positionStyle,
                            width: "240px",
                            height: "180px",
                            left: "620px",
                            top: "85px",
                            opacity: 0.9,
                            zIndex: 2,
                            transform: 'scale(0.95)'
                        };
                    } else if (index === (currentIndex - 1 + images.length) % images.length) {
                        positionStyle = {
                            ...positionStyle,
                            width: "240px",
                            height: "180px",
                            left: "40px",
                            top: "85px",
                            opacity: 0.9,
                            zIndex: 2,
                            transform: 'scale(0.95)'
                        };
                    } else {
                        positionStyle = {
                            ...positionStyle,
                            left: "-200px",
                            opacity: 0,
                            zIndex: 0,
                        };
                    }

                    return (
                        <div key={index} style={positionStyle}>
                            <img
                                src={image}
                                alt={`Imagen ${index + 1}`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    display: 'block'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
                </div>
            </div>
    );
}

function StickyNav() {
    const [isSticky, setSticky] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <nav className={`w-full ${isSticky ? 'fixed top-0 left-0 bg-amber-300 shadow-lg' : 'relative bg-orange-400'} transition-all duration-300 z-50`}>
            <ul className="flex justify-around py-3 text-orange-950 font-semibold font-serif">
                <li><a href="#seccion1" className="hover:text-orange-900">Inicio</a></li>
                <li><a href="#seccion2" className="hover:text-orange-900">Servicios</a></li>
                <li><a href="#seccion3" className="hover:text-orange-900">Testimonios</a></li>
                <li><a href="#seccion4" className="hover:text-orange-900">Contacto</a></li>
            </ul>
        </nav>
    );
}

function ContancForm() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="px-8 py-5">

            <button
                onClick={toggleVisibility}
                className="bg-orange-800 text-slate-200 font-sans px-4 py-2 rounded hover:bg-orange-700 transition"
            >
                {isVisible ? 'Ocultar Formulario' : 'Mostrar Formulario de Contacto'}
            </button>
            

            {isVisible && (
                <section className="px-8 py-5">
                    <form className="mt-4 p-6 bg-amber-200 text-red-900 rounded-lg shadow-xl">
                        <div>
                            <h2 className="text-2xl font-serif font-extrabold pb-2">Contáctanos</h2>
                            <label htmlFor="nombre" className="block text-sm font-semibold text-orange-900 pt-2">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                className="mt-1 block w-full px-3 py-2 bg-amber-300 text-orange-900 placeholder-orange-800 border border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingresa tu nombre" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-orange-900 pt-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="mt-1 block w-full px-3 py-2 bg-amber-300 text-orange-900 placeholder-orange-800 border border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingresa tu email" 
                            />
                        </div>
                        <div>
                            <label htmlFor="mensaje" className="block text-sm font-semibold text-orange-900 pt-2">Mensaje</label>
                            <textarea 
                                id="mensaje" 
                                rows="3" 
                                className="mt-1 block w-full px-3 py-2 bg-amber-300 text-orange-900 placeholder-orange-800 border border-red-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Escribe tu mensaje">
                            </textarea>
                        </div>
                        <div class="px-8 py-4">
                            <button 
                            type="submit" 
                            className="bg-amber-400 text-red-900 font-bold px-8 py-2 rounded hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-950"
                        >
                            Enviar
                        </button>

                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}

ReactDOM.render(<StickyNav />, document.getElementById('sticky-nav'));
ReactDOM.render(<ContancForm />, document.getElementById('contact-form'));
ReactDOM.render(<ImageCarousel />, document.getElementById('image-carousel'));