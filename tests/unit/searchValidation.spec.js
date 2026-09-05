import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordList from '../../src/components/RecordList.vue'
import RecordForm from '../../src/components/RecordForm.vue'

describe('Feature 5: Search & Form Validation', () => {
  const sampleRecords = [
    { id: 1, productName: 'Apple MacBook Pro', category: 'Electronics', quantity: 8, price: 89990, status: 'In Stock' },
    { id: 2, productName: 'Standing Desk', category: 'Furniture', quantity: 3, price: 12500, status: 'Low Stock' },
    { id: 3, productName: 'Screwdriver Set', category: 'Tools', quantity: 20, price: 650, status: 'In Stock' }
  ]

  it('filters records by product name case-insensitively', async () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('macbook')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('Apple MacBook Pro')
    expect(wrapper.text()).not.toContain('Standing Desk')
  })

  it('filters records by category', async () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Tools')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('Screwdriver Set')
  })

  it('shows no matches message when search term does not match any product', async () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('NonExistentTerm999')

    expect(wrapper.findAll('tbody tr').length).toBe(0)
    expect(wrapper.text()).toContain('No products match your search.')
  })

  it('validates negative numbers for quantity and price in RecordForm', async () => {
    const wrapper = mount(RecordForm, {
      props: { isEditing: false, editData: null }
    })

    await wrapper.find('#productName').setValue('Test Item')
    await wrapper.find('#category').setValue('Electronics')
    await wrapper.find('#quantity').setValue('-5')
    await wrapper.find('#price').setValue('-100')
    await wrapper.find('#status').setValue('In Stock')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-record')).toBeFalsy()
    expect(wrapper.text()).toContain('Quantity must be 0 or more.')
    expect(wrapper.text()).toContain('Price must be 0 or more.')
  })
})
