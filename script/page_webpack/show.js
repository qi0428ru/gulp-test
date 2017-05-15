var $ = require('../library/jquery.js');
var AnchorHandlebars = require('../template/anchor.handlebars');
//var ImagewallHandlebars = require('../template/imagewall.handlebars');
var TitleHandlebars = require('../template/title.handlebars');
var showFunction = {
   init:function(){
      this.$anchorUl = $('.js-show-anchor');//第一行
      this.$otherAnchorUl = $('.js-otherAnchor');//第二行左
      //this.$imageWall = $('.js-imageWall');//第二行右上
      this.$extendTitle = $('.js-extendTitle');//第二行右下
      this.getData();
      this.bindEvent();
   },
   getData: function(){
      var self = this;
      window.ludashiJSON = function(res) {
         self.data = res;
         self.renderHtml(res);
      }
      $.getScript('http://www.bobo.com/2345/hotliveTab');
   },

   bindEvent: function() {
      $('.js-tab').on('click',$.proxy(this.changeAnchor,this));
   },

   renderHtml: function(data) {
      var self = this;
      //第一行
      //data.showData = data.reAnchor;
      data.showData = self.formatImageUrl(data.reAnchor);
      self.$anchorUl.html(AnchorHandlebars(data));
      //第二行左边
      //data.showData = data.hotLive;
      data.showData = self.formatImageUrl(data.hotLive);
      self.$otherAnchorUl.html(AnchorHandlebars(data));
      //第二行右上
      //data.imageWall = data.imageWall[0];
      //data.imageWall = self.formatImageUrl(data.imageWall)[0];
      //self.$imageWall.html(ImagewallHandlebars(data));
      //第二行右下
      self.$extendTitle.html(TitleHandlebars(data));

   },

   changeAnchor: function(evt){
      var self = this;
      var $target = $(evt.currentTarget);
      $target.addClass('current');
      $target.siblings().removeClass('current');
      var dataType = $target.data('type');
      //var data = null;
      if(dataType == 'hotLive'){
         self.data.showData = self.data.hotLive;
      } else if(dataType == 'goodVoice') {
         self.data.showData = self.data.goodVoice;
      } else if(dataType == 'sexHot') {
         self.data.showData = self.data.sexHot;
      }
      self.data.showData = self.formatImageUrl(self.data.showData);
      var tmpl = AnchorHandlebars(self.data);
      self.$otherAnchorUl.html(tmpl);
   },

   formatImageUrl: function(data){
      for(i=0; i<data.length; i++){
         var imageUrl = data[i].imageUrl;
         var index = imageUrl.indexOf('?');
         if(index>-1){
            imageUrl = imageUrl.substring(0,index);
            data[i].imageUrl = imageUrl;
         }
      }
      return data;
   }
   
}
showFunction.init();