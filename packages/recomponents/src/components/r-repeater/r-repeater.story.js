import {storiesOf} from '@storybook/vue';
import markdown from './r-repeater.md';
import RRepeater from './r-repeater.vue';

storiesOf('Components.Grid', module)
    .addParameters({component: RRepeater})
    .add('Repeater', () => ({
        template: `
        <div>
            <r-repeater :provider="provider">
                <template #headers>
                    <th>ID</th>
                    <th>Name</th>
                </template>
                <template #default="{ item }">
                    <tr>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                    </tr>
                </template>
            </r-repeater>
        </div>
        `,
        methods: {
            async provider() {
                return [
                    {id: 1, name: 'One'},
                    {id: 2, name: 'Two'},
                ];
            },
        },
    }), {
        notes: {markdown},
    });
