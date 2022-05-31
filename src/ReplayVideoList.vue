<template>
  <div class="tv_banner" v-if="banners">
    <img :src="banners.banner" class="img-fluid width_full" alt="" style="width: 100%;">
  </div>
  <section class="ly_broadcasting_area broadcasting_list">
    <div class="ly_broadcasting_container">
      <div class="ly_broadcasting_row">
        <div class="video_thumbnail">
          <video-component v-for="(video, key) in videos" :key="'product_' + key" :video="video" :banners="banners" @playVideo="playVideo"></video-component>
        </div>
      </div>
    </div>
  </section>
  <div class="stage61_modal stage61_model replay_video" data-modal="smodal">
    <div class="stage61_modal_overlay" @click.prevent="closeModal()" data-modal-close="smodal"></div>
    <div class="stage61_modal_inner">
      <div class="stage61_modal_wrapper">
        <div class="stage61_modal_content modal_1720p">
          <section class="ly_broadcasting_area" v-if="videoType === 1">
            <div class="ly_broadcasting_container">
              <div class="ly_broadcasting_row">
                <div class="full_content">
                  <div class="inner chat_box" id="cmsold_desktop"> <!-- ---------------------- chat wrap for Desktop ------------------------------------------- -->
                    <div class="js_chat_wrap" id="chat_wrap">
                      <h1 class="product_list_title">Chat</h1>
                      <div class="js_chat_head chat_head largeScreenChatScroll" id="cmsoldChatHead"  >
                        <div class="chat_head_inner" ref="largeScreenChatScroll">
                          <ul class="js_cmsold_wrap" id="cmsoldWrap">
                            <div class="comments">
                              <li v-for="(comment, i) in currentComments" :key="'comment_'+i" :class="checkCommentClass(comment)">
                                <div class="append_inner">
                                  <div class="text">
                                    <h2>{{ !comment.welcome_msg ? (comment.type === 'reply' ? comment.parent.name : comment.name) + ':' : null}} <span>{{ comment.type === 'reply' ? comment.parent.comment : comment.comment }}</span></h2>
                                  </div>
                                </div>
                                <div class="reply_comment mt-1" v-if="comment.type === 'reply'">
                                  <div class="reply_comment_list">
                                    <div class="text">
                                      <h2>{{ comment.name }}: <span>{{ comment.comment }}</span></h2>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div class="hearts"></div>
                    </div>
                  </div>
                  <div class="inner live_video">
                    <div class="inner_content">
                      <!--===============================Video Player==========================================================================-->
                      <div id="video_wrap">
                        <span @click.prevent="closeModal()" data-modal-close="smodal" class="mobile_close_icon"> <i class="lni lni-cross-circle"></i></span>

                        <iframe scrolling="no" id="iframe" class="iframe_wrap" :src="iframeVodSrc" frameborder="0" allowfullscreen></iframe>

                        <div class="showing_item" v-if="liveCurrentItem">

                          <div class="showing_item_inner">
                            <div class="time"><i class="lni lni-timer"></i> {{ currentPlayerTime ? currentPlayerTime : '00.00' }}</div>
                            <div class="live_user"><i class="lni lni-eye"></i> {{ currentVisitor ? currentVisitor.viewer : 0 }}</div>
                            <div class="item_details">
                              <div class="img" v-if="liveCurrentItem.images.length" @click.prevent="loadCurrentItemModal(liveCurrentItem.slug)">
                                <img :src="liveCurrentItem.images[0].compressed_image" class="width_full">
                              </div>
                              <div class="text">
                                <h2><span>Replay</span> Type: {{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(liveCurrentItem.id) }}</h2>
                                <P>Color: {{liveCurrentItem.inventories.map(i => capitalizedName(i.color_name)).join(', ')}}</P>
                                <P>Pack: {{ liveCurrentItem.pack ? liveCurrentItem.pack.name : null }}</P>
                              </div>
                            </div>
                            <div class="price">${{ liveCurrentItem.price.toFixed(2) }}</div>
                          </div>
                        </div>
                        <div class="custom_play_btn d_none"  @click.prevent="playerButton(iframeVodSrc)">
                          <div class="playBut"><span class="play-pause-buttn"></span></div>
                        </div>
                        <div class="logo_stage61">
                          <img :src="$config.BROADCAST_API+'/images/logo-stage61.png'" alt="">
                        </div>
                        <div class="product_collapse_mobile" @click.prevent="modalOpen('#Replay_Itemsmain')">
                          <svg width="18px" height="20px" viewBox="0 0 23 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Sold-Out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g id="V1---Homepage-[Sold-Out]" transform="translate(-1388.000000, -64.000000)" fill="#1F1D1A">
                                <g id="Main-Nav" transform="translate(20.000000, 40.000000)">
                                  <g id="Group-7" transform="translate(1368.000000, 15.000000)">
                                    <g id="bag-icon" transform="translate(0.800004, 9.600000)">
                                      <path d="M10.8001359,0 C8.56695354,0 6.75011352,1.85720415 6.75011352,4.14000033 L6.75011352,5.52000044 L2.02508746,5.52000044 C1.67246551,5.52000044 1.37897389,5.79765646 1.35197374,6.15700849 L0.00196629864,24.0970099 C-0.0123437803,24.2885539 0.0519165742,24.4776139 0.179627279,24.618926 C0.307607984,24.759686 0.487158975,24.840002 0.675080011,24.840002 L20.9251917,24.840002 C21.1131127,24.840002 21.2926637,24.759686 21.4203744,24.618926 C21.5480851,24.4778899 21.6123455,24.2888299 21.5980354,24.0970099 L20.248028,6.15700849 C20.2212978,5.79765646 19.9278062,5.52000044 19.5751843,5.52000044 L14.8501582,5.52000044 L14.8501582,4.14000033 C14.8501582,1.85720415 13.0333182,0 10.8001359,0 Z M8.10012097,4.14000033 C8.10012097,2.61813621 9.31134765,1.38000011 10.8001359,1.38000011 C12.2889241,1.38000011 13.5001508,2.61813621 13.5001508,4.14000033 L13.5001508,5.52000044 L8.10012097,5.52000044 L8.10012097,4.14000033 Z M18.9501308,6.90000055 L20.1961877,23.4600019 L1.40408403,23.4600019 L2.65014091,6.90000055 L6.75011352,6.90000055 L6.75011352,8.97000071 C6.75011352,9.35115674 7.05224519,9.66000077 7.42511724,9.66000077 C7.7979893,9.66000077 8.10012097,9.35115674 8.10012097,8.97000071 L8.10012097,6.90000055 L13.5001508,6.90000055 L13.5001508,8.97000071 C13.5001508,9.35115674 13.8022824,9.66000077 14.1751545,9.66000077 C14.5480265,9.66000077 14.8501582,9.35115674 14.8501582,8.97000071 L14.8501582,6.90000055 L18.9501308,6.90000055 Z" id="Shape"></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div class="view_product_moblie" id="Replay_Itemsmain">
                          <div class="product_overlay" @click.prevent="modalClose('#Replay_Items1', '#Replay_Itemsmain')"></div>
                          <div class="view_product_moblie_wrap">
                            <!--===============================Mobile Product Details==========================================================================-->
                            <div class="inner_content product_details_list items1" id="Replay_Items1">
                              <button class="close_pd_mobile" @click.prevent="modalClose('#Replay_Items1')"></button>
                              <div class="cms_sold_top_slider" v-if="currentItemImages">
                                <div class="" v-for="(image, i) in currentItemImages" :key="'image_mob_'+i">
                                  <div :class="{active:currentItem.id === image.item_id}">
                                    <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="" class="img-fluid"></a>
                                  </div>
                                </div>
                              </div>
                              <div class="cmsold_product_text" v-if="currentItem">
                                <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                                <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                                <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                                <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                              </div>
                              <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                                <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === parseInt(inv.color_id)}" :key="'nav_'+inv.id">
                                  <div class="cms_col col-5 col-lg-4 pr_5">
                                    <div class="pack_ratio_inner_wrap color">
                                      <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(parseInt(inv.color_id))">
                                        <img :src="getColorImage(parseInt(inv.color_id), currentItem.images)" class="img-fluid" alt="">
                                        <span>{{ inv.color_name }} <br> <b v-if="inv.available_on != 'null' && inv.available_on != null">{{ inv.available_on }}</b> </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="cms_col col-3  col-lg-4 pr_5 pl_5">
                                    <div class="pack_ratio_inner_wrap">
                                      <div class="pack_ratio_inner d_flex_center"><span class="d_flex_center width_full">{{ currentItem.pack.pack_text }}</span></div>
                                    </div>
                                  </div>
                                  <div class="cms_col col-4  col-lg-4 pl_5">
                                    <div class="pack_ratio_inner_wrap">
                                      <div class="pack_ratio_inner d_flex_center">
                                        <div class="num_count_wrapper">
                                          <template v-if="user">
                                            <div class="num_count" v-if="inv.availability !== '2'">
                                              <div class="minus">
                                                <button class="btn btn-default" @click.prevent="changeQty(cartForm.colors.find((c) => c.id === parseInt(inv.color_id)))">
                                                  <i class="lni lni-minus"></i>
                                                </button>
                                              </div>
                                              <input type="text" min="0" class="qty" v-model="cartForm.colors.find((c) => c.id === parseInt(inv.color_id)).quantity" readonly>
                                              <div id="add" class="add">
                                                <button class="btn btn-default" @click.prevent="()=>{cartForm.colors.find((c) => c.id === parseInt(inv.color_id)).quantity++,activeColor = parseInt(inv.color_id) }">
                                                  <i class="lni lni-plus"></i>
                                                </button>
                                              </div>
                                            </div>
                                            <span v-else>Out Of Stock</span>
                                          </template>
                                          <template v-else><router-link :to="{name:'login'}">Login</router-link></template>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </div>
                              <div class="pack_ratio_total_wrap">
                                <div class="row">
                                  <div class="cms_col pr_5">
                                    <div class="pack_ratio_total d_flex_btwn"><span>Total Pack</span> <span>{{ totalPack }}</span></div>
                                  </div>
                                  <div class="cms_col pr_5 pl_5">
                                    <div class="pack_ratio_total d_flex_btwn"><span>Total Qty</span> <span>{{ totalQty }}</span></div>
                                  </div>
                                  <div class="cms_col pl_5">
                                    <div class="pack_ratio_total d_flex_btwn"><span>Total Price</span> <span>${{ totalPrice.toFixed(2) }}</span></div>
                                  </div>
                                </div>
                                <p class="empty_cart_msg d_none text-danger">Please Select a color</p>
                                <p class="success_cart_msg d_none text-success">Item Successfully added.</p>
                              </div>

                              <button class="cms_sold_cart" @click.prevent="addToCart">
                                Add To Cart
                              </button>
                            </div>
                            <!--===============================Mobile Product List==========================================================================-->
                            <div class="product_list items_main">
                              <button class="close_pd_mobile" @click.prevent="modalClose('#Replay_Itemsmain')"> </button>
                              <h1 class="product_list_title">Shop</h1>
                              <div class="product_list_wrap">
                                <ul class="string_item_list_mob" :class="{has_active:liveCurrentItem}" ref="string_item_list_mob">
                                  <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Replay_Items1')" :key="'mob_'+i" :class="{active: liveCurrentItem && item.slug === liveCurrentItem.slug}">
                                    <div class="product_inner_list">
                                      <div class="img">
                                        <img :src="item.images[0].compressed_image" alt="">
                                      </div>
                                      <div class="text">
                                        <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span><span class="item_price position-absolute">${{ item.price.toFixed(2) }}</span></p>
                                        <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                                        <p>Colors: {{item.colors.map(i => capitalizedName(i.name)).join(', ')}}</p>
                                      </div>
                                      <span><i class="fas fa-chevron-right"></i></span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--===============================Mobile Chat List==========================================================================-->
                        <div class="js_chat_wrap chat_wrap_mobile" id="chat_wrap" v-if="currentComments.length">
                          <div class="js_chat_head chat_head" id="cmsoldChatHead">
                            <div class="chat_head_inner" ref="smallScreenChatScroll">
                              <ul class="js_cmsold_wrap" id="cmsoldWrap">
                                <div class="comments">
                                  <li v-for="(comment, i) in currentComments" :key="'comment_'+i" :class="checkCommentClass(comment)">
                                    <div class="append_inner">
                                      <div class="text">
                                        <h2>{{ !comment.welcome_msg ? (comment.type === 'reply' ? comment.parent.name : comment.name) + ':' : null}} <span>{{ comment.type === 'reply' ? comment.parent.comment : comment.comment }}</span></h2>
                                      </div>
                                    </div>
                                    <div class="reply_comment mt-1" v-if="comment.type === 'reply'">
                                      <div class="reply_comment_list">
                                        <div class="text">
                                          <h2>{{ comment.name }}: <span>{{ comment.comment }}</span></h2>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </div>
                              </ul>
                            </div>
                          </div>
                          <div class="hearts"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inner view_product">
                    <div class="inner_content product_details_list" id="Replay_Items">
                      <button class="close_pd" @click.prevent="modalClose('#Replay_Items')">Close</button>
                      <div class="cms_sold_top_slider" v-if="currentItemImages">
                        <div class="" v-for="(image, i) in currentItemImages" :key="'image_'+i">
                          <div :class="{active:currentItem.id === image.item_id}">
                            <a href="Javascript:void(0)"><img :src="image.compressed_image" alt="" class="img-fluid"></a>
                          </div>
                        </div>
                      </div>
                      <div class="cmsold_product_text" v-if="currentItem">
                        <span class="cmsold_product_sku">{{ currentItem.style_no }}</span>
                        <h2 class="cmsold_product_title">{{ currentItem.name }}</h2>
                        <p class="cmsold_price"><span>${{ currentItem.price.toFixed(2) }}</span>  <span>{{ itemIdentifire(currentItem.id) }}</span></p>
                        <span v-if="vendorCurrentItem === currentItem.slug" class="cmsold_now">Now Showing</span>
                      </div>
                      <div v-if="currentItem && currentItem.inventories" :class="['pack_ratio', {scroll:currentItem.inventories.length > 3}]">
                        <div class="row" v-for="inv in currentItem.inventories" :class="{active:activeColor === parseInt(inv.color_id)}" :key="'nav_m_'+inv.id">
                          <div class="cms_col col-5 col-lg-4 pr_5">
                            <div class="pack_ratio_inner_wrap color">
                              <div class="pack_ratio_inner ratio_color" @click.prevent="selectColorImage(parseInt(inv.color_id))">
                                <img :src="getColorImage(parseInt(inv.color_id), currentItem.images)" class="img-fluid" alt="">
                                <span>{{ inv.color_name }} <br> <b v-if="inv.available_on != 'null' && inv.available_on != null">{{ inv.available_on }}</b> </span>
                              </div>
                            </div>
                          </div>

                          <div class="cms_col col-3  col-lg-4 pr_5 pl_5">
                            <div class="pack_ratio_inner_wrap">
                              <div class="pack_ratio_inner d_flex_center"><span class="d_flex_center width_full">{{ currentItem.pack.pack_text }}</span></div>
                            </div>
                          </div>

                          <div class="cms_col col-4  col-lg-4 pl_5">
                            <div class="pack_ratio_inner_wrap">
                              <div class="pack_ratio_inner d_flex_center">
                                <div class="num_count_wrapper">
                                  <template v-if="user">
                                    <div class="num_count" v-if="inv.availability !== '2'">
                                      <div class="minus">
                                        <button class="btn btn-default" @click.prevent="changeQty(cartForm.colors.find((c) => c.id === parseInt(inv.color_id)))">
                                          <i class="lni lni-minus"></i>
                                        </button>
                                      </div>
                                      <input type="text" min="0" class="qty" v-model="cartForm.colors.find((c) => c.id === parseInt(inv.color_id)).quantity" readonly>
                                      <div id="add" class="add">
                                        <button class="btn btn-default" @click.prevent="()=>{cartForm.colors.find((c) => c.id === parseInt(inv.color_id)).quantity++,activeColor = parseInt(inv.color_id) }">
                                          <i class="lni lni-plus"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <span v-else>Out Of Stock</span>
                                  </template>
                                  <template v-else><router-link :to="{name:'login'}">Login</router-link></template>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="pack_ratio_total_wrap">
                        <div class="row">
                          <div class="cms_col pr_5">
                            <div class="pack_ratio_total d_flex_btwn"><span>Total Pack</span> <span>{{ totalPack }}</span></div>
                          </div>
                          <div class="cms_col pr_5 pl_5">
                            <div class="pack_ratio_total d_flex_btwn"><span>Total Qty</span> <span>{{ totalQty }}</span></div>
                          </div>
                          <div class="cms_col pl_5">
                            <div class="pack_ratio_total d_flex_btwn"><span>Total Price</span> <span>${{ totalPrice.toFixed(2) }}</span></div>
                          </div>
                        </div>
                        <p class="empty_cart_msg d_none text-danger">Please Select a color</p>
                        <p class="success_cart_msg d_none text-success">Item Successfully added.</p>
                      </div>

                      <button v-if="user" class="cms_sold_cart" @click.prevent="addToCart"> Add To Cart </button>
                    </div>
                    <div class="product_list">
                      <h1 class="product_list_title"> Shop</h1>
                      <div class="product_list_wrap" v-if="products && products.length">
                        <ul class="string_item_list_desk" :class="{has_active:liveCurrentItem}" ref="string_item_list_desk">
                          <li v-for="(item, i) in products" @click.prevent="loadItem(item.slug, '#Replay_Items')" :key="'desk_'+i" :class="{active: liveCurrentItem && item.slug === liveCurrentItem.slug}">
                            <div class="product_inner_list">
                              <div class="img">
                                <img :src="item.images[0].compressed_image" alt="">
                              </div>
                              <div class="text">
                                <p :class="[{pre_order:item.available_on}, {Instock:!item.available_on}]">{{ settings ? settings.comment_prefix : null }} {{ itemIdentifire(item.id) }} <span v-if="item.available_on">PRE ORDER - {{item.available_on}}</span> <span v-else>Instock</span> <span class="item_price position-absolute">${{ item.price.toFixed(2) }}</span></p>
                                <P v-if="item.pack">Pack : {{item.pack.pack_text}} ({{item.pack.name}})</P>
                                <p>Colors: {{item.colors.map(i => capitalizedName(i.name)).join(', ')}}</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <uploaded-video-section v-else-if="videoType === 2" :liveData="liveData"></uploaded-video-section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import UploadedVideoSection from "./UploadedVideoSection";
