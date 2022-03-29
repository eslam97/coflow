<template>
  <b-container fluid>
    <b-modal id="sendMessage" size="lg" title="Send message" hide-footer>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(sendNewMessage)">
            <b-row>
              <b-col lg="12">
                <iq-card>
                  <template v-slot:body>
                    <div>
                      <b-row>
                        <b-form-group class="col-md-12" label="Phone Number:" label-for="phone">
                          <ValidationProvider name="phone" ref="phone" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="newMessage.phone" type="text" placeholder="Phone Number"
                                          :class="(errors.length >
                             0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-12" label="Message:" label-for="message">
                          <ValidationProvider name="message" ref="message" rules="required" v-slot="{ errors }">
                            <b-form-textarea
                                id="textarea-rows"
                                placeholder="Message..."
                                rows="3"
                                v-model="newMessage.message"
                                :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                            ></b-form-textarea>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                      </b-row>
                      <div class="d-flex  mt-4 align-items-center justify-content-end">
                        <b-button variant="primary" type="submit" >Send Message</b-button>
                      </div>
                    </div>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
          </form>
        </ValidationObserver>
    </b-modal>
    <b-row>
      <b-col>
        <audio-recorder
            :attempts="1000"
            :time="1"
            :after-recording="onResult"
            v-show="false"
            />
        <iq-card body-class="chat-page p-0">
          <template v-slot:body>
            <div class="chat-data-block">
              <b-row>
                <b-col lg="3" class="chat-data-left scroller">
                  <div class="chat-search pt-3 pl-3">
<!--                    <ToggleButton toggleShow="#user-detail-popup">
                      <template v-slot:media>
                        <img :src="user.image" alt="chat-user" class="avatar-60 ">
                      </template>
                      <template v-slot:body>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="mr-5">
                            <h5 class="mb-0">{{ user.name }}</h5>
                            <p class="m-0">{{ user.role }}</p>
                          </div>
                          <p
                              class="m-0 text-success text-right w-full font-size-22 cursor-pointer"><i class="las la-sync"
                                                                               @click="getLog"></i></p>
                        </div>
                      </template>
                    </ToggleButton>-->
                    <ToggleContent id="user-detail-popup" body-class="text-left">
                      <template v-slot:media>
                        <img :src="user.image" alt="avatar">
                      </template>
                      <template v-slot:title>
                        <section class="flex justify-content-between align-items-center">
                          <div>
                            <div class="user-name mt-4"><h4>{{ user.name }}</h4></div>
                            <div class="user-desc"><p>{{ user.role }}</p></div>
                          </div>
                          <p class="m-0 text-success"><i class="las la-sync" @click="getLog"></i> Reload</p>
                        </section>
                      </template>
                      <template v-slot:body>
                        <h5 class="mt-4 mb-4">About</h5>
                          <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                          <h5 class="mt-3 mb-3">Status</h5>
                          <ul class="user-status p-0">
                            <li class="mb-1"><i class="ri-checkbox-blank-circle-fill text-success pr-1"></i><span>Online</span></li>
                            <li class="mb-1"><i class="ri-checkbox-blank-circle-fill text-warning pr-1"></i><span>Away</span></li>
                            <li class="mb-1"><i class="ri-checkbox-blank-circle-fill text-danger pr-1"></i><span>Do Not Disturb</span></li>
                            <li class="mb-1"><i class="ri-checkbox-blank-circle-fill text-light pr-1"></i><span>Offline</span></li>
                          </ul>
                      </template>
                    </ToggleContent>
                    <div class="chat-searchbar mt-2 d-flex justify-content-between align-items-center">
                      <div class="form-group chat-search-data m-0">
                        <input type="text" class="form-control round" id="chat-search" placeholder="Search"
                               v-model="search" @input="getLog">
                        <i class="ri-search-line" />
                      </div>
                      <p class="m-0 text-success text-right w-full font-size-22 cursor-pointer">
                        <i class="las la-sync" @click="getLog"></i>
                      </p>
                    </div>
                    <div class="chat-searchbar mt-2">
                        <div class="d-flex justify-content-around">
                            <b-form-radio inline v-model="read" value="read" @input="currentLogPage= 1; getLog()">
                              Read</b-form-radio>
                            <b-form-radio inline v-model="read" value="unread" @input="currentLogPage= 1; getLog()">Unread</b-form-radio>
                            <span class="text-primary">{{totalUnread}}</span>
