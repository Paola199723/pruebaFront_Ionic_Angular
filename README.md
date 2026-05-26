

# Taskify - Ionic Angular + Firebase Remote Config

Aplicación de gestión de tareas desarrollada con Ionic y Angular, que incluye integración con Firebase Remote Config para habilitar o deshabilitar funcionalidades mediante feature flags sin necesidad de recompilar la aplicación.

---

# Características

* Crear, editar y eliminar tareas
* Filtrado por categoría y búsqueda
* Persistencia mediante servicios locales
* Modal de edición de tareas
* Feature Flag con Firebase Remote Config
* Control dinámico de la interfaz (botón de crear tareas)
* Compilación Android con Cordova

---

# Firebase Remote Config

La aplicación utiliza Firebase Remote Config para controlar la visibilidad del botón de creación de tareas.

## Parámetro configurado

| Key                       | Tipo             | Descripción                                           |
| ------------------------- | ---------------- | ----------------------------------------------------- |
| enable_create_task_button | Boolean / String | Habilita o deshabilita el botón de creación de tareas |

## Comportamiento

| Valor | Resultado en la aplicación         |
| ----- | ---------------------------------- |
| true  | Se muestra el botón de crear tarea |
| false | Se oculta el botón                 |

## Configuración en Firebase

1. Ir a Firebase Console
2. Abrir Remote Config
3. Crear parámetro:
   enable_create_task_button
4. Asignar valor true o false
5. Publicar cambios (Publish changes)

---

# Demo del Feature Flag

1. Ejecutar la aplicación
2. Cambiar valor en Firebase Remote Config
3. Reiniciar la aplicación
4. Ver el cambio en la interfaz (botón visible u oculto)

---

# Requisitos del proyecto

* Node.js 18 o superior
* npm o yarn
* Ionic CLI
* Cordova
* Android Studio
* Java JDK 17 o superior
* Proyecto Firebase configurado

---

# Instalación

Clonar el repositorio:

git clone <repo-url>
cd taskify

Instalar dependencias:

npm install

---

# Ejecución en desarrollo

ionic serve

---

# Build Android (APK)

## Agregar plataforma Android

cordova platform add android

## Compilar APK

cordova build android

## Ubicación del APK generado

platforms/android/app/build/outputs/apk/debug/app-debug.apk

## Instalar en dispositivo

Manual:
Copiar el APK al teléfono e instalarlo

Con ADB:
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk

---

# Firebase Setup

## Configuración en la aplicación

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "taskify-42606",
storageBucket: "taskify-42606.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"
};

## Inicialización

const app = initializeApp(firebaseConfig);

---

## Uso de Remote Config

this.FirebasePlugin.getValue(
"enable_create_task_button",
(res: any) => {
this.showCreateButton = res.value === "true";
}
);

---

# Notas importantes

* Los cambios en Remote Config pueden tardar unos segundos en aplicarse
* En algunos casos es necesario reiniciar la aplicación
* El APK generado es en modo debug
* Firebase debe estar correctamente configurado para que Remote Config funcione

---

# Optimización básica implementada

* Separación de servicios para tareas y categorías
* Filtrado en memoria de tareas
* Estructura modular en Angular
* Uso de Remote Config para control dinámico de UI sin recompilar
