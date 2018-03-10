import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      size: 'small',
      content: {},
    };
  },

  computed: {
    ...mapGetters([
      'modalLoadingState',
      'modalLoadingStyle',
      'modalLoadingContent',
    ]),
    classProp() {
      return this.modalLoadingStyle;
    }
  },

  methods: {
    ...mapMutations({
      toggle: 'TOGGLE_LOADING_MODAL',
      unsetModalContent: 'UNSET_MODAL_LOADING_CONTENT',
      setModalStyle: 'SET_MODAL_LOADING_STYLE'
    }),

    onClose() {
      this.toggle(false);
      this.unsetModalContent();
      this.setModalStyle('');
    },
  },
};