<!--                          <select class="form-control" id="category" required  v-model="read" @change="getLog">
                            <option selected disabled>choose read or not</option>
                            <option value="read">Read</option>
                            <option value="unread">Unread</option>
                          </select>-->
                        </div>
                      <p @click="resetFilter" class="text-danger"> Clear </p>
                    </div>
                    <div class="chat-searchbar mt-2">
                      <b-button variant="primary" block @click="openBulkMessage">Send Message</b-button>
                    </div>
                  </div>
                  <div class="chat-sidebar-channel scroller mt-2 pl-3">
                    <tab-nav :pills="true" :vertical="true" class="iq-chat-ui" id="chat-list-data">
                      <template v-if="currentItem">
                        <h6 class="mb-2">Current Message :</h6>
                        <tab-nav-items
                            class="bg-light text-white border-bottom overflow-hidden rounded cursor-pointer whatsappList">
                          <template v-slot:title>
                            <div>
                              <ChatItem :item="currentItem" />
                            </div>
                          </template>
                        </tab-nav-items>
                      </template>
                      <h6 class="mt-2 mb-2">All Logs :</h6>
                      <template v-for="(item,index) in allLogUser">
                        <tab-nav-items :key="index"
                                       @click="showChat(item.id, item)"
                                       role="tab"
                                       style="width: 100%;"
                                       :class="[id==item.id ? 'bg-gray' : '','overflow-hidden rounded cursor-pointer pt-0 whatsappList', item.last_message.read == 0 ? 'unreadMessage' : '']"
                        >
                          <template v-slot:title>
                            <ChatItem :item="item" />
<!--                            {{item.last_message.read}}-->
                          </template>
                        </tab-nav-items>
                      </template>
                      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandlerLog">
                        <div slot="no-more">No more User</div>
                        <div slot="no-results">No User</div>
                      </infinite-loading>
                    </tab-nav>
                  </div>
                </b-col>
                <div class="col-lg-9 chat-data p-0 chat-data-right" :style="`background: url(${require('../../assets/images/page-img/100.jpg')}) no-repeat scroll center center;background-size: cover;`">
                  <tab-content  id="v-pills-tabContent">
                    <tab-content-item :active="ifSelect== 1? true : false" id="v-pills-default" aria-labelled-by="v-pills-default">
                      <template>
                        <div >
                          <ToggleButton :mini-toggle="true" :close-button="false" toggleShow="#chat-user-detail-popup" mediaClass="chat-user-profile">
                            <template v-slot:media>
                            </template>
                            <template v-slot:body>
                            </template>
                          </ToggleButton>
                          <div class="chat-start">
                            <span><h3 class="text-primary">Select User To Chat</h3></span>
                          </div>
                        </div>
                      </template>
                    </tab-content-item>
                    <tab-content-item :active="ifSelect==0? true : false" id="v-pills-home" aria-labelled-by="v-pills-default" lazy>
                      <template>
                        <div class="chat-head">
                          <header class="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                            <ToggleButton :mini-toggle="true" :close-button="false" toggleShow="#chat-user-detail-popup" mediaClass="chat-user-profile">
                              <template v-slot:media>
                                  <img :src="require('@/assets/images/user/default_image.jpg')" alt="avatar" class="avatar-50 ">
                                  <span class="avatar-status"><i class="ri-checkbox-blank-circle-fill text-success" /></span>
                              </template>
                              <template v-slot:body>
                                <h5 class="mb-0">{{ detailsOfUser.name }}</h5>
                                <span>{{detailsOfUser.phone}}</span>
                              </template>
                            </ToggleButton>
                            <ToggleContent id="chat-user-detail-popup" bodyClass="chatuser-detail" center>
                              <template v-slot:media>
                                <img :src="detailsOfUser" alt="avatar" class="avatar-50 ">
