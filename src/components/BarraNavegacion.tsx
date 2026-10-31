import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Indicador } from './Indicador';
import { LogOut, CircleUser, ChevronDown } from 'lucide-react';
import { profile } from '../assets/utils/sistema.api';
import { useState, useEffect } from 'react';

export function BarraNavegacion() {
  const [nombre, setNombre] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [navegacionAbierta, setNavegacionAbierta] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;
    const fetchData = async () => {
      try {
        const response = await profile();
        if (activo) {
          setNombre(response.firstName || '');
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchData();
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    setNavegacionAbierta(false);
    setMenuAbierto(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/index');
  };

  const inicioActivo =
    location.pathname === '/inicio' ||
    location.pathname === '/aporte-ambiental' ||
    location.pathname.startsWith('/juego-educativo') ||
    location.pathname === '/conociendo-tu-planta' ||
    location.pathname.startsWith('/consejos-encontrados') ||
    location.pathname.startsWith('/mis-aprendizajes');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex min-h-16 w-full items-center justify-between px-4 py-3">
        <div className="shrink-0 text-gray-800">
          <Indicador />
        </div>
        {/* Botón menú móvil */}
        <button type="button" onClick={() => setNavegacionAbierta(!navegacionAbierta)}
          className="cursor-pointer rounded-lg p-2 text-gray-600 transition-colors hover:bg-lime-100 md:hidden"
          aria-label="Abrir menú de navegación" aria-expanded={navegacionAbierta}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {navegacionAbierta ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
        {/* Navegación y perfil */}
        <div className={`absolute left-0 top-full w-full border-b border-gray-200 bg-white p-4 shadow-md md:static md:flex md:w-auto md:items-center md:gap-6 md:border-0 md:p-0 md:shadow-none ${navegacionAbierta ? 'block' : 'hidden md:flex'}`}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Link to="/inicio"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors
                                ${inicioActivo
                  ? 'bg-lime-100 text-lime-800'
                  : 'text-gray-600 hover:bg-lime-50 hover:text-lime-800'
                }`}> Inicio
            </Link>
            <Link to="/mis-plantas"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors
                                ${location.pathname === '/mis-plantas' ||
                  location.pathname.startsWith('/aportes-plantas')
                  ? 'bg-lime-100 text-lime-800'
                  : 'text-gray-600 hover:bg-lime-50 hover:text-lime-800'
                }`}> Mi Jardín
            </Link>
            <Link to="/recursos"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors
                                ${location.pathname === '/recursos'
                  ? 'bg-lime-100 text-lime-800'
                  : 'text-gray-600 hover:bg-lime-50 hover:text-lime-800'
                }`} > Recursos
            </Link>
          </div>
          {/* Perfil del usuario */}
          <div className="relative mt-3 border-t border-gray-100 pt-3 md:mt-0 md:border-0 md:pt-0">
            <button type="button" onClick={() => setMenuAbierto(!menuAbierto)}
              className="cursor-pointer flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-lime-50 md:w-auto"
              aria-expanded={menuAbierto} >
              <span className="flex items-center gap-2">
                <CircleUser size={21} className="text-lime-700" />
                <span className="text-sm font-semibold">
                  {nombre || 'Mi cuenta'}
                </span>
              </span>
              <ChevronDown size={16} className={`transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
            </button>

            {menuAbierto && (
              <div className="mt-2 rounded-lg border border-gray-200 bg-white p-1 shadow-md md:absolute md:right-0 md:top-full md:mt-2 md:w-48">
                <button onClick={logout}
                  className="cursor-pointer flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                > <LogOut size={17} /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}