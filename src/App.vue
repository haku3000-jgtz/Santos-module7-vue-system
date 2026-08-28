<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <AppHeader :recordCount="records.length" />

    <!-- Main content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <!-- Feedback message -->
      <transition name="fade">
        <div
          v-if="feedback.show"
          class="rounded-lg px-4 py-3 text-sm font-medium shadow-sm transition-all"
          :class="feedbackClass"
          role="alert"
        >
          {{ feedback.message }}
        </div>
      </transition>

      <!-- Product form -->
      <RecordForm
        :isEditing="isEditing"
        :editData="editData"
        @add-record="addRecord"
        @update-record="updateRecord"
        @cancel-edit="cancelEdit"
      />

      <!-- Product list -->
      <RecordList
        :records="records"
        @edit-record="startEdit"
        @delete-record="deleteRecord"
      />
    </main>

    <!-- Footer — CHANGE THESE TO YOUR OWN NAME AND SECTION -->
    <AppFooter studentName="Your Name" section="Your Section" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

// ── State ────────────────────────────────────────────────
const STORAGE_KEY = 'module7-records'

const records = ref([])
const isEditing = ref(false)
const editingId = ref(null)
const editData = ref(null)

const feedback = reactive({
  show: false,
  message: '',
  type: 'success' // 'success' | 'warning' | 'error'
})

// ── Feedback class mapping ───────────────────────────────
const feedbackClassMap = {
  success: 'bg-green-100 text-green-800 border border-green-300',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  error: 'bg-red-100 text-red-800 border border-red-300'
}

const feedbackClass = ref(feedbackClassMap.success)

// ── Persistence helpers ──────────────────────────────────
function loadRecords() {
  const saved = localStorage.getItem(STORAGE_KEY)
  records.value = saved ? JSON.parse(saved) : []
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value))
}

// ── Feedback helper ──────────────────────────────────────
function showFeedback(message, type = 'success') {
  feedback.message = message
  feedback.type = type
  feedback.show = true
  feedbackClass.value = feedbackClassMap[type] || feedbackClassMap.success
  setTimeout(() => {
    feedback.show = false
  }, 3000)
}

// ── CRUD operations ──────────────────────────────────────

// CREATE
function addRecord(newRecord) {
  records.value.push({
    id: Date.now(),
    ...newRecord
  })
  saveRecords()
  showFeedback(`✅ "${newRecord.productName}" has been added successfully!`, 'success')
}

// UPDATE
function startEdit(record) {
  isEditing.value = true
  editingId.value = record.id
  editData.value = { ...record }
  showFeedback(`✏️ Editing "${record.productName}" — modify the form above.`, 'warning')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateRecord(updatedFields) {
  const index = records.value.findIndex((r) => r.id === editingId.value)
  if (index !== -1) {
    records.value[index] = { ...records.value[index], ...updatedFields }
    saveRecords()
    showFeedback(`✅ "${updatedFields.productName}" has been updated successfully!`, 'success')
  }
  cancelEdit()
}

function cancelEdit() {
  isEditing.value = false
  editingId.value = null
  editData.value = null
}

// DELETE
function deleteRecord(id) {
  const record = records.value.find((r) => r.id === id)
  const confirmed = window.confirm(
    `Are you sure you want to delete "${record?.productName}"?`
  )
  if (!confirmed) return

  records.value = records.value.filter((r) => r.id !== id)
  saveRecords()
  showFeedback(`🗑️ "${record.productName}" has been deleted.`, 'error')
}

// ── Lifecycle ────────────────────────────────────────────
onMounted(() => {
  loadRecords()
})
</script>

<style>
/* Fade transition for feedback messages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
