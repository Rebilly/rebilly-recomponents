## Icon Button

| prop  | type | default value |  
|--|--|--|  
| size  | string: `'small'` \| `'regular'`\| `'large'` | `'regular'` | 
| tooltipRightEdge  | boolean | false |  
| fitted  | boolean | false |  
| type  | string: `'default'` \| `'primary'` \| `'warning'` \| `'danger'` | `'default'` | 
| globalAutoHide  | boolean | true |  
| tooltip  | string | '' |  
| disabled  | boolean | false |  
| fluid  | boolean | false |  
  
```  
<r-icon-button  
  :size="size"  
  :type="type"  
  :fluid="fluid"  
  :tooltip="tooltip"  
  :disabled="disabled"  
  @click="click"  
  @focus="focus"  
>  
 <r-icon icon="actions"/>  
</r-icon-button>
```