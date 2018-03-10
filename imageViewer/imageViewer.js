
import {mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      classProp:''
    };
  },

  computed:{
    ...mapGetters([
      'imageViewerStatus',
      'imageViewerContent',
      'imageViewerActiveItem'
    ])
  },
  methods:{
    ...mapMutations({
      'unsetImageViewerContent' : 'IMAGEVIEWER_UNSET_CONTENT',
      'toggleImageViewerStatus' : 'IMAGEVIEWER_TOGGLE_STATUS',
    }),
    onClose(){
      this.unsetImageViewerContent();
      this.toggleImageViewerStatus(false);
    },

    changed(indexNew){
      Object.keys(this.imageViewerContent).map((key, index) => {
        if(indexNew == index){
          let image = new Image();
          image.src = this.imageViewerContent[key];
          let index = image.width / image.height;
          let carusel = $('.el-carousel');
          let width = document.body.clientWidth * 0.8 - 120;
          if(image.width < width) {
            width = image.width;
          }
          carusel.css({width:width, height: width / index});
        }
      });
;
    }
  }
};