import VideoComponent from "./VideoComponent";
export default {
  name: 'live-chat',
  components: {UploadedVideoSection,VideoComponent},

  data() {
    return {
      user: document.querySelector("meta[name='auth-user']").getAttribute('content'),
      liveData: null,
      comments: [],
      totalVisitors: [],
      currentItem: null,
      liveCurrentItem: null,
      vendorCurrentItem: null,
      currentItemImages: [],
      products: [],
      activeColor: '',
      cartForm: {
        colors: []
      },
      currentComments:[],
      currentVisitor: 0,
      player: null,
      reacts: [],
      itemHistory: [],
      recentVideoList: [],
      currentEmoji: null,
      settings:null,
      currentPlayerTime: null,
      inactiveQueryParams: {
        page: 1
      },
      videos: [],
      iframeVodSrc: null,
      eventTimeSec: null,
      videoDuration: null,
      videoType: null,
      banners: null,
      showModal: false,
      activeItemLiWidth: null,
      activeItemStyleCaltulate: true,
    }
  },

  created() {
    if(!this.user) {
      window.location.replace("/");
    }
    this.loadInactiveList();
    this.loadBannerThumb();
    let self = this
    this.axios.get(this.$config.BROADCAST_API + '/api/video-active/' + this.$config.VENDOR_ID)
        .then((response)=>{
          this.recentVideoList = response.data.data
          if(this.recentVideoList.length) {
            setTimeout(function () {
              self.relatedVideoSlider()
            }, 500);
          }
        })
    this.axios.get(this.$config.BROADCAST_API + '/api/settings/' + this.$config.VENDOR_ID)
        .then((response)=>{
          this.settings = response.data.data
        })
  },

  computed:{
    totalPack() {
      if (this.currentItem)
        return this.cartForm.colors.filter((color) => this.currentItem.inventories.find((i) => parseInt(i.color_id) === color.id && i.availability !== '2')).reduce((a, b) => a + b.quantity, 0);
      else
        return 0;
    },
    totalQty() {
      if (this.currentItem) {
        return this.currentItem.pack.total_item * this.totalPack;
      } else
        return 0;
    },
    totalPrice() {
      if (this.currentItem)
        return this.currentItem.price * this.totalQty;
      else
        return 0;
    }
  },
  mounted() {
    let self = this
    window.onmessage = function(e) {
      if(e.data)
        self.getCuttentTimeEvent(e.data)
    }
    window.$(window).resize(function() {
      self.calculateActiveItemPaddingOnList();
      if(window.frames['iframe'])
        window.frames['iframe'].contentWindow.postMessage(window.innerWidth, this.$config.NUXT_ENV_WEB_RTC_IFRAME_URL);


    });
  },
  updated() {
    if(!window.$('#iframe').length){
      window.$('.stage61_model').removeClass('open_animation');
      window.$('body').removeClass('model_open');
      window.$('.stage61_model').removeClass('open_modal');
    }
  },
  methods: {
    checkCommentClass(comment){
      let newclass = 'reply';
      if(comment.welcome_msg) {
        newclass = 'welcome'
      } else if(comment['type'] === 'reply' ){
        newclass = 'reply_back_user'
      } else if (comment.user_id == this.user){
        newclass = ''
      }
      return newclass;
    },
    getCuttentTimeEvent(event){
      if(event[0] === 'duration') {
        this.videoDuration = event[1]
      } else if(event[0] === 'pause') {
        // console.log('pause')
      } else if(event[0] === 'play') {
        window.$(".custom_play_btn").addClass('d_none')
      } else if(event[0] === 'ended') {
        window.$(".custom_play_btn").removeClass('d_none')
      } else if (event[0] === 'timeupdate'){
        if(this.videoType === 1) {
          this.eventTimeSec = Math.floor(event[1]);
          this.currentPlayerTime = Math.floor(this.eventTimeSec / 60).toString().padStart(2, '0') + ':' + (this.eventTimeSec - (Math.floor(this.eventTimeSec / 60) * 60)).toString().padStart(2, '0')
          this.filterComments(this.eventTimeSec)
          this.filterVisitors(this.eventTimeSec)
          this.checkCurrentItem(this.eventTimeSec)
          this.checkCurrentReact(this.eventTimeSec)
        }
      }
    },
    closeModal(){
      this.currentComments = []
      this.itemHistory = []
      this.products = []
      this.liveData = null
      this.liveCurrentItem = null
      this.currentItem = null
      this.currentItemImages = []
      this.iframeVodSrc = null;
      setTimeout (function () {
        window.$('.stage61_model').removeClass('open_animation');
      } , 300 )

      setTimeout (function () {
        window.$('body').removeClass('model_open');
        window.$('.stage61_model').removeClass('open_modal');
      } , 400 )
    },
    playVideo(id){
      this.currentComments = []
      this.itemHistory = []
      this.products = []
      this.liveData = null
      this.liveCurrentItem = null
      this.currentItem = null
      this.currentItemImages = []
      this.iframeVodSrc = null;
      this.axios.get(this.$config.BROADCAST_API + '/api/replay-videos/'+id)
          .then((response)=>{
            this.liveData = response.data.data
            this.videoType = this.liveData.type
            if(this.liveData) {
              this.iframeVodSrc = this.liveData ? this.liveData.video_url + '&front=1' : ''
              if(this.videoType === 1) {
                this.loadProducts()
                this.loadComments()
                this.loadVisitors()
                this.loadReacts()
                this.loadItemHistory()
              }
            }
          })
      window.$('body').addClass('model_open');
      window.$('.stage61_model.replay_video').addClass('open_modal');
      setTimeout (function () {
        window.$('.stage61_model.replay_video').addClass('open_animation');
      } , 400 )
    },
    playerButton(){
      this.playVideo(this.liveData.id)
    },
    loadInactiveList(){
      this.axios.get(this.$config.BROADCAST_API + '/api/video-active/' + this.$config.VENDOR_ID, {
        params: {...this.inactiveQueryParams}
      }).then((response) => {
        this.videos = response.data.data;
      }).catch(() => {})
    },
    capitalizedName(name){
      return name.toUpperCase();
    },

    modalOpen(id){
      let self = this
      let target = window.$(id);
      target.slideDown();
      if(id === '#Replay_Itemsmain') {
        setTimeout(() => {
          self.activeItemStyleCaltulate = false
          self.calculateActiveItemPaddingOnList()
        }, 0)
      }
    },
    modalClose(id, id2 = null){
      let target = window.$(id);
      target.slideUp();
      if(id2) {
        let target2 = window.$(id2);
        target2.slideUp();
      }
    },
    loadCurrentItemModal(slug){
      this.loadItem(slug)
      this.modalOpen("#Replay_Items")
      if(window.outerWidth <= 1024) {
        this.modalOpen("#Replay_Items1")
        setTimeout(()=>{
          this.modalOpen("#Replay_Itemsmain")
        },250)
      }
    },
    filterComments(time) {
      this.currentComments = this.comments.filter(commnent => parseInt(commnent.video_time) <= Math.round(time));
      this.$nextTick(() => {
        if (this.$refs.smallScreenChatScroll && this.$refs.largeScreenChatScroll !== undefined) {
          this.$refs.largeScreenChatScroll.scrollTop = this.$refs.largeScreenChatScroll.scrollHeight
        }
        if (this.$refs.smallScreenChatScroll && this.$refs.smallScreenChatScroll !== undefined) {
          this.$refs.smallScreenChatScroll.scrollTop = this.$refs.smallScreenChatScroll.scrollHeight
        }
      });
    },
    filterVisitors(time) {
      let currenvisitor = []
      this.totalVisitors.map(t => {
        if(parseInt(t.time) >= Math.round(time))
          currenvisitor.push(t)
      })
      if(currenvisitor.length)
        this.currentVisitor = currenvisitor[0]
    },
    loadBannerThumb(){
      this.axios.get(this.$config.WEB_API+'/api/tv-banner-thumb').then((response) => {
        this.banners = response.data;
      })
    },
    checkCurrentItem(time) {
      let self = this
      if(!time)
        return
      let item = this.itemHistory.find(i => parseInt(time) >= parseInt(i.time) &&  parseInt(time) <= parseInt(i.end_time));
      if (item) {
        if (this.liveCurrentItem && this.liveCurrentItem.slug != item.item_slug){
          if(this.products.length) {
            let product = this.products.find(p => p.slug === item.item_slug)
            if (product) {
              this.liveCurrentItem = product
              setTimeout(() => {
                self.calculateActiveItemPaddingOnList()
              }, 0)
            }
          }
        }
      }
    },
    checkCurrentReact(time){
      if(this.reacts.length){
        this.reacts.map((item)=>{
          if(parseInt(item.time) === Math.round(time)){
            if(this.currentEmoji != Math.round(time)){
              this.currentEmoji = Math.round(time)
              this.appendEmoji(item.react)
            }
          }
        })
      }
    },

    loadProducts() {
      let self = this
      if(this.liveData.items_all) {
        this.axios.get(this.$config.WEB_API + '/api/admin/selected-items', {
          params: {
            itemId: this.liveData.items_all
          }
        })
            .then((response) => {
              this.products = response.data.data
              if (this.products && this.products.length) {
                let item = this.products.filter((item) => item.id === this.liveData.current_item_id)
                if (item) {
                  this.liveCurrentItem = item[0];
                  this.currentItem = item[0];
                  if(this.activeItemStyleCaltulate) {
                    setTimeout(() => {
                      self.calculateActiveItemPaddingOnList()
                    }, 0)
                  }
                  let firstColor = this.currentItem.inventories[0];
                  this.selectColorImage(firstColor.color_id)
                  this.cartForm.item = {...this.currentItem};
                  this.currentItem.colors.forEach((c) => {
                    this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
                  });
                }

              }
              setTimeout(() => {
                this.initItemSlider();
              }, 0)
            })
      }
    },
    itemIdentifire(id){
      if(this.liveData && this.liveData.items.length){
        let item = this.liveData.items.find(x=> x.item_id === id)
        if(item)
          return item.identifier
      }
    },
    loadComments() {
      this.axios.get(this.$config.BROADCAST_API + '/api/comments/' + this.liveData.id)
          .then((response) => {
            this.comments = response.data.data;
          })
    },
    loadVisitors() {
      this.axios.get(this.$config.BROADCAST_API + '/api/visitors/' + this.liveData.id)
          .then((response) => {
            this.totalVisitors = response.data.data;
          })
    },
    loadReacts() {
      this.axios.get(this.$config.BROADCAST_API + '/api/reacts/' + this.liveData.id)
          .then((response) => {
            this.reacts = response.data.data;
          })
    },
    loadItemHistory() {
      this.axios.get(this.$config.BROADCAST_API + '/api/live-video/'+this.liveData.id+'/item-history')
          .then((response) => {
            this.itemHistory = response.data.data;
            this.itemHistory.forEach((item, i, arr) => {
              if (i !== arr.length - 1) {
                item.end_time = arr[i+1].time;
              } else {
                setTimeout(() => {
                  item.end_time = this.videoDuration;
                }, 600)
              }
            })
          })
    },
    appendEmoji(content){
      let id = Math.floor(Math.random() * 999999999);
      window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 200)
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 400)
      setTimeout(()=>{
        let id = Math.floor(Math.random() * 999999999);
        window.$(".hearts").append(`<div class="imojies_inner ${content} emoji_${id}"></div>`);
      }, 600)
    },
    addToCart() {
      if (this.cartForm.colors.reduce((a, b) => a + b.quantity, 0) === 0) {
        window.$('.empty_cart_msg').slideDown('slow');
        setTimeout(function () {
          window.$('.empty_cart_msg').slideUp('slow');
        }, 1500);
      } else {
        let cartItems = [];
        this.cartForm.colors.forEach((color) => {
          if (color.quantity > 0) {
            cartItems.push({
              item_id: this.currentItem.id,
              customer_id: this.user,
              indicator: color.indicator,
              color_id: color.id,
              quantity: color.quantity,
            });
          }
        })
        if (cartItems.length) {
          this.axios.post(this.$config.WEB_API + '/api/admin/add-cart-from-facebook', {items: cartItems}).then((response) => {
            window.$(".header_cart").find('span').html(response.data)
            for(let i = 0; i < this.cartForm.colors.length ; i++)
              this.cartForm.colors[i].quantity = 0

            window.$('.success_cart_msg').slideDown('slow');
            setTimeout(function () {
              window.$('.success_cart_msg').slideUp('slow');
            }, 1500);

          }).catch((error) => {
            console.log(error)
          });
        }
      }
    },
    showCartStatus(){
      this.$store.dispatch('cartModule/loadCart')
      if(process.client){
        if(window.outerWidth > 1024){
          window.$('.h_cart').click();
        }else{
          window.$('.m_h_cart').click();
        }
      }
    },
    getColorImage(color, item){
      let data = null;
      if(item.length) {
        let flashItem = item.find(element => parseInt(element.color_id) === color);
        if(flashItem)
          data = flashItem.thumbs_image
      }else{
        if(this.currentItem.colors.length){
          data = this.currentItem.colors.find(color=>color.id === color).thumbs_image
        }
      }
      if(!data)
        data = item[0].thumbs_image

      return data
    },
    changeQty(color) {
      if (color.quantity !== 0)
        color.quantity--;
    },
    selectColorImage(colorId){
      this.activeColor = colorId;
      this.currentItemImages = [];
      if (colorId) {
        if(window.$(".cms_sold_top_slider").hasClass('slick-slider')) {
          let height = window.$(".cms_sold_top_slider ").outerHeight()
          window.$('.cms_sold_top_slider').slick('unslick');
          window.$('.cms_sold_top_slider').css({'min-height' : height+'px'});
        }
        this.currentItemImages = this.currentItem.images.filter((i) => parseInt(i.color_id) === parseInt(colorId));
        if(!this.currentItemImages.length && this.currentItem.images.length){
          this.currentItemImages[0] = this.currentItem.images[0]
          if(this.currentItem.images.length > 1)
            this.currentItemImages[1] = this.currentItem.images[1]
        }
        if(this.currentItemImages.length) {
          setTimeout(() => {
            this.initTopSlider();
          }, 100)
        }
      }
    },
    initItemSlider() {
      if(process.client) {
        window.$('.cmsold_others_slider').slick({
          slidesToScroll: 12,
          slidesToShow: 12,
          dots: false,
          infinite: false,
          prevArrow: false,
          nextArrow: false,
          responsive: [
            {
              breakpoint: 1125, // tablet breakpoint
              settings: {
                slidesToShow: 7,
                slidesToScroll: 7
              }
            },
            {
              breakpoint: 980, // tablet breakpoint
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 480, // mobile breakpoint
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]
        });
      }
    },
    relatedVideoSlider(){
      if(process.client){
        window.$('.broadcast_details_slider').slick({
          slidesToScroll: 6,
          slidesToShow: 6,
          dots: false,
          infinite: false,
          prevArrow: "<button class='arrow_left'><i class='lni lni-chevron-left'></i></button>",
          nextArrow: "<button class='arrow_right'><i class='lni lni-chevron-right'></i></button>",
          responsive: [
            {
              breakpoint: 1125, // tablet breakpoint
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 980, // tablet breakpoint
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 480, // mobile breakpoint
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        });
      }
    },

    initTopSlider() {
      window.$('.cms_sold_top_slider').slick({
        slidesToScroll: 2,
        slidesToShow: 2,
        dots: false,
        infinite: false,
        prevArrow: "<button class='arrow_left'><i class='lni lni-chevron-left'></i></button>",
        nextArrow: "<button class='arrow_right'><i class='lni lni-chevron-right'></i></button>",
      });
      setTimeout(() => {
        window.$('.cms_sold_top_slider').css({'min-height' : 'auto'});
      }, 250)
    },
    loadItem(slug, id = null) {
      if(this.products.length) {
        let item = this.products.find(item => item.slug === slug)
        if(item) {
          this.currentItem = item;
          let firstColor = this.currentItem ? this.currentItem.inventories[0] : null;
          if(firstColor) {
            this.selectColorImage(firstColor.color_id)
          }
          this.cartForm.item = {...this.currentItem};
          this.currentItem.colors.forEach((c) => {
            this.cartForm.colors.push({...c, ...{quantity: 0}, ...{indicator: 'streaming'}});
          });
        }
      }
      if(id) {
        this.modalOpen(id)
      }
    },
    calculateActiveItemPaddingOnList(){
      let height = window.$(".string_item_list_desk li.active").outerHeight()
      let heightmb = window.$(".string_item_list_mob li.active").outerHeight()
      let width = window.$(".string_item_list_desk.has_active").outerWidth()
      let widthmb = window.$(".string_item_list_mob.has_active").outerWidth()

      window.$(".string_item_list_desk li").css({'margin-top': '0px','width': 'auto'})
      window.$(".string_item_list_mob li").css({'margin-top': '0px','width': 'auto'})
      window.$(".string_item_list_desk li .product_inner_list").css({'background':'#fff'})
      window.$(".string_item_list_mob li .product_inner_list").css({'background':'#fff'})

      if(height) {
        window.$(".string_item_list_desk").css({'padding-top': height + "px"})
        setTimeout(() => {
          window.$(".string_item_list_desk li.active").css({'margin-top': '-' + height + "px",'width': width + 'px'})
          window.$(".string_item_list_desk li.active .product_inner_list").css({'background':'#9D1716'})
        }, 100)
      }
      if(heightmb) {
        window.$(".string_item_list_mob").css({'padding-top': heightmb + "px"})
        setTimeout(() => {
          window.$(".string_item_list_mob.has_active li.active").css({'margin-top': '-' + heightmb + "px",'width': widthmb + 'px'})
          window.$(".string_item_list_mob li.active .product_inner_list").css({'background':'#9D1716'})
        }, 100)
      }
    },
  },

}
</script>
