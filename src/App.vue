<template>
  <div>
    <live-streaming v-if="currentComponent === 'live-streaming'"></live-streaming>
    <replay-video v-if="currentComponent === 'details'"></replay-video>
    <replay-video-list v-if="currentComponent === 'list'"></replay-video-list>
  </div>
</template>
<script>
import LiveStreaming from './LiveStreaming'
import ReplayVideo from './ReplayVideo'
import ReplayVideoList from './ReplayVideoList'
export default {
  components:{LiveStreaming, ReplayVideo, ReplayVideoList},
  data(){
    return  {
        currentComponent: null,
    }
  },
  created() {
    if(window.location.pathname === '/'){
       this.currentComponent = 'live-streaming'
    }
    if(window.location.pathname === '/replay-video/details'){
       this.currentComponent = 'details'
    }
    if(window.location.pathname === '/replay-videos'){
       this.currentComponent = 'list'
    }
  }
}
</script>
