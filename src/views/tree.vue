<template>
  <div
   v-if="ifLoad"
   class="tree"
  >
    <vue-tree
        v-if = 'richMediaData'
        ref="scaleTree"
        style="width: 1000px; height: 600px; border: 1px solid gray;"
        :dataset="richMediaData"
        :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
            class="rich-media-node bg-primary"
            :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold;"
          >{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>
    <div style="display: flex;">
      <v-btn class="btn bg-primary" @click="controlScale('bigger')">+</v-btn>
      <v-btn  class="btn bg-primary" @click="controlScale('smaller')">-</v-btn>
      <v-btn  class="btn bg-primary" @click="controlScale('restore')">Reset</v-btn>
    </div>
  </div>
</template>

<script>
import { core } from '../config/pluginInit'
export default {
  name: 'treemap',
  data () {
    return {
      richMediaData: [],
      treeConfig: { nodeWidth: 100, nodeHeight: 80, levelHeight: 200 },
      ifLoad: false
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    controlScale (command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          break
      }
    }
  },
  created () {
    this.$store.dispatch('getTree').then(res => {
      this.richMediaData = res.data.data
      this.ifLoad = true
    })
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  color: white;
  border-radius: 4px;
}
.tree-container{
  width: 100% !important;
  overflow: scroll !important;
}
[dir=ltr][mode=light] .tree svg {
overflow: auto !important;
}
[dir=ltr][mode=light] svg {
  overflow: auto !important;
  vertical-align: middle;
}
</style>
