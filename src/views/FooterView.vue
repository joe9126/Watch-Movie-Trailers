<template>
  <footer class="footer-section py-4">
    <div class="container_ text-center">
      <p class="mb-1">&copy; {{ currentYear }} Joash Owaga. All rights reserved.</p>
      <div class="social-links mt-2">
        <a
          href="https://github.com/joe9126"
          target="_blank"
          class="me-3 text-decoration-none"
        >
          <i class="fab fa-github fa-lg"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/joash-owaga-662662360/"
          target="_blank"
          class="me-3 text-decoration-none"
        >
          <i class="fab fa-linkedin fa-lg"></i>
        </a>
        <a href="mailto:joeasewe@gmail.com" class="text-decoration-none">
          <i class="fas fa-envelope fa-lg"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-section {
  background-color: #cfd1d3;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.95rem;
}
.container_ {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 5rem;
  justify-content: center;
  background-color: #1a1919;
  color: #cfd1d3;
  padding-bottom: 2rem;
}

.footer-section a {
  color: inherit;
}

.footer-section a:hover {
  color: #0d6efd;
}
</style>
