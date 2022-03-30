<template>
    <div>
       <div class="commentwrap" v-if="hotComment.length!=0">
                  <h4>最热评论({{hotComment.length}})</h4>
                  <ul>
                      <li class="commentwrapitem" v-for="hc in hotComment" :key="hc.commentId">
                        <img class="commentwrapitemimg" v-lazy="hc.user.avatarUrl">
                        <div class="commentinfo">
                            <div class="commentword">
                              <span style="color: #517eaf;cursor: pointer;" v-if="hc.user">{{hc.user.nickname}}：</span>
                              <span>{{hc.content}}</span>
                            </div>
                            <div class="reply" v-for="hotre in hc.beReplied" :key="hotre.beRepliedCommentId">
                              <span style="color: #517eaf;cursor: pointer;" v-if="hotre.user">@{{hotre.user.nickname}}：</span>
                              <span>{{hotre.content}}</span>
                            </div>
                            <div class="commentdate">
                                <span style="margin-right:20px;">{{hc.commentDate}}</span>
                                <svg t="1647787553445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16080" width="12" height="12"><path d="M598.354747 67.542626c-48.148687 0-90.130101 32.905051-98.960808 79.437576 0 0-14.312727 72.882424-21.798787 99.090101-12.308687 43.196768-55.363232 90.944646-86.522829 106.188283-23.531313 11.636364-110.99798 11.765657-116.350707 11.765656H155.707475c-32.762828 0-59.384242 26.479192-59.384243 59.384243v475.022222c0 32.762828 26.479192 59.384242 59.384243 59.384242h548.033939c88.126061 0 163.025455-64.452525 176.135758-151.647676l45.873131-305.713132c10.834747-71.809293-44.8-136.274747-117.423838-136.274747H673.254141s20.066263-66.469495 30.228687-178.669899c5.081212-56.837172-35.167677-110.99798-94.280404-117.152323-3.620202-0.54303-7.227475-0.814545-10.847677-0.814546zM333.705051 898.288485V421.533737c38.917172-2.534141 66.999596-8.016162 83.574949-16.316767 43.726869-21.669495 99.633131-81.040808 117.281616-143.088485 7.899798-27.681616 21.39798-96.155152 23.001212-104.184243 3.47798-17.92 20.596364-31.159596 40.649697-31.159596 1.603232 0 3.206465 0.129293 4.822627 0.271516 28.211717 2.947879 43.326061 29.698586 41.32202 52.686868-9.360808 103.912727-27.823838 166.503434-28.082425 166.904243l-23.130505 76.489697h215.182223c17.519192 0 33.564444 7.356768 45.071515 20.596363 11.507071 13.239596 16.316768 30.228687 13.640404 47.618586L821.294545 797.052121c-8.830707 58.569697-58.181818 101.094141-117.423838 101.094142h-370.165656v0.142222z m-177.997576 0v-475.022222h118.626262v475.022222H155.707475z m0 0" p-id="16081" data-spm-anchor-id="a313x.7781069.0.i62" fill="#808080" class="selected"></path></svg>
                                <span>{{hc.likedCount}}</span>
                            </div>
                        </div>
                      </li>
                  </ul>
              </div>
              <div class="commentwrap" v-if="commentCount!=0">
                  <h4>最新评论({{commentCount-hotComment.length}})</h4>
                  <ul>
                    <li class="commentwrapitem" v-for="c in comments" :key="c.commentId">
                        <img class="commentwrapitemimg" v-lazy="c.user.avatarUrl">
                        <div class="commentinfo">
                            <div class="commentword">
                              <span style="color: #517eaf;cursor: pointer;" v-if="c.user">{{c.user.nickname}}：</span>
                              <span>{{c.content}}</span>
                            </div>
                            <div class="reply" v-for="re in c.beReplied" :key="re.beRepliedCommentId">
                              <span style="color: #517eaf;cursor: pointer;" v-if="re.user">@{{re.user.nickname}}：</span>
                              <span>{{re.content}}</span>
                            </div>
                            <div class="commentdate">
                                <span style="margin-right:20px;">{{c.commentDate}}</span>
                                <svg t="1647787553445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16080" width="12" height="12"><path d="M598.354747 67.542626c-48.148687 0-90.130101 32.905051-98.960808 79.437576 0 0-14.312727 72.882424-21.798787 99.090101-12.308687 43.196768-55.363232 90.944646-86.522829 106.188283-23.531313 11.636364-110.99798 11.765657-116.350707 11.765656H155.707475c-32.762828 0-59.384242 26.479192-59.384243 59.384243v475.022222c0 32.762828 26.479192 59.384242 59.384243 59.384242h548.033939c88.126061 0 163.025455-64.452525 176.135758-151.647676l45.873131-305.713132c10.834747-71.809293-44.8-136.274747-117.423838-136.274747H673.254141s20.066263-66.469495 30.228687-178.669899c5.081212-56.837172-35.167677-110.99798-94.280404-117.152323-3.620202-0.54303-7.227475-0.814545-10.847677-0.814546zM333.705051 898.288485V421.533737c38.917172-2.534141 66.999596-8.016162 83.574949-16.316767 43.726869-21.669495 99.633131-81.040808 117.281616-143.088485 7.899798-27.681616 21.39798-96.155152 23.001212-104.184243 3.47798-17.92 20.596364-31.159596 40.649697-31.159596 1.603232 0 3.206465 0.129293 4.822627 0.271516 28.211717 2.947879 43.326061 29.698586 41.32202 52.686868-9.360808 103.912727-27.823838 166.503434-28.082425 166.904243l-23.130505 76.489697h215.182223c17.519192 0 33.564444 7.356768 45.071515 20.596363 11.507071 13.239596 16.316768 30.228687 13.640404 47.618586L821.294545 797.052121c-8.830707 58.569697-58.181818 101.094141-117.423838 101.094142h-370.165656v0.142222z m-177.997576 0v-475.022222h118.626262v475.022222H155.707475z m0 0" p-id="16081" data-spm-anchor-id="a313x.7781069.0.i62" fill="#808080" class="selected"></path></svg>
                                <span>{{c.likedCount}}</span>
                            </div>
                        </div>
                    </li>
                  </ul>
              </div>
    </div>
</template>
<script>
import {  dateFormatFull } from '@/utils/dateformat.js';
export default {
    name:'Comment',
    data() {
        return {
            hotComment:[],
        }
    },
    props:['id','comments','hotComments','commentCount'],
    watch:{
        hotComments(newValue){
            if (newValue) {
                newValue.forEach(item => {
                    this.$set(item,'commentDate',dateFormatFull(item.time));
                });
                this.hotComment = newValue;
            } 
        },
        comments(newValue){
            newValue.forEach(item => {
                this.$set(item,'commentDate',dateFormatFull(item.time));
            });
        },
    },
}
</script>
<style scoped>
    .commentwrap{
        margin-bottom: 10px;
    }
    .commentwrapitem{
        display: flex;
        margin: 10px 0 30px;
    }
    .commentwrapitemimg{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    .commentinfo{
        flex: 1;
        margin-left: 10px;
    }
    .commentword{
        font-size: 14px;
        color: #000;
    }
    .commentdate{
        font-size: 14px;
        color: #808080;
        margin-top: 16px;
    }
    .reply{
        width: 100%;
        background-color: #f3f1f3;
        font-size: 14px;
        color: #000;
        padding: 5px 10px;
        margin-top: 10px;
    }
    
</style>