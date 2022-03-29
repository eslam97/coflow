<template>
  <div class="row">
    <div class="col-12">
      <h3>Sort Groups</h3>
      <draggable
          class="list-group"
          tag="ul"
          v-model="allGroups"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          @change="log"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
              class="list-group-item my-1"
              v-for="(element, index) in allGroups"
              :key="index"
          >
           <i
               :key="index"
                :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
                @click="element.fixed = !element.fixed"
                aria-hidden="true"
            ></i>
            {{ element.group }}
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { core } from '../../../config/pluginInit'
export default {
  name: 'settingsgroups',
  components: {
    draggable
  },
  data () {
    return {
      allGroups: [],
      drag: false
    }
  },
  methods: {
    log () {
      var id = 0
      // console.log(this.allGroups)
      this.allGroups.forEach(function (element) {
        element.sort = id
        element.name = element.group
        id++
      })
      this.$store.dispatch('updateGroups', this.allGroups).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.$store.dispatch('getAllGroups').then(res => {
      this.allGroups = res.data.data
    })
  }
}
</script>

<style>
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
