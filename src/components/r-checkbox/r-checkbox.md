#Checkbox


```
<template>
     <r-checkbox  
            :caption='caption'
            :value='value'
            :label="label"
            :disabled="disabled"
            :fuzzy="fuzzy"
            v-model="checkboxModel"
            @input="input"/>
</template>
   
<script>
     import RCheckbox from 'path/r-checkbox/r-checkbox.vue';

     export default {
       data() {
         return {
           checkboxModel: false,
         }
       },
       props: {
            label: 'Here is the label',
            caption: '',
            fuzzy: false,
            disabled: true,
       },
       methods: {
         input: () => {},
       }
     }
</script>
```