<!--                                <img :src="require('../../assets/images/user/user.jpg')" alt="avatar">-->
                              </template>
                              <template v-slot:title>
                                <div class="user-name mt-4"><h4>eslam</h4></div>
                                <div class="user-desc"><p>Cape Town, RSA</p></div>
                              </template>
                              <template v-slot:body>
                                <div class="row">
                                  <div class="col-6 col-md-6 title">Nik Name:</div>
                                  <div class="col-6 col-md-6 text-right">eslam</div>
                                </div><hr>
                                <div class="row">
                                  <div class="col-6 col-md-6 title">Tel:</div>
                                  <div class="col-6 col-md-6 text-right">072 143 9920</div>
                                </div><hr>
                                <div class="row">
                                  <div class="col-6 col-md-6 title">Date Of Birth:</div>
                                  <div class="col-6 col-md-6 text-right">July 12, 1989</div>
                                </div><hr>
                                <div class="row">
                                  <div class="col-6 col-md-6 title">Gender:</div>
                                  <div class="col-6 col-md-6 text-right">Male</div>
                                </div><hr>
                                <div class="row">
                                  <div class="col-6 col-md-6 title">Language:</div>
                                  <div class="col-6 col-md-6 text-right">Engliah</div>
                                </div>
                              </template>
                            </ToggleContent>
                            <div class="chat-header-icons d-flex">
                              <a class="iq-bg-primary iq-waves-effect mr-1 chat-icon-phone"><i class="ri-phone-line mr-0" /></a>
                              <a class="iq-bg-primary iq-waves-effect mr-1 chat-icon-video"><i class="ri-vidicon-line  mr-0" /></a>
                              <a class="iq-bg-primary iq-waves-effect mr-1 chat-icon-delete"><i class="ri-delete-bin-line  mr-0" /></a>
                              <b-dropdown id="dropdownMenuButton2" right variant="none iq-bg-primary iq-waves-effect remove-toggle">
                                <template v-slot:button-content>
                                  <i class="ri-more-2-line mr-0" />
                                </template>
                                <b-dropdown-item href="#"><i class="fa fa-thumb-tack mr-0" aria-hidden="true"></i> Pin to top</b-dropdown-item>
                                <b-dropdown-item href="#"><i class="fa fa-trash-o mr-0" aria-hidden="true"></i> Delete chat</b-dropdown-item>
                                <b-dropdown-item href="#"><i class="fa fa-ban mr-0" aria-hidden="true"></i> Block</b-dropdown-item>
                              </b-dropdown>
                            </div>
                          </header>
                        </div>
                        <div class="chat-content scroller" ref="messagesContainer">
                          <infinite-loading direction="top" @infinite="infiniteHandler"  v-if="renderComponent">
                            <div slot="no-more">No more Message</div>
                            <div slot="no-results">No more Message</div>
                          </infinite-loading>
                          <template v-for="(item,index) in contentChat">
<!--                            {{ item }}-->
                            <div class="chat" :key="index" v-if="item.type == 'sender'">
                              <div class="chat-user">
                                <a class="avatar m-0">
                                  <img :src="checkUser(item.userId, 'image')" alt="avatar" class="avatar-35 " />
                                </a>
                                <span class="chat-time mt-1">{{ item.time }}</span>
                              </div>
                              <div class="chat-detail">
                                <div class="chat-message">
                                  <img class="imageInChat" v-if="item.file" :src="item.file"/>
