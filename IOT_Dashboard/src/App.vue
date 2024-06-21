<script setup>
import myFooter from './components/myFooter.vue'
</script>

<template>
    <div>
      <!-- Título -->
      <div class="text-center py-3 bg-dark text-white">
        <img src="./assets/img/home-icon.png" alt="">
        <h1 class="fw-bold">IOT Dashboard</h1>
      </div>
  
      <!-- Navbar -->
      <header class="menubg text-white text-center py-2">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item me-5">
                  <router-link to="/" class="nav-link">Gestión de espacios</router-link>
                </li>
                <li class="nav-item me-5">
                  <router-link to="/crearEspacio" class="nav-link">+ Crear un nuevo espacio</router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  
      <!-- Espacio para la vista del router -->
      <router-view></router-view>
  
      <!-- Componente del footer -->
      <myFooter></myFooter>
    </div>
  </template>
  