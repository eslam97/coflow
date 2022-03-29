<template>
  <div class="container">
    <vue-tree
      ref="scaleTree"
      style="width: 1000px; height: 600px; border: 1px solid gray"
      :dataset="sampleData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node bg-primary"
          :style="{ border: collapsed ? '2px solid grey' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold">{{
            node.value
          }}</span>
        </div>
      </template>
    </vue-tree>

    <div style="display: flex">
      <v-btn @click="controlScale('bigger')">+</v-btn>
      <v-btn @click="controlScale('smaller')">-</v-btn>
      <v-btn @click="controlScale('restore')">1:1</v-btn>
    </div>
  </div>
</template>

<script>
import VueTree from '../vue-tree/VueTree'

export default {
  name: 'treemap',
  components: { 'vue-tree': VueTree },
  data () {
    return {
      sampleData: {
        value: 'maxevia',
        children: [
          {
            type: 'enterprise',
            color: '#83d7ec',
            enterprise_id: 1,
            value: 'Enterprise Two',
            children: [
              {
                type: 'department',
                color: '#ee2b2b',
                department_id: 1,
                value: 'Admin',
                children: [
                  {
                    type: 'role',
                    role_id: 2,
                    value: 'super_admin',
                    children: [
                      {
                        type: 'user',
                        user_id: 1,
                        value: 'peter',
                        children: []
                      },
                      {
                        type: 'user',
                        user_id: 7,
                        value: 'sadsadas',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 9,
                        value: 'userTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 13,
                        value: 'sadsad',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 18,
                        value: 'dsadas',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 25,
                        value: 'Ibrahim',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 33,
                        value: 'Nahed Mohamed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 3,
                    value: 'custom_role',
                    children: [
                      {
                        type: 'user',
                        user_id: 2,
                        value: 'eslam ashraf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 3,
                        value: 'ahmed',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 10,
                        value: 'userTest1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 21,
                        value: 'mohamedAhmed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 24,
                        value: 'emmmmm',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 26,
                        value: 'eman essma',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 27,
                        value: 'test 3001',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 28,
                        value: 'eman Test',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 29,
                        value: 'eman2',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 30,
                        value: 'tetstst okd',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 32,
                        value: 'receptionist',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 35,
                        value: 'dsfdsf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 36,
                        value: 'nahed mohamed abdelkhalek',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 37,
                        value: 'kahlid mabrouk',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 38,
                        value: 'suzy hossam',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 40,
                        value: 'tester20',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 41,
                        value: 'tester30',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 42,
                        value: 'wassef',
                        children: [
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 43,
                        value: 'maggi hanii',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 44,
                        value: 'wadii',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 45,
                        value: 'cccccc',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 6,
                    value: 'sales',
                    children: [
                      {
                        type: 'user',
                        user_id: 47,
                        value: 'eslamAshrafIbrahim',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 48,
                        value: 'fdgdgfdgdgtr',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 49,
                        value: 'bbbbbbbbbbb',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 7,
                    value: 'fgyhuj',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#d78cf3',
                department_id: 3,
                value: 'Sales',
                children: []
              },
              {
                type: 'department',
                color: '#b936dd',
                department_id: 4,
                value: 'Quality Control',
                children: [
                  {
                    type: 'role',
                    role_id: 5,
                    value: 'testers',
                    children: [
                      {
                        type: 'user',
                        user_id: 31,
                        value: 'eslamTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 46,
                        value: 'magy1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: 'department',
                color: '#66c8e1',
                department_id: 5,
                value: 'ayhaga',
                children: []
              }
            ]
          },
          {
            type: 'enterprise',
            color: '#3291a8',
            enterprise_id: 2,
            value: 'Enterprise One',
            children: [
              {
                type: 'department',
                color: '#ee2b2b',
                department_id: 1,
                value: 'Admin',
                children: [
                  {
                    type: 'role',
                    role_id: 2,
                    value: 'super_admin',
                    children: [
                      {
                        type: 'user',
                        user_id: 1,
                        value: 'peter',
                        children: []
                      },
                      {
                        type: 'user',
                        user_id: 7,
                        value: 'sadsadas',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 9,
                        value: 'userTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 13,
                        value: 'sadsad',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 18,
                        value: 'dsadas',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 25,
                        value: 'Ibrahim',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 33,
                        value: 'Nahed Mohamed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 3,
                    value: 'custom_role',
                    children: [
                      {
                        type: 'user',
                        user_id: 2,
                        value: 'eslam ashraf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 3,
                        value: 'ahmed',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 10,
                        value: 'userTest1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 21,
                        value: 'mohamedAhmed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 24,
                        value: 'emmmmm',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 26,
                        value: 'eman essma',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 27,
                        value: 'test 3001',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 28,
                        value: 'eman Test',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 29,
                        value: 'eman2',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 30,
                        value: 'tetstst okd',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 32,
                        value: 'receptionist',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 35,
                        value: 'dsfdsf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 36,
                        value: 'nahed mohamed abdelkhalek',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 37,
                        value: 'kahlid mabrouk',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 38,
                        value: 'suzy hossam',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 40,
                        value: 'tester20',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 41,
                        value: 'tester30',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 42,
                        value: 'wassef',
                        children: [
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 43,
                        value: 'maggi hanii',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 44,
                        value: 'wadii',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 45,
                        value: 'cccccc',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 6,
                    value: 'sales',
                    children: [
                      {
                        type: 'user',
                        user_id: 47,
                        value: 'eslamAshrafIbrahim',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 48,
                        value: 'fdgdgfdgdgtr',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 49,
                        value: 'bbbbbbbbbbb',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 7,
                    value: 'fgyhuj',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#d78cf3',
                department_id: 3,
                value: 'Sales',
                children: []
              },
              {
                type: 'department',
                color: '#b936dd',
                department_id: 4,
                value: 'Quality Control',
                children: [
                  {
                    type: 'role',
                    role_id: 5,
                    value: 'testers',
                    children: [
                      {
                        type: 'user',
                        user_id: 31,
                        value: 'eslamTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 46,
                        value: 'magy1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                type: 'department',
                color: '#66c8e1',
                department_id: 5,
                value: 'ayhaga',
                children: []
              }
            ]
          },
          {
            type: 'enterprise',
            color: '#ebf7fa',
            enterprise_id: 3,
            value: 'ddsadsa',
            children: [
              {
                type: 'department',
                color: '#ee2b2b',
                department_id: 1,
                value: 'Admin',
                children: [
                  {
                    type: 'role',
                    role_id: 2,
                    value: 'super_admin',
                    children: [
                      {
                        type: 'user',
                        user_id: 1,
                        value: 'peter',
                        children: []
                      },
                      {
                        type: 'user',
                        user_id: 7,
                        value: 'sadsadas',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 9,
                        value: 'userTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 13,
                        value: 'sadsad',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 18,
                        value: 'dsadas',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 25,
                        value: 'Ibrahim',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 33,
                        value: 'Nahed Mohamed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 3,
                    value: 'custom_role',
                    children: [
                      {
                        type: 'user',
                        user_id: 2,
                        value: 'eslam ashraf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 3,
                        value: 'ahmed',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 10,
                        value: 'userTest1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 21,
                        value: 'mohamedAhmed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 24,
                        value: 'emmmmm',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 26,
                        value: 'eman essma',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 27,
                        value: 'test 3001',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 28,
                        value: 'eman Test',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 29,
                        value: 'eman2',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 30,
                        value: 'tetstst okd',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 32,
                        value: 'receptionist',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 35,
                        value: 'dsfdsf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 36,
                        value: 'nahed mohamed abdelkhalek',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 37,
                        value: 'kahlid mabrouk',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 38,
                        value: 'suzy hossam',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 40,
                        value: 'tester20',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 41,
                        value: 'tester30',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 42,
                        value: 'wassef',
                        children: [
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 43,
                        value: 'maggi hanii',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 44,
                        value: 'wadii',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 45,
                        value: 'cccccc',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 6,
                    value: 'sales',
                    children: [
                      {
                        type: 'user',
                        user_id: 47,
                        value: 'eslamAshrafIbrahim',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 48,
                        value: 'fdgdgfdgdgtr',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 49,
                        value: 'bbbbbbbbbbb',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 7,
                    value: 'fgyhuj',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#d78cf3',
                department_id: 3,
                value: 'Sales',
                children: []
              }
            ]
          },
          {
            type: 'enterprise',
            color: '#ee2b82',
            enterprise_id: 4,
            value: 'Max Gym',
            children: [
              {
                type: 'department',
                color: '#ee2b2b',
                department_id: 1,
                value: 'Admin',
                children: [
                  {
                    type: 'role',
                    role_id: 2,
                    value: 'super_admin',
                    children: [
                      {
                        type: 'user',
                        user_id: 1,
                        value: 'peter',
                        children: []
                      },
                      {
                        type: 'user',
                        user_id: 7,
                        value: 'sadsadas',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 9,
                        value: 'userTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 13,
                        value: 'sadsad',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 18,
                        value: 'dsadas',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 25,
                        value: 'Ibrahim',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 33,
                        value: 'Nahed Mohamed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 3,
                    value: 'custom_role',
                    children: [
                      {
                        type: 'user',
                        user_id: 2,
                        value: 'eslam ashraf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 3,
                        value: 'ahmed',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 10,
                        value: 'userTest1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 21,
                        value: 'mohamedAhmed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 24,
                        value: 'emmmmm',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 26,
                        value: 'eman essma',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 27,
                        value: 'test 3001',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 28,
                        value: 'eman Test',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 29,
                        value: 'eman2',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 30,
                        value: 'tetstst okd',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 32,
                        value: 'receptionist',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 35,
                        value: 'dsfdsf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 36,
                        value: 'nahed mohamed abdelkhalek',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 37,
                        value: 'kahlid mabrouk',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 38,
                        value: 'suzy hossam',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 40,
                        value: 'tester20',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 41,
                        value: 'tester30',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 42,
                        value: 'wassef',
                        children: [
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 43,
                        value: 'maggi hanii',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 44,
                        value: 'wadii',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 45,
                        value: 'cccccc',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 6,
                    value: 'sales',
                    children: [
                      {
                        type: 'user',
                        user_id: 47,
                        value: 'eslamAshrafIbrahim',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 48,
                        value: 'fdgdgfdgdgtr',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 49,
                        value: 'bbbbbbbbbbb',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 7,
                    value: 'fgyhuj',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#d78cf3',
                department_id: 3,
                value: 'Sales',
                children: []
              }
            ]
          },
          {
            type: 'enterprise',
            color: '#ffb61a',
            enterprise_id: 5,
            value: 'Pinky',
            children: [
              {
                type: 'department',
                color: '#ee2b2b',
                department_id: 1,
                value: 'Admin',
                children: [
                  {
                    type: 'role',
                    role_id: 2,
                    value: 'super_admin',
                    children: [
                      {
                        type: 'user',
                        user_id: 1,
                        value: 'peter',
                        children: []
                      },
                      {
                        type: 'user',
                        user_id: 7,
                        value: 'sadsadas',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 9,
                        value: 'userTest',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 13,
                        value: 'sadsad',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 18,
                        value: 'dsadas',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 25,
                        value: 'Ibrahim',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 33,
                        value: 'Nahed Mohamed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 3,
                    value: 'custom_role',
                    children: [
                      {
                        type: 'user',
                        user_id: 2,
                        value: 'eslam ashraf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 3,
                        value: 'ahmed',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 10,
                        value: 'userTest1',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 21,
                        value: 'mohamedAhmed',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 24,
                        value: 'emmmmm',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 26,
                        value: 'eman essma',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 27,
                        value: 'test 3001',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 28,
                        value: 'eman Test',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 29,
                        value: 'eman2',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 30,
                        value: 'tetstst okd',
                        children: [
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 32,
                        value: 'receptionist',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 35,
                        value: 'dsfdsf',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 36,
                        value: 'nahed mohamed abdelkhalek',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 37,
                        value: 'kahlid mabrouk',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 38,
                        value: 'suzy hossam',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 40,
                        value: 'tester20',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 41,
                        value: 'tester30',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 42,
                        value: 'wassef',
                        children: [
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 43,
                        value: 'maggi hanii',
                        children: [
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 44,
                        value: 'wadii',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 45,
                        value: 'cccccc',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 6,
                    value: 'sales',
                    children: [
                      {
                        type: 'user',
                        user_id: 47,
                        value: 'eslamAshrafIbrahim',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 48,
                        value: 'fdgdgfdgdgtr',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      },
                      {
                        type: 'user',
                        user_id: 49,
                        value: 'bbbbbbbbbbb',
                        children: [
                          {
                            color: '#5db1c6',
                            type: 'project',
                            project_id: 1,
                            value: 'Maxevia'
                          },
                          {
                            color: '#e678e8',
                            type: 'project',
                            project_id: 2,
                            value: 'max Acadimy'
                          },
                          {
                            color: '#56d79f',
                            type: 'project',
                            project_id: 3,
                            value: 'Manial Gym'
                          },
                          {
                            color: '#8fe821',
                            type: 'project',
                            project_id: 4,
                            value: 'Max Gym Shoubra'
                          },
                          {
                            color: '#1ebee6',
                            type: 'project',
                            project_id: 5,
                            value: 'Max Gym Nasr City'
                          },
                          {
                            color: '#b8ff33',
                            type: 'project',
                            project_id: 6,
                            value: 'Pinky Online'
                          },
                          {
                            color: '#e566ff',
                            type: 'project',
                            project_id: 7,
                            value: 'max zayed'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'role',
                    role_id: 7,
                    value: 'fgyhuj',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#3291a8',
                department_id: 2,
                value: 'Fitness',
                children: [
                  {
                    type: 'role',
                    role_id: 4,
                    value: 'eslamadmin',
                    children: []
                  }
                ]
              },
              {
                type: 'department',
                color: '#d78cf3',
                department_id: 3,
                value: 'Sales',
                children: []
              }
            ]
          }
        ]
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    }
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
  }
}
</script>
<style scoped>
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
.bg-primary{
  background: #2c3e50;
}
</style>
