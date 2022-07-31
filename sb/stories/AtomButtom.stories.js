import AtomButton  from '../../packages/libs/atoms/src/components/AtomButton';

export default {
  title: 'Atom',
  component: AtomButton
};

const Template = (args) => ({
  components: { AtomButton },
  setup() {
    return { args };
  },
  template: '<atom-button />',
});

export const Btn = Template.bind({});

