<script setup>
import { useLoadingStore } from "@/stores/loadingStore";
const loadingStore = useLoadingStore();
</script>

<template>
  <div v-if="loadingStore.isLoading" :class="loading_overlay">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading_overlay {
  width: 100%;
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  .spinner {
    width: 50px;
    height: 50px;
    border-top: 6px solid transparent;
    border-radius: 50%;
    animation: spin 1s infinite;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