<!--                                  <audio :src="item.message" controls></audio>-->
                                  <p>{{ item.message }}</p>
                                  <span class="text-gray font-size-12">{{item.hasOwnProperty('front') ?
                                      timeConvert(item.created_at)
                                      : timeConvertWhatsapp(item.created_at)}}
                                  </span>
                                  <span class="text-gray font-size-12"> from {{item.user ? item.user.name :
                                      'no user'}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="chat chat-left" :key="index" v-else>
<!--                              {{item}}-->
                              <div class="chat-user">
                                <a class="avatar m-0">
                                  <img :src="require('@/assets/images/user/default_image.jpg')"
                                       class="avatar-35"
                                       alt="avatar">
                                </a>
                                <span class="chat-time mt-1">{{ item.time }}</span>
                              </div>
                              <div class="chat-detail">
                                <div class="chat-message">
                                  <div v-if="item.chat_type == 'image'">
                                    <img class="imageInChat" :src="item.message"/>
                                    <p>{{item.caption ? item.caption : '' }}</p>
                                  </div>
                                  <div v-else-if="item.chat_type == 'ptt'">
                                    <audio :src="item.message" controls></audio>
                                    <p>{{item.caption ? item.caption : '' }}</p>
                                  </div>
                                  <div v-else-if="item.chat_type == 'video'">
                                    <video controls width="300" height="200">
                                      <source :src="item.message" type="video/mp4">
                                    </video>
                                    <p>{{item.caption ? item.caption : '' }}</p>
                                  </div>
                                  <div v-else-if="item.chat_type == 'location'">
                                    <iframe
                                        width="500" height="350" style="border:0;" allowfullscreen="" loading="lazy"
                                        lang="en"
                                        :src="`https://maps.google.com/maps?q=${item.message.split(';')[0]},${item.message.split(';')[1]}&hl=en&z=14&amp;output=embed`"
                                    >
                                    </iframe>
<!--                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3552.363762383925!2d33.86067668499844!3d27.081823883055005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144d7e23fcc5f61f%3A0x9922a751900f1d57!2z2YXZhtiq2KzYuSDZhNmI2YbYrCDYqNmK2KrYtCDYp9mE2LrYsdiv2YLZhw!5e0!3m2!1sar!2seg!4v1644759644971!5m2!1sar!2seg" width="500" height="350" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                                    <p>{{item.message.split(';')}}</p>-->
                                    <p>{{item.caption ? item.caption : '' }}</p>
                                  </div>
                                  <div v-else-if="item.chat_type == 'call_log'">
                                    <p v-if="item.message == '[Call - miss]'" class="font-size-16"><i
                                        class="las la-phone-slash text-danger"></i> Missed Call</p>
                                    <p v-else-if="item.message == '[Call - miss_video]'" class="font-size-16"><i
                                        class="las la-video text-danger"></i> Missed Video Call</p>
                                  </div>
                                  <div v-else-if="item.chat_type == 'vcard'">
                                    <div class="d-flex align-items-center justify-content-center">
                                      <i class="las la-id-card font-size-36 text-primary"></i>
                                    </div>
                                    <p class="text-center font-size-16">{{item.message.substring(item.message.indexOf("FN:")+3,
                                        item.message.indexOf("item"))}}</p>
                                    <div class="d-flex mt-0">
                                      <span>Phone Numbers :</span>
                                      <ul class="m-0 p-0 ml-1">
                                        <li v-for="(i, key) in getPhones(item.message)"
                                            class="text-primary cursor-pointer"
                                            :key="key">{{i}}</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <p v-else>{{ item.message }}</p>
                                  <span class="text-gray font-size-12">{{ timeConvertWhatsapp(item.created_at)}}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                        <div class="d-flex justify-content-start p-2" v-if="image" style="background: var(--iq-bg-light-color);">
                          <img :src="image" style="max-width: 100px; border-radius: 0" class="border-0"/>
                        </div>
                        <div class="chat-footer p-2 bg-white">
                          <form class="d-flex align-items-center"  @submit.prevent="sendMessage()">
                            <div class="chat-attagement d-flex">
                              <a><i class="fa fa-smile-o pr-3" aria-hidden="true"></i></a>
                              <a @click="openFile"><i class="fa fa-paperclip pr-3" aria-hidden="true"></i></a>
                            </div>
                            <div class="mr-3">
                              <span v-b-tooltip.hover.top :title=" startRecord ? 'End Record':'Start Record'"
                                    :class="['microphoneRecord font-size-18 cursor-pointer',
                              startRecord ? 'bg-danger Rec':
                              'bg-success']"
                                    @click="playRecord()">
                                <i class="fas fa-microphone "></i>
                              </span>
                            </div>
                            <input type="file" id="file"  @change="previewImage" class="d-none position-absolute" accept="image/*" style="opacity: 0;" />                            <div class="form-control mr-3 position-relative py-0">
                              <span id="emoji-trigger" class="position-absolute border-0 cursor-pointer font-size-28" style="left: 5px"><i class="las la-laugh"></i></span>
                              <input type="text" placeholder="Type your message" v-model="message.message" class="w-100 p-0 border-0 m-0 pl-4" style="background: none">
                            </div>
                            <button type="submit" class="btn btn-primary d-flex align-items-center p-2"><i class="fa fa-paper-plane-o" aria-hidden="true"></i><span class="d-none d-lg-block ml-1">Send</span></button>
                          </form>
                        </div>
                      </template>
                    </tab-content-item>
                  </tab-content>
                </div>
              </b-row>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import * as Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
