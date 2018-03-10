
export default {
  data(){
    return{
      formatNumber: ''
    };
  },
  props:{
    number:{
      type: String|Number,
      required: true,
    }
  },
  watch:{
    number: {
      handler:   function(number, oldNumber) {
        this.formatting(number);
      }
    }
  },
  methods:{
   formatting(number){
     number = String(number);
     let decimals = '';

     if (number.indexOf('.') !== -1) {
       let item = number.split('.');
       number = item[0];
       decimals = '.' + item[1];
     }
     let formattingNumber = number;
     let resultFormatting = '';
     if (number.length > 3) {
       formattingNumber = number.split("").reverse().join("").match(/.{1,3}/g);
       formattingNumber.reverse().forEach((item, index) =>{
         resultFormatting += item.split("").reverse().join("");
         if(index + 1 < formattingNumber.length){
           resultFormatting += ',';
         }
       });
       this.formatNumber = resultFormatting + decimals;
     } else {
       this.formatNumber = number +  decimals;
     }
     return this.formatNumber;
   }
  },
  created(){
    this.formatting(this.number);
  }
};
