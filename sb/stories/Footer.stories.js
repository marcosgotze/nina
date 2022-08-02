import Footer  from '../../packages/libs/molecules/src/Footer.vue';

export default {
  title: 'Molecules',
  component: Footer
};

const Template = (args) => ({
  components: { Footer },
  setup() {
    return { args };
  },
  template: '<Footer />',
});

export const FmFooter = Template.bind({});

