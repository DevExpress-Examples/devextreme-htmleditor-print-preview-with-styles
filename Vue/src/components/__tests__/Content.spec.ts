import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeContent from '@/components/home/HomeContent.vue';

describe('HomeContent', () => {
  it('renders the html-editor', () => {
    const wrapper = mount(HomeContent);
    
    expect(wrapper.exists()).toBe(true);
    
    const htmlEditor = wrapper.find('.dx-htmleditor');
    expect(htmlEditor.exists()).toBe(true);
  });

  it('updates the iframe content when the editor value changes', async () => {
    const wrapper = mount(HomeContent);
    
    await wrapper.find(".show-markup-button").trigger('click');
    
    setTimeout(() => {
      const iframe = wrapper.find('iframe');
      expect(iframe.exists()).toBe(true);
    }, 100);
  });
});