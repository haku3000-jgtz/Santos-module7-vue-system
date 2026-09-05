import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordList from '../../src/components/RecordList.vue'

describe('CR-M9-01: Status Filter', () => {
  const sampleRecords = [
    { id: 1, productName: 'Wireless Mouse', category: 'Electronics', quantity: 15, price: 500, status: 'In Stock' },
    { id: 2, productName: 'Office Desk', category: 'Furniture', quantity: 2, price: 3500, status: 'Low Stock' },
    { id: 3, productName: 'USB-C Cable', category: 'Electronics', quantity: 0, price: 150, status: 'Out of Stock' },
    { id: 4, productName: 'Ergonomic Chair', category: 'Furniture', quantity: 10, price: 8500, status: 'In Stock' }
  ]

  it('shows all four status filter buttons', () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const buttons = wrapper.findAll('button[class*="rounded-full"]')
    expect(buttons.length).toBe(4)
    const labels = buttons.map(b => b.text())
    expect(labels).toContain('All')
    expect(labels).toContain('In Stock')
    expect(labels).toContain('Low Stock')
    expect(labels).toContain('Out of Stock')
  })

  it('filters to only In Stock records when In Stock button is clicked', async () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const inStockBtn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'In Stock')
    await inStockBtn.trigger('click')
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
    expect(wrapper.text()).toContain('Wireless Mouse')
    expect(wrapper.text()).toContain('Ergonomic Chair')
    expect(wrapper.text()).not.toContain('Office Desk')
    expect(wrapper.text()).not.toContain('USB-C Cable')
  })

  it('filters to only Low Stock records when Low Stock button is clicked', async () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const btn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'Low Stock')
    await btn.trigger('click')
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('Office Desk')
    expect(wrapper.text()).not.toContain('Wireless Mouse')
  })

  it('filters to only Out of Stock records when Out of Stock button is clicked', async () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const btn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'Out of Stock')
    await btn.trigger('click')
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('USB-C Cable')
    expect(wrapper.text()).not.toContain('Ergonomic Chair')
  })

  it('restores all records when All button is clicked after filtering', async () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const inStockBtn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'In Stock')
    await inStockBtn.trigger('click')
    expect(wrapper.findAll('tbody tr').length).toBe(2)
    const allBtn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'All')
    await allBtn.trigger('click')
    expect(wrapper.findAll('tbody tr').length).toBe(4)
  })

  it('applies status filter AND text search simultaneously (AND logic)', async () => {
    const wrapper = mount(RecordList, { props: { records: sampleRecords } })
    const inStockBtn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'In Stock')
    await inStockBtn.trigger('click')
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Furniture')
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(wrapper.text()).toContain('Ergonomic Chair')
    expect(wrapper.text()).not.toContain('Wireless Mouse')
    expect(wrapper.text()).not.toContain('Office Desk')
  })

  it('shows empty state message when status filter produces no matches', async () => {
    const noOutOfStockRecords = [
      { id: 1, productName: 'Wireless Mouse', category: 'Electronics', quantity: 15, price: 500, status: 'In Stock' }
    ]
    const wrapper = mount(RecordList, { props: { records: noOutOfStockRecords } })
    const btn = wrapper.findAll('button[class*="rounded-full"]').find(b => b.text() === 'Out of Stock')
    await btn.trigger('click')
    expect(wrapper.findAll('tbody tr').length).toBe(0)
    expect(wrapper.text()).toContain('No products match your current filter')
  })
})
