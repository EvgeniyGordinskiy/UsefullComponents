import { mapGetters, mapMutations } from 'vuex';
import ResetPassService from '../../../services/auth/resetPassword';
import Forms from '../../../utils/forms/forms';
import Formvue from '../../../components/form/form.vue';
import validator from '../../../mixins/validator'

export default {
  data() {
    return {
      size: 'small',
      content: {},
      form: new Forms({
        email:{
          value: '',
          type: 'email',
        },
      }),
      preparedContent:{
        if_email_verified:false,
        reset_password:false
      }
    };
  },

  computed: {
    ...mapGetters([
      'modalState',
      'modalStyle',
      'modalContent',
      'verifyUserMobile'
    ]),

    getContent() {
      switch(this.modalContent.body) {
        case 'email_verified':
          this.preparedContent.if_email_verified = true;
          break;
        case 'reset_password':
          this.preparedContent.reset_password = true;
          break;
        default:
          return this.modalContent.body;
          break;
      }
    },

    classProp() {
      return this.modalStyle;
    },
    statusModal(){
      if(this.modalState == false){

      }
      return this.modalState;
    }
  },

  watch:{
    modalContent(){
      this.preparedContent.if_email_verified = false;
      this.preparedContent.reset_password = false;
    }
  },

  methods: {
    ...mapMutations({
      toggle: 'TOGGLE_MODAL',
      setModalContent: 'SET_MODAL_CONTENT',
      unsetModalContent: 'UNSET_MODAL_CONTENT',
      setModalStyle: 'SET_MODAL_STYLE',
      toggleModalRedirectedStatus: 'TOGGLE_REDIRECTED_STATUS'
    }),
      clear(){
        this.preparedContent.if_email_verified = false;
        this.preparedContent.reset_password = false;
        this.toggleModalRedirectedStatus(false);
        this.toggle(false);
        this.unsetModalContent();
        this.setModalStyle('');
        this.emailResetPassword = '';
      },

    onClose() {
     this.clear();
    },

    sendResetPassword(){
      if(this.validate(this.form)) {
        ResetPassService.sendEmail(this.form.data())
          .then(resp => {
            this.clear();
            this.setModalContent({ header: resp.message, body: '' });
            this.setModalStyle('oneRowInTheModal');
            this.toggle(true);
          })
          .catch(err => {
            this.form.recordErrors({'email': [err.message]});
          })
      }
    }
  },
  components: {
    formv: Formvue,
  },
  mixins: [
    validator
  ]
};
