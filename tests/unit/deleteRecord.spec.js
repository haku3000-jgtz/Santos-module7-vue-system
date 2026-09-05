import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordList from '../../src/components/RecordList.vue'

describe('Feature 4: Delete Record', () => {
  const sampleRecords = [
    { id: 101, productName: 'Ergonomic Keyboard', category: 'Electronics', quantity: 10, price: 2500, status: 'In Stock' },
    { id: 102, productName: 'Monitor Arm', category: 'Furniture', quantity: 5, price: 1800, status: 'In Stock' }
  ]

  it('emits delete-record event with record id when Delete button is clicked', async () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    const deleteButtons = wrapper.findAll('button').filter(b => b.text().includes('Delete'))
    expect(deleteButtons.length).toBeGreaterThan(0)

    await deleteButtons[0].trigger('click')

    expect(wrapper.emitted('delete-record')).toBeTruthy()
    expect(wrapper.emitted('delete-record')[0][0]).toBe(101)
  })
})
