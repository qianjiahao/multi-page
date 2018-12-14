import Vue from 'vue'

Vue.component('menu-tree', {
  render: function (createElement) {
    return createElement(
      'a-menu', {
        props: {
          defaultSelectedKeys: this.defaultSelectedKeys,
          openKeys: this.openKeys,
          mode: 'inline'
        },
        'class': {
          'layout-menu': true,
          'ant-menu-dark': true,
          'ant-menu-inline': true
        },
        on: {
          click: this.clickHandle,
          openChange: this.openChangeHandle
        }
      },
      this.loopRender(createElement, this.data)
    )
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    defaultSelectedKeys: {
      type: Array
    },
    openKeys: {
      type: Array
    }
  },
  methods: {
    clickHandle (args) {
      this.$emit('click', args)
    },
    openChangeHandle (args) {
      this.$emit('openChange', args)
    },
    loopRender (createElement, data) {
      return data.map((v, k) => {
        if (v.hasChild) {
          return createElement('a-sub-menu', {
            key: v.key
          }, [
            createElement('span', {
              slot: 'title'
            }, [
              createElement('a-icon', {
                props: {
                  type: v.type
                },
                'class': {
                  ['anticon-' + v.icon]: true
                }
              }),
              createElement('span', v.title)
            ]),
            this.loopRender(createElement, v.children)
          ])
        } else {
          return createElement('a-menu-item', {
            key: v.key
          }, [
            createElement('a-icon', {
              props: {
                type: v.type
              },
              'class': {
                ['anticon-' + v.icon]: true
              }
            }),
            createElement('span', v.title)
          ])
        }
      })
    }
  }
})
