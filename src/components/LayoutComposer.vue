<template>
  <div class="panel" :style="style">
    <DynoItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :z="Number(item.z)"
      :x="Number(item.x)"
      :y="Number(item.y)"
      :parent="true"
      :grid="grid"
      :resizable="item.resizable"
      :min-height="item.minHeight"
      :min-width="item.minWidth"
      :max-height="item.maxHeight"
      :max-width="item.maxWidth"
      :scale="Number(scale)"
      :prevent-deactivation="item.preventDeactivation"
      :w="item.autoW === true?'auto': Number(item.w)"
      :h="item.autoH === true?'auto': Number(item.h)"
      :on-drag-start="onDragStart"
      :on-drag="onDragMove"
      :draggable="item.draggable"
      :dragHandle="item.dragHandle"
      :dragCancel="item.dragCancel"
      :disable-user-select="disableUserSelect"
      :lock-aspect-ratio="lockAspectRatio"
      class-name="my-class"
      class-name-dragging="my-dragging-class"
      class-name-active="my-active-class"
      class-name-resizing="my-resizing-class"
      class-name-handle="my-handle-class"
      @activated="onActivate(item)">
      <div style="display: flex; flex-flow: column nowrap;">
        <div v-if="item.dragHandle" class="drag-handle">Drag Only Here</div>
        <div v-if="item.dragCancel" class="drag-cancel">Cannot Drag Here</div>
        <div v-html="item.content"></div>
        x:
        <input type="number" v-model="item.x">
        y:
        <input type="number" v-model="item.y">
        Prevent deactivation:
        <input type="checkbox" v-model="item.preventDeactivation">
        <span>Draggable:</span>
        <input type="checkbox" v-model="item.draggable">
        <span>Resizable:</span>
        <input type="checkbox" v-model="item.resizable">
        auto:
        <input type="number" v-model="item.w">
        <input type="checkbox" v-model="item.autoW">
        <input type="number" v-model="item.h">
        <input type="checkbox" v-model="item.autoH">
        <input type="range" min="1" max="999" step="1" v-model="item.z">
      </div>
      <template v-if="item.customHandleIcons" v-slot:tl>😀</template>
      <template v-if="item.customHandleIcons" v-slot:tm>😀</template>
      <template v-if="item.customHandleIcons" v-slot:tr>😀</template>
      <template v-if="item.customHandleIcons" v-slot:mr>😀</template>
      <template v-if="item.customHandleIcons" v-slot:br>😀</template>
      <template v-if="item.customHandleIcons" v-slot:bm>😀</template>
      <template v-if="item.customHandleIcons" v-slot:bl>😀</template>
      <template v-if="item.customHandleIcons" v-slot:ml>😀</template>
    </DynoItem>
  </div>
  <div style="display: flex; flex-flow: column nowrap; flex-shrink: 0; max-width: 120px;">
    Grid:
    <input type="num" v-model="grid[0]"/>
    <input type="num" v-model="grid[1]"/>
    <input type="range" min="0.1" max="2" step="0.1" v-model="scale">
    <span>Disable user select:</span>
    <input type="checkbox" v-model="disableUserSelect">
    <span>lockAspectRatio:</span>
    <input type="checkbox" v-model="lockAspectRatio">
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import DynoItem from '@/components/DynoItem.vue';

export default {
  name: 'layout-composer',
  components: { DynoItem },
  props: {
    items: {
      required: true,
    },
  },
  setup() {
    const onDragStart = () => { };
    const onDragMove = () => { };
    const onActivate = () => {};
    const grid = ref([1, 1]);
    const scale = ref(1);
    const disableUserSelect = ref(false);
    const lockAspectRatio = ref(false);
    const style = computed(() => ({
      position: 'relative',
      transform: `scale(${scale.value})`,
      background:
        `linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${grid.value[0]}px ${grid.value[1]}px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / ${grid.value[0]}px ${grid.value[1]}px`,
    }));
    return {
      scale,
      disableUserSelect,
      lockAspectRatio,
      onDragStart,
      onDragMove,
      onActivate,
      grid,
      style,
    };
  },
};
</script>
<style lang="scss" scoped>
.panel {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: black;
}
</style>
