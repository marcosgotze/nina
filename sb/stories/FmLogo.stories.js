import Logo  from '../../packages/libs/atoms/src/components/Logo.vue';

export default {
  title: 'Logo',
  component: Logo
};

const Template = (args) => ({
  components: { Logo },
  setup() {
    return { args };
  },
  template: '<Logo />',
});

export const FmLogo = Template.bind({});

