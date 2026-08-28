<template>
  <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <!-- Search bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
      <h2 class="text-xl font-semibold text-gray-800">📋 Product List</h2>
      <div class="relative w-full sm:w-72">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search by name or category..."
          class="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>

    <!-- Records table (desktop) -->
    <div v-if="filteredRecords.length > 0" class="overflow-x-auto">
      <!-- Desktop table view -->
      <table class="hidden sm:table w-full text-sm text-left">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <th class="px-4 py-3 rounded-tl-lg">#</th>
            <th class="px-4 py-3">Product Name</th>
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3 text-right">Qty</th>
            <th class="px-4 py-3 text-right">Price (₱)</th>
            <th class="px-4 py-3 text-center">Status</th>
            <th class="px-4 py-3 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(record, index) in filteredRecords"
            :key="record.id"
            class="hover:bg-blue-50 transition-colors"
          >
            <td class="px-4 py-3 text-gray-500 font-mono text-xs">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ record.productName }}</td>
            <td class="px-4 py-3 text-gray-600">{{ record.category }}</td>
            <td class="px-4 py-3 text-right font-mono">{{ record.quantity }}</td>
            <td class="px-4 py-3 text-right font-mono">{{ formatPrice(record.price) }}</td>
            <td class="px-4 py-3 text-center">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="statusClass(record.status)"
              >
                {{ record.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-2">
                <button
                  @click="$emit('edit-record', record)"
                  class="rounded-md bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-200 transition cursor-pointer"
                >
                  ✏️ Edit
                </button>
                <button
                  @click="$emit('delete-record', record.id)"
                  class="rounded-md bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 transition cursor-pointer"
                >
                  🗑️ Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile card view -->
      <div class="sm:hidden space-y-3">
        <div
          v-for="(record, index) in filteredRecords"
          :key="record.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <p class="font-semibold text-gray-900">{{ record.productName }}</p>
              <p class="text-xs text-gray-500">{{ record.category }}</p>
            </div>
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="statusClass(record.status)"
            >
              {{ record.status }}
            </span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-3">
            <span>Qty: <strong>{{ record.quantity }}</strong></span>
            <span>₱ <strong>{{ formatPrice(record.price) }}</strong></span>
          </div>
          <div class="flex gap-2">
            <button
              @click="$emit('edit-record', record)"
              class="flex-1 rounded-md bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-200 transition cursor-pointer"
            >
              ✏️ Edit
            </button>
            <button
              @click="$emit('delete-record', record.id)"
              class="flex-1 rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200 transition cursor-pointer"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 border-t pt-3 gap-2">
        <span>
          Showing <strong>{{ filteredRecords.length }}</strong> of <strong>{{ totalRecords }}</strong> products
        </span>
        <span>
          Total inventory value: <strong>₱ {{ totalValue }}</strong>
        </span>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12 text-gray-400">
      <p class="text-4xl mb-3">📭</p>
      <p class="text-lg font-medium" v-if="searchInput.trim()">No products match your search.</p>
      <p class="text-lg font-medium" v-else>No products yet. Add your first product above!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit-record', 'delete-record'])

const searchInput = ref('')

const filteredRecords = computed(() => {
  const keyword = searchInput.value.toLowerCase().trim()
  if (!keyword) return props.records
  return props.records.filter(
    (record) =>
      record.productName.toLowerCase().includes(keyword) ||
      record.category.toLowerCase().includes(keyword)
  )
})

const totalRecords = computed(() => props.records.length)

const totalValue = computed(() => {
  const sum = props.records.reduce((acc, r) => acc + r.price * r.quantity, 0)
  return sum.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

function formatPrice(value) {
  return Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function statusClass(status) {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800'
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800'
    case 'Out of Stock':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
