<script setup lang="ts">
import { ref, computed } from 'vue';
import DxHtmlEditor, {
  DxToolbar,
  DxItem
} from 'devextreme-vue/html-editor';
import DxPopup from 'devextreme-vue/popup';
import { markup } from '@/components/home/data';
import { getFullDocument } from './helpers';

import 'devextreme/dist/css/dx.material.blue.light.compact.css';

const popupVisible = ref(false);
const editorValue = ref(markup);
const editorRef = ref();

const showMarkupButtonOptions = {
  text: 'Show markup',
  stylingMode: 'text',
  elementAttr: { class: 'show-markup-button' },
  onClick: () => popupVisible.value = true
};

const fullDocument = computed(() => {
  const content = editorRef.value.instance.getQuillInstance().root.innerHTML;
  return getFullDocument(content);
});
</script>

<template>
  <div class="demo-container">
    <DxHtmlEditor
      ref="editorRef"
      v-model:value="editorValue"
    >
      <DxToolbar>
        <DxItem name="undo"/>
        <DxItem name="redo"/>
        <DxItem name="separator"/>

        <DxItem
          name="header"
          :accepted-values="[false, 1, 2, 3, 4, 5]"
        />

        <DxItem name="separator"/>
        <DxItem name="bold"/>
        <DxItem name="italic"/>
        <DxItem name="strike"/>
        <DxItem name="underline"/>
        <DxItem name="separator"/>

        <DxItem name="alignLeft"/>
        <DxItem name="alignCenter"/>
        <DxItem name="alignRight"/>
        <DxItem name="alignJustify"/>
        <DxItem name="separator"/>

        <DxItem
          widget="dxButton"
          :options="showMarkupButtonOptions"
        />
      </DxToolbar>
    </DxHtmlEditor>

    <DxPopup
      v-model:visible="popupVisible"
      width="80%"
      height="80%"
      title="Markup"
      :show-title="true"
      :show-close-button="true"
    >
      <div
        class="popup-content"
      >
        <iframe
          v-if="popupVisible"
          style="width:100%; height:100%; border:0;"
          :srcdoc="fullDocument"
        />
      </div>
    </DxPopup>

  </div>
</template>
