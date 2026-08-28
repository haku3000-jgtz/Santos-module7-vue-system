<template>
  <header class="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">📦 Inventory Management System</h1>
          <p class="mt-1 text-blue-200 text-sm sm:text-base">
            Manage your product inventory — Add, view, edit, delete, and search products.
          </p>
        </div>
        <div class="text-right">
          <span class="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            {{ recordCount }} {{ recordCount === 1 ? 'Product' : 'Products' }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  recordCount: {
    type: Number,
    default: 0
  }
})
</script>
