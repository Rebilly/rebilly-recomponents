/**
 * Shared icons for storybook
 */
export const icons = {
    '': null,
    'actions': 'actions',
    'api-key': 'api-key',
    'arrow-down': 'arrow-down',
    'arrow-down-l': 'arrow-down-l',
    'arrow-left': 'arrow-left',
    'arrow-left-l': 'arrow-left-l',
    'arrow-right': 'arrow-right',
    'arrow-right-l': 'arrow-right-l',
    'arrow-up': 'arrow-up',
    'arrow-up-l': 'arrow-up-l',
    'at': 'at',
    'automation': 'automation',
    'bank': 'bank',
    'blacklists': 'blacklists',
    'burger': 'burger',
    'calendar': 'calendar',
    'caret-down': 'caret-down',
    'caret-down-s': 'caret-down-s',
    'caret-left': 'caret-left',
    'caret-right': 'caret-right',
    'caret-up': 'caret-up',
    'check-s': 'check-s',
    'checkbox-checkmark': 'checkbox-checkmark',
    'circle': 'circle',
    'clip': 'clip',
    'clone': 'clone',
    'close': 'close',
    'close-s': 'close-s',
    'collapse-segments': 'collapse-segments',
    'columns': 'columns',
    'company': 'company',
    'coupon': 'coupon',
    'credit-card': 'credit-card',
    'custom-fields': 'custom-fields',
    'customers': 'customers',
    'dash-l': 'dash-l',
    'dashboard': 'dashboard',
    'data-export': 'data-exports',
    'download': 'download',
    'drag': 'drag',
    'drag-mov': 'drag-move',
    'edit': 'edit',
    'email': 'email',
    'event': 'event',
    'export': 'export',
    'external-link': 'external-link',
    'eye': 'eye',
    'eye-closed': 'eye-closed',
    'file': 'file',
    'filter': 'filter',
    'fingerprint': 'fingerprint',
    'guides': 'guides',
    'heart': 'heart',
    'help': 'help',
    'info': 'info',
    'integration': 'integrations',
    'invoices': 'invoices',
    'list': 'list',
    'lists': 'lists',
    'loading': 'loading',
    'lock': 'lock',
    'logout': 'logout',
    'map-marker': 'map-marker',
    'notification': 'notifications',
    'orders': 'orders',
    'plus': 'plus',
    'product': 'product',
    'radio-checkmark': 'radio-checkmark',
    'rebilly-logo': 'rebilly-logo',
    'report-match': 'report-match',
    'reset': 'reset',
    'resize-columns': 'resize-columns',
    'rules': 'rules',
    'search': 'search',
    'segment': 'segments',
    'setting': 'settings',
    'sharp': 'sharp',
    'shipping': 'shipping',
    'sticky-note': 'sticky-note',
    'stop': 'stop',
    'stream': 'stream',
    'tag': 'tag',
    'transactions': 'transactions',
    'trash': 'trash',
    'unlock': 'unlock',
    'users': 'users',
    'webhooks': 'webhooks',
    'website': 'website',
    'world': 'world',
};

/**
 * Shared colors for storybook
 */
export const colors = {
    '': null,
    'accent': 'accent',
    'background': 'background',
    'blue': 'blue',
    'brand': 'brand',
    'dark-background': 'dark-background',
    'faint-gray': 'faint-gray',
    'gray': 'gray',
    'green': 'green',
    'light-background': 'light-background',
    'light-blue': 'light-blue',
    'light-gray': 'light-gray',
    'light-green': 'light-green',
    'light-red': 'light-red',
    'light-yellow': 'light-yellow',
    'muted': 'muted',
    'red': 'red',
    'text': 'text',
    'yellow': 'yellow',
};

/**
 * Validation wrapper for stories without Vuelidate
 */
export const validate = {
    valid: {
        $dirty: false,
        $invalid: false,
        $touch: () => {}
    },
    dirty: {
        $dirty: true,
        $invalid: false,
        $touch: () => {}
    },
    invalid: {
        $dirty: true,
        $invalid: true,
        $touch: () => {}
    },
}
