import Logo  from '../../packages/libs/atoms/src/Logo';

export default {
  title: 'Atoms',
  component: Logo
};

const Template = (args) => ({
  components: { Logo },
  setup() {
    return { args };
  },
  template: '<logo />',
});

export const FMLogo = Template.bind({});

