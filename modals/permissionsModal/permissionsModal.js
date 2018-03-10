
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      active: false,
    };
  },

  computed: {
    ...mapGetters([
      'permissionsModalState',
    ]),
  },

  methods: {
    ...mapMutations({
      togglePermissionsModal: 'TOGGLE_PERMISSIONS_MODAL',
    }),

    onClose() {
        this.togglePermissionsModal(false);
    },
  },

  created() {
  },
};
