<template lang="html">
  <a-layout id="layout" class="container">
    <a-layout-sider collapsible v-model="collapsedOuter" class="sider" :trigger="null">
      <div class="logo" :class="{'collapsed-logo': collapsedOuter}" :style="{'background-image': 'url(' + src + ')'}"></div>

      <div class="layout-menu-top"></div>

      <a-menu :selectedKeys="selectedKeys" @click="clickMenu" mode="inline" theme="dark">
        <a-menu-item key="0">
          <a-icon type="home"/>
          <span>home</span>
        </a-menu-item>
        <a-menu-item key="1">
          <a-icon type="layout"/>
          <span>demo0</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="book"/>
          <span>demo1</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <a-icon class="trigger" :type="collapsedOuter ? 'menu-unfold' : 'menu-fold'" @click="toggleFold"/>

        <a-dropdown class="user">
          <span>
            <span class="username">admin</span>
            <a-icon type="user" />
          </span>

          <a-menu slot="overlay">
            <a-menu-item>
              <span>修改密码</span>
            </a-menu-item>
            <a-menu-item>
              <span @click="logout">退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>

      <a-layout class="ant-layout-has-sider">
        <div class="inner-sider" :class="{'inner-fold': collapsedInner}">
          <div class="inner-sider-content" v-show="!collapsedInner">
            xxx
          </div>
          <div class="fold-sign" :class="{'is-inner': !collapsedInner, 'left-radius': collapsedInner, 'right-radius': !collapsedInner}" @click="collapsedInner = !collapsedInner">
            <a-icon type="left" v-show="!collapsedInner"/>
            <a-icon type="right" v-show="collapsedInner"/>
          </div>

        </div>

        <a-layout-content class="content ant-layout ant-layout-content" id="contentView">
          <frame-view-loading :show="isShowLoading"></frame-view-loading>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </a-layout>
</template>

<script>
import frameViewLoading from '@/common/frameViewLoading'
import $ from 'jquery'
export default {
  mounted () {
    this.src = this.logo
    this.renderFrame('http://localhost:8080/home.html')

    $(window).resize(() => {
      this.resetLayout()
    })
  },
  data () {
    return {
      username: 'admin',
      collapsed: false,
      collapsedOuter: true, // 外部侧边栏是否折叠
      collapsedInner: true, // 内部侧边栏是否折叠
      logo: require('@/assets/img/robot-logo.png'),
      logoMini: require('@/assets/img/robot-logo-mini.png'),
      src: '',
      selectedKeys: ['0'],
      frameHeight: 0,
      frameWidth: 0,
      headerHeight: 64,
      siderWidth: 200,
      isShowLoading: false
    }
  },
  methods: {
    toggleFold () {
      this.collapsedOuter = !this.collapsedOuter
      if (this.collapsedOuter) {
        this.siderWidth = 80
        this.src = this.logoMini
      } else {
        this.siderWidth = 200
        this.src = this.logo
      }
      this.frameWidth = document.body.clientWidth - this.siderWidth
    },
    logout () {
      this.$router.push({ name: 'login' })
    },
    clickMenu ({item, key, keyPath}) {
      console.log('clicked ', item, key, keyPath)
      this.selectedKeys = keyPath
      switch (keyPath[0]) {
        case '0':
          this.renderFrame('http://localhost:8080/home.html')
          break
        case '1':
          this.renderFrame('http://localhost:8080/demo0.html')
          break
        case '2':
          this.renderFrame('http://localhost:8080/demo1.html')
          break
      }
    },
    createFrame (src) {
      let frameView = document.createElement('iframe')
      let outerWidth = this.collapsedOuter ? 80 : 200
      let innerWidth = this.collapsedInner ? 15 : 200
      frameView.width = $(window).width() - outerWidth - innerWidth
      frameView.height = $(window).height() - 64
      frameView.style.cssText = 'border-left: 0px solid #222a31; border-top: 0px solid #2a323f;border-bottom: 0px solid #2a323f;transition: 0.2s all;'
      frameView.id = 'frameView'

      if (frameView['attachEvent']) {
        frameView.attachEvent('onload', (e) => {
          this.isShowLoading = false
        })
      } else {
        frameView.onload = (e) => {
          this.isShowLoading = false
        }
      }

      frameView.src = src
      document.getElementById('contentView').appendChild(frameView)
    },
    renderFrame (src) {
      this.isShowLoading = true

      let preFrameView = document.getElementById('frameView')
      if (preFrameView) {
        preFrameView.src = 'about:blank'
        try {
          preFrameView.contentWindow.document.removeChild(preFrameView.contentWindow.document.getElementByTagName('html')[0])
        } catch (e) {
          // console.log('清除frameView失败：', e)
        }
        preFrameView.parentNode.removeChild(preFrameView)
      }
      this.createFrame(src)
    },
    resetLayout () {
      let width = $(window).width()
      let height = $(window).height()
      let frameHeight = 64
      let outerWidth = this.collapsedOuter ? 80 : 200
      let innerWidth = this.collapsedInner ? 15 : 200
      $('#frameView').width(width - outerWidth - innerWidth)
      $('#frameView').height(height - frameHeight)
    }
  },
  watch: {
    collapsedInner () {
      this.resetLayout()
    },
    collapsedOuter () {
      this.resetLayout()
    }
  },
  components: {
    frameViewLoading
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  color: #ddd;
}

.trigger:hover {
  color: white;
}

.logo {
  height: 64px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80% 80%;
  background-color: #222a31;
  width: 200px;
}

.collapsed-logo {
  width: 80px;
}

.sider {
  overflow: auto;
  height: 100vh;
  background-color: #2a323f;
}

.layout-menu-top {
  height: 24px;
  background-color: #222a31;
}

.layout-menu {
  background-color: #2a323f;
}

.header {
  padding: 0;
  background-color: #222a31;
}

.header .user {
  float: right;
  margin-right: 40px;
  color: white;
  cursor: pointer;
}

.inner-sider {
  flex: 0 0 200px;
  max-width: 200px;
  min-width: 200px;
  width: 200px;
  height: calc(100vh - 64px);
  background-color: #f6f6f6;
  position: relative;
  transition: 0.2s all;
  will-change: width;

  .inner-sider-content {
    height: 100%;
    padding-top: 0.1px;
    margin-top: -0.1px;
    background-color: #eee;
    width: 200px;
    overflow: auto;
    padding: 20px;
  }

  .fold-sign {
    height: 30px;
    width: 15px;
    background-color: #666;
    color: white;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    font-size: 12px;
    line-height: 30px;
    cursor: pointer;

    &.right-radius {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &.left-radius {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  &.inner-fold {
    width: 15px;
    max-width: 15px;
    min-width: 15px;
  }
}

.content {
  background-color: white;
  overflow: hidden;
  position: relative;
}

.frameView {
  border-left: 1px solid #f6f6f6;
  border-top: 1px solid #2a323f;
  border-bottom: 0px solid #2a323f;
  transition: 0.2s all;
}
</style>
