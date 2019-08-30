import {storiesOf} from '@storybook/vue';

storiesOf('Demo', module)
    .add('Typography', () => ({
        template: `
            <main style="padding: 2rem">
                <h1>h1. Heading 1</h1>
                <h2>h2. Heading 2</h2>
                <h3>h3. Heading 3</h3>
                <h4>h4. Heading 4</h4>
                <h5>h5. Heading 5</h5>
                <h6>h6. Heading 6</h6>
                <hr style="margin: 2rem 0"/>
                <p>p. Paragraph</p>
                <div>
                    <strong>Bolded</strong>
                    <em>Italicized</em>
                    <a href="#">Colored</a>
                    <u>Underlined</u>
                    <kbd>shift</kbd> + <kbd>s</kbd>
                    <code>&lt;code&gt;&lt;/code&gt;</code>
                </div>
                <hr style="margin: 2rem 0"/>
                <pre>
                    <code>
                        .some-class {
                            background-color: red;
                        }
                    </code>
                </pre>
            </main>
        `,
    }), {
        notes: 'Global styles for text elements, headings and body text',
    });
