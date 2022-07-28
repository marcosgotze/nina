import Footer  from '../../packages/libs/molecules/src/Footer';

export default {
  title: 'Molecules',
  component: Footer
};

const Template = (args) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<footer />',
});

export const Flogo = Template.bind({});

