# Icon Button

Button with icon, icon is optional.

### Props

| prop             | type                                                         | default value |
|--                | --                                                           | --          --|
| type             | string: `'default'` , `'primary'` , `'warning'` , `'danger'` | `'default'`   |
| size             | string: `'small'` , `'regular'`, `'large'`                   | `'regular'`   |
| disabled         | boolean                                                      | false         |
| fluid            | boolean                                                      | false         |
| tooltip          | string                                                       | ''            |
| tooltipRightEdge | boolean                                                      | false         |
| fitted           | boolean                                                      | false         |
| globalAutoHide   | boolean                                                      | true          |

### Slots

| name       | description         | usage                         |
| --         | --                  | --                            |
| default    | component's content | see the source in `Story` tab |
| left-icon  | left icon           | see the source in `Story` tab |
| right-icon | right icon          | see the source in `Story` tab |
