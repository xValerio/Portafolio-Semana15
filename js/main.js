// Selección de elementos del DOM
const menuButton = document.querySelector('.menu-button'); // Botón del menú
const sidebar = document.getElementById('sidebar'); // Sidebar
const closeButton = sidebar.querySelector('.close-button'); // Botón de cerrar el menú
const toggleSubmenuBtns = document.querySelectorAll('.toggle-submenu-btn'); // Botones de submenú
const submenuIcons = document.querySelectorAll('.submenu-icon'); // Íconos de submenú
const nombre = document.querySelector('.nombre'); // Elemento con el nombre
const fuentes = ['"Dancing Script", cursive', '"Pacifico", cursive', '"Satisfy", cursive']; // Fuentes para el nombre
let index = 0; // Índice para cambiar las fuentes

// Asignar clases de colores a los submenús
const submenuList = document.querySelectorAll('.submenu');
submenuList.forEach((submenu, index) => {
    switch (index) {
        case 0:
            submenu.classList.add('submenu-1'); // Base de Datos II
            break;
        case 1:
            submenu.classList.add('submenu-2'); // Taller de Aplicaciones I
            break;
        case 2:
            submenu.classList.add('submenu-3'); // Taller de Aplicaciones II
            break;
        case 3:
            submenu.classList.add('submenu-4'); // Otros cursos
            break;
        default:
            break;
    }
});

// Abrir y cerrar el menú lateral
menuButton.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', isActive);
    isActive ? closeButton.focus() : menuButton.focus();
});

// Cerrar el menú al hacer clic en el botón de cerrar
closeButton.addEventListener('click', () => {
    sidebar.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
});

// Función para alternar la visibilidad de los submenús
toggleSubmenuBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        const submenu = this.nextElementSibling; // El siguiente submenú
        const isExpanded = submenu.classList.toggle('active'); // Alternar el submenú

        // Alternar la visibilidad de los sub-submenús si existiera
        const subSubmenu = submenu.querySelector('.sub-submenu');
        if (subSubmenu) {
            subSubmenu.classList.remove('active'); // Ocultar cualquier sub-submenú al abrir un submenú diferente
        }
    });
});

// Manejo del evento mouseover para cambiar fuentes
nombre.addEventListener('mouseover', () => {
    index = (index + 1) % fuentes.length; // Cambiar el índice de la fuente
    nombre.style.fontFamily = fuentes[index]; // Aplicar la nueva fuente
});

// Efecto de caída y eliminación del nombre al hacer clic
nombre.addEventListener('click', () => {
    nombre.classList.add('caer'); // Agregar clase para animación
    setTimeout(() => {
        nombre.remove(); // Eliminar el elemento después de la animación
    }, 1600); // Tiempo coincide con la duración de la animación
});

//Three.js de un nudo toroidal rotante y un fondo de estrellas.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-animation').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});