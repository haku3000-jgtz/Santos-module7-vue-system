import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordList from '../../src/components/RecordList.vue'

describe('Feature 2: Display Records & Summary', () => {
  const sampleRecords = [
    { id: 1, productName: 'Wireless Mouse', category: 'Electronics', quantity: 15, price: 500, status: 'In Stock' },
    { id: 2, productName: 'Office Desk', category: 'Furniture', quantity: 4, price: 3500, status: 'Low Stock' },
    { id: 3, productName: 'USB-C Cable', category: 'Electronics', quantity: 0, price: 150, status: 'Out of Stock' }
  ]

  it('renders all records in the table with proper details and status badges', () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3)
    expect(wrapper.text()).toContain('Wireless Mouse')
    expect(wrapper.text()).toContain('Office Desk')
    expect(wrapper.text()).toContain('USB-C Cable')
    expect(wrapper.text()).toContain('In Stock')
    expect(wrapper.text()).toContain('Low Stock')
    expect(wrapper.text()).toContain('Out of Stock')
  })

  it('computes total inventory value correctly (15*500 + 4*3500 + 0*150 = 21,500)', () => {
    const wrapper = mount(RecordList, {
      props: { records: sampleRecords }
    })

    expect(wrapper.text()).toContain('21,500.00')
    expect(wrapper.text()).toContain('Showing 3 of 3 products')
  })

  it('shows friendly empty state message when records array is empty', () => {
    const wrapper = mount(RecordList, {
      props: { records: [] }
    })

    expect(wrapper.text()).toContain('No products yet. Add your first product above!')
  })
})
