# LetterMyBox 🎬 - Diario Personal de Cine Full-Stack

**LetterMyBox** es una aplicación web de tipo diario personal diseñada para que los amantes del cine puedan registrar, puntuar y gestionar las películas que han visto. La aplicación permite a los usuarios mantener un historial de sus visualizaciones, añadir reseñas detalladas y marcar sus películas favoritas.

---

## 🚀 Características y Funcionalidades

### 🔐 Autenticación y Seguridad
* **Registro e Inicio de sesión:** Sistema de acceso privado para cada usuario.
* **Contraseñas Protegidas:** Uso de cifrado para garantizar la seguridad de los datos (Requisito 5.1).

### 📝 Gestión de Reseñas (CRUD Completo)
* **Crear:** Añadir películas con título, imagen (póster), comentario y puntuación por estrellas.
* **Listar:** Visualización de todas las películas en el diario personal.
* **Editar:** Modificación total de cualquier reseña existente.
* **Eliminar:** Borrado de entradas del diario con actualización en tiempo real.

### 💖 Entidad Secundaria y Estadísticas
* **Favoritos:** Sistema para marcar películas destacadas.
* **Panel de Estadísticas:** Visualización dinámica del total de películas, favoritas y nota media.
* **Ver Detalle:** Modal interactivo accesible desde el panel de estadísticas para visualizar la colección de favoritas sin desplazarse.

### 🔍 Búsqueda y Filtros
* **Buscador dinámico:** Filtrado de películas por título en tiempo real desde la interfaz principal.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **React.js:** Biblioteca principal para la interfaz de usuario.
* **React Router:** Gestión de navegación y rutas protegidas.
* **Axios:** Consumo de la API REST.
* **Context API:** Gestión del estado global de autenticación.
* **React Hot Toast:** Notificaciones visuales para el usuario.
* **React Icons:** Iconografía profesional.

### Backend
* **Node.js & Express:** Servidor y API REST.
* **Arquitectura por capas:** Separación clara entre Rutas, Controladores y Modelos (Patrón MVC).
* **Bcrypt:** Cifrado de contraseñas.
* **Dotenv:** Gestión de variables de entorno para seguridad.

### Base de Datos
* **MySQL:** Almacenamiento persistente de usuarios, reseñas y favoritos.

---

## 📂 Estructura del Proyecto

La aplicación mantiene una separación estricta entre cliente y servidor:

```text
/
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── context/      # Contexto de autenticación
│   │   └── pages/        # Vistas principales (Home, Login...)
├── backend/              # Servidor Node.js
│   ├── routes/           # Definición de endpoints API
│   ├── controllers/      # Lógica de negocio
│   ├── models/           # Acceso a datos (Consultas SQL)
│   └── .env              # Configuración de entorno
```
## ⚙️ Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    ```

2.  **Configurar el Backend:**
    * Navegar a `/backend` y ejecutar `npm install`.
    * Configurar el archivo `.env` con las credenciales de tu base de datos MySQL.
    * Ejecutar `npm start` o `node server.js`.

3.  **Configurar el Frontend:**
    * Navegar a `/frontend` y ejecutar `npm install`.
    * Ejecutar `npm start`.




