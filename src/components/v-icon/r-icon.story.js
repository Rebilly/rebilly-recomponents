import { storiesOf } from '@storybook/vue';
import {action, decorate} from '@storybook/addon-actions';
import { select, boolean } from '@storybook/addon-knobs';
import RIcon from './r-icon.vue';
import markdown from './r-icon.md';
import iconSprites from './icon-sprites.md';

const template = () => {
    return {
        template: iconSprites,
    };
};

storiesOf('Components', module).addDecorator(template)
  .add('Icon', () => ({
    components: { RIcon },
    template: `
            <r-icon
                :icon="icon"
                :stopPropagation="stopPropagation"
            ></r-icon>
        `,
    methods: {
      click: action('click'),
    },
    props: {
      icon: {
        default: select('Icon', {
            'dashboard' : 'dashboard',
            'lists' : 'lists',
            'automation' : 'automation',
            'orders' : 'orders',
            'transactions' : 'transactions',
            'guides' : 'guides',
            'setting' : 'settings',
            'notification' : 'notifications',
            'customers' : 'customers',
            'stream' : 'stream',
            'search' : 'search',
            'filte' : 'filter',
            'collapse-segments' : 'collapse-segments',
            'resize-columns' : 'resize-columns',
            'segment' : 'segments',
            'lock' : 'lock',
            'caret-up' : 'caret-up',
            'caret-down' : 'caret-down',
            'caret-left' : 'caret-left',
            'caret-right' : 'caret-right',
            'arrow-up' : 'arrow-up',
            'arrow-down' : 'arrow-down',
            'arrow-left' : 'arrow-left',
            'arrow-right' : 'arrow-right',
            'arrow-up-l' : 'arrow-up-l',
            'arrow-down-l' : 'arrow-down-l',
            'arrow-left-l' : 'arrow-left-l',
            'arrow-right-l' : 'arrow-right-l',
            'close' : 'close',
            'close-s' : 'close-s',
            'actions' : 'actions',
            'circl' : 'circle',
            'eye' : 'eye',
            'eye-closed' : 'eye-closed',
            'logout' : 'logout',
            'burger' : 'burger',
            'help' : 'help',
            'info' : 'info',
            'dash-l' : 'dash-l',
            'company' : 'company',
            'website' : 'website',
            'email' : 'email',
            'external-link' : 'external-link',
            'trash' : 'trash',
            'bank' : 'bank',
            'map-marker' : 'map-marker',
            'credit-tile' : 'credit-tile',
            'check-s' : 'check-s',
            'custom-fields' : 'custom-fields',
            'calendar' : 'calendar',
            'columns' : 'columns',
            'blacklists' : 'blacklists',
            'webhooks' : 'webhooks',
            'sticky-note' : 'sticky-note',
            'clip' : 'clip',
            'loading' : 'loading',
            'product' : 'product',
            'api-key' : 'api-key',
            'heart' : 'heart',
            'coupon' : 'coupon',
            'tag' : 'tag',
            'stop' : 'stop',
            'clone' : 'clone',
            'edi' : 'edit',
            'unloc' : 'unlock',
            'rule' : 'rules',
            'lis' : 'list',
            'even' : 'event',
            'user' : 'users',
            'a' : 'at',
            'shar' : 'sharp',
            'fil' : 'file',
            'downloa' : 'download',
            'expor' : 'export',
            'data-export' : 'data-exports',
            'shippin' : 'shipping',
            'plu' : 'plus',
            'dra' : 'drag',
            'rese' : 'reset',
            'drag-mov' : 'drag-move',
            'integration' : 'integrations',
        }, 'heart'),
      },
      stopPropagation: {
        default: boolean('stopPropagation', false),
      },
    },
  }), {
    notes: { markdown },
  });
