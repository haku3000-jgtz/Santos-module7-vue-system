import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordForm from '../../src/components/RecordForm.vue'

describe('Feature 1: Add Record', () => {
  it('submits a valid product record and emits add-record event with correct payload', async () => {
    const wrapper = mount(RecordForm, {
      props: {
        isEditing: false,
        editData: null,
      },
    })

    await wrapper.find('#productName').setValue('Logitech MX Master 3S')
    await wrapper.find('#category').setValue('Electronics')
    await wrapper.find('#quantity').setValue('25')
    await wrapper.find('#price').setValue('5990.00')
    await wrapper.find('#status').setValue('In Stock')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-record')).toBeTruthy()
    expect(wrapper.emitted('add-record')[0][0]).toEqual({
      productName: 'Logitech MX Master 3S',
      category: 'Electronics',
      quantity: 25,
      price: 5990.0,
      status: 'In Stock',
    })
  })

  it('blocks submission and displays error when required fields are missing', async () => {
    const wrapper = mount(RecordForm, {
      props: {
        isEditing: false,
        editData: null,
      },
    })

    // Submit without filling required fields
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-record')).toBeFalsy()
    expect(wrapper.text()).toContain('Product name is required.')
    expect(wrapper.text()).toContain('Please select a category.')
  })
})
