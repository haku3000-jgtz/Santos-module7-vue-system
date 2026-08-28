<template>
  <footer class="bg-gray-800 text-gray-400 text-center py-4 mt-10">
    <p class="text-sm">
      &copy; {{ year }} <span class="text-white font-medium">{{ studentName }}</span> &mdash; {{ section }}
    </p>
    <p class="text-xs mt-1">Software Engineering 1 &bull; Module 7 &mdash; Design and Implementation</p>
  </footer>
</template>

<script setup>
defineProps({
  studentName: {
    type: String,
    default: 'Student Name'
  },
  section: {
    type: String,
    default: 'Section'
  }
})

const year = new Date().getFullYear()
</script>
