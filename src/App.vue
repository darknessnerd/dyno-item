<template>
  <layout-composer :items="items"/>
</template>

<script>
import LayoutComposer from '@/components/LayoutComposer.vue';

export default {
  name: 'home',
  components: {
    LayoutComposer,
  },
  data() {
    return {
      items: [
        {
          id: '0',
          content: '<img src="https://js.cx/clipart/ball.svg">',
          active: false,
          axis: 'both',
          x: 0,
          y: 0,
          z: 1,
          draggable: true,
          resizable: true,
          w: 200,
          h: 200,
          autoH: false,
          autoW: false,
          maxHeight: 300,
          maxWidth: 300,
          preventDeactivation: true,
          customHandleIcons: true,
        },
        {
          activate: true,
          id: '1',
          content: 'test_1',
          dragHandle: '.drag-handle',
          active: false,
          resizable: true,
          axis: 'both',
          x: 0,
          y: 0,
          z: 1,
          draggable: true,
          w: 200,
          h: 200,
          autoH: false,
          autoW: false,
          minHeight: 100,
          minWidth: 10,
        },
        {
          id: '2',
          content: 'Auto size component, with x axis',
          dragCancel: '.drag-cancel',
          active: false,
          resizable: true,
          axis: 'x',
          x: 0,
          y: 0,
          z: 1,
          draggable: true,
          autoH: true,
          autoW: true,
          w: 400,
          h: 400,
        },
      ],
    };
  },
};
</script>
