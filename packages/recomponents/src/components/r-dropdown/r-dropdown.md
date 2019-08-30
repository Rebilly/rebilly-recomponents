## Dropdown

| prop           | type                                                                | default value   |
|--              | --                                                                  |               --|
| escToHide      | boolean                                                             | true            |
| autoHide       | boolean                                                             | true            |
| globalAutoHide | boolean                                                             | true            |
| openOnMount    | boolean                                                             | false           |
| disabled       | boolean                                                             | false           |
| offset         | number                                                              | 4               |
| direction      | string: `'horizontal'` , `'vertical'`                               | `'horizontal'`  |
| position       | string: `'bottomStart'` , `'bottomEnd'` , `'topStart'` , `'topEnd'` | `'bottomStart'` |
| slideFrom      | string: `'fade'` , `'top'` , `'bottom'` , `'left'` , `'right'`      | `'fade'`        |
  
  
```html
<template>  
 <r-dropdown :escToHide="escToHide"  
  :autoHide="autoHide" :globalAutoHide="globalAutoHide" :openOnMount="openOnMount" :disabled="disabled"  
  :offset="offset" :direction="direction" :position="position" :slideFrom="slideFrom" @input="input"  
  @setActivePopper="setActivePopper" @toggle="toggle" @toggle-on="toggleOn" @toggle-off="toggleOff">  
 <template #trigger="{popper}">  
 <r-icon-button @click="popper.toggle">  
 <r-icon icon="actions"/>  
 </r-icon-button> </template> <template #content>  
 <div class="popover">  
 <div class="popover-control">  
 <div class="popover-content popover-menu"><a class="popover-menu-item">Edit</a> <a  
  class="popover-menu-item popover-menu-item-negative">Remove</a></div>  
 </div> </div> </template> </r-dropdown></template>
```
