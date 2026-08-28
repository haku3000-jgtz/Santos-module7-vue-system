<template>
  <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      {{ isEditing ? '✏️ Edit Product' : '➕ Add New Product' }}
    </h2>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Product Name -->
        <div>
          <label for="productName" class="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span class="text-red-500">*</span>
          </label>
          <input
            id="productName"
            v-model.trim="form.productName"
            type="text"
            placeholder="e.g. Wireless Mouse"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.productName ? 'border-red-400 bg-red-50' : 'border-gray-300'"
          />
          <p v-if="errors.productName" class="text-red-500 text-xs mt-1">{{ errors.productName }}</p>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Category <span class="text-red-500">*</span>
          </label>
          <select
            id="category"
            v-model="form.category"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.category ? 'border-red-400 bg-red-50' : 'border-gray-300'"
          >
            <option value="">-- Select Category --</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Tools">Tools</option>
            <option value="Raw Materials">Raw Materials</option>
            <option value="Other">Other</option>
          </select>
          <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- Quantity -->
        <div>
          <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">
            Quantity <span class="text-red-500">*</span>
          </label>
          <input
            id="quantity"
            v-model.number="form.quantity"
            type="number"
            min="0"
            placeholder="e.g. 50"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.quantity ? 'border-red-400 bg-red-50' : 'border-gray-300'"
          />
          <p v-if="errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
            Price (₱) <span class="text-red-500">*</span>
          </label>
          <input
            id="price"
            v-model.number="form.price"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 299.99"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.price ? 'border-red-400 bg-red-50' : 'border-gray-300'"
          />
          <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
        </div>

        <!-- Status -->
        <div class="sm:col-span-2">
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
            Status <span class="text-red-500">*</span>
          </label>
          <select
            id="status"
            v-model="form.status"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.status ? 'border-red-400 bg-red-50' : 'border-gray-300'"
          >
            <option value="">-- Select Status --</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status }}</p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="submit"
          class="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
          :class="isEditing
            ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'"
        >
          {{ isEditing ? '💾 Update Product' : '➕ Add Product' }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          @click="$emit('cancel-edit')"
          class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer"
        >
          ✖ Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['add-record', 'update-record', 'cancel-edit'])

const defaultForm = () => ({
  productName: '',
  category: '',
  quantity: '',
  price: '',
  status: ''
})

const form = reactive(defaultForm())
const errors = reactive({
  productName: '',
  category: '',
  quantity: '',
  price: '',
  status: ''
})

// Watch for editData changes to populate the form
watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      form.productName = newVal.productName
      form.category = newVal.category
      form.quantity = newVal.quantity
      form.price = newVal.price
      form.status = newVal.status
      clearErrors()
    }
  },
  { deep: true }
)

function clearErrors() {
  errors.productName = ''
  errors.category = ''
  errors.quantity = ''
  errors.price = ''
  errors.status = ''
}

function validate() {
  let valid = true
  clearErrors()

  if (!form.productName) {
    errors.productName = 'Product name is required.'
    valid = false
  }
  if (!form.category) {
    errors.category = 'Please select a category.'
    valid = false
  }
  if (form.quantity === '' || form.quantity === null || form.quantity < 0) {
    errors.quantity = 'Quantity must be 0 or more.'
    valid = false
  }
  if (form.price === '' || form.price === null || form.price < 0) {
    errors.price = 'Price must be 0 or more.'
    valid = false
  }
  if (!form.status) {
    errors.status = 'Please select a status.'
    valid = false
  }

  return valid
}

function resetForm() {
  Object.assign(form, defaultForm())
  clearErrors()
}

function handleSubmit() {
  if (!validate()) return

  const record = {
    productName: form.productName,
    category: form.category,
    quantity: Number(form.quantity),
    price: Number(form.price),
    status: form.status
  }

  if (props.isEditing) {
    emit('update-record', record)
  } else {
    emit('add-record', record)
  }

  resetForm()
}
</script>
