import { Navbar, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { Indicador } from './Indicador';
import { LogOut, CircleUser } from 'lucide-react';
import { profile } from '../assets/utils/sistema.api';
import { useState, useEffect } from 'react';

export function BarraNavegacion() {
    const [nombre, setNombre] = useState('');
    const location = useLocation();

    useEffect(()=> {
      const fetchData = async()=>{
        const response = await profile();
        setNombre(response.firstName);
      };
      fetchData();
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.clear();
    };

    return (
      <Navbar className='bg-white border-gray-200 dark:bg-gray-200 p-4 sticky top-0 z-50' fluid rounded>
        <span className="self-rigth whitespace-nowrap text-xl font-semibold dark:text-black">
          <Indicador />
        </span>
        <NavbarToggle className='bg-white md:hover:bg-white'/>
        <NavbarCollapse>
          <div className="flex flex-row space-x-7">
            <ul><a href="/inicio"  className={`font-semibold block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent md:p-0 dark:text-black ${
              location.pathname === '/inicio' || location.pathname === '/aporte-ambiental' || location.pathname.startsWith('/juego-educativo') || location.pathname === '/conociendo-tu-planta' || location.pathname.startsWith('/consejos-encontrados') || location.pathname.startsWith('/mis-aprendizajes')
                ? 'bg-lime-300 md:text-lime-700 md:dark:text-lime-500'
                : 'hover:bg-lime-100 md:hover:text-lime-700 md:dark:hover:text-lime-500 dark:hover:bg-lime-200 dark:hover:text-black md:dark:hover:bg-transparent'
            }`}>Inicio</a></ul>

            <ul><a href="/mis-plantas" className={`font-semibold block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent md:p-0 dark:text-black ${
              location.pathname === '/mis-plantas' || location.pathname.startsWith('/aportes-plantas')
                ? 'bg-lime-300 md:text-lime-700 md:dark:text-lime-500'
                : 'hover:bg-lime-100 md:hover:text-lime-700 md:dark:hover:text-lime-500 dark:hover:bg-lime-200 dark:hover:text-black md:dark:hover:bg-transparent'
            }`}>Mi Jardin</a></ul>
            
            <ul className="menu-boton">
              <a href="#" className="font-semibold block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent md:p-0 dark:text-black hover:bg-lime-100 md:hover:text-lime-700 md:dark:hover:text-lime-500 dark:hover:bg-lime-200 dark:hover:text-black md:dark:hover:bg-transparent">
                 <span className='flex flex-row space-x-4 gap-2'> <CircleUser /> {nombre} </span>
              </a>
              <ul className="submenu">
                <li><a onClick={logout} href="/index"> <span className='flex flex-row'><LogOut size={18} />Salir</span></a></li>
              </ul>
            </ul>
          </div>
        </NavbarCollapse>
      </Navbar>
    );
}
  