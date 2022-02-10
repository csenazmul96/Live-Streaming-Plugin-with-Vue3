<template>
    <div>
        <div class="tv_banner" v-if="setting">
            <img :src="setting.banner" class="img-fluid width_full" alt="" style="width: 100%;">
        </div>
        <section class="ly_broadcasting_area broadcasting_list">
            <div class="ly_broadcasting_container">
                <div class="ly_broadcasting_row">
                    <div class="video_thumbnail">
                        <video-component v-for="(video, key) in videos" :key="'product_' + key" :setting="setting" :video="video"></video-component>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import VideoComponent from "./VideoComponent";
export default {
    components:{VideoComponent},
    name: "index",
    data(){
        return {
            user: null,
            inactiveQueryParams: {
                page: 1
            },
            videos: [],
            setting: null,
        }
    },
    created() {
        this.axios.get(this.$config.WEB_API+'/user-details')
            .then((response) => {
                this.user = response.data.data
                if(!this.user) {
                    window.location('/')
                }else{
                    this.loadBannerThumb();
                    this.loadInactiveList();
                }
            })
    },
    methods:{
        loadInactiveList(){
            this.axios.get(this.$config.BROADCAST_API + '/api/live-video-inactive/'+this.$config.VENDOR_ID, {
                params: {...this.inactiveQueryParams}
            }).then((response) => {
                this.videos = response.data.data;
            }).catch(() => {})
        },
        loadBannerThumb(){
            this.axios.get(this.$config.WEB_API+'/api/tv-banner-thumb').then((response) => {
                this.setting = response.data;
            })
        }
    }
}
</script>
