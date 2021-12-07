<template>
  <div class="header h-16 bg-transparent md:bg-surface flex items-center pl-6 ">
    <header-logo />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import HeaderLogo from "~/components/Index/HeaderLogo.vue";

@Component({
  components: {HeaderLogo}
})
export default class Header extends Vue {


}
</script>

<style lang="sass" scoped>
.header

</style>