import { Users } from '../../FackApi/api/chat'
import { core } from '../../config/pluginInit'
import Chat from '../../store/Chat'
import User from '../../Model/User'
import ToggleButton from '../../components/Chat/ToggleButton'
import ToggleContent from '../../components/Chat/ToggleContent'
import { EmojiButton } from '@joeattardi/emoji-button'
import ChatItem from '../../components/Chat/ChatItem'
import channel from '../../pusher'
import { commonDataMixin } from '@/mixins/commonMixin'
function blobToFile (theBlob, fileName) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}
const fd = new FormData()
const s3 = new FormData()
export default {
  name: 'whatsapp',
  components: { ChatItem, ToggleButton, ToggleContent },
  mixins: [commonDataMixin],
  beforeMount () {
    this.$store.registerModule('Chat', Chat)
  },
  mounted () {
    core.index()
    if (Cookies.get('channelLog') !== undefined) {
      this.handleJoin()
    }
    const picker = new EmojiButton()
    const trigger = document.querySelector('#emoji-trigger')

    picker.on('emoji', selection => {
      this.message.message = `${this.message.message ? this.message.message : ''} ${selection.emoji}`
    })

    trigger.addEventListener('click', () => picker.togglePicker(trigger))
    // This will be called on load
    this.scrollToEnd()
    this.message.project = this.getUserProjects[0].id
  },
  beforeDestroy () {
    this.$store.unregisterModule('Chat')
  },
  data () {
    return {
      startRecord: false,
      renderComponent: true,
      infiniteId: +new Date(),
      search: '',
      read: '',
      user: new User({ id: 1, name: 'Anna Sthesia', role: 'Developer', image: require('../../assets/images/user/user-08.jpg'), isActive: true }),
      usersList: Users,
      allLogUser: [],
      selectedId: '',
      contentChat: [],
      currentChatPage: 1,
      id: '',
      message: {
        project: this.selectedProject,
        phone: '',
        message: ''
      },
      newMessage: {
        phone: '',
        message: ''
      },
      totalUnread: '',
      detailsOfUser: {},
      selectedProject: JSON.parse(localStorage.getItem('default_project')).id,
      ifSelect: 1,
      currentLogPage: 1,
      image: '',
      file: '',
      currentItem: ''
    }
  },
  computed: {
    ...mapGetters(['getUserProjects']),
    filteredList () {
      return this.usersList.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    ...mapGetters({
      startCall: 'Chat/videoCallState'
    })
  },
  methods: {
    /*    getPhones (text) {
      return text.match(/(?<=:)\w+(?=item)/g) || []
    }, */
    resetFilter () {
      this.read = ''
      this.getLog()
    },
    getPhones (str) {
      const words = []
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '+') {
          const stopIndex = str.indexOf('\n', i)
          if (stopIndex !== -1) { words.push(str.substring(i, stopIndex).split(' ').join('')) }
        }
      }
      return words
    },
    playRecord () {
      if (this.startRecord) {
        document.getElementsByClassName('ar-recorder__stop')[0].click()
        this.startRecord = false
      } else {
        document.getElementsByClassName('ar-icon__lg')[0].click()
        this.startRecord = true
      }
    },
    onResult (data) {
      this.startRecord = false
      var blobTofile = blobToFile(data.blob, 'recordFile.mp3')
      s3.append('file', blobTofile)
      s3.append('folder', 'records')
      s3.append('access', 'public')
      this.commonUploadFiles(s3).then(res => {
        fd.append('project', this.selectedProject)
        fd.append('phone', this.message.phone)
        fd.append('message', res.data.data.path)
        this.$store.dispatch('sendMessage', fd).then(() => {
          this.contentChat.push({
            type: 'sender',
            message: res.data.data.path,
            front: true,
            created_at: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0],
            user: {
              name: JSON.parse(localStorage.getItem('user_info')).name
            }
          })
        }).then(() => {
          this.scrollToEnd()
          this.forceRerender()
          this.currentLogPage = 1
          this.getLog()
        }).catch(err => {
          core.showSnackbar('error', err.response.data.errors.message)
        }).finally(() => {
          fd.delete('project')
          fd.delete('phone')
          fd.delete('message')
        })
      })
    },
    checkText (text) {
      return (text.match(/\.(jpeg|jpg|gif|png)$/) != null)
    },
    forceRerender () {
      // Remove my-component from the DOM
      this.renderComponent = false

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true
      })
    },
    checkUser (item, type) {
      const user = this.usersList.find(user => user.id === item)
      let final
      if (user !== undefined) {
        switch (type) {
          case 'name':
            final = 's'
            break
          case 'image':
            final = user.image
            break
          case 'role':
            final = user.role
            break
        }
        return final
      }
      return require('../../assets/images/user/user-05.jpg')
    },
    generate () {
      this.channel = core.random(24)
    },
    copyText () {
      core.Snackbar({ text: 'Copied' })
    },
    handleJoin () {
      Cookies.set('channel', this.channel)
      Cookies.set('baseMode', this.baseMode)
      Cookies.set('transcode', this.transcode)
      Cookies.set('attendeeMode', this.attendeeMode)
      Cookies.set('videoProfile', this.videoProfile)
      this.$store.dispatch('Chat/videoCallAction', true)
    },
    getLog () {
      this.$store.dispatch('showWhatsappLog', {
        projectId: this.selectedProject,
        pageNumber: this.currentLogPage,
        search: this.search,
        read: this.read
      }).then(res => {
        this.allLogUser = res.data.data.logs.data
        this.currentLogPage = res.data.data.logs.current_page
        this.totalUnread = res.data.data.total
      })
    },
    infiniteHandlerLog ($state) {
      this.$store.dispatch('showWhatsappLog', {
        projectId: this.selectedProject,
        pageNumber: this.currentLogPage + 1,
        search: this.search,
        read: this.read
      }).then(res => {
        if (res.data.data.logs.data.length > 0) {
          this.allLogUser = this.allLogUser.concat(res.data.data.logs.data)
          $state.loaded()
          this.currentLogPage++
        } else {
          $state.complete()
        }
      })
    },
    showChat (id, item) {
      item.last_message.read = 1
      this.currentItem = item
      this.ifSelect = 0
      // eslint-disable-next-line eqeqeq
      if (this.id != id) {
        this.removeImage()
        this.contentChat = []
        this.id = id
        this.currentChatPage = 0
        this.detailsOfUser = item
        this.message.phone = item.phone
        this.$store.dispatch('showUserMessage', { id: id }).then(res => {
          this.contentChat = res.data.data.data.reverse()
          this.currentChatPage = res.data.data.current_page
          this.$store.dispatch('editRead', { id: id })
        }).then(() => {
          this.scrollToEnd()
          this.forceRerender()
        })
      }
    },
    scrollToEnd: function () {
      var content = this.$refs.messagesContainer
      content.scrollTop = content.scrollHeight
    },
    infiniteHandler ($state) {
      this.$store.dispatch('showUserMessage', { id: this.id, pageNumber: this.currentChatPage + 1 }).then(res => {
        // console.log('res.data.data', res.data.data.data.length > 0)
        if (res.data.data.data.length > 0) {
          $state.loaded()
          var reserveArr = res.data.data.data.reverse()
          this.contentChat.unshift(...reserveArr)
          this.currentChatPage = res.data.data.current_page
        } else {
          $state.complete()
        }
      })
    },
    sendNewMessage () {
      fd.append('phone', `+2${this.newMessage.phone}`)
      fd.append('message', this.newMessage.message)
      this.$store.dispatch('sendMessage', fd).then(res => {
      }).then(() => {
        this.newMessage = {
          phone: '',
          message: ''
        }
        fd.delete('phone')
        fd.delete('message')
        this.$bvModal.hide('sendMessage')
        this.currentLogPage = 1
        this.getLog()
      }).catch(err => {
        core.showSnackbar('error', err.response.data.errors.message)
      }).finally(() => {
      })
    },
    sendMessage () {
      fd.append('project', this.selectedProject)
      fd.append('phone', this.message.phone)
      fd.append('message', this.message.message)
      this.$store.dispatch('sendMessage', fd).then(res => {
        this.contentChat.push({
          type: 'sender',
          ...this.message,
          front: true,
          created_at: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0],
          user: {
            name: JSON.parse(localStorage.getItem('user_info')).name
          }
        })
        this.message.message = ''
      }).then(() => {
        this.message.message = ''
        this.scrollToEnd()
        this.forceRerender()
        this.currentLogPage = 1
        this.getLog()
      }).catch(err => {
        core.showSnackbar('error', err.response.data.errors.message)
      }).finally(() => {
        fd.delete('project')
        fd.delete('phone')
        fd.delete('message')
      })
    },
    /* changeProject () {
      /!*
      localStorage.setItem('selected_branch', this.selectedProject)
*!/
      this.ifSelect = 1
      this.currentLogPage = 1
      this.message.project = this.selectedProject
      this.$store.dispatch('showWhatsappLog', { projectId: this.selectedProject, pageNumber: 1 }).then(res => {
        // console.log('res', res)
        this.allLogUser = res.data.data
        this.currentLogPage = res.data.meta.current_page
      })
    }, */
    openBulkMessage () {
      this.$bvModal.show('sendMessage')
    },
    openFile () {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById('file').click()
    },
    previewImage: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      // const fd = new FormData()
      fd.append('file', files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.image = ''
      this.file = ''
      fd.delete('file')
    }
  },
  updated () {
    this.$nextTick(() => this.scrollToEnd())
  },
  created () {
    this.getLog()
    channel.channelLog.bind('my-event', (data) => {
      var position = this.allLogUser.findIndex(person => person.phone === data.message.phone)
      this.allLogUser.splice(position, 1)
      this.allLogUser.unshift(data.message)
      if (data.message.phone === this.detailsOfUser.phone) {
        this.contentChat.push(data.message.last_message)
      }
      this.currentLogPage = 1
      this.getLog()
    })
  }
}
</script>
<style>
  .remove-toggle::after{
    content: unset;
  }
  .imageInChat {
    max-width: 300px;
    border-radius: 0 !important;
  }
  .vue-audio-recorder {
    width: 40px !important;
    height: 40px !important;
  }
  .unreadMessage { position: relative}
  .unreadMessage::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 15px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: red;
    z-index: 1000;
  }
  .whatsappList #myTab {
    padding-top:0 !important ;
    padding-bottom:0 !important;
  }
  .microphoneRecord{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Rec{
    animation-name: pulse;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes pulse{
    0%{
      box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);
    }
    65%{
      box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);
    }
    90%{
      box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);
    }
  }
</style>
