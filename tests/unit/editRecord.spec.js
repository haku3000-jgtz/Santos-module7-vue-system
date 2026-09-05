import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecordForm from '../../src/components/RecordForm.vue'

describe('Feature 3: Edit Record & Form Cancellation', () => {
  const sampleProduct = {
    id: 1,
    productName: 'Logitech MX Master 3S',
    category: 'Electronics',
    quantity: 25,
    price: 5990.0,
    status: 'In Stock'
  }

  it('populates form fields correctly when editData is supplied', async () => {
    const wrapper = mount(RecordForm, {
      props: {
        isEditing: false,
        editData: null
      }
    })

    await wrapper.setProps({
      isEditing: true,
      editData: sampleProduct
    })

    expect(wrapper.find('#productName').element.value).toBe('Logitech MX Master 3S')
    expect(wrapper.find('#category').element.value).toBe('Electronics')
    expect(wrapper.find('#quantity').element.value).toBe('25')
    expect(wrapper.find('#status').element.value).toBe('In Stock')
    expect(wrapper.find('h2').text()).toContain('Edit Product')
  })

  it('emits update-record with modified values upon submit in edit mode', async () => {
    const wrapper = mount(RecordForm, {
      props: {
        isEditing: false,
        editData: null
      }
    })

    await wrapper.setProps({ isEditing: true, editData: sampleProduct })
    await wrapper.find('#price').setValue('5490.00')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('update-record')).toBeTruthy()
    expect(wrapper.emitted('update-record')[0][0].price).toBe(5490)
  })

  it('resets form fields to blank when edit mode is cancelled (DEFECT FIXED)', async () => {
    const wrapper = mount(RecordForm, {
      props: {
        isEditing: true,
        editData: sampleProduct
      }
    })

    // Confirm initial populated state
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#productName').element.value).toBe('Logitech MX Master 3S')

    // Simulate cancelling edit mode: editData set to null, isEditing to false
    await wrapper.setProps({
      isEditing: false,
      editData: null
    })

    // After fix: watcher detects null editData and calls resetForm()
    expect(wrapper.find('h2').text()).toContain('Add New Product')
    expect(wrapper.find('#productName').element.value).toBe('')
    expect(wrapper.find('#quantity').element.value).toBe('')
    expect(wrapper.find('#status').element.value).toBe('')
  })
})
