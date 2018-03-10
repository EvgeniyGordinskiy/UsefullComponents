

import { mapGetters, mapMutations } from 'vuex';
import Forms from '../../../utils/forms/forms';
import Formvue from '../../../components/form/form.vue';
import VerifyUser from '../../../services/verifyUser';

export default {
  data() {
    return {
      active: false,
      form: new Forms({
        'civil_id_front_file': {
          value: '',
          type: 'file',
        },
        'civil_id_back_file': {
          value: '',
          type: 'file',
        },
        'passport_file': {
          value: '',
          type: 'file',
        },
        'BankStatement': {
          value: '',
          type: 'file',
        },
        'mobile_number': {
          value: '',
          type: 'text',
        },
        'acceptVerifyModal': {
          value: false,
          type: 'checkbox',
        },
      }),
    };
  },

  computed: {
    ...mapGetters([
      'verifyModalState',
    ]),
  },

  watch: {
    verifyModalState(state) {
      this.active = state;
    },
    'form.MobileNumber'() {
      setTimeout(()=> {
        this.form.MobileNumber = this.form.MobileNumber.replace(/[a-zA-Z]+/ig, '');
      }, 500);
    }
  },
  methods: {
    ...mapMutations({
      toogleVerifyModal: 'TOGGLE_VERIFY_MODAL',
    }),

    save() {
      let data = this.form.data();
      if(data.acceptVerifyModal && this.checkMobile(data.mobile_number)) {
        data.document_type = 'CIVIL_ID';
        data.civil_id_front_file = data.civil_id_front_file.url;
        data.civil_id_back_file = data.civil_id_back_file.url;
        data.passport_file = data.passport_file.url;

        VerifyUser.checkDocuments(data)
          .then(resp => {
          })
          .catch(err => {
          })
      // this.toogleVerifyModal(false);

      }
    },

    checkMobile(mobile) {
      VerifyUser.checkMobile(mobile)
        .then(resp => {
          console.og(resp);
          if (resp.status === 200) {
            return true;
          }
          return false;
        })
        .catch( err => {
        })
    },

    onClose() {
      this.toogleVerifyModal(false);
    },
  },

  created() {
  },
  components: {
    formv: Formvue,
  },
};
